import { Constr, Data, fromHex, toHex, toUnit, UTxO } from "lucid";
import {
  createLucidInstance,
  getCredential,
  getUtxoWithAssets,
} from "./utils/lucid/utils.ts";
import { crypto } from "crypto";
import {
  APPLIED_VALIDATOR_PATH,
  NON_FUNGIBLE_TOKEN_LABEL,
  REFERENCE_TOKEN_LABEL,
} from "./common/constants.ts";
import { AppliedValidator } from "./common/types.ts";

const lucid = await createLucidInstance();

lucid.selectWalletFromPrivateKey(await getCredential("issuer.sk"));

const issuerAddr = await getCredential("issuer.addr");
const userAddr = await getCredential("user.addr");
const userUtxos = await lucid.utxosAt(userAddr);

if (!userUtxos || !userUtxos.length) {
  console.error("No UTxO found at user address: " + userAddr);
}

// TODO Idx of utxo < 256

// Selecting a utxo containing atleast 5 ADA to cover tx fees and min ADA
// Note: To avoid tx balancing errors, the utxo should only contain lovelaces
const selectedUtxo = getUtxoWithAssets(userUtxos, { ["lovelace"]: 5000000n });

// Calculating asset name from the utxo which will be spent in the minting tx
const assetNameSuffix = await getUniqueAssetNameSuffix(selectedUtxo);

const mintValidator: AppliedValidator = JSON.parse(
  await Deno.readTextFile(APPLIED_VALIDATOR_PATH + "mint.mint.json"),
);

const storeValidator: AppliedValidator = JSON.parse(
  await Deno.readTextFile(
    APPLIED_VALIDATOR_PATH + "reference_store.store.json",
  ),
);

const refNFT = toUnit(
  mintValidator.policyId,
  assetNameSuffix,
  REFERENCE_TOKEN_LABEL,
);

const userNFT = toUnit(
  mintValidator.policyId,
  assetNameSuffix,
  NON_FUNGIBLE_TOKEN_LABEL,
);

const mintRdmr = Data.to(new Constr(0, []));

// Metadata to be stored in the datum of UTxO containing Ref NFT
const metadata = Data.fromJson(
  JSON.parse(await Deno.readTextFile("./nft-metadata.json")),
);
const version = 1n;
const extra = Data.void();

const metadatum = Data.to(new Constr(0, [metadata, version, extra]));

/*
The below steps facilitate building the tx server side. Partially sign it
with distributor key and then send it (tx + partialSignedTx) accross to
client for assembling the tx with distributor witness and sign + submit.
*/
const tx = await lucid
  .newTx()
  .collectFrom([selectedUtxo])
  .mintAssets({ [userNFT]: 1n, [refNFT]: 1n }, mintRdmr)
  .attachMintingPolicy(mintValidator.validator)
  .payToAddress(userAddr, { [userNFT]: 1n })
  .payToContract(storeValidator.lockAddress, { inline: metadatum }, {
    [refNFT]: 1n,
  })
  .addSigner(issuerAddr)
  .addSigner(userAddr)
  .validFrom(Date.now() - 60 * 1000) // Substracting 1 minute to offset diff (blockfrost server time - local system time)
  .validTo(Date.now() + 15 * 60 * 1000)
  .complete({
    change: { address: userAddr },
    coinSelection: false, // Setting to false to avoid using distributor funds
  });

const partialSignedTx = await tx.partialSign();

lucid.selectWalletFromPrivateKey(await getCredential("user.sk"));

const signedTx = await lucid
  .fromTx(tx.toString())
  .assemble([partialSignedTx])
  .sign()
  .complete();

const txHash = await signedTx.submit();
await lucid.awaitTx(txHash);

console.log(
  `Successfully minted CIP-68 NFT: ${userNFT},
Ref NFT: ${refNFT},
storeAddress: ${storeValidator.lockAddress},
to userAddress: ${userAddr},
token: ${mintValidator.policyId},
txHash: ${txHash}`,
);

// Returns a unique asset name suffix using a utxo's txid and idx
// The asset label (as per CIP68) can then prefixed to the name for a unique asset name
async function getUniqueAssetNameSuffix(utxo: UTxO): Promise<string> {
  const hash = new Uint8Array(
    await crypto.subtle.digest(
      "SHA3-256",
      fromHex(utxo.txHash),
    ),
  );

  // Create unique asset name suffix of 28 bytes. The remaining 4 bytes come
  // from the asset label as a prefix.
  return toHex(new Uint8Array([utxo.outputIndex])) +
    toHex(hash.slice(0, 27));
}
