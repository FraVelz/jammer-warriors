# Auditoría web — SEO, accesibilidad, UX/UI y seguridad (`/auditoria-web`)

## Cuándo ejecutar

- El usuario invoca **`/auditoria-web`** o pide una auditoría enfocada en **SEO**, **accesibilidad (a11y)**,
  **experiencia UI/UX** o **seguridad** de JammerShop.
- Complementa **`/problems-search`** (auditoría global de build, arquitectura, CI, etc.); este comando **no** sustituye
  esa revisión amplia, sino que profundiza en calidad percibida por usuarios, buscadores y superficie de ataque.
- **No** implica corregir nada salvo petición explícita posterior; primero **inventariar, evidenciar y priorizar**.

## Alcance del proyecto

Aplica al repo **`jammer-warriors`** (raíz del workspace). App Next.js 16 en `src/app/` — tienda **JammerShop**
(jammers prearmados + tutoriales DIY). Storefront de una sola página con rutas legales.

| Ruta        | Página / feature                         | Audiencia        |
| ----------- | ---------------------------------------- | ---------------- |
| `/`         | `ShopPage` — catálogo, DIY, compra       | Compradores      |
| `/privacy`  | `PrivacyPage`                            | Legal / confianza |
| `/terms`    | `TermsPage`                              | Legal / confianza |
| `/refunds`  | `RefundsPage`                            | Legal / confianza |

Stack relevante para la auditoría: **PayPal manual** (email público), **Discord** (ticket + entrega), datos estáticos
en `src/features/shop/data/`, iconos SVG vendoreados, **sin API routes** ni backend de pagos integrado.

## Objetivo

Entregar un informe **accionable** en cuatro ejes, ordenado por **prioridad** (P0→P3) e **impacto en producción**:

1. **SEO** — indexación, metadata, enlaces, rendimiento percibido por crawlers.
2. **Accesibilidad** — WCAG 2.2 orientativo (teclado, foco, contraste, semántica, lectores de pantalla).
3. **UI/UX** — flujo de compra (explorar → modal → PayPal → Discord), estados de error, móvil/desktop.
4. **Seguridad** — headers, secretos/env, enlaces externos, dependencias; superficie mínima (sitio estático).

## Qué debe hacer el asistente

1. **Comprobaciones automáticas** (sin saltar hooks ni alterar git config):
   - `pnpm run lint`
   - `pnpm run typecheck`
   - `pnpm run build` con las mismas vars que CI (`.github/workflows/ci.yml`):
     `NEXT_PUBLIC_PAYPAL_EMAIL`, `NEXT_PUBLIC_DISCORD_INVITE`, `NEXT_PUBLIC_DELIVERY_FEE`, `NEXT_PUBLIC_SITE_URL`
   - `pnpm audit` (CVE en dependencias; reportar solo hallazgos reales)
   - Opcional si aporta valor: `pnpm run format:check`
2. **Revisión dirigida del código** según las checklists de cada eje (abajo).
3. **Evidencia obligatoria**: cada hallazgo cita archivo/ruta, línea aproximada o salida de comando. Hipótesis → marcar
   _posible_ y qué comprobaría (p. ej. contraste en runtime, Lighthouse manual).
4. **No inventar problemas** ni extrapolar CVE sin salida de `pnpm audit` o fuente verificable.
5. **No commitear ni pushear** salvo petición explícita.
6. **Respetar** `.cursor/rules/component-scope.mdc` e `.cursor/rules/information.mdc` (sin emojis en UI; iconos en
   `src/components/icons/`).

### Alcance opcional del usuario

Si el usuario indica **ruta**, **feature** o **sección** (`@`, URL, «solo modal de compra», «solo legal»), acotar la
revisión pero mantener el formato del informe en las cuatro secciones (puede haber «Sin hallazgos» en un eje).

---

## Escala de prioridad

