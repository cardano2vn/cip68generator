/* eslint-disable @typescript-eslint/no-explicit-any */

import { checkSignature, DataSignature } from "@meshsdk/core";
import { NextAuthConfig } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { isNil } from "lodash";

const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        data: {},
      },
      async authorize(credentials) {
        const {
          wallet,
          address,
          signature,
        }: {
          wallet: string;
          address: string;
          signature: DataSignature;
        } = JSON.parse(credentials.data as string);
        if (isNil(wallet) || isNil(address) || isNil(signature)) {
          throw new Error("Invalid credentials");
        }
        const walletNonce = await global.cacheUser.get(`nonce-${address}`);
        if (isNil(walletNonce)) {
          throw new Error("Nonce not found");
        }
        const isSignatureValid = checkSignature(walletNonce, signature);

        if (!isSignatureValid) {
          throw new Error("Invalid signature");
        }
        const user = await prisma.user.upsert({
          where: {
            address,
          },
          create: {
            address,
          },
          update: {},
        });
        return {
          id: user.id,
          address: user.address,
          wallet: wallet,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      return global.cacheUser.del(`nonce-${user.address}`);
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
