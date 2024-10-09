use aiken/collection/list
use cardano/assets.{flatten, without_lovelace}
use cardano/transaction.{InlineDatum, Output}
use cip68generator/types.{StoreDatum}

pub fn check_output_utxo(output: Output) -> Bool {
  expect InlineDatum(data) = output.datum
  expect _metadatum: StoreDatum = data
  let output_value =
    output.value
      |> without_lovelace()
      |> flatten()

  list.length(output_value) == 1
}