| Nivel  | Etiqueta | Criterio orientativo                                                                                        |
| ------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| **P0** | Crítico  | XSS/inyección, secretos de servidor expuestos, datos de pago manipulables server-side (N/A si no hay API). |
| **P1** | Alto     | SEO roto en `/` o legales, a11y que impide completar compra, modal roto, email PayPal incorrecto en prod.   |
| **P2** | Medio    | Sin `robots.ts`/`sitemap.ts`, OG incompleto, foco/contraste débil, fricción UX notable, headers mejorables. |
| **P3** | Bajo     | Mejoras de copy SEO, micro-interacciones, nitpicks de a11y sin bloqueo, hardening opcional.                 |

---

## 1. SEO

### Global y configuración

- `src/app/layout.tsx` — `metadata`, `viewport`, `lang` del `<html>`, `@vercel/analytics`.
- `src/lib/seo/metadata.ts` — `rootLayoutMetadata()`, `generateShopMetadata()`, `metadataBase` + `NEXT_PUBLIC_SITE_URL`.
- `src/lib/seo/legal-metadata.ts` — metadata por ruta legal (`/privacy`, `/terms`, `/refunds`).
- **Ausencia actual** de `src/app/robots.ts`, `src/app/sitemap.ts` — revisar como gap P2 mínimo.
- **Ausencia** de imágenes OG/Twitter en `src/app/` o `public/` — revisar impacto en compartidos sociales.
- `next.config.ts` — headers de caché estática; sin `images` config (no hay `next/image` hoy).
- Variables: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PAYPAL_EMAIL`, `NEXT_PUBLIC_DISCORD_INVITE`, `NEXT_PUBLIC_DELIVERY_FEE`
  — documentadas en README o `.env.local` de referencia; CI usa `https://example.com` como URL de build.

### Páginas (prioridad de revisión)

- Tienda: `src/app/page.tsx` → `src/features/shop/pages/ShopPage.tsx`.
- Legales: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/refunds/page.tsx` y contenido en
  `src/features/legal/content/`.
- 404: `src/app/not-found.tsx` — UX y metadata (¿title/description propios?).
- Datos estáticos: `src/features/shop/data/products.ts`, `diy-tutorials.ts`, `site-config.ts`.
- Enlaces internos: `ShopHeader`, `ShopFooter`, `LegalCrossLinks`, anclas `#products`, `#diy`, `#delivery`, `#contact`.

### Checklist SEO

- [ ] Una sola `<h1>` semántico por página; en `/` está en `ShopHeader`; en legales en `LegalPageLayout`.
- [ ] `title` y `description` únicos por ruta (`/`, `/privacy`, `/terms`, `/refunds`); no solo metadata global.
- [ ] `canonical` / URLs absolutas vía `metadataBase` + `NEXT_PUBLIC_SITE_URL` en producción (no `localhost` ni `example.com`).
- [ ] Open Graph / Twitter Card — valorar P2 si no existen (`og:title`, `og:description`, `og:image`, `locale`).
- [ ] `robots` y sitemap — crear o documentar intención si faltan; incluir `/`, `/privacy`, `/terms`, `/refunds`.
- [ ] Enlaces internos desde header/footer hacia legales y anclas de sección; sin `href="#"` vacíos en CTAs principales.
- [ ] Iconos decorativos vs informativos — hoy son SVG inline vía `<Icon />`; sin `alt` en imágenes raster (no hay product photos).
- [ ] JSON-LD (`Organization`, `Product`) — valorar P3 en storefront estático sin URLs de producto individuales.
- [ ] Core Web Vitals indirectos: página client-heavy (`ShopPage` `'use client'`), fuentes del sistema, Analytics no bloqueante.
- [ ] Coherencia idioma: copy en inglés vs `lang="en"` en layout; metadata en inglés.

---

## 2. Accesibilidad (a11y)

### Áreas críticas

