import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config (no bcrypt, no Prisma).
 * Used by proxy.ts and anywhere that may run on the Edge runtime.
 * The Credentials provider with its bcrypt-based authorize lives in
 * `auth.ts`, which extends this config and runs on Node.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "ADMIN";
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLogin = nextUrl.pathname === "/login";

      if (isOnAdmin) {
        if (isLoggedIn && isAdmin) return true;
        return false; // redirect to /login (via pages.signIn)
      }
      if (isOnLogin && isLoggedIn) {
        const dest = isAdmin ? "/admin" : "/";
        return Response.redirect(new URL(dest, nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },
  providers: [], // Real providers added in auth.ts (Node runtime only)
} satisfies NextAuthConfig;
