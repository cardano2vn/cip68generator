import type NodeCache from "node-cache";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const NodeCache = (await import("node-cache")).default;
    const config: NodeCache.Options = {
      stdTTL: 300,
    };

    global.cacheConfigs = new NodeCache(config);
    global.cacheUser = new NodeCache(config);
  }
}