- Layout: `src/components/layout/PageShell.tsx` — landmark `<main>` por defecto.
- Header/nav: `src/features/shop/components/ShopHeader.tsx` — anclas y enlace legal.
- Catálogo: `src/features/shop/components/ProductGrid.tsx`, `DiySection.tsx`, `FeatureList.tsx`.
- Compra: `src/features/shop/components/PurchaseModal.tsx`, `src/features/shop/hooks/usePurchaseFlow.ts`.
- Instrucciones: `src/features/shop/components/OrderInstructions.tsx`, `DeliveryNote.tsx`.
- Legal: `src/features/legal/components/LegalPageLayout.tsx`, `LegalWarning.tsx` — TOC, cross-links.
- Footer/contacto: `src/features/shop/components/ShopFooter.tsx`.
- Iconos: `src/components/icons/Icon.tsx`, `icon-map.ts` — ¿`aria-hidden` en decorativos?
- 404: `src/app/not-found.tsx`.
- Estilos: `src/app/globals.css` — tokens `js-*`, botones `.js-btn-primary`, contraste accent sobre fondo oscuro.

### Checklist a11y

- [ ] Navegación completa por **teclado** (Tab, Shift+Tab, Enter, Escape en modal de compra).
- [ ] **Foco visible** en botones y enlaces; modal no usa Radix — verificar trap de foco y retorno al disparador.
- [ ] `PurchaseModal`: overlay con `role="presentation"`; dialog con `aria-labelledby`; cierre con Escape en overlay
      (¿foco atrapado dentro del dialog?).
- [ ] Controles icon-only con `aria-label` (cerrar modal tiene label; revisar iconos en cards y nav).
- [ ] Checkbox de términos en modal: label asociado, estado `disabled` del CTA cuando no aceptado.
- [ ] Botones vs enlaces: `<button>` para «buy now»; `<a href>` para Discord y rutas legales.
- [ ] Contraste texto/fondo (objetivo WCAG AA 4.5:1) — `text-js-text-dim`, `#777`, `#aaa` sobre `js-bg` → marcar _posible_.
- [ ] `prefers-reduced-motion`: animación `animate-pulse` en 404 — respetar media query.
- [ ] Landmark `<main>` vía `PageShell`; header/footer semánticos donde aplique.
- [ ] Legales: nav «On this page» con anclas `#section-id`; jerarquía `h1` → `h2` en secciones.
- [ ] Enlaces externos (Discord) con `rel="noopener noreferrer"` cuando `target="_blank"`.

---

## 3. UI/UX

### Flujos a evaluar (happy path + errores)

| Flujo              | Rutas / código principal                                              |
| ------------------ | --------------------------------------------------------------------- |
| Primera visita     | `/` → scroll secciones → elegir producto o DIY                        |
| Compra producto    | «buy now» → `PurchaseModal` → aceptar términos → scroll a instrucciones |
| Compra DIY         | `DiySection` → modal → PayPal → Discord ticket                        |
| Post-pago          | `OrderInstructions`, email PayPal, enlace Discord en modal e instrucciones |
| Legal / confianza  | `/terms`, `/privacy`, `/refunds`, `LegalWarning` en home              |
| Contacto           | `ShopFooter` / `ContactSection`                                       |
| 404                | `not-found.tsx` → volver a tienda                                     |

### Checklist UX/UI

- [ ] **Jerarquía visual** clara: precio + delivery fee, CTA «buy now» distinguible en cards.
- [ ] **Modal de compra**: pasos PayPal → Discord comprensibles; total visible antes de confirmar.
- [ ] **Estados del CTA**: botón deshabilitado sin aceptar términos; feedback al confirmar (scroll a `#order-instruction`).
- [ ] **Estados vacíos y error** — N/A catálogo estático; 404 con CTAs claros.
- [ ] **Móvil**: tap targets ≥ 44px en botones y nav; sin overflow horizontal; modal usable en pantalla pequeña.
- [ ] **Consistencia**: tokens Tailwind semánticos (`js-*` en `globals.css`); sin emojis (solo `<Icon />`).
- [ ] **Copy** claro en inglés; advertencias legales visibles (`LegalWarning`, términos en modal).
- [ ] **Config degradada**: defaults en `site-config.ts` si faltan env vars — ¿aceptable en prod vs dev?
- [ ] **Anclas** `#products`, `#diy`, etc. — scroll y nav coherente desde `ShopHeader`.
- [ ] **Legales**: TOC, cross-links, «back to shop»; fecha «Last updated» visible.
- [ ] Flujo manual PayPal+Discord: fricción esperada pero sin pasos ambiguos o email Discord rotos.

