import { Network } from "@meshsdk/core";

const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY || "";
const KOIOS_RPC_URL = process.env.KOIOS_RPC_URL || "";

const appNetwork: Network =
  (process.env.NEXT_PUBLIC_APP_NETWORK?.toLowerCase().slice(0, 7) as Network) ||
  "preprod";

const appNetworkId = appNetwork === "mainnet" ? 1 : 0;

const BACKEND_URL = process.env.BACKEND_URL || "";
const CONTEXT_PATH = process.env.CONTEXT_PATH || "/api";
const IPFS_ENDPOINT = process.env.IPFS_ENDPOINT || "";
const IPFS_GATEWAY = process.env.IPFS_GATEWAY || "https://ipfs.io/";

const MINT_REFERENCE_SCRIPT_ADDRESS =
  process.env.MINT_REFERENCE_SCRIPT_ADDRESS || "";
const STORE_REFERENCE_SCRIPT_ADDRESS =
  process.env.STORE_REFERENCE_SCRIPT_ADDRESS || "";

export {
  appNetwork,
  appNetworkId,
  BLOCKFROST_API_KEY,
  KOIOS_RPC_URL,
  BACKEND_URL,
  CONTEXT_PATH,
  IPFS_ENDPOINT,
  IPFS_GATEWAY,
  MINT_REFERENCE_SCRIPT_ADDRESS,
  STORE_REFERENCE_SCRIPT_ADDRESS,
};
