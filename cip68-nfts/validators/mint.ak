use aiken/bytearray
use aiken/cbor
use aiken/hash.{Blake2b_224, Hash}
use aiken/list
use aiken/transaction.{Mint, ScriptContext, Transaction}
use aiken/transaction/credential.{Script, VerificationKey}
use aiken/transaction/value
use assist/find
use assist/minting
use assist/payout
use assist/prefixes
use assist/signing
use assist/values
use cip68_nfts/types.{Burn, MintAction}
use cip68_nfts/utils

validator(
  issuer: Hash<Blake2b_224, VerificationKey>,
  store: Hash<Blake2b_224, Script>,
) {
  fn mint(rdmr: MintAction, ctx: ScriptContext) -> Bool {
    let ScriptContext { transaction, purpose } = ctx

    when purpose is {
      Mint(policy_id) -> {
        let Transaction { inputs, mint, outputs, .. } = transaction
        let mint_flat =
          mint
            |> value.from_minted_value()
            |> value.flatten()

        when rdmr is {
          types.Mint -> {
            let first_txid = find.first_input_txid(inputs)
            let first_idx = find.first_input_index(inputs)

            let ref_tkn =
              values.unique_token_name(
                first_txid,
                first_idx,
                prefixes.prefix_100,
              )
            let ref_value = value.from_asset(policy_id, ref_tkn, 1)
            let user_tkn =
              values.unique_token_name(
                first_txid,
                first_idx,
                prefixes.prefix_222,
              )

            let store_address = credential.from_script(store)
            trace cbor.diagnostic(ref_value)
            let output_utxo =
              utils.output_by_addr_value(outputs, store_address, ref_value)

            and {
              signing.verify_sig(transaction.extra_signatories, issuer)?,
              // Allow only two nfts to be minted at once
              (list.length(mint_flat) == 2)?,
              // Prevent byte overflow leading to duplicate asset names
              first_idx < 256,
              // Check reference nft being minted
              minting.exact(mint_flat, policy_id, ref_tkn, 1)?,
              // Check user nft being minted
              minting.exact(mint_flat, policy_id, user_tkn, 1)?,
              // Must send the reference nft to store address
              payout.at_least(store_address, ref_value, outputs)?,
              utils.check_output_utxo(output_utxo)?,
            }
          }
          Burn -> and {
              signing.verify_sig(transaction.extra_signatories, issuer)?,
              // Check nfts with ref and user token prefixes are burnt
              minting.by_prefix(mint_flat, policy_id, prefixes.prefix_100, -1)?,
              minting.by_prefix(mint_flat, policy_id, prefixes.prefix_222, -1)?,
              // Must burn exactly one nft pair. Check token names to ensure the nft pairs are correct
              when mint_flat is {
                [(_pid1, tkn1, _amt1), (_pid2, tkn2, _amt2)] ->
                  bytearray.compare(
                    bytearray.drop(tkn1, 4),
                    bytearray.drop(tkn2, 4),
                  ) == Equal
                _ -> False
              },
            }
        }
      }

      _ -> False
    }
  }
}
