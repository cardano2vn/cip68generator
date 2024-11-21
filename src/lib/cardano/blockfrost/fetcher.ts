import axios, { AxiosInstance } from "axios";
import {
  Asset,
  BlockfrostSupportedNetworks,
  resolveRewardAddress,
} from "@meshsdk/core";
import { parseHttpError } from "@/utils";

export class BlockfrostFetcher {
  private readonly _axiosInstance: AxiosInstance;
  private readonly _network: BlockfrostSupportedNetworks;

  constructor(baseUrl: string);
  constructor(projectId: string, version?: number);
  constructor(...args: unknown[]) {
    if (
      typeof args[0] === "string" &&
      (args[0].startsWith("http") || args[0].startsWith("/"))
    ) {
      this._axiosInstance = axios.create({ baseURL: args[0] });
      this._network = "mainnet";
    } else {
      const projectId = args[0] as string;
      const network = projectId.slice(0, 7);
      this._axiosInstance = axios.create({
        baseURL: `https://cardano-${network}.blockfrost.io/api/v${args[1] ?? 0}`,
        headers: { project_id: projectId },
      });
      this._network = network as BlockfrostSupportedNetworks;
    }
  }

  async fetchSpecificAsset(asset: string) {
    try {
      const { data, status } = await this._axiosInstance.get(
        `/assets/${asset}`,
      );

      if (status === 200 || status == 202) return data;
      throw parseHttpError(data);
    } catch (error) {
      throw parseHttpError(error);
    }
  }

  async fetchAssetTransactions(asset: string) {
    try {
      const { data, status } = await this._axiosInstance.get(
        `/assets/${asset}/transactions`,
      );

      if (status === 200 || status == 202) return data;
      throw parseHttpError(data);
    } catch (error) {
      throw parseHttpError(error);
    }
  }

  async fetchAssetsByAddress(address: string): Promise<Asset[]> {
    const rewardAddress = address.startsWith("addr")
      ? resolveRewardAddress(address)
      : address;
    try {
      const { data, status } = await this._axiosInstance.get(
        `accounts/${rewardAddress}/addresses/assets`,
      );

      if (status === 200 || status == 202) return data;

      throw parseHttpError(data);
    } catch (error) {
      throw parseHttpError(error);
    }
  }
}
