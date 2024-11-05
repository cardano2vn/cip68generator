import "dotenv/config";
import { Axios } from "axios";

class KoiosService extends Axios {
  constructor() {
    super({
      baseURL: process.env.KOIOS_RPC_URL_PREPROD!,
    });
  }
}

export default KoiosService;
