import "dotenv/config";

export const apiKey = {
    mainnet: process.env.BLOCKFROST_API_KEY_MAINNET,
    preprod: process.env.BLOCKFROST_API_KEY_PREPROD,
    preview: process.env.BLOCKFROST_API_KEY_PREVIEW,
} as const;

export const apiUrl = {
    mainnet: "https://cardano-mainnet.blockfrost.io/api",
    preview: "https://cardano-preview.blockfrost.io/api",
    preprod: "https://cardano-preprod.blockfrost.io/api",
} as const;

export const title = {
    mint: "mint.mint.mint",
    store: "store.store.spend",
};
