import {
  applyParamsToScript,
  PlutusScript,
  serializePlutusScript,
  resolveScriptHash,
  CIP68_222,
  stringToHex,
  mConStr0,
  CIP68_100,
  AssetMetadata,
  metadataToCip68,
  mConStr1,
  deserializeAddress,
  UTxO,
} from "@meshsdk/core";

import { MeshAdapter } from "../adapters/mesh.adapter";
import plutus from "../../plutus.json";
import {
  EXCHANGE_FEE_ADDRESS,
  MINT_REFERENCE_SCRIPT_HASH,
  STORE_REFERENCE_SCRIPT_HASH,
  MINT_REFERENCE_SCRIPT_ADDRESS,
  STORE_REFERENCE_SCRIPT_ADDRESS,
  title,
} from "../constants";
import { Plutus } from "../types";
import { appNetwork, appNetworkId } from "@/constants";
import { ICip68Contract } from "../interfaces/icip68.interface";

export class Cip68Contract extends MeshAdapter implements ICip68Contract {
  protected pubKeyExchange: string =
    deserializeAddress(EXCHANGE_FEE_ADDRESS).pubKeyHash;
  protected mintCompileCode: string = this.readValidator(
    plutus as Plutus,
    title.mint,
  );
  protected storeCompileCode: string = this.readValidator(
    plutus as Plutus,
    title.store,
  );

  protected storeScriptCbor = applyParamsToScript(this.storeCompileCode, [
    this.pubKeyExchange,
    BigInt(1),
  ]);

  protected storeScript: PlutusScript = {
    code: this.storeScriptCbor,
    version: "V3",
  };

  protected storeAddress = serializePlutusScript(
    this.storeScript,
    undefined,
    appNetworkId,
    false,
  ).address;

  protected storeScriptHash = deserializeAddress(this.storeAddress).scriptHash;
  protected mintScriptCbor = applyParamsToScript(this.mintCompileCode, [
    this.pubKeyExchange,
    BigInt(1),
    this.storeScriptHash,
  ]);
  protected mintScript: PlutusScript = {
    code: this.mintScriptCbor,
    version: "V3",
  };
  protected policyId = resolveScriptHash(this.mintScriptCbor, "V3");

  /**
   * @method Mint
   * @description Mint Asset (NFT/Token) with CIP68
   * @param assetName - string
   * @param metadata - AssetMetadata
   * @param quantity - string
   * 
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

      .txOut(walletAddress, [
        {
          unit: this.policyId + CIP68_222(stringToHex(assetName)),
          quantity: quantity,
        },
      ])

      .txOut(EXCHANGE_FEE_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(
        collateral.input.txHash,
        collateral.input.outputIndex,
        collateral.output.amount,
        collateral.output.address,
      )
      .setNetwork(appNetwork);
    return unsignedTx.complete();
  };

  burn = async ({
    assetName,
    quantity,
    txHash,
    metadata,
  }: {
    assetName: string;
    quantity: string;
    metadata: AssetMetadata;
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

    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr1([]))
      .mintTxInReference(mintUtxoRef.input.txHash, mintUtxoRef.input.outputIndex)
      // .mintingScript(this.mintScriptCbor)

      .mintPlutusScriptV3()
      .mint(quantity, this.policyId, CIP68_100(stringToHex(assetName)))
      .mintTxInReference(mintUtxoRef.input.txHash, mintUtxoRef.input.outputIndex)
      .mintRedeemerValue(mConStr1([]))

      .spendingPlutusScriptV3()
      .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .spendingTxInReference(storeUtxoRef.input.txHash, storeUtxoRef.input.outputIndex)

      .txOut(EXCHANGE_FEE_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])

      

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(
        collateral.input.txHash,
        collateral.input.outputIndex,
        collateral.output.amount,
        collateral.output.address,
      )
      .setNetwork(appNetwork);

    return unsignedTx.complete();
  };

  /**
   * @method Update
   * @description Update Asset (NFT/Token) with CIP68
   * @param assetName - string
   * @param metadata - AssetMetadata
   * @param txHash - string 
   * @returns 
   */
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
    console.log(this.storeAddress)
    
    const storeUtxo = await this.getUtxoForTx(this.storeAddress, txHash);
    if (!storeUtxo) throw new Error("Store UTXO not found");
    const unsignedTx = this.meshTxBuilder
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

      .txOut(EXCHANGE_FEE_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(
        collateral.input.txHash,
        collateral.input.outputIndex,
        collateral.output.amount,
        collateral.output.address,
      )
      .setNetwork(appNetwork);

    return unsignedTx.complete();
  };

  /**
   * @method CreateReferenceScriptMint
   * @description Create reference script for mint transaction
   * 
   * @returns unsigned transaction
   */
  createReferenceScriptMint = async () => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();

    const unsignedTx = this.meshTxBuilder
      .txIn(
        collateral.input.txHash,
        collateral.input.outputIndex,
      )
      .txOut(MINT_REFERENCE_SCRIPT_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "12000000",
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

  /**
   * @method CreateReferenceScriptStore
   * @description Create reference script for store transaction
   * @returns unsigned transaction
   */
  createReferenceScriptStore = async () => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();
    const unsignedTx = await this.meshTxBuilder
      .txIn(collateral.input.txHash, collateral.input.outputIndex)
      .txOut(STORE_REFERENCE_SCRIPT_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "12000000",
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
export const nftPoicyId = (() => {
  const validator = plutus.validators.find(function (validator) {
    return validator.title === title.mint;
  });

  if (!validator) {
    throw new Error(`${title} validator not found.`);
  }

  return resolveScriptHash(
    applyParamsToScript(validator.compiledCode, []),
    "V3",
  );
})();
