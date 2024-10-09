/* eslint-disable @typescript-eslint/no-explicit-any */

import { checkSignature, DataSignature, generateNonce } from '@meshsdk/core';
import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { isNil } from 'lodash';

const authConfig = {
    providers: [
        CredentialProvider({
            credentials: {
                data: {},
            },
            async authorize(credentials) {
                const {
                    wallet,
                    stakeAddress,
                    signature,
                }: {
                    wallet: string;
                    stakeAddress: string;
                    signature: DataSignature;
                } = JSON.parse(credentials.data as string);
                if (isNil(wallet) || isNil(stakeAddress) || isNil(signature)) {
                    throw new Error('Invalid credentials');
                }
                const walletNonce = await prisma.walletNonce.findFirst({
                    where: {
                        stakeAddress: stakeAddress,
                    },
                });
                if (isNil(walletNonce) || isNil(walletNonce.nonce)) {
                    throw new Error('Nonce not found');
                }
                const isSignatureValid = checkSignature(walletNonce.nonce, signature);

                if (!isSignatureValid) {
                    throw new Error('Invalid signature');
                }
                const user = await prisma.user.upsert({
                    where: {
                        stakeAddress: stakeAddress,
                    },
                    create: {
                        stakeAddress: stakeAddress,
                    },
                    update: {},
                });
                return {
                    id: user.id,
                    stakeAddress: user.stakeAddress,
                    wallet: wallet,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user }: any) {
            await prisma.walletNonce.update({
                where: {
                    stakeAddress: user.stakeAddress,
                },
                data: {
                    nonce: generateNonce('signin to cip68 nft '),
                },
            });
            return true;
        },
        async jwt({ user, token }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = token.user;
            return session;
        },
    },
} satisfies NextAuthConfig;

export default authConfig;
