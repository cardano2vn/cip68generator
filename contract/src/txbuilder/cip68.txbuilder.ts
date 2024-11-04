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
  mConStr1,
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

  /**
   *
   * @param param0
   * @returns unsignedTx
   */
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
    const unsignedTx = this.meshTxBuilder
      .mintPlutusScriptV3()
      .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
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

  burn = async ({
    assetName,
    quantity,
    txHash,
  }: {
    assetName: string;
    quantity: string;
    txHash: string;
  }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();

    const mintUtxoRef: UTxO = await this.getUtxoForTx(
      MINT_REFERENCE_SCRIPT_ADDRESS,
      MINT_REFERENCE_SCRIPT_HASH,
    );
    const storeUtxoRef: UTxO = await this.getUtxoForTx(
      STORE_REFERENCE_SCRIPT_ADDRESS,
      STORE_REFERENCE_SCRIPT_HASH,
    );

    const storeUtxo = await this.getUtxoForTx(this.storeAddress, txHash);
    const userUtxo = await this.getUtxoForTx(walletAddress, txHash);

    const unsignedTx = this.meshTxBuilder
      // .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)

      .mintPlutusScriptV3()
      .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
      .mintTxInReference(
        mintUtxoRef.input.txHash,
        mintUtxoRef.input.outputIndex,
      )
      .mintRedeemerValue(mConStr1([]))

      .spendingPlutusScriptV3()
      .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .spendingTxInReference(
        storeUtxoRef.input.txHash,
        storeUtxoRef.input.outputIndex,
      )

      .txOut(walletAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue("")

      .mintPlutusScriptV3()
      .mint(quantity, this.policyId, CIP68_100(stringToHex(assetName)))
      .mintTxInReference(
        mintUtxoRef.input.txHash,
        mintUtxoRef.input.outputIndex,
      )
      .mintRedeemerValue(mConStr1([]))

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

  update = async ({
    assetName,
    metadata,
    txHash,
  }: {
    assetName: string;
    metadata: AssetMetadata;
    txHash: string;
  }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const utxoRef: UTxO = await this.getUtxoForTx(
      STORE_REFERENCE_SCRIPT_ADDRESS,
      STORE_REFERENCE_SCRIPT_HASH,
    );
    const userUtxo = await this.getUtxoForTx(walletAddress, txHash);
    const storeUtxo = await this.getUtxoForTx(this.storeAddress, txHash);
    if (!userUtxo) throw new Error("User UTXO not found");
    if (!storeUtxo) throw new Error("Store UTXO not found");
    const unsignedTx = this.meshTxBuilder
      .txIn(userUtxo.input.txHash, userUtxo.input.outputIndex)
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_222(stringToHex(assetName)),
          quantity: "1",
        },
      ])

      .spendingPlutusScriptV3()
      .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr0([]))
      .spendingTxInReference(utxoRef.input.txHash, utxoRef.input.outputIndex)

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

  /**
   * @description Create reference script for mint transaction
   */
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
