use aiken/dict.{Dict}

/// Redeemer type for minting validator
pub type MintAction {
  Mint
  Burn
}

/// Redeemer type of validator for storing ref nft
pub type StoreAction {
  Update
  Remove
}

// Datum type 
pub type MetaDatum {
  metadata: Dict<ByteArray, Data>,
  version: Int,
  extra: ByteArray,
}
