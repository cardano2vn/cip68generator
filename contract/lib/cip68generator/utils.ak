use aiken/collection/list
use aiken/crypto.{ScriptHash, VerificationKeyHash}
use aiken/primitive/bytearray
use cardano/address.{Address}
use cardano/assets.{AssetName, PolicyId, flatten, lovelace_of, without_lovelace}
use cardano/transaction.{InlineDatum, Output}
use cardano/tx
use types/cip68.{CIP68}

// check the output utxos containing the reference nft
pub fn check_output_utxo(output: Output, vks: List<VerificationKeyHash>) -> Bool {
  expect InlineDatum(data) = output.datum
  expect metadatum: CIP68 = data
  expect name: ByteArray = cip68.get(metadatum, "name")
  expect image: ByteArray = cip68.get(metadatum, "image")
  expect media_type: ByteArray = cip68.get(metadatum, "mediaType")
  expect author: VerificationKeyHash = cip68.get(metadatum, "author")

  let output_value =
    output.value
      |> without_lovelace()
      |> flatten()

  and {
    bytearray.length(name) > 0,
    bytearray.length(image) > 0,
    bytearray.length(media_type) > 0,
    tx.verify_signature(vks, author),
    list.length(output_value) == 1,
  }
}

// get asset name from mint flatten
pub fn token_prefix(
  flat: List<(PolicyId, AssetName, Int)>,
  prefix: ByteArray,
) -> Option<AssetName> {
  let exist =
    list.find(
      flat,
      fn((policy_id, asset_name, amount)) {
        bytearray.starts_with(asset_name, prefix)
      },
    )
  when exist is {
    Some((policy_id, asset_name, amount)) -> Some(asset_name)
    None -> None
  }
}

pub fn check_none_token(
  user_token: Option<AssetName>,
  reference_token: Option<AssetName>,
) -> Bool {
  if user_token == None || reference_token == None {
    False
  } else {
    True
  }
}

pub fn check_address(output: Output, address: Address) -> Bool {
  output.address.payment_credential == address.payment_credential
}

// The function checks whether the output exists or not
pub fn check_none_output(
  output_store: Option<Output>,
  output_exchange: Option<Output>,
) -> Bool {
  // If one of the 3 outputs does not exist, the function will return False
  if output_store == None || output_exchange == None {
    False
  } else {
    // Otherwise, the function will return True
    True
  }
}

pub fn find_output(
  outputs: List<Output>,
  price: Int,
  address: Address,
) -> Option<Output> {
  list.find(
    outputs,
    fn(output) { check_amount(output, price) && check_address(output, address) },
  )
}

pub fn check_price_duplicate(out_sell: Output, out_royal: Output) -> Bool {
  lovelace_of(out_sell.value) > lovelace_of(out_royal.value)
}

pub fn check_address_duplicate(
  output_author: Output,
  output_exchange: Output,
) -> Bool {
  output_author.address.payment_credential == output_exchange.address.payment_credential
}

// The function checks the amount
pub fn check_amount(output: Output, price: Int) -> Bool {
  lovelace_of(output.value) >= price
}
