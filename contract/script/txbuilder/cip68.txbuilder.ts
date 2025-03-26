import { CIP68_222, stringToHex, mConStr0, UTxO, mConStr2, CIP68_100, metadataToCip68, mConStr1, deserializeAddress } from "@meshsdk/core";

import { MeshAdapter } from "../adapters/mesh.adapter";
import { APP_WALLET_ADDRESS, EXCHANGE_FEE_PRICE } from "../constants";
import { appNetwork } from "@/constants";
import { ICip68Contract } from "../interfaces/icip68.interface";
import { isEmpty, isNil, isNull } from "lodash";
import { getPkHash } from "@/utils";

export class Cip68Contract extends MeshAdapter implements ICip68Contract {
  /**
   * @method Mint
   * @description Mint Asset (NFT/Token) with CIP68
   * @param assetName - string
   * @param metadata - Record<string, string>
   * @param quantity - string
   *
   * @returns unsignedTx
   */
  mint = async (
    params: {
      assetName: string;
      metadata: Record<string, string>;
      quantity: string;
      receiver: string;
    }[],
    utxo?: UTxO,
  ) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder.mintPlutusScriptV3();
    if (!isNil(utxo) || isNull(utxo)) {
      unsignedTx.txIn(utxo.input.txHash, utxo.input.outputIndex);
    }
    const txOutReceiverMap = new Map<string, { unit: string; quantity: string }[]>();

    const assetsWithUtxo = await Promise.all(
      params.map(async ({ assetName }) => {
        const utxo = await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        return { assetName, hasPlutusData: !!utxo?.output?.plutusData, utxo };
      }),
    );

    const allExist = assetsWithUtxo.every((asset) => asset.hasPlutusData);
    const allNew = assetsWithUtxo.every((asset) => !asset.hasPlutusData);

    if (!allExist && !allNew) {
      const existAssets = assetsWithUtxo.filter((asset) => asset.hasPlutusData).map((asset) => asset.assetName);
      throw new Error(`Transaction only supports either minting new or existing assets.\nAssets already exist: ${existAssets.join(", ")}`);
    }

    await Promise.all(
      params.map(async ({ assetName, metadata, quantity = "1", receiver = "" }) => {
        const existUtXOwithUnit = await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        //////////////
        if (allExist) {
          const pk = await getPkHash(existUtXOwithUnit?.output?.plutusData as string);
          if (pk !== deserializeAddress(walletAddress).pubKeyHash) {
            throw new Error(`${assetName} has been exist`);
          }
          const receiverKey = !isEmpty(receiver) ? receiver : walletAddress;
          if (txOutReceiverMap.has(receiverKey)) {
            txOutReceiverMap.get(receiverKey)!.push({
              unit: this.policyId + CIP68_222(stringToHex(assetName)),
              quantity: quantity,
            });
          } else {
            txOutReceiverMap.set(receiverKey, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: quantity,
              },
            ]);
          }
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintingScript(this.mintScriptCbor)
            .mintRedeemerValue(mConStr0([]));
          //////////////
        } else if (allNew) {
          const receiverKey = !isEmpty(receiver) ? receiver : walletAddress;
          if (txOutReceiverMap.has(receiverKey)) {
            txOutReceiverMap.get(receiverKey)!.push({
              unit: this.policyId + CIP68_222(stringToHex(assetName)),
              quantity: quantity,
            });
          } else {
            txOutReceiverMap.set(receiverKey, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: quantity,
              },
            ]);
          }

          unsignedTx

            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintingScript(this.mintScriptCbor)
            .mintRedeemerValue(mConStr0([]))

