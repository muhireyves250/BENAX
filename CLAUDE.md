# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project location

The active project lives in [`benax-next/`](./benax-next/). The legacy Vite SPA that used to live at the repo root has been removed; do all work inside `benax-next/`.

See `benax-next/AGENTS.md` for stack-specific notes (Next.js 16 has breaking changes — consult `node_modules/next/dist/docs/` before assuming any API).

## Commands (run from `benax-next/`)

- `npm run dev` — Next.js dev server (Turbopack)
- `npm run build` / `npm start` — production build & serve
- `npm run lint` — ESLint
- `npm run db:generate` / `db:push` / `db:migrate` / `db:studio` / `db:seed` — Prisma CLI wrappers

There is no test runner configured.

## Architecture (big picture)

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 (CSS `@theme`) + Prisma 7 + Auth.js v5 + TanStack Query + Zustand.

**Database:** Generic `postgresql` Prisma provider via the `pg` driver adapter (`@prisma/adapter-pg`) — provider-agnostic (Neon URL works without Neon-specific SDKs). `prisma.config.ts` is required by Prisma 7 (the `url` was removed from `schema.prisma`).

**Route groups:**
- `app/(shop)/` — public storefront under `MainLayout`-equivalent (Navbar + Footer + CartDrawer). Pages: home `/`, `/products`, `/products/[id]`, `/categories`, `/support`. Server components read directly from Prisma.
- `app/(auth)/login/` — admin-only login. Form posts a Server Action (`actions.ts`) that calls `signIn("credentials", …)`.
- `app/admin/` — admin dashboard. Layout guards by calling `auth()` and rejecting non-`ADMIN` sessions; also protected by `src/proxy.ts` (Next 16's renamed `middleware.ts`).
- `app/checkout/` — auth-required Server Action that creates `Order` + `OrderItem` rows in a Prisma transaction and decrements stock.

**Auth:** `src/auth.config.ts` is the edge-safe config consumed by `proxy.ts`; `src/auth.ts` extends it with the Credentials provider (bcrypt + Prisma, Node-only). Sessions are JWT-based with a `role` claim; the `authorize` callback rejects any user whose `role !== 'ADMIN'` (regular users can't sign in yet).

**Client state:**
- `src/app/providers.tsx` wraps the tree in `SessionProvider` + `QueryClientProvider` + `ThemeProvider`, and runs `ZustandHydrator` to call `persist.rehydrate()` after mount (because the stores use `skipHydration: true` for SSR safety).
- `src/stores/useCartStore.ts` and `useWishlistStore.ts` persist to `localStorage` (`benax_cart`, `benax_wishlist`). Cart and wishlist are client-only — no server tables.

**Design system:** Material-3-style palette + spacing + fonts are declared in `src/app/globals.css` under `@theme`. Use those tokens (`bg-primary`, `text-on-surface`, `p-md`, `font-headline`, etc.) instead of raw hex/spacing for theme consistency. Dark mode is class-based via `@custom-variant dark (&:where(.dark, .dark *))`.

**Folder conventions in `benax-next/src/`:**
- `app/` — route handlers, layouts, pages, Server Actions co-located with their page (e.g. `app/admin/products/actions.ts`)
- `components/ui|layout|product|cart/` — shared components, organized by surface
- `lib/prisma.ts` — Prisma singleton with `PrismaPg` adapter
- `stores/` — Zustand stores
- `types/` — shared TS types; `next-auth.d.ts` augments Session/JWT with `role`/`id`
