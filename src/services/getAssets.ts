'use server';

import { ApplicationBlockfrostProvider } from './blockfrost';

export const getAssetsByAddress = async (address: string) => {
    const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY!;
    const blockchainProvider = new ApplicationBlockfrostProvider(BLOCKFROST_API_KEY);
    return await blockchainProvider.fetchAssetsByAddress(address);
};
