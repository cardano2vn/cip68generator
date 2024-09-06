import { Constr, Data } from "lucid";
import { createLucidInstance, getCredential } from "./utils/lucid/utils.ts";
import { APPLIED_VALIDATOR_PATH } from "./common/constants.ts";
import { AppliedValidator, MetaDatum } from "./common/types.ts";

const lucid = await createLucidInstance();

const storeValidator: AppliedValidator = JSON.parse(
  await Deno.readTextFile(
    APPLIED_VALIDATOR_PATH + "reference_store.store.json",
  ),
);
const scriptUtxos = await lucid.utxosAt(storeValidator.lockAddress);

lucid.selectWalletFromPrivateKey(await getCredential("issuer.sk"));

const userAddr = await getCredential("user.addr");
const rdmr = Data.to(new Constr(1, []));
// const utxo = scriptUtxos[0];

const tx = lucid
  .newTx()
  .collectFrom(scriptUtxos, rdmr);

scriptUtxos.forEach((utxo) => {
  if (utxo.datum) {
    // Deserialze to MetaDatum to confirm datum type. UTxOs with malformed or
    // different datum types cannot be removed.
    try {
      const _datum = Data.from<MetaDatum>(utxo.datum, MetaDatum);
      tx.payToAddressWithData(userAddr, { inline: utxo.datum }, utxo.assets);
    } catch (e) {
      console.log(
        "Cannot cast the datum of utxo to object of type MetaDatum. " +
          e.message,
      );
      console.log(utxo);
    }
  } else console.log("UTxO without inline datum found: " + utxo);
});

const completedTx = await tx.addSigner(await lucid.wallet.address())
  .attachSpendingValidator(storeValidator.validator)
  .complete();

const signedTx = await completedTx.sign().complete();
const txHash = await signedTx.submit();
await lucid.awaitTx(txHash);

console.log(
  `Successfully removed all assets from
storeAddress: ${storeValidator.lockAddress},
to userAddress: ${userAddr},
txHash: ${txHash}`,
);
