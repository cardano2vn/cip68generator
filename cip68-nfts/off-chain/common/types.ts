import { Data, Script } from "lucid";

/// Type to store an applied validator and its properties
export type AppliedValidator = {
  validator: Script;
  policyId: string;
  lockAddress: string;
  params: Data[];
};

/// Type of datum for tokens adhering to CIP-68
export const MetaDatum = Data.Object({
  metadata: Data.Map(Data.Any(), Data.Any()),
  version: Data.Integer(),
  extra: Data.Bytes(),
});

export type MetaDatum = Data.Static<typeof MetaDatum>;
