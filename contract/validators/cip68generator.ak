use aiken/crypto.{ScriptHash, VerificationKeyHash}
use cardano/assets.{PolicyId}
use cardano/transaction.{OutputReference,Transaction}
use cip68generator/types.{MintRedeemer,StoreRedeemer}
use types/cip68.{CIP68}

validator cip68generator(
  _exchange: VerificationKeyHash,
  _exchange_fee: Int,
  _store: ScriptHash,
) {
  mint(_redeemer: MintRedeemer, _policy_id: PolicyId, _transaction: Transaction) {
    True
  }
  spend(
    _datum: Option<CIP68>,
    _redeemer: StoreRedeemer,
    _output_reference: OutputReference,
    _transaction: Transaction,
  ) {
    True
  }

  else(_) {
    fail
  }
}
