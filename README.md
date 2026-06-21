# Jammer Warriors (JammerShop)

Next.js storefront for pre-built jammers and DIY tutorials. PayPal + Discord ticket workflow.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Icons: Lucide SVG (vendored via icons0 MCP)

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_PAYPAL_EMAIL` | PayPal payment email |
| `NEXT_PUBLIC_DISCORD_INVITE` | Discord server invite URL |
| `NEXT_PUBLIC_DELIVERY_FEE` | Flat delivery fee (EUR) |

## Scripts

```bash
pnpm dev        # development server
pnpm build      # production build
pnpm lint       # ESLint
pnpm typecheck  # TypeScript
```

## Deploy

Vercel: `pnpm install && pnpm run build`

See [ICONS.md](./ICONS.md) for icon attribution.
