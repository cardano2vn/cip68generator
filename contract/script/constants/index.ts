export const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY || "";
export const APP_NETWORK = parseInt(process.env.APP_NETWORK || "1") as 0 | 1;
export const EXCHANGE_FEE_ADDRESS = process.env.EXCHANGE_FEE_ADDRESS || "";
export const MINT_REFERENCE_SCRIPT_ADDRESS =
  process.env.MINT_REFERENCE_SCRIPT_ADDRESS || "";
export const STORE_REFERENCE_SCRIPT_ADDRESS =
  process.env.STORE_REFERENCE_SCRIPT_ADDRESS || "";
export const MINT_REFERENCE_SCRIPT_HASH =
  process.env.MINT_REFERENCE_SCRIPT_HASH || "";
export const STORE_REFERENCE_SCRIPT_HASH =
  process.env.STORE_REFERENCE_SCRIPT_HASH || "";
