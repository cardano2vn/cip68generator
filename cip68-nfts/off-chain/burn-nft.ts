import { Constr, Data, toUnit } from "lucid";
import {
  createLucidInstance,
  getAppliedValidator,
  getCredential,
  getUtxoWithAssets,
} from "./utils/lucid/utils.ts";
import {
  NON_FUNGIBLE_TOKEN_LABEL,
  REFERENCE_TOKEN_LABEL,
} from "./common/constants.ts";

const lucid = await createLucidInstance();
lucid.selectWalletFromPrivateKey(await getCredential("user.sk"));

const userAddr = await lucid.wallet.address();
const userUtxos = await lucid.utxosAt(userAddr);

const mintValidator = await getAppliedValidator("mint.mint.json");
const assetNameSuffix =
  "02eaa09d6a5dd92314eda4a882f5eb4343da3128159b43cde82c3a51";
const refToken = toUnit(
  mintValidator.policyId,
  assetNameSuffix,
  REFERENCE_TOKEN_LABEL,
);
const nftToken = toUnit(
  mintValidator.policyId,
  assetNameSuffix,
  NON_FUNGIBLE_TOKEN_LABEL,
);

const refUtxo = getUtxoWithAssets(userUtxos, { [refToken]: 1n });
const nftUtxo = getUtxoWithAssets(userUtxos, { [nftToken]: 1n });
const rdmr = Data.to(new Constr(1, []));

const tx = await lucid
  .newTx()
  .collectFrom([refUtxo, nftUtxo])
  .mintAssets({ [refToken]: -1n, [nftToken]: -1n }, rdmr)
  .attachMintingPolicy(mintValidator.validator)
  .addSigner(await getCredential("issuer.addr"))
  .complete({ change: { address: userAddr } });

const signedTx = await tx
  .signWithPrivateKey(await getCredential("issuer.sk"))
  .sign()
  .complete();

const txHash = await signedTx.submit();
await lucid.awaitTx(txHash);

console.log(
  `Successfully burnt CIP-68 NFT: ${nftToken}(Ref NFT: ${refToken})
at userAddress: ${userAddr},
token: ${mintValidator.policyId},
txHash: ${txHash}`,
);
