// the redeemer using mint validator
pub type MintRedeemer {
  Mint
  Burn
}

// the redeemer using store validator
pub type StoreRedeemer {
  Update
  Remove
}

pub const author_key: ByteArray = "_pk"
