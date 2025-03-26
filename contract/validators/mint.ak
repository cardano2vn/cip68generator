use aiken/collection/list
use aiken/crypto.{ScriptHash, VerificationKeyHash}
use cardano/address
use cardano/assets.{PolicyId, without_lovelace}
use cardano/transaction.{Transaction}
use cip68generator/types.{Burn, Mint, MintRedeemer}
use cip68generator/utils
use types/cip68

// @validator: Mint
// @title: Open source dynamic assets (Token/NFT) generator (CIP68)
// @description: Validator is used to mint and burn tokens (nft, token) according to CIP68
// @params - platform: The address when users operate with the platform, they will have to pay a platform maintenance fee.
// @params - platform_fee: The minimum amount a user must pay to the platform when interacting with the platform.
// @params - store: The place to store reference tokens of user tokens in nfts minted according to CIP68 of the platform.
validator mint(
  platform: VerificationKeyHash,
  platform_fee: Int,
  store_payment_credential: ScriptHash,
  store_stake_credential: VerificationKeyHash,
  issuer: VerificationKeyHash,
) {
  mint(redeemer: MintRedeemer, policy_id: PolicyId, transaction: Transaction) {
    let Transaction { inputs, outputs, extra_signatories, mint, .. } =
      transaction
    let mint_flatten =
      mint
        |> without_lovelace()
        |> assets.flatten()
    let store_address =
      store_payment_credential
        |> address.from_script()
        |> address.with_delegation_key(store_stake_credential)
    let platform_address = address.from_verification_key(platform)
    let output_utxo_platform =
      utils.find_output(outputs, platform_fee, platform_address)
    let check_output_platform = output_utxo_platform != None
    when redeemer is {
      // @action: Mint -  Conditions for minting assets (NFT/Token)
      // - check_signed_by_author: When a user mints an asset, the datum of the store validator contains an author field and the user must provide a signature to identify that this is the author who minted the asset. This condition is fulfilled by comparing the signature entered in the datum of the store validator. 
      // - check_platform_fee: Check in the transaction output that there exists an utxo containing the platform's minimum fee and is sent to the platform's address defined in params.
      // - check_format_asset: Check that the specified fields such as name, image, media_type, author exist in the store validator's datum (ask asset metadata). These fields are required.
      // - amount_tx_output: number of utxo output = 4 where 1 utxo for platform_fee address, 1 utxo for store validator address and 2 utxo recipient address where 1 utxo contains CIP222 Token.
      // - check_store_address: Check that the asset (CIP100) sent to an address must be the store validator's address
      Mint -> {
        let reference_asset =
          utils.find_input_reference_asset(inputs, extra_signatories)
        if list.length(reference_asset) > 0 {
          let mint_concat = list.concat(reference_asset, mint_flatten)
          let check_asset_mint =
            utils.check_asset_mint(
              mint_concat,
              policy_id,
              cip68.prefix_100,
              cip68.prefix_222,
              outputs,
              store_address,
              issuer,
              extra_signatories,
              True,
            )
          and {
            check_asset_mint?,
            check_output_platform?,
          }
        } else {
          let check_asset_mint =
            utils.check_asset_mint(
              mint_flatten,
              policy_id,
              cip68.prefix_100,
              cip68.prefix_222,
              outputs,
              store_address,
              issuer,
              extra_signatories,
              False,
            )
          and {
            check_asset_mint?,
            check_output_platform?,
          }
        }
      }
      // @action: Burn - Conditions for burning assets (NFT/Token)
      // - signed_by_author: When a user performs asset burning, the datum of the store validator contains an author field and the user must provide a signature to identify that this is the author performing the asset burning transaction. This condition is performed by comparing the signature entered in the datum of the store validator.
      // - amount_tx_output: The output of the transaction is 2 (1 utxo of the platform address, 1uxto of the recipient address).
      // - check_platform_fee: Check the amount of ADA sent to the platform must be greater than or equal to the amount of ADA defined in the validator's params.
      // - check_amount: Check that the amount of user tokens the sender wants to burn is valid and does not exceed the amount they own.
      // - ada_attacked: Check where the ADA attached to the reference token will go (to the wallet the user currently owns).
      // - check_amount_burn: The author will burn both NFTs (User Token, Reference Token) with the given amount.
      Burn -> {
        let reference_asset =
          utils.find_input_reference_asset(inputs, extra_signatories)

        if list.length(reference_asset) > 0 {
          let mint_concat = list.concat(reference_asset, mint_flatten)
          let check_asset_burn =
            utils.check_asset_burn(
              mint_concat,
              policy_id,
              cip68.prefix_100,
              cip68.prefix_222,
            )
          and {
            check_asset_burn?,
            check_output_platform?,
          }
        } else {
          let check_asset_burn =
            utils.check_assets_prefix(mint_flatten, policy_id, cip68.prefix_222)
          and {
            check_asset_burn?,
            check_output_platform?,
          }
        }
      }
    }
  }

  else(_) {
    fail
  }
}
