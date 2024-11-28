import { Network } from "@meshsdk/core";

const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY || "";
const KOIOS_TOKEN = process.env.KOIOS_TOKEN || "";

const appNetwork: Network =
  (process.env.NEXT_PUBLIC_APP_NETWORK?.toLowerCase().slice(0, 7) as Network) ||
  "preprod";

const appNetworkId = appNetwork === "mainnet" ? 1 : 0;
const IPFS_ENDPOINT = process.env.IPFS_ENDPOINT || "";
const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/";

export {
  appNetwork,
  appNetworkId,
  BLOCKFROST_API_KEY,
  KOIOS_TOKEN,
  IPFS_ENDPOINT,
  IPFS_GATEWAY,
};
