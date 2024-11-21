use aiken/collection/list
use aiken/crypto.{ScriptHash, VerificationKeyHash}
use aiken/primitive/bytearray
use cardano/address
use cardano/assets.{PolicyId, without_lovelace}
use cardano/minting
use cardano/transaction.{Transaction}
use cip68generator/types.{Burn, Mint, MintRedeemer}
use cip68generator/utils
use types/cip68
use validation/find

// @validator: Mint
// @title: Open source dynamic assets (Token/NFT) generator (CIP68)
// @description: Validator is used to mint and burn tokens (nft, token) according to CIP68
// @params - exchange: The address when users operate with the platform, they will have to pay a platform maintenance fee.
// @params - exchange_fee: The minimum amount a user must pay to the exchange when interacting with the exchange.
// @params - store: The place to store reference tokens of user tokens in nfts minted according to CIP68 of the exchange.
validator mint(
  exchange: VerificationKeyHash,
  exchange_fee: Int,
  store: ScriptHash,
) {
  mint(redeemer: MintRedeemer, policy_id: PolicyId, transaction: Transaction) {
    let Transaction { outputs, extra_signatories, mint, .. } = transaction
    let mint_flatten =
      mint
        |> without_lovelace()
        |> assets.flatten()
    let amount_mint_token: Int = list.length(mint_flatten)
    let exchange_address = address.from_verification_key(exchange)
    let user_token_option = utils.token_prefix(mint_flatten, cip68.prefix_222)
    let reference_token_option =
      utils.token_prefix(mint_flatten, cip68.prefix_100)
    let output_utxo_exchange =
      utils.find_output(outputs, exchange_fee, exchange_address)
    when redeemer is {
      // @action: Mint -  Conditions for minting assets (NFT/Token)
      // - check_signed_by_author: When a user mints an asset, the datum of the store validator contains an author field and the user must provide a signature to identify that this is the author who minted the asset. This condition is fulfilled by comparing the signature entered in the datum of the store validator. 
      // - check_exchange_fee: Check in the transaction output that there exists an utxo containing the exchange's minimum fee and is sent to the exchange's address defined in params.
      // - check_format_asset: Check that the specified fields such as name, image, media_type, author exist in the store validator's datum (ask asset metadata). These fields are required.
      // - amount_tx_output: number of utxo output = 4 where 1 utxo for exchange_fee address, 1 utxo for store validator address and 2 utxo recipient address where 1 utxo contains CIP222 Token.
      // - check_store_address: Check that the asset (CIP100) sent to an address must be the store validator's address
      Mint -> {
        let check_none_token =
          utils.check_none_token(user_token_option, reference_token_option)
        when check_none_token is {
          True ->
            when (reference_token_option, user_token_option) is {
              (Some(reference_token), Some(user_token)) -> {
                let reference_value =
                  assets.from_asset(policy_id, reference_token, 1)
                let store_address = address.from_script(store)
                let output_utxo_store =
                  find.output_by_addr_value(
                    outputs,
                    store_address,
                    reference_value,
                  )
                and {
                  amount_mint_token >= 2,
                  list.length(outputs) == 4,
                  minting.exact(mint_flatten, policy_id, reference_token, 1)?,
                  minting.exact(
                    mint_flatten,
                    policy_id,
                    user_token,
                    amount_mint_token - 1,
                  )?,
                  utils.check_output_utxo(output_utxo_store, extra_signatories)?,
                  output_utxo_exchange != None,
                  bytearray.compare(
                    bytearray.drop(reference_token, 4),
                    bytearray.drop(user_token, 4),
                  ) == Equal,
                }
              }
              _ -> False
            }
          _ -> False
        }
      }

      // @action: Burn - Conditions for burning assets (NFT/Token)
      // - signed_by_author: When a user performs asset burning, the datum of the store validator contains an author field and the user must provide a signature to identify that this is the author performing the asset burning transaction. This condition is performed by comparing the signature entered in the datum of the store validator.
      // - amount_tx_output: The output of the transaction is 2 (1 utxo of the exchange address, 1uxto of the recipient address).
      // - check_exchange_fee: Check the amount of ADA sent to the exchange must be greater than or equal to the amount of ADA defined in the validator's params.
      // - check_amount: Check that the amount of user tokens the sender wants to burn is valid and does not exceed the amount they own.
      // - ada_attacked: Check where the ADA attached to the reference token will go (to the wallet the user currently owns).
      // - check_amount_burn: The author will burn both NFTs (User Token, Reference Token) with the given amount.
      Burn -> and {
          output_utxo_exchange != None,
          minting.by_prefix(
            mint_flatten,
            policy_id,
            cip68.prefix_222,
            -(amount_mint_token - 1),
          )?,
          list.length(outputs) == 2,
          minting.by_prefix(mint_flatten, policy_id, cip68.prefix_100, -1)?,
        }
    }
  }

  else(_) {
    fail
  }
}
