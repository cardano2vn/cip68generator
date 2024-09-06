import { createLucidInstance, getCredential } from "../lucid/utils.ts";

const lucid = await createLucidInstance();

lucid.selectWalletFromPrivateKey(await getCredential("user.sk"));

const asset = {
  lovelace: 10000000n,
  // "unit": 1n
};

const receiver = await getCredential("issuer.addr");
// const receiver =
//   "addr_test1qrmdrjfxyzzda9rcq459lljmmke0jffnttpvu2za5zpr7p4za8cfdkfad86l0yyn0vdmrqu66dt6zafasg85laeqe6uqd248et";

const tx = await lucid
  .newTx()
  .payToAddress(receiver, asset)
  .complete();

const signedTx = await tx.sign().complete();

const txHash = await signedTx.submit();

await lucid.awaitTx(txHash);

console.log(`Successfully sent 5 ADA
to address: ${receiver}
txHash: ${txHash}`);
