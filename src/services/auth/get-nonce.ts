'use server';

import prisma from '@/lib/prisma';
import { generateNonce } from '@meshsdk/core';
import { isNil } from 'lodash';

export const getNonceByAddress = async (stakeAddress: string) => {
    if (isNil(stakeAddress)) {
        throw new Error('Stake address is required');
    }

    if (!/^[a-z0-9_]+$/.test(stakeAddress)) {
        throw new Error('Invalid stake address');
    }

    const nonce = generateNonce('signin to cip68 nft');
    const walletNonce = await prisma.walletNonce.upsert({
        where: {
            stakeAddress: stakeAddress,
        },
        create: {
            stakeAddress: stakeAddress,
            nonce: nonce,
        },
        update: {
            nonce: nonce,
        },
    });
    if (!walletNonce) {
        throw new Error('Cannot get the nonce');
    }

    return nonce;
};
