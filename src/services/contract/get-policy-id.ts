"use server";

import { contractFetcher } from "@/lib/cardano";

export const contractPolicyId = async () => {
  return contractFetcher.policyId;
};
