/* eslint-disable @typescript-eslint/no-unused-vars */
import { blockfrostProvider } from "@/lib/cardano";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import {
  BlockfrostProvider,
  BrowserWallet,
  deserializeAddress,
  KoiosProvider,
  MeshTxBuilder,
  MeshWallet,
} from "@meshsdk/core";
import { Cip68Contract } from "../script";

jest.setTimeout(60000);

describe("Mint, Burn, Update, Remove Assets (NFT/TOKEN) CIP68", function () {
  let txHashTemp: string;
  let meshTxBuilder: MeshTxBuilder;
  let wallet: MeshWallet;
  beforeEach(async function () {
    wallet = new MeshWallet({
      networkId: 0,
      fetcher: blockfrostProvider,
      submitter: blockfrostProvider,
      key: {
        type: "root",
        bech32: process.env.WALLET_ADDRESS_ROOT || "",
      },
    });

    meshTxBuilder = new MeshTxBuilder({
      fetcher: blockfrostProvider,
      evaluator: blockfrostProvider,
      submitter: blockfrostProvider,
    });
  });

  // test("Mint", async function () {
  //   const cip68Contract: Cip68Contract = new Cip68Contract({
  //     fetcher: blockfrostProvider,
  //     wallet: wallet,
  //     meshTxBuilder: meshTxBuilder,
  //   });

  //   const unsignedTx: string = await cip68Contract.mint({
  //     assetName: "CIP68 Generators.",
  //     metadata: {
  //       name: "CIP68 Generators",
  //       image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
  //       mediaType: "image/jpg",
  //       description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
  //       author: deserializeAddress(await wallet.getChangeAddress()).pubKeyHash,
  //     },
  //     quantity: "1",
  //   });
  //   const signedTx = await wallet.signTx(unsignedTx, true);
  //   const txHash = await wallet.submitTx(signedTx);
  //   console.log(txHash);
  //   txHashTemp = txHash;
  //   blockfrostProvider.onTxConfirmed(txHash, () => {
  //     expect(txHash.length).toBe(64);
  //   });
  // });

  test("Burn", async function () {
    const cip68Contract: Cip68Contract = new Cip68Contract({
      fetcher: blockfrostProvider,
      wallet: wallet,
      meshTxBuilder: meshTxBuilder,
    });

    const unsignedTx: string = await cip68Contract.burn({
      assetName: "CIP68 Generators.",
      txHash:
        "fea93eda3a8b5b9a83a76f4803b86363aabf87ac80ef4821ef968883f3a66070",
      quantity: "-1",
      metadata: {
        name: "CIP68 Generators 01",
        image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
        mediaType: "image/jpg",
        description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
        author: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
      },
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log(txHash);
    txHashTemp = txHash;
    expect(txHash.length).toBe(64);
  });

  // test("Update", async function () {
  //   const cip68Contract: Cip68Contract = new Cip68Contract({
  //     fetcher: blockfrostProvider,
  //     wallet: wallet,
  //     meshTxBuilder: meshTxBuilder,
  //   });

  //   const unsignedTx: string = await cip68Contract.update({
  //     assetName: "CIP68 Generators.",
  //     metadata: {
  //       name: "CIP68 Generators",
  //       image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
  //       mediaType: "image/jpg",
  //       description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
  //       owner: wallet.getChangeAddress(),
  //       author: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
  //     },
  //     txHash:
  //       "2a894b2fbed54ebf7abd2717d2424dd36c9ab98f3511b3feab389ea467693785",
  //   });
  //   const signedTx = wallet.signTx(unsignedTx, true);
  //   const txHash = await wallet.submitTx(signedTx);
  //   console.log(txHash);
  //   txHashTemp = txHash;
  //   expect(txHash.length).toBe(64);
  // });

  //  test('Mint Reference Script', async function () {
  //       const cip68Contract: Cip68Contract = new Cip68Contract({
  //           fetcher: blockfrostProvider,
  //           wallet: wallet,
  //           meshTxBuilder: meshTxBuilder,
  //       });
  //       const unsignedTx: string = await cip68Contract.createReferenceScriptMint();
  //       const signedTx = wallet.signTx(unsignedTx, true);
  //       const txHash = await wallet.submitTx(signedTx);
  //       console.log(txHash);
  //       expect(txHash.length).toBe(64);
  //   });

  // test('Store Reference Script', async function () {
  //     const cip68Contract: Cip68Contract = new Cip68Contract({
  //         fetcher: blockfrostProvider,
  //         wallet: wallet,
  //         meshTxBuilder: meshTxBuilder,
  //     });
  //     const unsignedTx: string = await cip68Contract.createReferenceScriptStore();
  //     const signedTx = await wallet.signTx(unsignedTx, true);
  //     const txHash = await wallet.submitTx(signedTx);
  //     console.log(txHash);
  //     expect(txHash.length).toBe(64);
  // });
});
