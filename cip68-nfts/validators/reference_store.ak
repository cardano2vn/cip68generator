use aiken/hash.{Blake2b_224, Hash}
use aiken/transaction.{ScriptContext, Spend}
use aiken/transaction/credential.{VerificationKey}
use aiken/transaction/value
use assist/signing
use cip68_nfts/types.{MetaDatum, Remove, StoreAction, Update}
use cip68_nfts/utils

validator(issuer: Hash<Blake2b_224, VerificationKey>) {
  fn store(_datum: MetaDatum, rdmr: StoreAction, ctx: ScriptContext) -> Bool {
    let tx = ctx.transaction

    expect Spend(output_reference) = ctx.purpose
    // The input being spent containing the reference nft.
    // Assumption being that this contract only has CIP68 reference nfts locked in it
    // and each utxo holds exactly one refrence nft.
    expect Some(input) = transaction.find_input(tx.inputs, output_reference)
    let ref_nft =
      input.output.value
        |> value.without_lovelace()

    when rdmr is {
      Update -> {
        let script_addr = input.output.address

        // Find the output containing reference nft being sent back to this script itself
        // Fail if no such output is found. Reference nft must never leave the contract 
        // if the intention was to just update the nft metadata
        let validating_output =
          utils.output_by_addr_value(tx.outputs, script_addr, ref_nft)

        and {
          signing.verify_sig(tx.extra_signatories, issuer)?,
          utils.check_output_utxo(validating_output)?,
        }
      }
      Remove -> {
        let validating_output = utils.output_by_value(tx.outputs, ref_nft)

        and {
          // Check if the transaction is signed by issuer and allow them to remove
          // any asset that they wish.
          signing.verify_sig(tx.extra_signatories, issuer)?,
          utils.check_output_utxo(validating_output)?,
        }
      }
    }
  }
}
