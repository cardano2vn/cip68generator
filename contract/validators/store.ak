use aiken/crypto.{VerificationKeyHash}
// use cardano/address
// use cardano/assets.{without_lovelace}
use cardano/transaction.{OutputReference, Transaction}
use cip68generator/types.{StoreRedeemer}
// use cip68generator/utils
use types/cip68.{CIP68}

// use validation/find.{output_by_addr_value}

validator store(_exchange: VerificationKeyHash, _exchange_fee: Int) {
  spend(
    _datum: Option<CIP68>,
    _redeemer: StoreRedeemer,
    _output_reference: OutputReference,
    _transaction: Transaction,
  ) {
    True
    // expect Some(datum_output) = datum
    // let Transaction { inputs, outputs, extra_signatories, .. } = transaction
    // let exchange_address = address.from_verification_key(exchange)
    // let output_utxo_exchange =
    //   utils.find_output(outputs, exchange_fee, exchange_address)
    // expect Some(input) = find_input(inputs, output_reference)
    // let script_address = input.output.address
    // let reference_token =
    //   input.output.value
    //     |> without_lovelace()
    // let validator_output =
    //   output_by_addr_value(outputs, script_address, reference_token)
    // expect InlineDatum(datum_input) = validator_output.datum
    // let meradatum_output: CIP68 = datum_output
    // expect metadatum_input: CIP68 = datum_input
    // expect author_input: ByteArray = cip68.get(metadatum_input, "author")
    // expect author_output: ByteArray = cip68.get(meradatum_output, "author")
    // let check_author = author_input == author_output

    // when redeemer is {
    //   Update -> and {
    //       utils.check_output_utxo(validator_output, extra_signatories)?,
    //       output_utxo_exchange != None,
    //       check_author,
    //     }
    //   Remove -> and {
    //       utils.check_output_utxo(validator_output, extra_signatories)?,
    //       output_utxo_exchange != None,
    //     }
    // }
  }

  else(_) {
    fail
  }
}
