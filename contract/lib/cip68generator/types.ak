use aiken/crypto.{VerificationKeyHash}
use cardano/assets.{AssetName, PolicyId}

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
