import { BLOCKFROST_API_KEY, KOIOS_TOKEN } from "@/constants";
import { BlockfrostFetcher } from "./blockfrost/fetcher";
import { BlockfrostProvider } from "@meshsdk/core";
import { KoiosFetcher } from "./koios/fetcher";

const blockfrostFetcherSingleton = () => {
  return new BlockfrostFetcher(BLOCKFROST_API_KEY);
};
const blockfrostProviderSingleton = () => {
  return new BlockfrostProvider(BLOCKFROST_API_KEY);
};
const koiosFetcherSingleton = () => {
  return new KoiosFetcher(KOIOS_TOKEN);
};

declare const globalThis: {
  blockfrostFetcherGlobal: ReturnType<typeof blockfrostFetcherSingleton>;
  blockfrostProviderGlobal: ReturnType<typeof blockfrostProviderSingleton>;
  koiosFetcherGlobal: ReturnType<typeof koiosFetcherSingleton>;
} & typeof global;

const blockfrostFetcher =
  globalThis.blockfrostFetcherGlobal ?? blockfrostFetcherSingleton();
const blockfrostProvider =
  globalThis.blockfrostProviderGlobal ?? blockfrostProviderSingleton();
const koiosFetcher = globalThis.koiosFetcherGlobal ?? koiosFetcherSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.blockfrostFetcherGlobal = blockfrostFetcher;
  globalThis.blockfrostProviderGlobal = blockfrostProvider;
  globalThis.koiosFetcherGlobal = koiosFetcher;
}

export { blockfrostFetcher, blockfrostProvider, koiosFetcher };
