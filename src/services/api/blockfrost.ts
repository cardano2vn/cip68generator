import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import * as dotenv from "dotenv";
dotenv.config();

class BlockfrostService extends BlockFrostAPI {
    constructor() {
        super({
            projectId: process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!,
        });
    }
}

export default BlockfrostService;