use cardano/transaction.{OutputReference, Transaction}
use cip68generator/types.{Redeem, Remove, StoreRedeemer, Update}
use types/cip68.{CIP68}

validator store {
  spend(
    _datum: Option<CIP68>,
    redeemer: StoreRedeemer,
    _output_reference: OutputReference,
    _transaction: Transaction,
  ) {
    when redeemer is {
      Update -> True
      Remove -> True
      Redeem -> True
    }
  }

  else(_) {
    fail
  }
}
