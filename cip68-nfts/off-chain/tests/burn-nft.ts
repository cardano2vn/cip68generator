// deno-lint-ignore-file no-var
import { Constr, Data, toUnit } from "lucid";
import {
  createLucidInstance,
  getAppliedValidator,
  getCredential,
  getUtxoWithAssets,
} from "../utils/lucid/utils.ts";
import {
  NON_FUNGIBLE_TOKEN_LABEL,
  REFERENCE_TOKEN_LABEL,
} from "../common/constants.ts";

const lucid = await createLucidInstance();
lucid.selectWalletFromPrivateKey(await getCredential("user.sk"));

const userAddr = await lucid.wallet.address();
const userUtxos = await lucid.utxosAt(userAddr);

const mintValidator = await getAppliedValidator("mint.mint.json");
let assetNameSuffix =
  "017dbe1a410d76ebc1cc2cadd78a302ba001e13d71f4b6b5698e2874";
let refToken = toUnit(
  mintValidator.policyId,
  assetNameSuffix,
  REFERENCE_TOKEN_LABEL,
);
let nftToken = toUnit(
  mintValidator.policyId,
  assetNameSuffix,
  NON_FUNGIBLE_TOKEN_LABEL,
);

let refUtxo = getUtxoWithAssets(userUtxos, { [refToken]: 1n });
let nftUtxo = getUtxoWithAssets(userUtxos, { [nftToken]: 1n });
const rdmr = Data.to(new Constr(1, []));

var tx, signedTx, txHash;

try {
  console.log("Test 1: Missing reference token from burning");
  tx = await lucid
    .newTx()
    .collectFrom([nftUtxo])
    .mintAssets({ [nftToken]: -1n }, rdmr)
    .attachMintingPolicy(mintValidator.validator)
    .addSigner(await getCredential("issuer.addr"))
    .complete({ change: { address: userAddr } });

  signedTx = await tx
    .signWithPrivateKey(await getCredential("issuer.sk"))
    .sign()
    .complete();

  txHash = await signedTx.submit();
  await lucid.awaitTx(txHash);

  console.log(
    `Successfully burnt CIP-68 NFT: ${nftToken}(Ref NFT: ${refToken})
  at userAddress: ${userAddr},
  token: ${mintValidator.policyId},
  txHash: ${txHash}`,
  );
} catch (error) {
  console.log("Test passed. " + error.toString());
}

nftToken = toUnit(
  mintValidator.policyId,
  "02eaa09d6a5dd92314eda4a882f5eb4343da3128159b43cde82c3a51",
  NON_FUNGIBLE_TOKEN_LABEL,
);

nftUtxo = getUtxoWithAssets(userUtxos, { [nftToken]: 1n });

try {
  console.log("Test 2: Incorrect reference token/nft token pair");
  tx = await lucid
    .newTx()
    .collectFrom([refUtxo, nftUtxo])
    .mintAssets({ [refToken]: -1n, [nftToken]: -1n }, rdmr)
    .attachMintingPolicy(mintValidator.validator)
    .addSigner(await getCredential("issuer.addr"))
    .complete({ change: { address: userAddr } });

  signedTx = await tx
    .signWithPrivateKey(await getCredential("issuer.sk"))
    .sign()
    .complete();

  txHash = await signedTx.submit();
  await lucid.awaitTx(txHash);

  console.log(
    `Successfully burnt CIP-68 NFT: ${nftToken}
(Ref NFT: ${refToken}),
at userAddress: ${userAddr},
token: ${mintValidator.policyId},
txHash: ${txHash}`,
  );
} catch (error) {
  console.log("Test passed. " + error.toString());
}
