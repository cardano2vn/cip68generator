/* eslint-disable @typescript-eslint/no-unused-vars */
import blockfrostFetcher from "@/lib/cardano/blockfrost/fetcher";
import { KoiosFetcher } from "@/lib/cardano/koios/fetcher";
import { NextRequest } from "next/server";
import { decodeFirst } from "cbor";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page: string = searchParams.get("page") as string;
  const pageSize: string = searchParams.get("page_size") as string;
  const walletAddress = searchParams.get("wallet_address") as string;

  const koiosFetcher = new KoiosFetcher();
  // const blockfrostFetcher =
  const assetsAddress =
    await koiosFetcher.fetchAssetsFromAddress(walletAddress);
  const totalPage = Math.ceil(assetsAddress.length / Number(pageSize));
  const assetsSlice = [...assetsAddress].slice(
    (Number(page) - 1) * Number(pageSize),
    Number(page) * Number(pageSize),
  );

  const assets = await Promise.all(
    assetsSlice.map(async (assetsSlice) => {
      const assetSpec = await blockfrostFetcher.fetchSpecificAsset(
        assetsSlice.policy_id + assetsSlice.asset_name,
      );
      return assetSpec;
    }),
  );

  // Chuỗi hex CBOR đầu vào
  const hexData =
    "d8799fa6446e616d655043495036382047656e657261746f727345696d6167655835697066733a2f2f516d527a6963705265757477436b4d36616f74754b6a4572464355443231334470775071364279757a4d4a617561496d656469615479706549696d6167652f6a70674b6465736372697074696f6e58384f70656e20736f757263652064796e616d6963206173736574732028546f6b656e2f4e4654292067656e657261746f722028434950363829456f776e6572581c2da0fa29bc5fc07ba8396e4e97007a55fff112d1d81299902e032c2946617574686f72581c2da0fa29bc5fc07ba8396e4e97007a55fff112d1d81299902e032c2901ff";

  const cborDatum: Buffer = Buffer.from(hexData, "hex");
  const decoded = await decodeFirst(cborDatum);
  // console.log(decoded);
  /////////////////////////////////////////////////

  async function parseHexToJSON() {
    const cborDatum: Buffer = Buffer.from(hexData, "hex");
    const decoded = await decodeFirst(cborDatum);
    const convertToJSON = (data: unknown): unknown => {
      if (data instanceof Map) {
        const obj: Record<string, string> = {};
        data.forEach((value, key) => {
          const keyStr = key.toString("utf-8");
          if (keyStr !== "author") {
            const valueStr = value.toString("utf-8");

            obj[keyStr] = valueStr;
          } else {
            obj[keyStr] = value.toString("hex");
          }
        });
        return obj;
      }
      if (Array.isArray(data)) {
        return data.map(convertToJSON);
      }
      return data;
    };

    console.log(convertToJSON(decoded.value[0]));
  }

  //////////////////////////////////////////////////////////////////////////////////
  //   async function parseHexToJSON() {
  //   const cborDatum: Buffer = Buffer.from(hexData, 'hex');
  //   const decoded = await decodeFirst(cborDatum);

  //   const convertToJSON = (data: any): any => {
  //     if (data instanceof Map) {
  //       const obj: Record<string, string> = {};
  //       data.forEach((value, key) => {
  //         const keyStr = key.toString('utf-8');
  //         const valueStr = value instanceof Buffer ? value.toString('hex') : value.toString('utf-8');
  //         obj[keyStr] = valueStr;
  //       });
  //       return obj;
  //     }
  //     if (Array.isArray(data)) {
  //       return data.map(convertToJSON);
  //     }
  //     return data;
  //   };

  //   const jsonStructure = {
  //     fields: convertToJSON(decoded.value[0]), // Decode the Map object
  //     constructor: decoded.tag,
  //   };

  //   console.log(jsonStructure);
  //   return jsonStructure;
  // }

  // parseHexToJSON().then((json) => console.log(JSON.stringify(json, null, 2)));
  return Response.json(parseHexToJSON().then());
}

// Define the JSON object type
type JSONObject = { [key: string]: string | JSONObject | JSONArray };
type JSONArray = (string | JSONObject | JSONArray)[];
