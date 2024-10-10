import { BrowserWallet, IFetcher, MeshTxBuilder, MeshWallet, UTxO } from "@meshsdk/core";

export class MeshAdapter {
    protected meshTxBuilder: MeshTxBuilder;
    protected wallet: BrowserWallet | MeshWallet;
    protected fetcher: IFetcher;

    constructor({
        meshTxBuilder,
        fetcher,
        wallet,
    }: {
        meshTxBuilder: MeshTxBuilder;
        fetcher: IFetcher;
        wallet: BrowserWallet | MeshWallet;
    }) {
        this.meshTxBuilder = meshTxBuilder;
        this.wallet = wallet;
        this.fetcher = fetcher;
    }

    protected getWalletForTx = async (): Promise<{ utxos: UTxO[]; collateral: UTxO[]; walletAddress: string }> => {
        const utxos = await this.wallet.getUtxos();
        const collateral = await this.wallet.getCollateral();
        const walletAddress = await this.wallet.getChangeAddress();

        if (!utxos || utxos.length === 0) {
            throw new Error("No UTXOs found in getWalletForTx method.");
        }
        if (!collateral || collateral.length === 0) {
            throw new Error("No collateral found in getWalletForTx method.");
        }
        if (!walletAddress) {
            throw new Error("No wallet address found in getWalletForTx method.");
        }

        return { utxos, collateral, walletAddress };
    };

    protected getUtxoForTx = async (address: string, txHash: string): Promise<UTxO | undefined> => {
        const utxos: UTxO[] = await this.fetcher.fetchAddressUTxOs(address);
        return utxos.find((utxo: UTxO) => utxo.input.txHash === txHash);
    };
}