---

## 4. Seguridad

### Configuración y superficie

- `next.config.ts` — headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`;
      revisar ausencia de **CSP** y **HSTS** (prod en Vercel) como P2–P3.
- **Sin** `src/app/api/` — no hay webhooks ni checkout server-side; riesgo principal en cliente y env públicas.
- `src/features/shop/data/site-config.ts` — solo vars `NEXT_PUBLIC_*`; defaults hardcodeados (PayPal, Discord) visibles en bundle.
- Dependencias: salida de `pnpm audit`.
- `.env*` no deben estar en git (`.gitignore`); CI no usa secretos de servidor.
- Contenido legal sensible (dispositivos RF): copy de responsabilidad del usuario, no bypass de compliance.

### Checklist seguridad

- [ ] Sin secretos de servidor en repo ni en `NEXT_PUBLIC_*` indebidos (solo email PayPal e invite Discord son públicos por diseño).
- [ ] Enlaces externos con `rel="noopener noreferrer"` en Discord y cualquier `target="_blank"`.
- [ ] Headers de seguridad presentes en todas las rutas (`next.config.ts`).
- [ ] Sin `dangerouslySetInnerHTML` con input de usuario (storefront estático — verificar legal content).
- [ ] Dependencias sin CVE críticos sin mitigar (`pnpm audit`).
- [ ] Manipulación de precio en cliente no altera cobro real (PayPal manual — usuario envía monto mostrado; documentar riesgo operativo P3).
- [ ] Analytics (`@vercel/analytics`) — sin PII en eventos custom (hoy solo pageviews por defecto).

Para revisión profunda de diff local: sugerir skill **`/review-security`** si el usuario lo pide después.

---

## Formato del informe (obligatorio)

Responder en **español**, con esta estructura:

```markdown
## Resumen ejecutivo

- Hallazgos por eje: SEO (n), A11y (n), UX (n), Seguridad (n).
- P0: … | P1: … | P2: … | P3: …
- 1–3 frases: qué atacar primero y por qué.

## SEO

### P0 / P1

- [ ] **Título** — ruta — impacto — fix sugerido (1 línea)

### P2 / P3

…

## Accesibilidad

### P0 / P1

…

### P2 / P3

…

## UI/UX

### P0 / P1

…

### P2 / P3

…

## Seguridad

### P0 / P1

…

### P2 / P3

…

## Comprobaciones ejecutadas

- `pnpm run lint` — OK / fallos
- `pnpm run typecheck` — OK / fallos
- `pnpm run build` — OK / fallos
- `pnpm audit` — OK / CVE listados
- (otros)

## Áreas sin hallazgos relevantes

- Breve lista opcional por eje.
```

### Reglas del informe

- Máximo **~20–30 ítems** con impacto real; agrupar nitpicks en un bullet por eje en P3.
- Si un eje está limpio, decirlo explícitamente.
- Separar **problema** de **recomendación**; la recomendación en la misma línea o sub-bullet corto.
- Priorizar hallazgos en **página principal y flujo de compra** (home → modal → PayPal/Discord).

---

## Resumen para el agente

- Auditoría **focalizada** en SEO, a11y, UX/UI y seguridad de **JammerShop** (storefront estático, PayPal + Discord).
- Ejecutar lint, typecheck, build y `pnpm audit`; revisar metadata, modal de compra, legales y headers con evidencia.
- Informe en cuatro secciones + prioridad P0→P3; **no** aplicar fixes masivos sin petición.
- Auditoría amplia (CI, arquitectura, deuda): derivar a **`/problems-search`**.
