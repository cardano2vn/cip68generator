import cbor from "cbor";

/**
 * @description Convert inline datum from utxo to metadata
 * 1. Converts a hex string into a buffer for decoding.
 * 2. Decodes CBOR data from the buffer to a JavaScript object.
 * 3. Outputs a JSON metadata ready for further use
 *
 * @param datum
 * @returns metadata
 */
export async function converMetadata(
  datum: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  key?: string,
): Promise<unknown> {
  try {
    const cborDatum: Buffer = Buffer.from(datum, "hex");
    const decoded = await cbor.decodeFirst(cborDatum);
    const convertToJSON = (data: unknown): unknown => {
      if (data instanceof Map) {
        const obj: Record<string, string> = {};
        data.forEach((value, key) => {
          const keyStr = key.toString("utf-8");
          obj[keyStr] =
            keyStr !== "author"
              ? value.toString("utf-8")
              : value.toString("hex");
        });
        return obj;
      }
      if (Array.isArray(data)) {
        return data.map(convertToJSON);
      }
      return data;
    };
    return convertToJSON(decoded.value[0]);
  } catch (error) {
    console.error("Error decoding CBOR data:", error);
    throw new Error("Failed to parse hex data to JSON.");
  }
}
