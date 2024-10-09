use aiken/crypto.{VerificationKeyHash}
use cardano/assets.{AssetName, PolicyId}

pub type Asset {
  policy_id: PolicyId,
  asset_name: AssetName,
}

pub type Extra {
  address: VerificationKeyHash,
  has_change: Bool,
  asset: Asset,
}

pub type StoreDatum {
  metadata: Pair<Data, Data>,
  version: Int,
  extra: Extra,
}

pub type MintRedeemer {
  Mint
  Burn
}

pub type StoreRedeemer {
  Update
  Remove
  Redeem
}
