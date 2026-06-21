# Autocommit (Conventional Commits — jammer-warriors)

Usar cuando el usuario pida **hacer commit**. Ver también `.cursor/rules/git-commits.mdc`.

## Directorio de trabajo

Todos los comandos `git` se ejecutan desde la **raíz** de `jammer-warriors/` (donde está el `.git`).

## Cuándo ejecutar

- El usuario invoca **`/auto-commit`** o pide explícitamente **commit** / **autocommit**.
- **No** crear commits si el usuario no lo pidió.

## Antes de commitear

En paralelo:

1. `git status` — incluye archivos sin seguimiento (`??`).
2. `git diff` y, si aplica, `git diff --staged`.
3. `git log -15 --oneline` — tono reciente.
4. **Respetar borrados:** no restaurar líneas o archivos eliminados salvo petición explícita.

**No** incluir secretos (`.env`, `.env.local`).

## Mensajes

**Simples, descriptivos y en inglés** (imperativo: `add`, `fix`, `update`).

## Tipos y scopes habituales

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad o pantalla |
| `fix` | Bug o regresión |
| `refactor` | Sin cambio de comportamiento observable |
| `style` | Solo CSS/markup |
| `docs` | README, ICONS.md |
| `chore` | Tooling, `.cursor/` |
| `build` | Next config, PostCSS, ESLint |

| Scope | Cuándo |
|-------|--------|
| `shop` | `src/features/shop/` |
| `legal` | `src/features/legal/` |
| `icons` | `src/components/icons/` |
| `app` | `src/app/` |
| `config` | next.config.ts, tsconfig, ESLint |
| `cursor` | `.cursor/` |

## Crear el commit

```bash
git commit -m "$(cat <<'EOF'
feat(shop): migrate shop sections with SVG icons

EOF
)"
```

- Si un hook rechaza: corregir y **nuevo** commit; no `--no-verify` salvo petición explícita.
- Sin `Co-authored-by:` de IA (ver `.cursor/rules/git-commits.mdc`).

## Verificación sugerida

```bash
pnpm run lint
pnpm run build
```

## Resumen para el agente

- Diff + log antes de redactar.
- Mensaje en **inglés**; respuesta al usuario en **español**.
- Sin trailers de coautoría de IA.
