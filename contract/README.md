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
validator mint(store: ScriptHash) {
mint(redeemer: MintRedeemer, policy_id: PolicyId, transaction: Transaction) {
let Transaction { inputs, outputs, extra_signatories, mint, .. } =
transaction

    let mint_flatten =
      mint
        |> without_lovelace()
        |> assets.flatten()

    when redeemer is {
      Mint -> {
        let first_tx_id = find.first_input_txid(inputs)
        let first_tx_index = find.first_input_index(inputs)

        let reference_token = utils.token_prefix(mint_flatten, cip68.prefix_100)
        let user_token = utils.token_prefix(mint_flatten, cip68.prefix_222)

        let check_none_token =
          utils.check_none_token(user_token, reference_token)

        when check_none_token is {
          False -> False
          True -> {
            let reference_value =
              assets.from_asset(policy_id, reference_token, 1)
            let store_address = address.from_script(store)
            let output_utxo =
              find.output_by_addr_value(outputs, store_address, reference_value)

            and {
              first_tx_index < 256,
              list.length(mint_flatten) >= 2,
              minting.exact(mint_flatten, policy_id, reference_token, 1)?,
              utils.check_output_utxo(output_utxo, extra_signatories)?,
            }
          }
        }
      }

      Burn -> True
    }

}

else(\_) {
fail
}
}

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
validator mint(store: ScriptHash) {
mint(redeemer: MintRedeemer, policy_id: PolicyId, transaction: Transaction) {
let Transaction { inputs, outputs, extra_signatories, mint, .. } =
transaction

    let mint_flatten =
      mint
        |> without_lovelace()
        |> assets.flatten()

    when redeemer is {
      Mint -> {
        let first_tx_id = find.first_input_txid(inputs)
        let first_tx_index = find.first_input_index(inputs)

        let reference_token = utils.token_prefix(mint_flatten, cip68.prefix_100)
        let user_token = utils.token_prefix(mint_flatten, cip68.prefix_222)

        let check_none_token = utils.check_none_token(user_token, reference_token)

        when reference_token is {
          Some(reference_token) -> {
            let reference_value =
              assets.from_asset(policy_id, reference_token, 1)
            let store_address = address.from_script(store)
            let output_utxo =
              find.output_by_addr_value(outputs, store_address, reference_value)

            and {
              first_tx_index < 256,
              list.length(mint_flatten) >= 2,
              minting.exact(mint_flatten, policy_id, reference_token, 1)?,
              utils.check_output_utxo(output_utxo, extra_signatories)?,
            }
          }
          _ -> fail @"No matching asset found for the given prefix"
        }
      }
      Burn -> True
    }

}

else(\_) {
fail
}
}
