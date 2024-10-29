import { CardanoNetwork } from "@/types";

const appNetwork: CardanoNetwork =
  (process.env.BLOCKFROST_API_KEY?.toLowerCase().slice(
    0,
    7,
  ) as CardanoNetwork) || "preprod";

const appNetworkIs = appNetwork === "mainnet" ? 1 : 0;

const BACKEND_URL = process.env.BACKEND_URL || "";
const CONTEXT_PATH = process.env.CONTEXT_PATH || "/api";
const IPFS_ENDPOINT = process.env.IPFS_ENDPOINT || "";
const IPFS_GATEWAY = process.env.IPFS_GATEWAY || "";

export {
  appNetwork,
  appNetworkIs,
  BACKEND_URL,
  CONTEXT_PATH,
  IPFS_ENDPOINT,
  IPFS_GATEWAY,
};
