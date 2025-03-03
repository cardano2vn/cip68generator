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
export async function datumToJson(
  datum: string,
  option?: {
    contain_pk?: boolean;
  },
): Promise<unknown> {
  const cborDatum: Buffer = Buffer.from(datum, "hex");
  const datumMap = (await cbor.decodeFirst(cborDatum)).value[0];
  if (!(datumMap instanceof Map)) {
    throw new Error("Invalid Datum");
  }
  const obj: Record<string, string> = {};
  datumMap.forEach((value, key) => {
    const keyStr = key.toString("utf-8");
    if (keyStr === "_pk" && !option?.contain_pk) {
      return;
    }
    obj[keyStr] = keyStr !== "_pk" ? value.toString("utf-8") : value.toString("hex");
  });
  return obj;
}

export async function getPkHash(datum: string) {
  const cborDatum: Buffer = Buffer.from(datum, "hex");
  const decoded = await cbor.decodeFirst(cborDatum);
  for (const [key, value] of decoded.value[0]) {
    if (key.toString("utf-8") === "_pk") {
      return value.toString("hex");
    }
  }
  return null;
}

export function convertToKeyValue(data: { k: { bytes: string }; v: { bytes: string } }[]): Record<string, string> {
  return Object.fromEntries(
    data.map(({ k, v }) => {
      const key = Buffer.from(k.bytes, "hex").toString("utf-8");
      const value = key === "_pk" ? v.bytes : Buffer.from(v.bytes, "hex").toString("utf-8");
      return [key, value];
    }),
  );
}
