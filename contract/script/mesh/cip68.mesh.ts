import {
  Transaction,
  PlutusScript,
  serializePlutusScript,
  Mint,
  resolveScriptHash,
  Recipient,
  metadataToCip68,
  Asset,
  CIP68_222,
  stringToHex,
  CIP68_100,
  mConStr1,
  mConStr2,
} from "@meshsdk/core";
import { MeshAdapter } from "../adapters/mesh.adapter";
import cbor from "cbor";
import { readValidator, getUniqueAssetName } from "../utils";
import { applyParamsToScript } from "@meshsdk/core-csl";

export class Cip68Contract extends MeshAdapter {}
