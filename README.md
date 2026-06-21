# Jammer Warriors (JammerShop)

[![CI](https://github.com/FraVelz/jammer-warriors/actions/workflows/ci.yml/badge.svg)](https://github.com/FraVelz/jammer-warriors/actions/workflows/ci.yml)

Next.js storefront for pre-built jammers and DIY tutorials. PayPal + Discord ticket workflow.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Icons: Lucide SVG (vendored via icons0 MCP)
- ESLint, Prettier, react-doctor

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable                     | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_PAYPAL_EMAIL`   | PayPal payment email                          |
| `NEXT_PUBLIC_DISCORD_INVITE` | Discord server invite URL                     |
| `NEXT_PUBLIC_DELIVERY_FEE`   | Flat delivery fee (EUR)                       |
| `NEXT_PUBLIC_SITE_URL`       | Canonical site URL (SEO, sitemap, Open Graph) |

## Scripts

```bash
pnpm dev            # development server
pnpm build          # production build
pnpm lint           # ESLint
pnpm typecheck      # TypeScript
pnpm format:check   # Prettier
pnpm react:doctor   # React Doctor audit
```

## CI

GitHub Actions runs on every push/PR to `main`:

- ESLint (`pnpm lint`)
- Prettier (`pnpm format:check`)
- TypeScript (`pnpm typecheck`)
- Production build (`pnpm build`)

Workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

## Deploy

Vercel: `pnpm install && pnpm run build`

Set these **Environment Variables** in the Vercel project (Production + Preview). They are baked in at build time:

| Variable                     | Required | Notes                                             |
| ---------------------------- | -------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Yes      | Must match the public domain (e.g. custom domain) |
| `NEXT_PUBLIC_PAYPAL_EMAIL`   | Yes      | Shown on the storefront                           |
| `NEXT_PUBLIC_DISCORD_INVITE` | Yes      | Ticket / delivery link                            |
| `NEXT_PUBLIC_DELIVERY_FEE`   | Yes      | Flat fee in EUR                                   |

If `NEXT_PUBLIC_SITE_URL` is missing in production, the build falls back to `VERCEL_URL`. Use an explicit URL when you have a custom domain so sitemap, canonical and Open Graph stay correct.

Copy from [`.env.example`](./.env.example) as a starting point.

## Security & dependencies

- Production responses include security headers (CSP, HSTS, `X-Frame-Options`, etc.) via [`next.config.ts`](./next.config.ts).
- Run `pnpm audit` periodically. A moderate PostCSS advisory may appear via `next` (`next>postcss@8.4.31`); it is bundled inside Next.js and is mitigated when upstream releases a patched version — overrides in this repo do not replace that copy.
- PayPal amounts are shown client-side only (manual checkout); verify payments against Discord tickets operationally.

See [ICONS.md](./ICONS.md) for icon attribution.
