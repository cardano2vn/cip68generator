'use server';

import prisma from '@/lib/prisma';
import { generateNonce } from '@meshsdk/core';
import { isNil } from 'lodash';

export const getNonceByAddress = async (address: string) => {
    if (isNil(address)) {
        throw new Error('Stake address is required');
    }

    if (!/^[a-z0-9_]+$/.test(address)) {
        throw new Error('Invalid address');
    }

    const nonce = generateNonce('signin to cip68 nft');
    const walletNonce = await prisma.walletNonce.upsert({
        where: {
            address: address,
        },
        create: {
            address: address,
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
