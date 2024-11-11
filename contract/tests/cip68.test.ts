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
        bech32:
          "xprv16zlhjxs29l9zk0aaf54ttn32nsrl9l855yqpsurnwjxfu2kd93dc4xx0pvxf0ffhzl9vc9vpcqsmmhhfu3c8nfusdj0yh8mg2kzgr797vxrtut4czgwjj4pdzfnstcwy6n0jfjw6tyeuqxdynl8msnu3cv8j5msy",
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
  //   jest.setTimeout(20000);
  //   expect(txHash.length).toBe(64);
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
  //       "1fdcf779767280d32aa488b45a49398d342470bdef5fcfe22f5c82ac06379b2b",
  //     quantity: "-1",
  //     metadata: {
  //       name: "CIP68 Generators 01",
  //       image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
  //       mediaType: "image/jpg",
  //       description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
  //       author: deserializeAddress(await wallet.getChangeAddress()).pubKeyHash,
  //     },
  //   });
  //   const signedTx = await wallet.signTx(unsignedTx, true);
  //   const txHash = await wallet.submitTx(signedTx);
  //   console.log(txHash);
  //   txHashTemp = txHash;
  //   jest.setTimeout(20000);
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
  //       owner:await wallet.getChangeAddress(),
  //       author: deserializeAddress(await wallet.getChangeAddress()).pubKeyHash,
  //     },
  //     txHash:
  //       "a38ab56346da11896822301dbed1439db8a07ac9cc5718f08d3fb31051848d8f",
  //   });
  //   jest.setTimeout(20000);
  //       const signedTx = await wallet.signTx(unsignedTx, true);
  //   const txHash = await wallet.submitTx(signedTx);
  //   console.log(txHash);
  //   txHashTemp = txHash;
  //   jest.setTimeout(20000);
  //   expect(txHash.length).toBe(64);
  //   expect(txHash.length).toBe(64);
  // });

  // test("Remove", async function () {
  //   const cip68Contract: Cip68Contract = new Cip68Contract({
  //     fetcher: blockfrostProvider,
  //     wallet: wallet,
  //     meshTxBuilder: meshTxBuilder,
  //   });

  //   const unsignedTx: string = await cip68Contract.remove({
  //     assetName: "CIP68 Generators",
  //     metadata: {
  //       name: "CIP68 Generators",
  //       image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
  //       mediaType: "image/jpg",
  //       description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
  //       author: deserializeAddress(await wallet.getChangeAddress()).pubKeyHash,
  //     },
  //     txHash:
  //       "22faa1bc73a0c94e4e1f24727545ba3a7155b3ceadc69f2fd159209f88c8eff1",
  //   });
  //   const signedTx = await wallet.signTx(unsignedTx, true);
  //   const txHash = await wallet.submitTx(signedTx);
  //   console.log(txHash);
  //   jest.setTimeout(20000);
  //   expect(txHash.length).toBe(64);
  // });

  //  test('Mint Reference Script', async function () {
  //       const cip68Contract: Cip68Contract = new Cip68Contract({
  //           fetcher: blockfrostProvider,
  //           wallet: wallet,
  //           meshTxBuilder: meshTxBuilder,
  //       });
  //       const unsignedTx: string = await cip68Contract.createReferenceScriptMint();
  //       const signedTx = await wallet.signTx(unsignedTx, true);
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
