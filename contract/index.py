from opshin.ledger.interval import *
from opshin.prelude import *


@dataclass()
class VestingParams(PlutusData):
    beneficiary: PubKeyHash
    deadline: POSIXTime

@dataclass()
class metadata(PlutusData):
    pocOwner: PubKeyHash #Address
    pocName: bytes
    pocPhone: bytes
    pocLocation: bytes
    pocType: bytes
    pocSampleID: bytes
    pocResult: bytes
    pocTtvalue: int
    validator_address: bytes

@dataclass()
class MintRedeemer(PlutusData):
    CONSTR_ID= 0
    pass

@dataclass()
class UpdateRedeemer(PlutusData):
    CONSTR_ID= 1
    pass


@dataclass()
class TrueRedeemer(PlutusData):
    CONSTR_ID= 5
    pass

def signed_by_odOwner(params: metadata, context: ScriptContext) -> bool:
    return params.pocOwner in context.tx_info.signatories

def signed_by_beneficiary(params: VestingParams, context: ScriptContext) -> bool:
    return params.beneficiary in context.tx_info.signatories


def is_after(deadline: POSIXTime, valid_range: POSIXTimeRange) -> bool:
    # To ensure that the valid_range occurs after the deadline,
    # we construct an interval from deadline to infinity
    # then check whether that interval contains the valid_range interval.
    from_interval: POSIXTimeRange = make_from(deadline)
    return contains(from_interval, valid_range)


def deadline_reached(params: VestingParams, context: ScriptContext) -> bool:
    # The current transaction can only execute in valid_range,
    # so the current execution time is always within valid_range.
    # Therefore, to make all possible execution times occur after the deadline,
    # we need to make sure the whole valid_range interval occurs after the deadline.
    return is_after(params.deadline, context.tx_info.valid_range)

# vesting
def validator_vesting(datum: VestingParams, redeemer: None, context: ScriptContext) -> None:
    assert signed_by_beneficiary(datum, context), "beneficiary's signature missing"
    assert deadline_reached(datum, context), "deadline not reached"

# nft
def get_minting_purpose(context: ScriptContext) -> Minting:
    purpose = context.purpose
    if isinstance(purpose, Minting):
        is_minting = True
    else:
        is_minting = False
    assert is_minting, "Not minting purpose"
    minting_purpose: Minting = purpose
    return minting_purpose


def check_mint_exactly_one_with_name(
    token: Token,
    mint: Value,
) -> None:
    assert (
        mint[token.policy_id][token.token_name] == 1
    ), "Exactly 1 token must be minted"
    assert len(mint[token.policy_id]) == 1, "No other token must be minted"


def has_utxo(context: ScriptContext, oref: TxOutRef) -> bool:
    return any([oref == i.out_ref for i in context.tx_info.inputs])


def validator_nft(
    oref: TxOutRef, tn: TokenName, redeemer: None, context: ScriptContext
) -> None:
    minting_purpose = get_minting_purpose(context)
    check_mint_exactly_one_with_name(
        Token(minting_purpose.policy_id, tn), context.tx_info.mint
    )
    assert has_utxo(context, oref), "UTxO not consumed"

# signed
def assert_minting_purpose(context: ScriptContext) -> bool:
    purpose = context.purpose
    if isinstance(purpose, Minting):
        is_minting = True
    else:
        is_minting = False
    return is_minting


def assert_signed(pkh: PubKeyHash, context: ScriptContext) -> None:
    assert pkh in context.tx_info.signatories, "missing signature"


def validator_signed(pkh: PubKeyHash, redeemer: None, context: ScriptContext) -> None:
    assert_minting_purpose(context)
    # assert_signed(pkh, context)

def validator(datum: metadata, redeemer: Union[MintRedeemer, UpdateRedeemer, TrueRedeemer], context: ScriptContext) -> None:
    datum_oracle=False
    updatemetadata=False
    dc=False

# Signed by the private key of the bot from oracle
    for ri in context.tx_info.reference_inputs:
        # ris = ri.resolved.reference_script
        # if isinstance(ris, NoScriptHash):
        rid = ri.resolved.datum
        if isinstance(rid, SomeOutputDatum):
            oi: metadata = rid.datum  # oracle info
            datum_oracle=True
            dc=oi.pocOwner in context.tx_info.signatories

    for item in context.tx_info.outputs:
        # """
        # check if the minimumAmountOut has been paid to the validator_address
        # """       
        if datum.validator_address == item.address.payment_credential.credential_hash and datum.validator_address==oi.validator_address: # validator_address: 
                    
            rid = item.datum
            if isinstance(rid, SomeOutputDatum):
                datumout: metadata = rid.datum  # datum info
                
                if datum.pocOwner == datumout.pocOwner and datum.validator_address==datumout.validator_address:
                    updatemetadata = True
                else: 
                    updatemetadata=False
    


    if isinstance(redeemer, MintRedeemer): #mint NFT
        assert assert_minting_purpose(context), "not minting purpose"

    elif isinstance(redeemer, UpdateRedeemer): #update Metadata
        assert updatemetadata and signed_by_odOwner(datum, context), "Update Metadata False"
    
    elif isinstance(redeemer, TrueRedeemer):
        assert True, "away True redeemer"  
 

    else:
        assert False, "Invalid redeemer"