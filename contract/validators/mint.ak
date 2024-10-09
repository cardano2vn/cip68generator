use cardano/assets.{PolicyId}
use cardano/transaction.{Transaction}
use cip68generator/types.{Burn, Mint, MintRedeemer}

validator mint {
  mint(redeemer: MintRedeemer, _policy_id: PolicyId, _transaction: Transaction) {
    when redeemer is {
      Mint -> True
      Burn -> True
    }
  }

  else(_) {
    fail
  }
}
