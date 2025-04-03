/* eslint-disable @typescript-eslint/no-unused-vars */
import { blockfrostProvider } from "@/lib/cardano";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { BlockfrostProvider, BrowserWallet, deserializeAddress, MeshWallet } from "@meshsdk/core";
import { Cip68Contract } from "../script";
import { APP_WALLET_ADDRESS } from "../script/constants";
import { UtXO } from "@/types";

describe("Mint, Burn, Update, Remove Assets (NFT/TOKEN) CIP68", function () {
  let wallet: MeshWallet;
  beforeEach(async function () {
    wallet = new MeshWallet({
      networkId: 0,
      fetcher: blockfrostProvider,
      submitter: blockfrostProvider,
      key: {
        type: "mnemonic",
        words: process.env.APP_MNEMONIC?.split(" ") || [],
      },
    });
  });
  jest.setTimeout(6000000);

  test("address", async function () {
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });

    const address = cip68Contract.storeAddress;
    console.log(address);
    const policyId = cip68Contract.policyId;
    console.log(policyId);
  });

  test("Mint", async function () {
    return;
    const assets = [
      {
        assetName: "hcd009",
        quantity: "1",
        receiver: "",
        metadata: {
          name: "hcd #009",
          image: "ipfs://QmQK3ZfKnwg772ZUhSodoyaqTMPazG2Ni3V4ydifYaYzdV",
          mediaType: "image/png",
          rarity: "Legendary",
          _pk: "c67f1772999b1448126a246b3849c4d98441992abd0c02d44e2284c1",
        },
      },
    ];
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });

    const utxos = await wallet.getUtxos();
    const utxoOnlyLovelace = await Promise.all(
      utxos.filter((utxo) => {
        const hasOnlyLovelace = utxo.output.amount.every((amount) => amount.unit === "lovelace");
        const hasEnoughLovelace = utxo.output.amount.some((amount) => amount.unit === "lovelace" && Number(amount.quantity) > 500000000);
        return hasOnlyLovelace && hasEnoughLovelace;
      }),
    );

    let utxoIndex = 0;
    const chunkSize = 1;
    if (utxoOnlyLovelace.length < assets.length / chunkSize) {
      throw new Error("You have not UTxO only lavelace.");
    }

    for (let i = 0; i < assets.length; i += chunkSize) {
      const chunk = assets.slice(i, i + Math.min(chunkSize, assets.length - i));
      const unsignedTx = await cip68Contract.mint(chunk, utxoOnlyLovelace[utxoIndex]);
      const signedTx = await wallet.signTx(unsignedTx, true);
      const txHash = await wallet.submitTx(signedTx);
      console.log("https://preview.cexplorer.io/tx/" + txHash);
      utxoIndex++;
    }
  });

  test("Mint - Timeout", async function () {
    return;
    const assets = [
      {
        assetName: "hcd010",
        quantity: "1",
        receiver: "",
        metadata: {
          name: "hcd #010",
          image: "ipfs://QmQK3ZfKnwg772ZUhSodoyaqTMPazG2Ni3V4ydifYaYzdV",
          mediaType: "image/png",
          rarity: "Legendary",
          _pk: "c67f1772999b1448126a246b3849c4d98441992abd0c02d44e2284c1",
        },
      },
    ];
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });

    const utxos = await wallet.getUtxos();
    const utxoOnlyLovelace = await Promise.all(
      utxos.filter((utxo) => {
        const hasOnlyLovelace = utxo.output.amount.every((amount) => amount.unit === "lovelace");
        const hasEnoughLovelace = utxo.output.amount.some((amount) => amount.unit === "lovelace" && Number(amount.quantity) > 500000000);
        return hasOnlyLovelace && hasEnoughLovelace;
      }),
    );

    let utxoIndex = 1;
    const chunkSize = 1;
    if (utxoOnlyLovelace.length < assets.length / chunkSize) {
      throw new Error("You have not UTxO only lavelace.");
    }

    for (let i = 0; i < assets.length; i += chunkSize) {
      const chunk = assets.slice(i, i + Math.min(chunkSize, assets.length - i));
      const unsignedTx = await cip68Contract.mint(chunk, utxoOnlyLovelace[utxoIndex]);
      const signedTx = await wallet.signTx(unsignedTx, true);
      const txHash = await wallet.submitTx(signedTx);
      console.log("https://preview.cexplorer.io/tx/" + txHash);

      utxoIndex++;
    }
  });

  test("Burn", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.burn([
      {
        assetName: "CIP68 Generators",
        quantity: "-1",
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    jest.setTimeout(20000);
    expect(txHash.length).toBe(64);
  });

  test("Update", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.update([
      {
        assetName: "CIP68 Generators",
        metadata: {
          name: "2",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          website: "https://cip68.cardano2vn.io",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
      },
      {
        assetName: "CIP68 Generators 1",
        metadata: {
          name: "2",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          website: "https://cip68.cardano2vn.io",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("Mint Reference Script", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const ref_address = "";
    const unsignedTx: string = await cip68Contract.createReferenceScriptMint(ref_address);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("Store Reference Script", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const ref_address = "";
    const unsignedTx: string = await cip68Contract.createReferenceScriptStore(ref_address);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC1]: Cast assets with the desired quantity and metadata with all required fields.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc1({
      assetName: "CIP68 Generators",
      metadata: {
        name: "CIP68 Generators",
        image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
        mediaType: "image/jpg",
        description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
        _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
      },
      quantity: "1",
      receiver: null!,
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("[TC2]: Casting assets but default fields in metadata (name, image, media_type, author) do not exist.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc2({
      assetName: "CIP68 Generators v1",
      metadata: {},
      quantity: "1",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length);
    });
  });

  test("[TC3]: Casting assets with defined metadata but the keys (name, image, media_type) exist but the values of the fields are partially or completely missing.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc3({
      assetName: "CIP68 Generators v1",
      metadata: {
        name: "CIP68 Generators",
        image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
        mediaType: "image/jpg",
        description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
        _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
      },
      quantity: "1",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("[TC4]: Casting property with fully defined metadata for both kay and value but author address is empty or wrong.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc4({
      assetName: "CIP68 Generators v1",
      metadata: {
        name: "CIP68 Generators",
        image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
        mediaType: "image/jpg",
        description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
        _pk: deserializeAddress(APP_WALLET_ADDRESS).pubKeyHash,
      },
      quantity: "1",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("[TC5]: Mint assets with transaction fees less than the specified amount included in the validator parameters.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc5({
      assetName: "CIP68 Generators v1",
      metadata: {
        name: "CIP68 Generators",
        image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
        mediaType: "image/jpg",
        description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
        _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
      },
      quantity: "1",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("[TC6]: Mint asset with correct transaction fee as params. however wrong exchange address defined in params.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc5({
      assetName: "CIP68 Generators v1",
      metadata: {
        name: "CIP68 Generators",
        image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
        mediaType: "image/jpg",
        description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
        _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
      },
      quantity: "1",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("[TC7]: Token creator sent wrong store address given in params.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc5({
      assetName: "CIP68 Generators v1",
      metadata: {
        name: "CIP68 Generators",
        image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
        mediaType: "image/jpg",
        description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
        _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
      },
      quantity: "1",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("[TC8]: Creator sends Token with prefix_100 (CIP100).", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc8({
      assetName: "CIP68 Generators v1",
      metadata: {
        name: "CIP68 Generators",
        image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
        mediaType: "image/jpg",
        description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
        _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
      },
      quantity: "1",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("[TC9]: The output of UTxOs is missing the part sent to the smart contract store address or sent to the exchange fee is missing.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc8({
      assetName: "CIP68 Generators",
      metadata: {
        name: "CIP68 Generators",
        image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
        mediaType: "image/jpg",
        description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
        _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
      },
      quantity: "1",
    });
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("[TC10]: Asset update successful. Exchange fee transferred to exchange address. Asset updated successful.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc10([
      {
        assetName: "CIP68 Generators",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          website: "https://cip68.cardano2vn.io",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC11]: In metadata change author field or no author field.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc11([
      {
        assetName: "CIP68 Generators",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          website: "https://cip68.cardano2vn.io",
        },
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC12]: Author did not send signature to confirm transaction.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc12([
      {
        assetName: "CIP68 Generators",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          website: "https://cip68.cardano2vn.io",
        },
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC13]: The user entered an incorrect asset name or did not enter an asset name.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc13([
      {
        assetName: "",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          website: "https://cip68.cardano2vn.io",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC14]: Update metadata but deposit to exchange with amount less than defined in params.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc14([
      {
        assetName: "CIP68 Generators",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          website: "https://cip68.cardano2vn.io",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC15]: Update metadata but send money to exchange with correct amount as defined in params. However exchange wallet address is updated incorrectly.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc15([
      {
        assetName: "CIP68 Generators",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          website: "https://cip68.cardano2vn.io",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC16]: The output of UTxOs is missing the part sent to the smart contract store address or sent to the exchange fee is missing.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc16([
      {
        assetName: "CIP68 Generators",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          website: "https://cip68.cardano2vn.io",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC17]: The transaction input does not contain a UTxO containing a Reference Asset.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc17([
      {
        assetName: "CIP68 Generators",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          website: "https://cip68.cardano2vn.io",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC18]: Transaction input takes redeemer condition different from redeemer update condition", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc18([
      {
        assetName: "CIP68 Generators",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          website: "https://cip68.cardano2vn.io",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC19]: When Burn User Asset and Reference Asset and send ada for platform fee successfully.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc19([
      {
        assetName: "CIP68 Generators",
        quantity: "-1",
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC20]: Burn asset bị thiếu User Asset Hoặc Reference Asset Hoặc thiếu cả hai.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc20([
      {
        assetName: "CIP68 Generators",
        quantity: "-1",
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC21]: Burn assets but the ada sent to the platform is less than the fee defined in params.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc21([
      {
        assetName: "CIP68 Generators",
        quantity: "-1",
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC22]: Burn assets but the address sent in the platform is different from the address of the exchange fee defined in params.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc22([
      {
        assetName: "CIP68 Generators",
        quantity: "-1",
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[TC23]: When burning ada transaction the attached reference asset is sent to a different address or not sent to the user.", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc23([
      {
        assetName: "CIP68 Generators",
        quantity: "-1",
      },
    ]);
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    expect(txHash.length).toBe(64);
  });

  test("[SC25]: redeemer remove spend UTxO do burn but attach 1 more UTxO but this UTxO is only for metadata change and send to author's address", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc25(
      {
        assetName: "CIP68 Generators",
        quantity: "-1",
      },
      {
        assetName: "CIP68 Generators v2",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
        quantity: "-1",
      },
    );
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    jest.setTimeout(20000);
    expect(txHash.length).toBe(64);
  });

  test("[SC26]: transfer 2 NFTs from store to author wallet (1 from author, 1 from other wallet).", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const unsignedTx: string = await cip68Contract.tc26(
      {
        assetName: "CIP68 Generators",
        quantity: "-1",
      },
      {
        assetName: "CIP68 Generators 1",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
        quantity: "-1",
      },
    );
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("https://preview.cexplorer.io/tx/" + txHash);
    jest.setTimeout(20000);
    expect(txHash.length).toBe(64);
  });
});
