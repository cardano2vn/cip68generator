import {
  getCredential,
  getPublicKeyHash,
  parseValidatorAndApplyParameters,
} from "./utils/lucid/utils.ts";
import blueprint from "../plutus.json" assert { type: "json" };

const issuerPublicKeyHash = getPublicKeyHash(
  await getCredential("issuer.addr"),
);

const storeValidator = parseValidatorAndApplyParameters(
  blueprint.validators,
  [issuerPublicKeyHash],
  "reference_store.store",
);

const _mintValidator = parseValidatorAndApplyParameters(blueprint.validators, [
  issuerPublicKeyHash,
  storeValidator.policyId,
], "mint.mint");
