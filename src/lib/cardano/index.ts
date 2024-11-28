import { BLOCKFROST_API_KEY, KOIOS_TOKEN } from "@/constants";
import { BlockfrostFetcher } from "./blockfrost/fetcher";
import { BlockfrostProvider } from "@meshsdk/core";
import { KoiosFetcher } from "./koios/fetcher";
import { Cip68Contract } from "@/contract";

const blockfrostFetcherSingleton = () => {
  return new BlockfrostFetcher(BLOCKFROST_API_KEY);
};
const blockfrostProviderSingleton = () => {
  return new BlockfrostProvider(BLOCKFROST_API_KEY);
};
const koiosFetcherSingleton = () => {
  return new KoiosFetcher(KOIOS_TOKEN);
};
const contractFetcherSingleton = () => {
  return new Cip68Contract({});
};

declare const globalThis: {
  blockfrostFetcherGlobal: ReturnType<typeof blockfrostFetcherSingleton>;
  blockfrostProviderGlobal: ReturnType<typeof blockfrostProviderSingleton>;
  koiosFetcherGlobal: ReturnType<typeof koiosFetcherSingleton>;
  contractFetcherGlobal: ReturnType<typeof contractFetcherSingleton>;
} & typeof global;

const blockfrostFetcher =
  globalThis.blockfrostFetcherGlobal ?? blockfrostFetcherSingleton();
const blockfrostProvider =
  globalThis.blockfrostProviderGlobal ?? blockfrostProviderSingleton();
const koiosFetcher = globalThis.koiosFetcherGlobal ?? koiosFetcherSingleton();
const contractFetcher =
  globalThis.contractFetcherGlobal ?? contractFetcherSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.blockfrostFetcherGlobal = blockfrostFetcher;
  globalThis.blockfrostProviderGlobal = blockfrostProvider;
  globalThis.koiosFetcherGlobal = koiosFetcher;
  globalThis.contractFetcherGlobal = contractFetcher;
}

export { blockfrostFetcher, blockfrostProvider, koiosFetcher, contractFetcher };
