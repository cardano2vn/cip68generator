import {
  APPLIED_VALIDATOR_PATH,
  BLOCKFROST_URL,
  CREDENTIALS_PATH,
  BLOCKFROST_API_KEY,
  NETWORK,
} from "../../common/constants.ts";
import { AppliedValidator } from "../../common/types.ts";
import {
  addAssets,
  applyDoubleCborEncoding,
  applyParamsToScript,
  Assets,
  Blockfrost,
  Data,
  Lucid,
  Network,
  Provider,
  Script,
  UTxO,
} from "lucid";

const lucid = await Lucid.new(undefined, NETWORK);

export async function createLucidInstance(
  provider?: Provider,
  network?: Network,
) {
  let defaultNetwork = NETWORK;
  let defaultProvider: Provider = new Blockfrost(
    BLOCKFROST_URL,
    Deno.env.get("BLOCKFROST_API_KEY"),
  );

  if (provider) {
    defaultProvider = provider;
  }
  if (network) {
    defaultNetwork = network;
  }

  return await Lucid.new(defaultProvider, defaultNetwork);
}

// Credentials related utilities

export async function generateNewWallet(
  walletName: string,
  walletPath?: string,
) {
  let path = CREDENTIALS_PATH;
  if (walletPath) {
    path = walletPath;
  }

  const privateKey = lucid.utils.generatePrivateKey();
  await Deno.writeTextFile(path + walletName + ".sk", privateKey);

  const address = await lucid.selectWalletFromPrivateKey(privateKey).wallet
    .address();
  await Deno.writeTextFile(path + walletName + ".addr", address);
}

export async function getCredential(fileName: string, filePath?: string) {
  let path = CREDENTIALS_PATH;

  if (filePath) {
    path = filePath;
  }

  return await Deno.readTextFile(path + fileName);
}

export function getPublicKeyHash(address: string) {
  return lucid.utils.getAddressDetails(address).paymentCredential?.hash!;
}

// UTxOs related utilities

export function sumUtxos(utxos: UTxO[]): Assets {
  return utxos
    .map((utxo) => utxo.assets)
    .reduce((acc, assets) => addAssets(acc, assets), {});
}

/// Returns the first UTxO containing equal to or greater than the asset value provided
export function getUtxoWithAssets(utxos: UTxO[], minAssets: Assets): UTxO {
  const utxo = utxos.find((utxo) => {
    for (const [unit, value] of Object.entries(minAssets)) {
      if (
        !Object.hasOwn(utxo.assets, unit) || utxo.assets[unit] < value
      ) {
        return false;
      }
    }
    return true;
  });

  if (!utxo) {
    throw new Error(
      "No UTxO found containing assets: " +
      JSON.stringify(minAssets, bigIntReplacer),
    );
  }
  return utxo;
}

// Validator related utilities

export function parseValidator(validators: any, title: string): Script {
  const validator = validators.find((e: any) => e.title === title);

  if (!validator) {
    throw new Error(title + " validator not found!");
  }

  return {
    type: "PlutusV2",
    script: validator.compiledCode,
  };
}

export async function getAppliedValidator(
  validatorName: string,
  filePath?: string,
): Promise<AppliedValidator> {
  const validatorPath = filePath ? filePath : APPLIED_VALIDATOR_PATH;
  return JSON.parse(await Deno.readTextFile(validatorPath + validatorName));
}

export function parseValidatorAndApplyParameters(
  validators: any,
  params: Data[],
  title: string,
): AppliedValidator {
  const validator = parseValidator(validators, title);
  return applyValidatorParameters(validator, params, title);
}

export function applyValidatorParameters(
  rawValidator: Script,
  params: Data[],
  title: string,
): AppliedValidator {
  const compiledCode = applyParamsToScript(rawValidator.script, params);
  const validator: Script = {
    type: "PlutusV2",
    script: applyDoubleCborEncoding(compiledCode),
  };

  const policyId = lucid.utils.validatorToScriptHash(validator);

  const lockAddress = lucid.utils.validatorToAddress(validator);

  const appliedValidator: AppliedValidator = {
    validator: validator,
    policyId: policyId,
    lockAddress: lockAddress,
    params: params,
  };

  const appliedValidatorString = JSON.stringify(
    appliedValidator,
    bigIntReplacer,
  );

  Deno.writeTextFile(
    APPLIED_VALIDATOR_PATH + title + ".json",
    appliedValidatorString,
  );

  return appliedValidator;
}

// Parameter to 'JSON.stringify()' to help with bigint conversion
export function bigIntReplacer(_k: any, v: any) {
  return typeof v === "bigint" ? v.toString() : v;
}
