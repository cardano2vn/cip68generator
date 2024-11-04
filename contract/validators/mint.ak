use aiken/crypto.{VerificationKeyHash}
use cardano/assets.{PolicyId}
use cardano/transaction.{Transaction}
use cardano/tx.{verify_signature}
use cip68generator/types.{Burn, Mint, MintRedeemer}

// validator - mint
// parameters (exchange_address, store_validator)
validator mint(exchange: VerificationKeyHash, store: VerificationKeyHash) {
  mint(redeemer: MintRedeemer, _policy_id: PolicyId, transaction: Transaction) {
    let Transaction { inputs, outputs, extra_signatories, .. } = transaction
    when redeemer is {
      Mint -> {
        
      }
      Burn -> True
    }
  }

  else(_) {
    fail
  }
}
