use aiken/cbor
use aiken/list
use aiken/transaction.{InlineDatum, Output}
use aiken/transaction/credential.{Address}
use aiken/transaction/value.{Value}
use assist/values
use cip68_nfts/types.{MetaDatum}

// Check the output utxo containing the reference nft
pub fn check_output_utxo(output: Output) -> Bool {
  // Check inline datum exists and conforms to MetaDatum as per CIP68
  trace cbor.diagnostic(output.datum)
  expect InlineDatum(data) = output.datum
  expect _metadatum: MetaDatum = data

  let output_value =
    output.value
      |> value.without_lovelace()
      |> value.flatten()
  // Check no other token is present in the utxo containing reference nft
  list.length(output_value) == 1
}

/// Return the first occurrence of an output that contains at least some specific
/// value at some address. If nothing is found then error. This function
/// does not search for an exact UTxO match.
///
/// ```aiken
/// find.output_by_addr_value(tx.outputs, wallet_addr, just_token_value)
/// ```
pub fn output_by_addr_value(
  outputs: List<Output>,
  addr: Address,
  value: Value,
) -> Output {
  when outputs is {
    [output, ..rest] ->
      if output.address == addr && values.contains(value, output.value) {
        output
      } else {
        output_by_addr_value(rest, addr, value)
      }
    // nothing was found
    [] -> fail @"No Output found"
  }
}

/// Return the first occurrence of an output that contains at least some specific
/// value. If nothing is found then error. This function
/// does not search for an exact UTxO match.
///
/// ```aiken
/// find.output_by_value(tx.outputs, just_token_value)
/// ```
pub fn output_by_value(outputs: List<Output>, value: Value) -> Output {
  when outputs is {
    [output, ..rest] ->
      if values.contains(value, output.value) {
        output
      } else {
        output_by_value(rest, value)
      }
    // nothing was found
    [] -> fail @"No Output found"
  }
}
