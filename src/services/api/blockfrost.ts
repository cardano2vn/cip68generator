import { BLOCKFROST_API_KEY } from "@/contract/src/constants";
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";

class BlockfrostService extends BlockFrostAPI {
  constructor() {
    super({
      projectId: BLOCKFROST_API_KEY,
    });
  }
}

export default BlockfrostService;
