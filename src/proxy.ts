// Next.js 16 renamed middleware → proxy. Wires Auth.js' edge-safe
// `authorized` callback so /admin/* requires an ADMIN session (see auth.config.ts).
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
