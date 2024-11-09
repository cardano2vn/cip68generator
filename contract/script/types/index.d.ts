export interface Redeemer {
  title: string;
  schema: {
    $ref: string;
  };
}

export interface Datum {
  title: string;
  schema: {
    $ref: string;
  };
}

export interface Validator {
  title: string;
  compiledCode: string;
  hash: string;
  redeemer?: Redeemer;
  datum?: Datum;
}

export interface Plutus {
  preamble: {
    title: string;
    description: string;
    version: string;
    plutusVersion: string;
    compiler: {
      name: string;
      version: string;
    };
    license: string;
  };
  validators: Validator[];
  definitions: Record<string, unknown>;
}
