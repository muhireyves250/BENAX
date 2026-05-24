# BENAX

Next.js 16 fullstack storefront for BENAX — components, kits, and modules for IoT builders in Kigali.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **Tailwind CSS v4** with custom dark-navy + lavender design tokens
- **Prisma 7 + Postgres** via the generic `@prisma/adapter-pg` driver (works with Neon, Supabase, RDS, or local)
- **Auth.js v5** (Credentials, admin-only for now) with JWT sessions
- **Zustand** (cart, wishlist — `localStorage`-persisted) + **TanStack Query** for server state
- **Server Actions** for admin CRUD and checkout, with **file uploads** saved to `public/uploads/`

## Getting started

```bash
cp .env.example .env       # fill in DATABASE_URL, AUTH_SECRET, ADMIN_*
npm install
npm run db:push            # apply Prisma schema
npm run db:seed            # seed categories, sample products, admin user
npm run dev                # http://localhost:3000
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next dev server with Turbopack |
| `npm run build` / `start` | Production build / serve |
| `npm run db:push` | Push the Prisma schema to the database |
| `npm run db:migrate` | Create + apply a migration |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed initial data + admin user |
| `npm run lint` | ESLint |

## Layout

```
src/
  app/
    (auth)/login         Admin sign-in
    (shop)/              Storefront (home, products, categories, support)
    admin/               Admin dashboard, products, categories, orders
    api/auth/[...nextauth]
    checkout/            Cart → order flow
  components/
    cart, layout, product, ui
  lib/                   prisma client, image upload helper
  stores/                Zustand cart + wishlist
prisma/                  schema.prisma, seed.ts
public/uploads/          User-uploaded product images (gitignored)
```

## Notes

- Image uploads land in `public/uploads/` (PNG / JPEG / WEBP / GIF, up to 5 MB). The directory is gitignored except for `.gitkeep`. For production, swap `src/lib/uploads.ts` for object storage (S3, R2, Supabase Storage).
- Auth is admin-only by default. Regular customer accounts can be added by removing the `role !== "ADMIN"` check in `src/auth.ts`.
- Cart and wishlist are client-only and persisted to `localStorage` (see `src/stores/`).
