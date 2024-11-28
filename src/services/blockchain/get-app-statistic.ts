"use server";

import { blockfrostFetcher, contractFetcher } from "@/lib/cardano";

export const getAppStatistic = async () => {
  try {
    const storedAddress = contractFetcher.storeAddress;
    const response = await blockfrostFetcher.fetchAddressDetail(storedAddress);
    const totalTransaction = response.tx_count;
    const totalMint = response.received_sum.length - 1;
    const totalBurn = response.received_sum.length - response.sent_sum.length;
    const totalUpdate = totalTransaction - totalMint - totalBurn;
    const data = {
      transaction: totalTransaction,
      mint: totalMint,
      burn: totalBurn,
      update: totalUpdate,
    };

    return {
      data,
      message: "Success",
    };
  } catch (e) {
    return {
      data: null,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
};
