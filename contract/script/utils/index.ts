import { BlockfrostProvider, MeshWallet, UTxO } from "@meshsdk/core";
import crypto from "crypto";
import * as fs from "fs";
import plutus from "../../plutus.json";
import { readFile } from "fs/promises";
import * as path from "path";
import Papa from "papaparse";
import { convertObject } from "@/utils";
import { AssetInput } from "@/types";

export async function readCSV(fileName: string, wallet: MeshWallet): Promise<AssetInput[]> {
  try {
    const filePath = path.join(__dirname, "..", "..", "..", "public", "csv", fileName);
    console.log("Đường dẫn file:", filePath); // Debug đường dẫn

    const fileContent = await readFile(filePath, "utf8");

    const csvData = Papa.parse<string[]>(fileContent, {
      skipEmptyLines: true,
    }).data;

    const result = convertObject(csvData, wallet);
    return result;
  } catch (error) {
    throw new Error(`Lỗi khi đọc hoặc xử lý file CSV: ${(error as Error).message}`);
  }
}
/**
 * @description Read validator compilecode from plutus
 *
 * @param title - Title from blockfrost data
 * @param version - Version of Plutus when compile code
 * @returns - Compilecode
 */

export const readValidator = function (title: string): string {
  const validator = plutus.validators.find(function (validator) {
    return validator.title === title;
  });

  if (!validator) {
    throw new Error(`${title} validator not found.`);
  }

  return validator.compiledCode;
};

/**
 * @description Return unique asset name using txHash and txIndex
 * Asset lacel (CIP68) can then prefixed to the name for unique asset name
 *
 * @param utxo - UTxO used to generate unique asset name
 * @returns - Asset name unique
 */
export const getUniqueAssetName = async function (utxo: UTxO): Promise<string> {
  const hash = new Uint8Array(await crypto.subtle.digest("SHA3-256", fromHex(utxo.input.txHash)));

  return toHex(new Uint8Array([utxo.input.outputIndex])) + toHex(hash.slice(0, 27));
};

/**
 * @description Return unique asset name using txHash and txIndex
 * Asset lacel (CIP68) can then prefixed to the name for unique asset name
 *
 * @param utxo - UTxO used to generate unique asset name
 * @returns - Asset name unique
 */
function fromHex(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error("Hex string must have an even number of characters.");
  }

  const length = hex.length / 2;
  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    uint8Array[i] = parseInt(hex.substr(i * 2, 2), 16);
  }

  return uint8Array;
}

/**
 * @description Return unique asset name using txHash and txIndex
 * Asset lacel (CIP68) can then prefixed to the name for unique asset name
 *
 * @param utxo - UTxO used to generate unique asset name
 * @returns - Asset name unique
 */
function toHex(uint8Array: Uint8Array): string {
  return Array.from(uint8Array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * @description Return unique asset name using txHash and txIndex
 * Asset lacel (CIP68) can then prefixed to the name for unique asset name
 *
 * @param utxo - UTxO used to generate unique asset name
 * @returns - Asset name unique
 */
export async function fetchUtxo(provider: BlockfrostProvider, address: string, txHash: string) {
  const utxos = await provider.fetchAddressUTxOs(address);
  return utxos.find((utxo) => {
    return utxo.input.txHash == txHash;
  });
}
