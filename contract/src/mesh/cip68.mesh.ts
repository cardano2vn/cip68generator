import {
  Transaction,
  PlutusScript,
  serializePlutusScript,
  Mint,
  resolveScriptHash,
  Recipient,
  metadataToCip68,
  Asset,
  CIP68_222,
  stringToHex,
  CIP68_100,
  mConStr1,
  mConStr2,
} from "@meshsdk/core";
import { MeshAdapter } from "../adapters/mesh.adapter";
import cbor from "cbor";
import { readValidator, getUniqueAssetName } from "../utils";
import { title } from "../configs";
import { applyParamsToScript } from "@meshsdk/core-csl";

export class Cip68Contract extends MeshAdapter {
  mint = async ({
    assetName,
    quantity,
    metadata,
  }: {
    assetName: string;
    quantity: string;
    metadata: any;
  }): Promise<string> => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();
    const mintCompileCode: string = readValidator(title.mint);
    const storeCompileCode: string = readValidator(title.store);

    const mintScript: PlutusScript = {
      code: cbor.encode(Buffer.from(mintCompileCode, "hex")).toString("hex"),
      version: "V3",
    };

    const storeScript: PlutusScript = {
      code: cbor.encode(Buffer.from(storeCompileCode, "hex")).toString("hex"),
      version: "V3",
    };

    const storeAddress = serializePlutusScript(
      storeScript,
      undefined,
      0,
      false,
    ).address;

    const uniqueAssetName = await getUniqueAssetName(utxos[0]);

    const asset: Mint = {
      assetName: uniqueAssetName,
      assetQuantity: quantity,
      metadata: metadata,
      recipient: walletAddress,
      cip68ScriptAddress: storeAddress,
    };

    const redeemer = {
      data: {
        alternative: 0,
        fields: [],
      },
      tag: "MINT",
    };

    const transaction = new Transaction({
      initiator: this.wallet,
    });

    transaction.mintAsset(mintScript, asset, redeemer);

