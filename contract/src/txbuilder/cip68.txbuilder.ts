import {
  applyParamsToScript,
  PlutusScript,
  serializePlutusScript,
  resolveScriptHash,
  CIP68_222,
  stringToHex,
  mConStr0,
  CIP68_100,
  UTxO,
  AssetMetadata,
  metadataToCip68,
} from "@meshsdk/core";
import { ICip68Contract } from "../interface/icip68.interface";
import { MeshAdapter } from "../adapters/mesh.adapter";
import plutus from "../../plutus.json";
import { title } from "../configs";
import {
  MINT_REFERENCE_SCRIPT_HASH,
  STORE_REFERENCE_SCRIPT_HASH,
  MINT_REFERENCE_SCRIPT_ADDRESS,
  STORE_REFERENCE_SCRIPT_ADDRESS,
  APP_NETWORK,
} from "../constants";

export class Cip68Contract extends MeshAdapter implements ICip68Contract {
  protected mintCompileCode: string = this.readValidator(plutus, title.mint);
  protected storeCompileCode: string = this.readValidator(plutus, title.store);

  protected mintScriptCbor = applyParamsToScript(this.mintCompileCode, []);
  protected storeScriptCbor = applyParamsToScript(this.storeCompileCode, []);

  protected mintScript: PlutusScript = {
    code: this.mintScriptCbor,
    version: "V3",
  };
  protected storeScript: PlutusScript = {
    code: this.storeScriptCbor,
    version: "V3",
  };

  protected policyId = resolveScriptHash(this.mintScriptCbor, "V3");
  protected storeAddress = serializePlutusScript(
    this.storeScript,
    undefined,
    APP_NETWORK,
    false,
  ).address;

  mint = async ({
    assetName,
    metadata,
    quantity,
  }: {
    assetName: string;
    metadata: AssetMetadata;
    quantity: string;
  }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const utxoRef: UTxO = await this.getUtxoForTx(
      MINT_REFERENCE_SCRIPT_ADDRESS,
      MINT_REFERENCE_SCRIPT_HASH,
    );
    const unsignedTx = await this.meshTxBuilder
      .mintPlutusScriptV3()
      .mint(String(quantity), this.policyId, CIP68_222(stringToHex(assetName)))
      .mintTxInReference(utxoRef.input.txHash, utxoRef.input.outputIndex)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(assetName)))
      .mintTxInReference(utxoRef.input.txHash, utxoRef.input.outputIndex)
      .mintRedeemerValue(mConStr0([]))

      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(metadata))
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(
        collateral.input.txHash,
        collateral.input.outputIndex,
        collateral.output.amount,
        collateral.output.address,
      );
    return unsignedTx.complete();
  };

  createReferenceScriptMint = async () => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();

    const unsignedTx = await this.meshTxBuilder
      .txIn(
        collateral.input.txHash,
        collateral.input.outputIndex,
        collateral.output.amount,
        collateral.output.address,
      )
      .txOut(MINT_REFERENCE_SCRIPT_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "5000000",
        },
      ])

      .txOutReferenceScript(this.mintScriptCbor, "V3")
      .txOutInlineDatumValue("")
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(
        collateral.input.txHash,
        collateral.input.outputIndex,
        collateral.output.amount,
        collateral.output.address,
      );

    return unsignedTx.complete();
  };

  createReferenceScriptStore = async () => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();
    const unsignedTx = await this.meshTxBuilder
      .txIn(collateral.input.txHash, collateral.input.outputIndex)
      .txOut(STORE_REFERENCE_SCRIPT_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "7000000",
        },
      ])

      .txOutReferenceScript(this.storeScriptCbor, "V3")
      .txOutInlineDatumValue("")
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(
        collateral.input.txHash,
        collateral.input.outputIndex,
        collateral.output.amount,
        collateral.output.address,
      );

    return unsignedTx.complete();
  };
}
