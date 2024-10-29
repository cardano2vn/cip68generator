"use server";
import { generateNonce } from "@meshsdk/core";
import { isNil } from "lodash";

export const getNonceByAddress = async (address: string) => {
  if (isNil(address)) {
    throw new Error("Stake address is required");
  }

  if (!/^[a-z0-9_]+$/.test(address)) {
    throw new Error("Invalid address");
  }

  // const nonce = generateNonce("signin to cip68 nft");
  // const walletNonce = await prisma.walletNonce.upsert({
  //   where: {
  //     address: address,
  //   },
  //   create: {
  //     address: address,
  //     nonce: nonce,
  //   },
  //   update: {
  //     nonce: nonce,
  //   },
  // });

  const nonce = await global.cacheUser.get(`nonce-${address}`);
  if (nonce) {
    return nonce;
  }
  const newNonce = generateNonce("signin to cip68 nft");
  const setCache = await global.cacheUser.set(`nonce-${address}`, newNonce);
  if (!setCache) {
    throw new Error("Cannot get the nonce");
  }
  return newNonce;
};
