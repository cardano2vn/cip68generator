import { parseHttpError } from "@/utils";
import { Axios } from "axios";

export class KoiosFetcher extends Axios {
  constructor() {
    super({
      baseURL: process.env.KOIOS_RPC_URL!,
    });
  }

  async fetchAssetsFromAddress(address: string) {
    try {
      const { data, status } = await this.post(
        "/address_assets",
        JSON.stringify({
          _addresses: [address],
        }),
        {
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        },
      );

      if (status === 200) return JSON.parse(data);
      throw parseHttpError(data);
    } catch (error) {
      throw parseHttpError(error);
    }
  }
}