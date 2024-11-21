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

  // test("Burn", async function () {
  //   const cip68Contract: Cip68Contract = new Cip68Contract({
  //     fetcher: blockfrostProvider,
  //     wallet: wallet,
  //     meshTxBuilder: meshTxBuilder,
  //   });

  //   const unsignedTx: string = await cip68Contract.burn({
  //     assetName: "CIP68 Generators.",
  //     txHash:
  //       "ea097c8d531d75a0f5112c29a3eef591088f7c2a6130eae98221f925faba547d",
  //     quantity: "-1",
  //   });
  //   const signedTx = wallet.signTx(unsignedTx, true);
  //   const txHash = await wallet.submitTx(signedTx);
  //   console.log(txHash);
  //   txHashTemp = txHash;
  //   expect(txHash.length).toBe(64);
  // });

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
  //       website: "cardano2vn.io",
  //       owner: wallet.getChangeAddress(),
  //       author: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
  //     },
  //     txHash:
  //       "519184f667d260d9301bfd9ca86fd4a59ede103f18f1aa94a8c785e5eff4fc36",
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
