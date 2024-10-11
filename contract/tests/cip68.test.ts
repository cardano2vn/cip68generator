import { describe, test, expect, beforeEach } from '@jest/globals';
import {
    BlockfrostProvider,
    BrowserWallet,
    KoiosProvider,
    MeshTxBuilder,
    MeshWallet,
} from '@meshsdk/core';

import { Cip68Contract } from '../src';

describe('Mint, Burn, Update, Remove Assets (NFT/TOKEN) CIP68', function () {
    let txHashTemp: string = '930d846b716f88ef95994454c2fcd25ddd2867fbc0c615239a4a485f0c51d4fa';
    let meshTxBuilder: MeshTxBuilder;
    let wallet: BrowserWallet | MeshWallet;
    let blockfrostProvider: BlockfrostProvider | KoiosProvider;

    beforeEach(async function () {
        blockfrostProvider = new BlockfrostProvider('preprodHXZNMTECARQ3jlUE0RvCBT2qOK6JRtQf');
        wallet = new MeshWallet({
            networkId: 0,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: 'root',
                bech32: 'xprv16zlhjxs29l9zk0aaf54ttn32nsrl9l855yqpsurnwjxfu2kd93dc4xx0pvxf0ffhzl9vc9vpcqsmmhhfu3c8nfusdj0yh8mg2kzgr797vxrtut4czgwjj4pdzfnstcwy6n0jfjw6tyeuqxdynl8msnu3cv8j5msy',
            },
        });

        meshTxBuilder = new MeshTxBuilder({
            fetcher: blockfrostProvider,
            evaluator: blockfrostProvider,
            submitter: blockfrostProvider,
        });
    });

    test('Mint', async function () {
        const cip68Contract: Cip68Contract = new Cip68Contract({
            fetcher: blockfrostProvider,
            wallet: wallet,
            meshTxBuilder: meshTxBuilder,
        });

        const unsignedTx: string = await cip68Contract.mint({
            assetName: 'CIP68 Generators',
            metadata: {
                name: 'CIP68 Generators',
                image: 'ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua',
                mediaType: 'image/jpg',
                description: 'Open source dynamic assets (Token/NFT) generator (CIP68)',
            },
            quantity: '1',
        });
        const signedTx = await wallet.signTx(unsignedTx, true);
        const txHash = await wallet.submitTx(signedTx);
        expect(txHash.length).toBe(64);
    });

    // test("Burn", async function () {
    //     const cip68Contract = new Cip68Contract({
    //         fetcher: blockfrostProvider,
    //         wallet: wallet,
    //         meshTxBuilder: meshTxBuilder,
    //     });

    //     const unsignedTx: string = await cip68Contract.burn({
    //         txHash: "f4b9c2dd7f876817f413036368fedfe690b18122ecb02d0294c7320ac5fd8e88",
    //         quantity: "-1",
    //         assetName: "CIP68 Generators",
    //     });
    //     const signedTx = await wallet.signTx(unsignedTx, true);
    //     const txHash = await wallet.submitTx(signedTx);
    //     expect(txHash.length).toBe(64);
    // });

    // test("Update", async function () {
    //     const cip68Contract = new Cip68Contract({
    //         fetcher: blockfrostProvider,
    //         wallet: wallet,
    //         meshTxBuilder: meshTxBuilder,
    //     });

    //     const unsignedTx: string = await cip68Contract.update({
    //         txHash: txHashTemp,
    //         quantity: "1",
    //         assetName: "CIP68 Generators",
    //         metadata: {
    //             name: "CIP68 Generators",
    //             image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    //             mediaType: "image/jpg",
    //             description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
    //         },
    //     });
    //     const signedTx = await wallet.signTx(unsignedTx, true);
    //     const txHash = await wallet.submitTx(signedTx);
    //     expect(txHash.length).toBe(64);
    // });

    // test("Remove", async function () {
    //     const cip68Contract = new Cip68Contract({
    //         fetcher: blockfrostProvider,
    //         wallet: wallet,
    //         meshTxBuilder: meshTxBuilder,
    //     });

    //     const unsignedTx: string = await cip68Contract.update({
    //         txHash: txHashTemp,
    //         quantity: "1",
    //         assetName: "CIP68 Generators",
    //         metadata: {
    //             name: "CIP68 Generators",
    //             image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    //         },
    //     });
    //     const signedTx = await wallet.signTx(unsignedTx, true);
    //     const txHash = await wallet.submitTx(signedTx);
    //     expect(txHash.length).toBe(64);
    // });
});