            .mintPlutusScriptV3()
            .mint("1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintingScript(this.mintScriptCbor)
            .mintRedeemerValue(mConStr0([]))
            .txOut(this.storeAddress, [
              {
                unit: this.policyId + CIP68_100(stringToHex(assetName)),
                quantity: "1",
              },
            ])
            .txOutInlineDatumValue(metadataToCip68(metadata));
        } else {
          throw new Error(`Transaction only supports either minting new assets or minting existing assets, not both in the same transaction`);
        }
        //////////////
      }),
    );
    txOutReceiverMap.forEach((assets, receiver) => {
      unsignedTx.txOut(receiver, assets);
    });

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    // .addUtxosFromSelection();
    return await unsignedTx.complete();
  };

  /**
   * @method Burn
   * @description Burn Asset (NFT/Token) with CIP68
   * @param assetName - string
   * @param quantity - string
   *
   * @returns unsignedTx
   */
  burn = async (params: { assetName: string; quantity: string; txHash?: string }[],  utxo?: UTxO,) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    if (!isNil(utxo) || isNull(utxo)) {
      unsignedTx.txIn(utxo.input.txHash, utxo.input.outputIndex);
    }
    await Promise.all(
      params.map(async ({ assetName, quantity, txHash }) => {
        const userUtxos = await this.getAddressUTXOAssets(walletAddress, this.policyId + CIP68_222(stringToHex(assetName)));
        const amount = userUtxos.reduce((amount, utxos) => {
          return (
            amount +
            utxos.output.amount.reduce((amt, utxo) => {
              if (utxo.unit === this.policyId + CIP68_222(stringToHex(assetName))) {
                return amt + Number(utxo.quantity);
              }
              return amt;
            }, 0)
          );
        }, 0);
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");

        if (-Number(quantity) === amount) {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .mintPlutusScriptV3()
            .mint("-1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .spendingPlutusScriptV3()
            .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr1([]))
            .txInScript(this.storeScriptCbor);
        } else {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .txOut(walletAddress, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: String(amount + Number(quantity)),
              },
            ]);
        }
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method Update
   * @description Update Asset (NFT/Token) with CIP68
   * @param assetName - string
   * @param metadata - Record<string, string>
   * @param txHash - string
   * @returns
   */
  update = async (params: { assetName: string; metadata: Record<string, string>; txHash?: string }[], utxo?: UTxO) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    if (!isNil(utxo) || isNull(utxo)) {
      unsignedTx.txIn(utxo.input.txHash, utxo.input.outputIndex);
    }
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent() // Lấy datum ở utxo chi tiêu
          // .spendingReferenceTxInInlineDatumPresent() // lấy datum ở utxo reference
          .txInRedeemerValue(mConStr0([]))
          .txInScript(this.storeScriptCbor)
          .txOut(this.storeAddress, [
            {
              unit: this.policyId + CIP68_100(stringToHex(assetName)),
              quantity: "1",
            },
          ])
          .txOutInlineDatumValue(metadataToCip68(metadata));
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method CreateReferenceScriptMint
   * @description Create reference script for mint transaction
   *
   * @returns unsigned transaction
   */
  createReferenceScriptMint = async (MINT_REFERENCE_SCRIPT_ADDRESS: string) => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();

    const unsignedTx = this.meshTxBuilder
      .txIn(collateral.input.txHash, collateral.input.outputIndex)
      .txOut(MINT_REFERENCE_SCRIPT_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "20000000",
        },
      ])

      .txOutReferenceScript(this.mintScriptCbor, "V3")
      .txOutDatumHashValue("")
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address);

    return await unsignedTx.complete();
  };

  /**
   * @method CreateReferenceScriptStore
   * @description Create reference script for store transaction
   * @returns unsigned transaction
   */
  createReferenceScriptStore = async (STORE_REFERENCE_SCRIPT_ADDRESS: string) => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder
      .txIn(collateral.input.txHash, collateral.input.outputIndex)
      .txOut(STORE_REFERENCE_SCRIPT_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "20000000",
        },
      ])

      .txOutReferenceScript(this.storeScriptCbor, "V3")
      .txOutDatumHashValue("")
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address);

    return await unsignedTx.complete();
  };

  /**
   * @method TC1
   * @description [TC1]: Cast assets with the desired quantity and metadata with all required fields.
   *
   */
  tc1 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; receiver: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC2
   * @description [TC2]: Casting assets but default fields in metadata (name, image, media_type, author) do not exist.
   *
   */
  tc2 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC3
   * @description [SC3]: Casting assets with defined metadata but the keys (name, image, media_type) exist but the values of the fields are partially or completely missing.
   *
   */
  tc3 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "2",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC4
   * @description [TC4]: Casting property with fully defined metadata for both kay and value but author address is empty or wrong.
   *
   */
  tc4 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC5
   * @description [TC5]: Mint assets with transaction fees less than the specified amount included in the validator parameters.
   *
   */
  tc5 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "900000",
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC6
   * @description [TC6]: Mint asset with correct transaction fee as params. however wrong exchange address defined in params.
   *
   */
  tc6 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut("addr_test1qzwu6jcqk8f96fxq02pvq2h4a927ggn35f2gzdklfte4kwx0sd5zdvsat2chsyyjxkjxcg6uz2y46avd46mzqdgdy3dsckqxs4", [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC7
   * @description [TC7]: Token creator sent wrong store address given in params.
   *
   */
  tc7 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut("addr_test1qzwu6jcqk8f96fxq02pvq2h4a927ggn35f2gzdklfte4kwx0sd5zdvsat2chsyyjxkjxcg6uz2y46avd46mzqdgdy3dsckqxs4", [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC8
   * @description [TC8]: Token creator sent wrong store address given in params.
   *
   */
  tc8 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_222(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC9
   * @description [TC9]: The output of UTxOs is missing the part sent to the smart contract store address or sent to the exchange fee is missing.
   *
   */
  tc9 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC10
   * @description [SC10]: Asset update successful. Exchange fee transferred to exchange address. Asset updated successful.
   *
   */
  tc10 = async (params: { assetName: string; metadata: Record<string, string>; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent()
          .txInRedeemerValue(mConStr0([]))
          .txInScript(this.storeScriptCbor)
          .txOut(this.storeAddress, [
            {
              unit: this.policyId + CIP68_100(stringToHex(assetName)),
              quantity: "1",
            },
          ])
          .txOutInlineDatumValue(metadataToCip68(metadata));
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC11
   * @description [TC11]: In metadata change author field or no author field
   */
  tc11 = async (params: { assetName: string; metadata: Record<string, string>; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent()
          .txInRedeemerValue(mConStr0([]))
          .txInScript(this.storeScriptCbor)
          .txOut(this.storeAddress, [
            {
              unit: this.policyId + CIP68_100(stringToHex(assetName)),
              quantity: "1",
            },
          ])
          .txOutInlineDatumValue(metadataToCip68(metadata));
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC12
   * @description [TC12]: Author did not send signature to confirm transaction.
   */
  tc12 = async (params: { assetName: string; metadata: Record<string, string>; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent()
          .txInRedeemerValue(mConStr0([]))
          .txInScript(this.storeScriptCbor)
          .txOut(this.storeAddress, [
            {
              unit: this.policyId + CIP68_100(stringToHex(assetName)),
              quantity: "1",
            },
          ])
          .txOutInlineDatumValue(metadataToCip68(metadata));
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC13
   * @description [TC13]: The user entered an incorrect asset name or did not enter an asset name.
   */
  tc13 = async (params: { assetName: string; metadata: Record<string, string>; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent()
          .txInRedeemerValue(mConStr0([]))
          .txInScript(this.storeScriptCbor)
          .txOut(this.storeAddress, [
            {
              unit: this.policyId + CIP68_100(stringToHex(assetName)),
              quantity: "1",
            },
          ])
          .txOutInlineDatumValue(metadataToCip68(metadata));
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC14
   * @description [TC13]: The user entered an incorrect asset name or did not enter an asset name.
   */
  tc14 = async (params: { assetName: string; metadata: Record<string, string>; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent()
          .txInRedeemerValue(mConStr0([]))
          .txInScript(this.storeScriptCbor)
          .txOut(this.storeAddress, [
            {
              unit: this.policyId + CIP68_100(stringToHex(assetName)),
              quantity: "1",
            },
          ])
          .txOutInlineDatumValue(metadataToCip68(metadata));
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "900000",
        },
      ])
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC15
   * @description [TC15]: The user entered an incorrect asset name or did not enter an asset name.
   */
  tc15 = async (params: { assetName: string; metadata: Record<string, string>; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent()
          .txInRedeemerValue(mConStr0([]))
          .txInScript(this.storeScriptCbor)
          .txOut(this.storeAddress, [
            {
              unit: this.policyId + CIP68_100(stringToHex(assetName)),
              quantity: "1",
            },
          ])
          .txOutInlineDatumValue(metadataToCip68(metadata));
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC16
   * @description [TC16]: The output of UTxOs is missing the part sent to the smart contract store address or sent to the exchange fee is missing.
   */
  tc16 = async (params: { assetName: string; metadata: Record<string, string>; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent()
          .txInRedeemerValue(mConStr0([]))
          .txInScript(this.storeScriptCbor)
          .txOut(APP_WALLET_ADDRESS, [
            {
              unit: this.policyId + CIP68_100(stringToHex(assetName)),
              quantity: "1",
            },
          ])
          .txOutInlineDatumValue(metadataToCip68(metadata));
      }),
    );

    unsignedTx
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC17
   * @description [TC17]: The transaction input does not contain a UTxO containing a Reference Asset.
   */
  tc17 = async (params: { assetName: string; metadata: Record<string, string>; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent()
          .txInRedeemerValue(mConStr0([]))
          .txInScript(this.storeScriptCbor)
          .txOutInlineDatumValue(metadataToCip68(metadata));
      }),
    );

    unsignedTx
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC18
   * @description [TC18]: The transaction input does not contain a UTxO containing a Reference Asset.
   */
  tc18 = async (params: { assetName: string; metadata: Record<string, string>; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent()
          .txInRedeemerValue(mConStr1([]))
          .txInScript(this.storeScriptCbor)
          .txOutInlineDatumValue(metadataToCip68(metadata))
          .txOut(this.storeAddress, [
            {
              unit: this.policyId + CIP68_100(stringToHex(assetName)),
              quantity: "1",
            },
          ])
          .txOutInlineDatumValue(metadataToCip68(metadata));
      }),
    );

    unsignedTx
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC19
   * @description [TC19]: When Burn User Asset and Reference Asset and send ada for platform fee successfully.
   */
  tc19 = async (params: { assetName: string; quantity: string; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, quantity, txHash }) => {
        const userUtxos = await this.getAddressUTXOAssets(walletAddress, this.policyId + CIP68_222(stringToHex(assetName)));
        const amount = userUtxos.reduce((amount, utxos) => {
          return (
            amount +
            utxos.output.amount.reduce((amt, utxo) => {
              if (utxo.unit === this.policyId + CIP68_222(stringToHex(assetName))) {
                return amt + Number(utxo.quantity);
              }
              return amt;
            }, 0)
          );
        }, 0);
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");

        if (-Number(quantity) === amount) {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .mintPlutusScriptV3()
            .mint("-1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .spendingPlutusScriptV3()
            .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr1([]))
            .txInScript(this.storeScriptCbor);
        } else {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .txOut(walletAddress, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: String(amount + Number(quantity)),
              },
            ]);
        }
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC20
   * @description [TC21]: When Burn User Asset and Reference Asset and send ada for platform fee successfully.
   */
  tc20 = async (params: { assetName: string; quantity: string; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, quantity, txHash }) => {
        const userUtxos = await this.getAddressUTXOAssets(walletAddress, this.policyId + CIP68_222(stringToHex(assetName)));
        const amount = userUtxos.reduce((amount, utxos) => {
          return (
            amount +
            utxos.output.amount.reduce((amt, utxo) => {
              if (utxo.unit === this.policyId + CIP68_222(stringToHex(assetName))) {
                return amt + Number(utxo.quantity);
              }
              return amt;
            }, 0)
          );
        }, 0);
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");

        if (-Number(quantity) === amount) {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .mintPlutusScriptV3()
            .mint("-1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .spendingPlutusScriptV3()
            .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr1([]))
            .txInScript(this.storeScriptCbor);
        } else {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .txOut(walletAddress, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: String(amount + Number(quantity)),
              },
            ]);
        }
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC21
   * @description [TC21]: When Burn User Asset and Reference Asset and send ada for platform fee successfully.
   */
  tc21 = async (params: { assetName: string; quantity: string; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, quantity, txHash }) => {
        const userUtxos = await this.getAddressUTXOAssets(walletAddress, this.policyId + CIP68_222(stringToHex(assetName)));
        const amount = userUtxos.reduce((amount, utxos) => {
          return (
            amount +
            utxos.output.amount.reduce((amt, utxo) => {
              if (utxo.unit === this.policyId + CIP68_222(stringToHex(assetName))) {
                return amt + Number(utxo.quantity);
              }
              return amt;
            }, 0)
          );
        }, 0);
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");

        if (-Number(quantity) === amount) {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .mintPlutusScriptV3()
            .mint("-1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .spendingPlutusScriptV3()
            .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr1([]))
            .txInScript(this.storeScriptCbor);
        } else {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .txOut(walletAddress, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: String(amount + Number(quantity)),
              },
            ]);
        }
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "900000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC22
   * @description [TC22]: Burn assets but the address sent in the platform is different from the address of the exchange fee defined in params.
   */
  tc22 = async (params: { assetName: string; quantity: string; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, quantity, txHash }) => {
        const userUtxos = await this.getAddressUTXOAssets(walletAddress, this.policyId + CIP68_222(stringToHex(assetName)));
        const amount = userUtxos.reduce((amount, utxos) => {
          return (
            amount +
            utxos.output.amount.reduce((amt, utxo) => {
              if (utxo.unit === this.policyId + CIP68_222(stringToHex(assetName))) {
                return amt + Number(utxo.quantity);
              }
              return amt;
            }, 0)
          );
        }, 0);
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");

        if (-Number(quantity) === amount) {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .mintPlutusScriptV3()
            .mint("-1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .spendingPlutusScriptV3()
            .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr1([]))
            .txInScript(this.storeScriptCbor);
        } else {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .txOut(walletAddress, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: String(amount + Number(quantity)),
              },
            ]);
        }
      }),
    );

    unsignedTx
      .txOut(this.storeAddress, [
        {
          unit: "lovelace",
          quantity: "900000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC23
   * @description [TC23]: When burning ada transaction the attached reference asset is sent to a different address or not sent to the user.
   */
  tc23 = async (params: { assetName: string; quantity: string; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, quantity, txHash }) => {
        const userUtxos = await this.getAddressUTXOAssets(walletAddress, this.policyId + CIP68_222(stringToHex(assetName)));
        const amount = userUtxos.reduce((amount, utxos) => {
          return (
            amount +
            utxos.output.amount.reduce((amt, utxo) => {
              if (utxo.unit === this.policyId + CIP68_222(stringToHex(assetName))) {
                return amt + Number(utxo.quantity);
              }
              return amt;
            }, 0)
          );
        }, 0);
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");

        if (-Number(quantity) === amount) {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .mintPlutusScriptV3()
            .mint("-1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .spendingPlutusScriptV3()
            .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr1([]))
            .txInScript(this.storeScriptCbor);
        } else {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .txOut(walletAddress, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: String(amount + Number(quantity)),
              },
            ]);
        }
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC24
   * @description [TC24]: By default request is 2 outputs. Make a new output sent to another address.
   *
   * @param params { assetName; quantity; txHash? }
   * @param test: { assetName; metadata; quantity; txHash? }
   *
   * @returns unsignedTx
   */
  tc24 = async (params: { assetName: string; quantity: string; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, quantity, txHash }) => {
        const userUtxos = await this.getAddressUTXOAssets(walletAddress, this.policyId + CIP68_222(stringToHex(assetName)));
        const amount = userUtxos.reduce((amount, utxos) => {
          return (
            amount +
            utxos.output.amount.reduce((amt, utxo) => {
              if (utxo.unit === this.policyId + CIP68_222(stringToHex(assetName))) {
                return amt + Number(utxo.quantity);
              }
              return amt;
            }, 0)
          );
        }, 0);
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");

        if (-Number(quantity) === amount) {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .mintPlutusScriptV3()
            .mint("-1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .spendingPlutusScriptV3()
            .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr1([]))
            .txInScript(this.storeScriptCbor);
        } else {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .txOut(walletAddress, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: String(amount + Number(quantity)),
              },
            ]);
        }
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC25
   * @description [TC25]: Casting assets but default fields in metadata (name, image, media_type, author) do not exist.
   *
   * @param params { assetName; quantity; txHash? }
   * @param test: { assetName; metadata; quantity; txHash? }
   *
   * @returns unsignedTx
   */
  tc25 = async (
    param: { assetName: string; quantity: string; txHash?: string },
    test: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string },
  ) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const storeUtxo = !isNil(param.txHash)
      ? await this.getUtxoForTx(this.storeAddress, param.txHash)
      : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(param.assetName)));
    const storeUtxo1 = !isNil(test.txHash)
      ? await this.getUtxoForTx(this.storeAddress, test.txHash)
      : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(test.assetName)));

    if (!storeUtxo) throw new Error("Store UTXO not found");
    if (!storeUtxo1) throw new Error("Store1 UTXO not found");

    const unsignedTx = this.meshTxBuilder
      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintRedeemerValue(mConStr1([]))
      .mintingScript(this.mintScriptCbor)

      .mintPlutusScriptV3()
      .mint("-1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintRedeemerValue(mConStr1([]))
      .mintingScript(this.mintScriptCbor)

      .spendingPlutusScriptV3()
      .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .txInScript(this.storeScriptCbor)

      .spendingPlutusScriptV3()
      .txIn(storeUtxo1.input.txHash, storeUtxo1.input.outputIndex)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .txInScript(this.storeScriptCbor);

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC26
   * @description [TC26]: Casting assets but default fields in metadata (name, image, media_type, author) do not exist.
   *
   * @param params { assetName; quantity; txHash? }
   * @param test: { assetName; metadata; quantity; txHash? }
   *
   * @returns unsignedTx
   */
  tc26 = async (
    param: { assetName: string; quantity: string; txHash?: string },
    test: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string },
  ) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();

    const storeUtxo = !isNil(param.txHash)
      ? await this.getUtxoForTx(this.storeAddress, param.txHash)
      : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(param.assetName)));
    const storeUtxo1 = !isNil(test.txHash)
      ? await this.getUtxoForTx(this.storeAddress, test.txHash)
      : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(test.assetName)));

    if (!storeUtxo) throw new Error("Store UTXO not found");
    if (!storeUtxo1) throw new Error("Store1 UTXO not found");

    const unsignedTx = this.meshTxBuilder

      .spendingPlutusScriptV3()
      .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .txInScript(this.storeScriptCbor)

      .spendingPlutusScriptV3()
      .txIn(storeUtxo1.input.txHash, storeUtxo1.input.outputIndex)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .txInScript(this.storeScriptCbor)

      .txOut(walletAddress, [
        {
          quantity: "1",
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
        },
      ])

      .txOut(APP_WALLET_ADDRESS, [
        {
          quantity: "1",
          unit: this.policyId + CIP68_100(stringToHex(test.assetName)),
        },
      ])

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };
}
