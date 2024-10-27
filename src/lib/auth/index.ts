import NextAuth from "next-auth";
import authConfig from "./config";

export const { auth, handlers, signOut, signIn } = NextAuth(authConfig);
