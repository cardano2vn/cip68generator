import { Blockfrost, fromText, Lucid } from "lucid";
import { BLOCKFROST_URL, NETWORK } from "../../common/constants.ts";
import { getCredential } from "../lucid/utils.ts";

const lucid = await Lucid.new(
  new Blockfrost(BLOCKFROST_URL, Deno.env.get("BLOCKFROST_API_KEY")),
  NETWORK,
);

lucid.selectWalletFromPrivateKey(await getCredential("provider.sk"));

const { paymentCredential } = lucid.utils.getAddressDetails(
  await lucid.wallet.address(),
);

const mintingPolicy = lucid.utils.nativeScriptFromJson({
  type: "all",
  scripts: [
    { type: "sig", keyHash: paymentCredential?.hash },
    { type: "before", slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000) },
  ],
});

const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
const tokenName = "BTC";
const amount = 1000000;

const tx = await lucid
  .newTx()
  .mintAssets({ [policyId + fromText(tokenName)]: BigInt(amount) })
  .validTo(Date.now() + 200000)
  .attachMintingPolicy(mintingPolicy)
  .complete();

const signedTx = await tx.sign().complete();

const txHash = await signedTx.submit();

await lucid.awaitTx(txHash);

console.log(`Successfully minted ${amount} tokens with
policyId: ${policyId},
tokenName: ${tokenName},
txHash: ${txHash}`);