    return await transaction.build();
  };

  burn = async ({
    txHash,
    quantity,
    assetName,
  }: {
    txHash: string;
    quantity: string;
    assetName: string;
  }): Promise<string> => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();
    const mintCompileCode: string = readValidator(title.mint);
    const storeCompileCode: string = readValidator(title.store);

    const mintScript: PlutusScript = {
      code: cbor.encode(Buffer.from(mintCompileCode, "hex")).toString("hex"),
      version: "V3",
    };

    const storeScript: PlutusScript = {
      code: cbor.encode(Buffer.from(storeCompileCode, "hex")).toString("hex"),
      version: "V3",
    };

    const storeAddress = serializePlutusScript(
      storeScript,
      undefined,
      0,
      false,
    ).address;

    const mintScriptCbor = applyParamsToScript(mintCompileCode, []);
    const policyId = resolveScriptHash(mintScriptCbor, "V3");

    const userUtxo = await this.getUtxoForTx(walletAddress, txHash);
    const storeUtxo = await this.getUtxoForTx(storeAddress, txHash);
    const unsignedTx = await this.meshTxBuilder

      // .txIn(
      //     storeUtxo?.input.txHash!,
      //     storeUtxo?.input.outputIndex!,
      //     storeUtxo?.output.amount!,
      //     storeUtxo?.output.address!,
      // )
      // .mintPlutusScriptV3()
      // .mint("-1", policyId, CIP68_100(stringToHex(assetName)))
      // .mintingScript(mintScriptCbor)
      // .mintRedeemerValue(mConStr1([]))
      .txIn(
        userUtxo?.input.txHash!,
        userUtxo?.input.outputIndex!,
        userUtxo?.output.amount!,
        userUtxo?.output.address!,
      )
      .mintPlutusScriptV3()
      .mint(quantity, policyId, CIP68_222(stringToHex(assetName)))
      .mintingScript(mintScriptCbor)
      .mintRedeemerValue(mConStr1([]))
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(
        collateral[0].input.txHash,
        collateral[0].input.outputIndex,
        collateral[0].output.amount,
        collateral[0].output.address,
      )
      .complete();

    return unsignedTx;
  };
  update = async ({
    txHash,
    assetName,
    quantity,
    metadata,
  }: {
    txHash: string;
    assetName: string;
    quantity: string;
    metadata: any;
  }): Promise<string> => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();
    const mintCompileCode: string = readValidator(title.mint);
    const storeCompileCode: string = readValidator(title.store);
    const mintScript: PlutusScript = {
      code: cbor.encode(Buffer.from(mintCompileCode, "hex")).toString("hex"),
      version: "V3",
    };
    const storeScript: PlutusScript = {
      code: cbor.encode(Buffer.from(storeCompileCode, "hex")).toString("hex"),
      version: "V3",
    };
    const storeAddress = serializePlutusScript(
      storeScript,
      undefined,
      0,
      false,
    ).address;

    const mintScriptCbor = applyParamsToScript(mintCompileCode, []);
    const policyId = resolveScriptHash(mintScriptCbor, "V3");

    const recipient: Recipient = {
      address: storeAddress,
      datum: {
        value: metadataToCip68(metadata),
        inline: true,
      },
    };
    const userAssets: Asset[] = [
      {
        unit: policyId + CIP68_222(stringToHex(assetName)),
        quantity: quantity,
      },
    ];

    const referenceAssets: Asset[] = [
      { unit: policyId + CIP68_100(stringToHex(assetName)), quantity: "1" },
    ];

    const redeemer = {
      data: { alternative: 0, fields: [] },
    };
    const userUtxo = await this.getUtxoForTx(walletAddress, txHash);
    const storeUtxo = await this.getUtxoForTx(storeAddress, txHash);

    const transaction = new Transaction({ initiator: this.wallet });
    transaction.redeemValue({
      value: storeUtxo!,
      script: storeScript,
      redeemer: redeemer,
    });

    transaction.sendAssets(walletAddress, userAssets);
    transaction.sendAssets(recipient, referenceAssets);

    return await transaction.build();
  };

  remove = async ({
    txHash,
    assetName,
    quantity,
    metadata,
  }: {
    txHash: string;
    assetName: string;
    quantity: string;
    metadata: any;
  }): Promise<string> => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();
    const mintCompileCode: string = readValidator(title.mint);
    const storeCompileCode: string = readValidator(title.store);
    const mintScript: PlutusScript = {
      code: cbor.encode(Buffer.from(mintCompileCode, "hex")).toString("hex"),
      version: "V3",
    };
    const storeScript: PlutusScript = {
      code: cbor.encode(Buffer.from(storeCompileCode, "hex")).toString("hex"),
      version: "V3",
    };
    const storeAddress = serializePlutusScript(
      storeScript,
      undefined,
      0,
      false,
    ).address;

    const mintScriptCbor = applyParamsToScript(mintCompileCode, []);
    const policyId = resolveScriptHash(mintScriptCbor, "V3");

    const recipient: Recipient = {
      address: storeAddress,
      datum: {
        value: metadataToCip68(metadata),
        inline: true,
      },
    };

    const userAssets: Asset[] = [
      {
        unit: policyId + CIP68_222(stringToHex(assetName)),
        quantity: quantity,
      },
    ];

    const referenceAssets: Asset[] = [
      { unit: policyId + CIP68_100(stringToHex(assetName)), quantity: "1" },
    ];

    const redeemer = {
      data: { alternative: 0, fields: [] },
    };
    const userUtxo = await this.getUtxoForTx(walletAddress, txHash);
    const storeUtxo = await this.getUtxoForTx(storeAddress, txHash);

    const transaction = new Transaction({ initiator: this.wallet });
    transaction.redeemValue({
      value: storeUtxo!,
      script: storeScript,
      redeemer: redeemer,
    });

    transaction.sendAssets(walletAddress, userAssets);
    transaction.sendAssets(recipient, referenceAssets);

    return await transaction.build();
  };
}
