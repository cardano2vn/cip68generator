# cip68-nfts

A project to create and update CIP68 NFTs quickly. Uses Aiken &amp; Lucid.

## Description

This project uses two Aiken SCs (validators) one being the "mint.ak", which
states the minting criterias and another being the "reference_store.ak" which
locks in it all the reference nfts. Any interaction with the SCs requires the
signature of the "issuer". The contracts support the following operations:

1. Mint (a CIP68 based NFT pair)
2. Burn (burns a single CIP68 based NFT pair at a time)
3. Update (updates the metadata of the Reference NFT token and sends the token
   back to the store)
4. Remove (removes all the Reference NFT tokens to another external address)

Each of these operations have their corresponding off-chain scripts for
interacting with the contracts. They are located in the `/off-chain` directory.

## Details

Some noteworthy details:

1. The mint contract allows minting of only unique asset names thereby creating
   NFTs with complete certainty. It does so by allowing only the asset name
   derived from transaction ID and Index of the first Input UTxO, which gets
   spent eventually.
2. The mint contract requires the Reference NFT token to be sent to the "store"
   immediately upon minting of the CIP68 NFT.
3. Both the validators check the datum of the UTxO containing Ref token to
   adhere to the type `MetaDatum` as per CIP68 standards.

## Requirements

1. [Deno](https://deno.land/ "A modern runtime for Javascript & Typescript") -
   The project was tested using Deno v1.30
2. [Aiken](https://aiken-lang.org/) - Optional. Needed if you want to make
   changes to the validator.

## Setup

1. Set the environment variable `BLOCKFROST_API_KEY` in your shell session. By
   default the scripts connect to Preprod network. You can configure it in
   `/off-chain/common/constants.ts`
2. Set the `PROJECT_PATH` to the absolute path of your project directory in
   `/off-chain/common/constants.ts`. Create a `wallet` directory in it.
3. `cd off-chain/`
4. Run the script to generate credentials\
   `deno run --allow-write generate-credential.ts`\
   This will create two private key files (`issuer.sk` &amp; `user.sk`) and
   their corresponding address files in the `wallet` directory.
5. Run the script to instantiate the "store" validator (with your "issuer"
   address) and "mint" validator (with the "store" validator).

   `deno run --allow-read --allow-write instantiate-validators.ts`
6. Send some tAda to `issuer.addr` and `user.addr`
7. Update the NFT metadata as per your requirements in
   `/off-chain/nft-metadata.json`.

## Steps

1. Mint the CIP68 NFT pair.
   \
   `deno run --allow-read --allow-write --allow-net mint-nft.ts`\
   Alternatively, you can choose to give all access the script may require, by
   running\
   `deno run --allow-all mint-nft.ts`
2. Update the NFT metadata, version or extra fields of the Ref UTxO. Set the
   `assetNameSuffix` (in `update-nft.ts`) of the NFT whose data needs to be
   updated.
   \
   `deno run --allow-all update-nft.ts`
3. Remove all the locked Ref UTxOs to the user address.
   \
   `deno run --allow-all remove-nft.ts`
4. Burn the CIP68 NFT pair by setting the `assetNameSuffix` (in `burn-nft.ts`).
   You need to have both the tokens in the user address before trying to burn
   them.
   \
   `deno run --allow-all burn-nft.ts`
