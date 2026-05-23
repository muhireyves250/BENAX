# BENAX

E-commerce storefront for components, kits and modules. Next.js 16 + Prisma + Postgres + Auth.js.

The active project lives in [`benax-next/`](./benax-next/).

## Quick start

```bash
cd benax-next
cp .env.example .env   # then fill in DATABASE_URL and AUTH_SECRET
npm install
npm run db:push        # sync Prisma schema to your Postgres
npm run db:seed        # categories, products, and an admin user
npm run dev
```

Then visit http://localhost:3000.

The seed admin uses `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`. Only `ADMIN` users can sign in at `/login` for now.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19
- Tailwind v4 (CSS-based `@theme`)
- Prisma 7 with the generic `pg` driver adapter (any Postgres works)
- Auth.js v5 (Credentials, JWT sessions, admin-only)
- TanStack Query for server-state caching, Zustand (`persist` + `skipHydration`) for client-only cart/wishlist

See [`CLAUDE.md`](./CLAUDE.md) for architecture notes and `benax-next/AGENTS.md` for Next 16 gotchas.
