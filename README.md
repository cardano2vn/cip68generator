# CIP68 Generator

CIP-68 is an open-source standard designed for creating and managing NFTs on the Cardano blockchain. It introduces advanced features for flexible and scalable token management, allowing developers to mint, burn, update, and remove NFTs with enhanced security and efficiency.

## Features

-   [x] **Mint**: Create new NFTs with customizable metadata, adhering to Cardano standards.
-   [x] **Burn**: Permanently remove NFTs from circulation, controlling supply.
-   [x] **Update**: Modify the metadata of existing NFTs without changing their identity.
-   [x] **Remove**: Change metadata to retire NFTs from active use without destroying them.

We primarily use two main SDKs, Mesh and Blockfrost, to efficiently retrieve information and execute transactions on the blockchain. Additionally, Mesh provides the flexibility to use other providers beyond Blockfrost (such as Koios ...).

-   [x] **Blockfrost**: use [Blockfrost](https://blockfrost.io) to query data
-   [x] **Mesh**: use [Mesh](https://meshjs.dev) join blockfrost to make transactions and work with Wallets simply

## Install

-   npm: `npm i @cardano2vn/cip68generator`
-   yarn: `yarn add @cardano2vn/cip68generator`

## Create `BlockfrostProvider` and `MeshTxBuilder` to efficiently retrieve information and execute transactions.

```ts
import { BlockfrostProvider, MeshTxBuilder } from '@meshsdk/core';

const blockfrostProvider: BlockfrostProvider = new BlockfrostProvider('<Your-Api-Key>');

const meshTxBuilder: MeshTxBuilder = new MeshTxBuilder({
    fetcher: blockfrostProvider,
    evaluator: blockfrostProvider,
    submitter: blockfrostProvider,
});

const wallet: MeshWallet = new MeshWallet({
    networkId: 0,
    fetcher: blockfrostProvider,
    submitter: blockfrostProvider,
    key: {
        type: 'root',
        bech32: '<Root-Private-Key>',
    },
});
```

## Mint: Create new NFTs with customizable metadata, adhering to Cardano standards.

```ts
import { Cip68Contract } from '@cardano2vn/cip68generator';

const cip68Contract: Cip68Contract = new Cip68Contract({
    wallet: wallet,
    fetcher: blockfrostProvider,
    meshTxBuilder: meshTxBuilder,
});

const unsignedTx = await cip68Contract.mint({
    assetName: 'CIP68 Generator',
    quantity: '1',
    metadata: {
        name: 'CIP68 Generator',
        image: 'ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua',
        mediaType: 'image/jpg',
        description: 'Open source dynamic assets (Token/NFT) generator (CIP68)',
    },
});

const signedTx = await wallet.signTx(unsignedTx, true);
const txHash = await wallet.submitTx(signedTx);
```

## Burn: Permanently remove NFTs from circulation, controlling supply.

```ts
import { Cip68Contract } from '@cardano2vn/cip68generator';

const cip68Contract: Cip68Contract = new Cip68Contract({
    wallet: wallet,
    fetcher: blockfrostProvider,
    meshTxBuilder: meshTxBuilder,
});

const unsignedTx: string = await cip68Contract.burn({
    txHash: '<Tx-Hash-Template>',
    quantity: '-1',
    assetName: 'CIP68 Generators',
});
const signedTx = await wallet.signTx(unsignedTx, true);
const txHash = await wallet.submitTx(signedTx);
```

## Update: Modify the metadata of existing NFTs without changing their identity.

```ts
import { Cip68Contract } from '@cardano2vn/cip68generator';

const cip68Contract = new Cip68Contract({
    fetcher: blockfrostProvider,
    wallet: wallet,
    meshTxBuilder: meshTxBuilder,
});

const unsignedTx: string = await cip68Contract.update({
    txHash: '<Tx-Hash-Template>',
    quantity: '1',
    assetName: 'CIP68 Generators',
    metadata: {
        name: 'CIP68 Generators',
        image: 'ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua',
        mediaType: 'image/jpg',
        description: 'Open source dynamic assets (Token/NFT) generator (CIP68)',
    },
});
const signedTx = await wallet.signTx(unsignedTx, true);
const txHash = await wallet.submitTx(signedTx);
```

## Remove: Change metadata to retire NFTs from active use without destroying them.

```ts
import { Cip68Contract } from '@cardano2vn/cip68generator';

const cip68Contract = new Cip68Contract({
    fetcher: blockfrostProvider,
    wallet: wallet,
    meshTxBuilder: meshTxBuilder,
});

const unsignedTx: string = await cip68Contract.update({
    txHash: '<Tx-Hash-Template>',
    quantity: '1',
    assetName: 'CIP68 Generators',
    metadata: {
        name: 'CIP68 Generators',
        image: 'ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua',
    },
});
const signedTx = await wallet.signTx(unsignedTx, true);
const txHash = await wallet.submitTx(signedTx);
```
