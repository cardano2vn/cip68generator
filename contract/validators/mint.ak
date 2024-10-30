use aiken/crypto.{VerificationKeyHash}
use cardano/assets.{PolicyId}
use cardano/transaction.{Transaction}
use cardano/tx.{verify_signature}
use cip68generator/types.{Burn, Mint, MintRedeemer}

validator mint(issuer: VerificationKeyHash) {
  mint(redeemer: MintRedeemer, _policy_id: PolicyId, transaction: Transaction) {
    let Transaction { extra_signatories, .. } = transaction
    when redeemer is {
      Mint -> verify_signature(extra_signatories, issuer)
      Burn -> True
    }
  }

  else(_) {
    fail
  }
}
