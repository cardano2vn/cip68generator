import { BlockfrostProvider } from "@meshsdk/core";

const blockfrostProviderSingleton = () => {
  const APIKEY = process.env.BLOCKFROST_API_KEY || "";
  return new BlockfrostProvider(APIKEY);
};

declare const globalThis: {
  blockfrostGlobal: ReturnType<typeof blockfrostProviderSingleton>;
} & typeof global;

const blockfrostProvider =
  globalThis.blockfrostGlobal ?? blockfrostProviderSingleton();

export default blockfrostProvider;

if (process.env.NODE_ENV !== "production")
  globalThis.blockfrostGlobal = blockfrostProvider;
