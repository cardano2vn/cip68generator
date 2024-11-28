import { IFetcher, MeshTxBuilder, MeshWallet, UTxO } from "@meshsdk/core";
import { Plutus } from "../types";

export class MeshAdapter {
  protected meshTxBuilder: MeshTxBuilder;
  protected wallet: MeshWallet;
  protected fetcher: IFetcher;

  constructor({
    meshTxBuilder = null!,
    fetcher = null!,
    wallet = null!,
  }: {
    meshTxBuilder?: MeshTxBuilder;
    fetcher?: IFetcher;
    wallet?: MeshWallet;
  }) {
    this.meshTxBuilder = meshTxBuilder;
    this.wallet = wallet;
    this.fetcher = fetcher;
  }

  protected getWalletForTx = async (): Promise<{
    utxos: UTxO[];
    collateral: UTxO;
    walletAddress: string;
  }> => {
    const utxos = await this.wallet.getUtxos();
    const collaterals = await this.wallet.getCollateral();
    const walletAddress = await this.wallet.getChangeAddress();
    if (!utxos || utxos.length === 0)
      throw new Error("No UTXOs found in getWalletForTx method.");

    if (!collaterals || collaterals.length === 0)
      throw new Error("No collateral found in getWalletForTx method.");

    if (!walletAddress)
      throw new Error("No wallet address found in getWalletForTx method.");

    return { utxos, collateral: collaterals[0], walletAddress };
  };

  protected getUtxoForTx = async (address: string, txHash: string) => {
    const utxos: UTxO[] = await this.fetcher.fetchAddressUTxOs(address);
    const utxo = utxos.find(function (utxo: UTxO) {
      return utxo.input.txHash === txHash;
    });

    if (!utxo) throw new Error("No UTXOs found in getUtxoForTx method.");
    return utxo;
  };

  protected readValidator = function (plutus: Plutus, title: string): string {
    const validator = plutus.validators.find(function (validator) {
      return validator.title === title;
    });

    if (!validator) {
      throw new Error(`${title} validator not found.`);
    }

    return validator.compiledCode;
  };

  protected getAddressUTXOAsset = async (address: string, unit: string) => {
    const utxos = await this.fetcher.fetchAddressUTxOs(address, unit);
    return utxos[utxos.length - 1];
  };
}
