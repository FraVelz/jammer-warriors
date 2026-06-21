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

**No usar `git commit` directamente** si Cursor puede inyectar `Co-authored-by: Cursor`. Preferir `git commit-tree`:

```bash
# 1. Stage changes
git add <paths>

# 2. Write message (subject only, no Co-authored-by)
cat > /tmp/commit-msg.txt <<'EOF'
feat(shop): improve responsive layout and add 404 page
EOF

# 3. Commit without AI co-author trailer
TREE=$(git write-tree)
PARENT=$(git rev-parse HEAD)
NEW=$(git commit-tree "$TREE" -p "$PARENT" -F /tmp/commit-msg.txt)
git reset --hard "$NEW"
git log -1 --format=%B
```

Solo si `git commit-tree` no aplica (commit vacío, etc.), usar:

```bash
git commit -m "$(cat <<'EOF'
feat(shop): migrate shop sections with SVG icons

EOF
)"
```

y **verificar** con `git log -1 --format=%B`. Si aparece `Co-authored-by: Cursor`, reescribir ese commit con `commit-tree` antes de `git push`.

## Co-autor Cursor — prohibido

- **Nunca** incluir `Co-authored-by: Cursor` ni ningún trailer de IA/IDE.
- **Nunca** usar `--trailer "Co-authored-by:..."`.
- Antes de `git push`, comprobar: `git log -10 --format=%B | rg Co-authored` (debe no devolver nada).
- Si el historial remoto ya tiene esos trailers, reescribir con `commit-tree` (oldest→newest) y `git push -f` solo cuando el usuario lo pida.

- Si un hook rechaza: corregir y **nuevo** commit; no `--no-verify` salvo petición explícita.

## Verificación sugerida

```bash
pnpm run lint
pnpm run build
```

## Resumen para el agente

- Diff + log antes de redactar.
- Mensaje en **inglés**; respuesta al usuario en **español**.
- **Prohibido** `Co-authored-by: Cursor` o cualquier co-autor de IA — usar `git commit-tree`, no confiar en `git commit --amend`.
