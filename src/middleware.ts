// import { auth } from "./lib/auth";

export async function middleware() {
  // const session = await auth();
  // console.log("session", session);
  // return;
}

export const config = {
  matcher: "/dashboard/:path*",
};
