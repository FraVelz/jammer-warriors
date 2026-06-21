# Auditoría global de problemas (`/problems-search`)

## Cuándo ejecutar

- El usuario invoca **`/problems-search`** o pide auditoría global del repositorio.

## Comprobaciones automáticas

- `pnpm run lint`
- `pnpm run build`
- `pnpm run typecheck`

## Áreas a revisar

1. **Infra:** `package.json`, `next.config.ts`, `.env*` en git.
2. **App Router:** layouts, rutas, metadata, `'use client'` vs server.
3. **Shop:** productos, modal de compra, env vars.
4. **Legal:** `/privacy`, `/terms`, `/refunds` completas.
5. **Iconos:** sin emojis; SVG en `src/components/icons/`.
6. **Estilos:** tokens JammerShop en `globals.css`.

## Resumen para el agente

- Repo **jammer-warriors** (Next.js storefront).
- No aplicar fixes masivos sin que el usuario lo pida.
