use aiken/collection/list
use aiken/crypto.{ScriptHash, VerificationKeyHash}
use cardano/address
use cardano/assets.{AssetName, PolicyId, without_lovelace}
use cardano/minting
use cardano/transaction.{Transaction}
use cardano/tx.{verify_signature}
use cardano/value
use cip68generator/types.{Burn, Mint, MintRedeemer}
use cip68generator/utils
use types/cip68
use validation/find

// validator - mint
// parameters (exchange_address, store_validator)
validator mint(
  exchange: VerificationKeyHash,
  exchange_fee: Int,
  store: ScriptHash,
) {
  mint(redeemer: MintRedeemer, policy_id: PolicyId, transaction: Transaction) {
    let Transaction { inputs, outputs, extra_signatories, mint, .. } =
      transaction

    let mint_flatten =
      mint
        |> without_lovelace()
        |> assets.flatten()
    let exchange_address = address.from_verification_key(exchange)
    let output_utxo_exchange =
      utils.find_output(outputs, exchange_fee, exchange_address)

    when redeemer is {
      Mint -> {
        let reference_token_option =
          utils.token_prefix(mint_flatten, cip68.prefix_100)
        let user_token_option =
          utils.token_prefix(mint_flatten, cip68.prefix_222)
        let amount_mint_token: Int = list.length(mint_flatten)
        let check_none_token =
          utils.check_none_token(user_token_option, reference_token_option)

        when check_none_token is {
          False -> False
          True ->
            when (reference_token_option, user_token_option) is {
              (Some(reference_token), Some(user_token)) -> {
                let reference_value =
                  assets.from_asset(policy_id, reference_token, 1)
                let user_value =
                  assets.from_asset(
                    policy_id,
                    user_token,
                    amount_mint_token - 1,
                  )
                let store_address = address.from_script(store)
                let output_utxo_store =
                  find.output_by_addr_value(
                    outputs,
                    store_address,
                    reference_value,
                  )
                // let output_utxo_user = find.output_by_addr_value(outputs)
                and {
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
              }
              _ -> False
            }
        }
      }

      Burn -> True
    }
  }

  else(_) {
    fail
  }
}
