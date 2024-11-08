use aiken/collection/list
use aiken/crypto.{ScriptHash, VerificationKeyHash}
use cardano/address
use cardano/assets.{PolicyId, without_lovelace}
use cardano/minting
use cardano/transaction.{Transaction}
use cip68generator/types.{Burn, Mint, MintRedeemer}
use cip68generator/utils
use types/cip68
use validation/find

// Validator: Mint
// Description: Valodator use mint and burn assets dynamic assets (Token/NFT) generator (CIP68) 
// Parameters: exchange: Exchange wallet address, exchange_fee: Minimum price sent to the exchange, store: Store address wallet,

// Mint Redeemer
// sign_by_author: 
validator mint(
  exchange: VerificationKeyHash,
  exchange_fee: Int,
  store: ScriptHash,
) {
  mint(redeemer: MintRedeemer, policy_id: PolicyId, transaction: Transaction) {
    let Transaction { outputs, extra_signatories, mint, .. } = transaction
    // lấy ra 
    let mint_flatten =
      mint
        |> without_lovelace()
        |> assets.flatten()

    let reference_token_option =
      utils.token_prefix(mint_flatten, cip68.prefix_100)
    let user_token_option = utils.token_prefix(mint_flatten, cip68.prefix_222)
    let amount_mint_token: Int = list.length(mint_flatten)
    let exchange_address = address.from_verification_key(exchange)
    let output_utxo_exchange =
      utils.find_output(outputs, exchange_fee, exchange_address)
    let check_none_token =
      utils.check_none_token(user_token_option, reference_token_option)

    when check_none_token is {
      True ->
        when (reference_token_option, user_token_option) is {
          (Some(reference_token), Some(user_token)) -> {
            let reference_value =
              assets.from_asset(policy_id, reference_token, 1)
            // let user_value =
            //   assets.from_asset(policy_id, user_token, amount_mint_token - 1)
            let store_address = address.from_script(store)
            let output_utxo_store =
              find.output_by_addr_value(outputs, store_address, reference_value)

            when redeemer is {
              Mint -> and {
                  amount_mint_token >= 2,
                  minting.exact(mint_flatten, policy_id, reference_token, 1)?,
                  minting.exact(
                    mint_flatten,
                    policy_id,
                    user_token,
                    amount_mint_token - 1,
                  )?,
                  utils.check_output_utxo(output_utxo_store, extra_signatories)?,
                  output_utxo_exchange != None,
                }

              // bytearray.compare(
              //   bytearray.drop(reference_token, 4),
              //   bytearray.drop(user_token, 4),
              // ) == Equal,
              Burn -> and {
                  minting.by_prefix(
                    mint_flatten,
                    policy_id,
                    cip68.prefix_100,
                    -1,
                  )?,
                  output_utxo_exchange != None,
                  minting.by_prefix(
                    mint_flatten,
                    policy_id,
                    cip68.prefix_222,
                    -1,
                  )?,
                }
            }
          }

          // bytearray.compare(
          //   bytearray.drop(reference_token, 4),
          //   bytearray.drop(user_token, 4),
          // ) == Equal,
          _ -> False
        }
      _ -> False
    }
  }

  else(_) {
    fail
  }
}
