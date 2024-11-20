use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/address
use cardano/assets.{without_lovelace}
use cardano/transaction.{
  InlineDatum, Output, OutputReference, Transaction, find_input,
}
use cardano/tx
use cip68generator/types.{Remove, StoreRedeemer, Update}
use cip68generator/utils
use types/cip68.{CIP68}
use validation/find.{output_by_addr_value}

// @validator: Store
// @title: Open source dynamic assets (Token/NFT) generator (CIP68)
// @description: Validator is used to update and remove tokens (nft, token) according to CIP68
// @params - exchange: The address when users operate with the platform, they will have to pay a platform maintenance fee.
// @params - exchange_fee: The minimum amount a user must pay to the exchange when interacting with the exchange.
validator store(exchange: VerificationKeyHash, exchange_fee: Int) {
  spend(
    datum: Option<CIP68>,
    redeemer: StoreRedeemer,
    output_reference: OutputReference,
    transaction: Transaction,
  ) {
    expect Some(datum_output) = datum
    let Transaction { inputs, outputs, extra_signatories, .. } = transaction
    let exchange_address = address.from_verification_key(exchange)
    let output_utxo_exchange =
      utils.find_output(outputs, exchange_fee, exchange_address)
    expect Some(input) = find_input(inputs, output_reference)
    let script_address = input.output.address
    let reference_token =
      input.output.value
        |> without_lovelace()
    when redeemer is {
      // @action: Update - Condition for update assets
      // signed_by_author: When a user updates an asset, there is an author field in the datum of the store validator. At the same time, the user must also provide a signature to update the fields in the datum to change the asset's metadata.
      Update -> {
        let validator_output =
          output_by_addr_value(outputs, script_address, reference_token)
        expect InlineDatum(datum_input) = validator_output.datum
        let meradatum_output: CIP68 = datum_output
        expect metadatum_input: CIP68 = datum_input
        expect author_input: ByteArray = cip68.get(metadatum_input, "author")
        expect author_output: ByteArray = cip68.get(meradatum_output, "author")
        let check_author = author_input == author_output
        and {
          utils.check_output_utxo(validator_output, extra_signatories)?,
          list.length(outputs) == 3,
          output_utxo_exchange != None,
          check_author,
        }
      }
      // @action: Remove - Condition for remove assets
      Remove -> {
        expect InlineDatum(datum_input) = input.output.datum
        expect metadatum_input: CIP68 = datum_input
        expect author_input: ByteArray = cip68.get(metadatum_input, "author")
        // let validating_output = output_by_value(outputs, reference_token)
        and {
          tx.verify_signature(extra_signatories, author_input),
          list.length(outputs) == 2,
          output_utxo_exchange != None,
        }
      }
    }
  }

  else(_) {
    fail
  }
}
