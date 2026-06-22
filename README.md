# Jammer Warriors (JammerShop)

[![CI](https://github.com/FraVelz/jammer-warriors/actions/workflows/ci.yml/badge.svg)](https://github.com/FraVelz/jammer-warriors/actions/workflows/ci.yml)

Next.js storefront for pre-built jammers and DIY tutorials. PayPal or Stripe checkout + Discord ticket delivery.

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

| Variable                   | Description                                                     |
| -------------------------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_PAYPAL_EMAIL` | PayPal payment email                                            |
| `NEXT_PUBLIC_DELIVERY_FEE` | Flat delivery fee (EUR)                                         |
| `NEXT_PUBLIC_SITE_URL`     | Canonical site URL (SEO, sitemap, Open Graph)                   |
| `STRIPE_SECRET_KEY`        | Stripe secret key (server only; enables card checkout when set) |

Discord invite URL is managed in the **admin panel** (`/admin`) and stored in Firestore — not via env vars.

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

| Variable                   | Required | Notes                                                            |
| -------------------------- | -------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Yes      | Must match the public domain (e.g. custom domain)                |
| `NEXT_PUBLIC_PAYPAL_EMAIL` | Yes      | Shown on the storefront                                          |
| `NEXT_PUBLIC_DELIVERY_FEE` | Yes      | Flat fee in EUR                                                  |
| `STRIPE_SECRET_KEY`        | No       | Enables Stripe Checkout when set (`sk_test_...` / `sk_live_...`) |

Discord invite URL: configure once in `/admin` (requires Firebase Admin env vars).

If `NEXT_PUBLIC_SITE_URL` is missing in production, the build falls back to `VERCEL_URL`. Use an explicit URL when you have a custom domain so sitemap, canonical and Open Graph stay correct.

Copy from [`.env.example`](./.env.example) as a starting point.

### Stripe (optional)

1. Create a [Stripe](https://stripe.com) account and enable EUR payments.
2. Copy the **Secret key** (`sk_test_...` for test mode) to `STRIPE_SECRET_KEY` in `.env.local` and Vercel.
3. Test locally with card `4242 4242 4242 4242` (any future expiry/CVC).

Prices are computed server-side from the product catalog; no Stripe Products setup required.

## Security & dependencies

- Production responses include security headers (CSP, HSTS, `X-Frame-Options`, etc.) via [`next.config.ts`](./next.config.ts).
- Run `pnpm audit` periodically. PostCSS is pinned to `8.5.15` via `overrides` in [`pnpm-workspace.yaml`](./pnpm-workspace.yaml) (pnpm v11+ reads overrides there, not in `package.json`).
- PayPal amounts are shown client-side (manual checkout). Stripe amounts are validated server-side; verify all orders against Discord tickets operationally.

See [ICONS.md](./ICONS.md) for icon attribution.
