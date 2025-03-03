import { appNetwork } from "@/constants";
import { parseHttpError } from "@/utils";
import { Network } from "@meshsdk/core";
import axios, { AxiosInstance } from "axios";

export class KoiosFetcher {
  private readonly _axiosInstance: AxiosInstance;
  private readonly _network: Network;

  constructor(baseUrl: string);
  constructor(token: string, version?: number);
  constructor(...args: unknown[]) {
    if (typeof args[0] === "string" && (args[0].startsWith("http") || args[0].startsWith("/"))) {
      this._axiosInstance = axios.create({ baseURL: args[0] });
      this._network = appNetwork;
    } else {
      const token = args[0] as string;

      const baseUrl =
        appNetwork === "mainnet" ? `https://api.koios.rest/api/v${args[1] ?? 1}` : `https://${appNetwork}.koios.rest/api/v${args[1] ?? 1}`;

      this._axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      this._network = appNetwork;
    }
  }
  async fetchAssetsFromAddress(address: string) {
    try {
      const { data, status } = await this._axiosInstance.post("/address_assets", {
        _addresses: [address],
      });

      if (status === 200) return data;
      throw parseHttpError(data);
    } catch (error) {
      throw parseHttpError(error);
    }
  }
  async fetchAssetsInfo(asset_list: string[][]) {
    try {
      const { data, status } = await this._axiosInstance.post("/asset_info", {
        _asset_list: asset_list,
      });

      if (status === 200) return data;
      throw parseHttpError(data);
    } catch (error) {
      throw parseHttpError(error);
    }
  }
}
