# Brand assets — favicon, app icon y Open Graph (JammerShop)

Usar cuando el usuario invoque **`/brand-assets`** o pida crear el **icono de la web**, **favicon** u **Open Graph**.

## Objetivo

Generar y colocar los assets de marca de **JammerShop** con estética coherente al sitio: terminal/hacker, fondo oscuro, acento verde neón, tipografía monoespaciada. El motivo principal es una **antena de radio** (como el icono Lucide `antenna` del header).

## Brand brief (referencia obligatoria)

| Token | Valor | Uso |
|-------|-------|-----|
| Fondo | `#111111` | Base del sitio |
| Acento | `#88ff88` | Logo, icono, highlights |
| Acento hover | `#66dd66` | Variante más oscura |
| Peligro / marca | `#ff4444` | Solo la palabra **Jammer** en el wordmark (no en el favicon) |
| Texto | `#dddddd` | Copy secundario en OG |
| Fuente | Courier New / monospace | Wordmark en OG |

**Wordmark:** `Jammer` (rojo) + `Shop` (verde) — en favicon **no** incluir texto; solo símbolo.

**Evitar:** emojis, gradientes llamativos, estilo corporativo genérico, 3D glossy, colores azules (salvo Discord en UI, no en brand assets).

---

## Prompt maestro (contexto para cualquier generador)

Copiar como system/context antes de los prompts específicos:

```text
You are designing brand assets for "JammerShop", a dark-themed technical e-commerce site with a retro terminal / hacker aesthetic. Visual language: minimal, sharp, monospace-adjacent, high contrast on near-black background (#111111). Primary accent: neon green (#88ff88). Main symbol: a simple radio antenna icon (vertical mast with signal arcs), inspired by Lucide "antenna" — stroke-based, clean lines, no photorealism. No text in the favicon. No emojis. Flat or subtle depth only. Must remain readable at 16×16px for favicon and at thumbnail size for social previews.
```

---

## 1. Icono principal (source asset)

**Archivo destino:** `public/brand/icon-source.png` (512×512 px, PNG, fondo transparente o `#111111` sólido).

**Prompt (imagen — DALL·E, Midjourney, Ideogram, etc.):**

```text
App icon for "JammerShop", 512×512 pixels, square. Minimal radio antenna symbol centered: vertical pole with three curved signal waves on each side, stroke style like a technical line icon, neon green (#88ff88) on very dark gray background (#111111). Subtle thin border or inner glow optional. No text, no letters, no emoji. Flat vector-like design, high contrast, sharp edges, hacker terminal aesthetic. Safe margin 10% from edges so it scales down to favicon. PNG, clean alpha or solid dark background.
```

**Alternativa SVG (Cursor / diseño vectorial):**

```text
Create an SVG app icon 512×512 viewBox: dark rounded square background #111111 with 12px corner radius. Center a Lucide-style antenna icon: stroke #88ff88, stroke-width 2.5, round caps, no fill. Signal arcs symmetric left and right. Minimal padding. Export as public/brand/icon.svg. Must read clearly at 32px.
```

---

## 2. Favicon e iconos de navegador

Generar **desde** `icon-source.png` o `icon.svg` (no rediseñar).

| Archivo | Tamaño | Ubicación Next.js |
|---------|--------|-------------------|
| `favicon.ico` | 16, 32, 48 multi-size | `src/app/favicon.ico` |
| `icon.png` | 32×32 (o 512, Next redimensiona) | `src/app/icon.png` |
| `apple-icon.png` | 180×180 | `src/app/apple-icon.png` |

**Comando sugerido (ImageMagick):**

```bash
# Desde PNG 512×512 en public/brand/icon-source.png
convert public/brand/icon-source.png -resize 32x32 src/app/icon.png
convert public/brand/icon-source.png -resize 180x180 src/app/apple-icon.png
convert public/brand/icon-source.png -define icon:auto-resize=16,32,48 src/app/favicon.ico
```

**Prompt de revisión (opcional):**

```text
Review this 32×32 favicon: is the antenna silhouette still recognizable? Are edges crisp on #111111? If not, simplify strokes and increase contrast between #88ff88 and background.
```

Next.js App Router detecta automáticamente `src/app/favicon.ico`, `icon.png` y `apple-icon.png` — no hace falta importarlos en `layout.tsx`.

---

## 3. Open Graph + Twitter Card

**Archivo destino:** `src/app/opengraph-image.png` (1200×630 px) y opcionalmente el mismo archivo como `src/app/twitter-image.png`.

**Prompt (imagen):**

```text
Open Graph social preview image, 1200×630 pixels, landscape. Dark background #111111 with very subtle grid or scanline texture (barely visible). Left third: large neon green (#88ff88) antenna icon, stroke style, same as app icon. Right two thirds: text layout — title "JammerShop" in monospace font: word "Jammer" in red #ff4444, "Shop" in green #88ff88, large and bold. Subtitle below in gray #aaaaaa: "Real devices • real tutorials • no bullshit". Small tagline at bottom in dim gray #888888: "Educational and testing use only". Thin neon green horizontal line accent under header area. No product photos, no emojis, no clutter. Professional terminal aesthetic, readable when scaled to small card preview.
```

**Variante minimal (solo símbolo + nombre):**

```text
OG image 1200×630, centered composition. Dark #111111 background. Center: green antenna icon above wordmark "JammerShop" (Jammer red, Shop green), monospace. Subtle green border frame inset 24px. Minimal, high contrast, no extra elements.
```

Next.js sirve `opengraph-image.png` y `twitter-image.png` desde `app/` y los enlaza en metadata automáticamente.

---

## 4. Metadata en código (después de crear assets)

Actualizar `src/lib/seo/metadata.ts` — añadir Open Graph explícito si se quiere control fino (opcional si los PNG están en `app/`):

```ts
openGraph: {
  type: "website",
  locale: "en_US",
  siteName: "JammerShop",
  title: "Jammer Shop – Real Jammers & DIY",
  description:
    "Pre-built jammers and DIY tutorials. PayPal orders, Discord ticket delivery.",
  // images: auto from src/app/opengraph-image.png
},
twitter: {
  card: "summary_large_image",
  title: "Jammer Shop – Real Jammers & DIY",
  description:
    "Real devices, real tutorials. Pre-built jammers and step-by-step DIY guides.",
},
```

Comprobar en producción que `NEXT_PUBLIC_SITE_URL` apunta al dominio real (afecta URLs absolutas de OG).

---

## 5. Checklist de entrega

- [ ] `src/app/favicon.ico` — legible en pestaña del navegador
- [ ] `src/app/icon.png` — 32×32 o 512×512
- [ ] `src/app/apple-icon.png` — 180×180
- [ ] `src/app/opengraph-image.png` — 1200×630
- [ ] (Opcional) `src/app/twitter-image.png` — mismo OG o variante cuadrada
- [ ] `pnpm run build` sin errores
- [ ] Probar: [opengraph.xyz](https://www.opengraph.xyz/) o Discord embed con URL de preview
- [ ] Contraste del icono verde sobre `#111111` suficiente en modo claro/oscuro del SO

---

## 6. Commits sugeridos

Ver `.cursor/commands/auto-commit.md`:

```text
feat(app): add favicon app icon and open graph brand assets
docs(brand): add brand asset generation prompts
```

---

## Resumen para el agente

1. Usar los **prompts de las secciones 1–3** tal cual (inglés) en el generador de imágenes o para dibujar SVG.
2. Exportar tamaños indicados y colocar en **`src/app/`** según convención Next.js.
3. Opcional: ampliar `metadata.ts` con `openGraph` / `twitter`.
4. Verificar build y preview social.
5. **No** usar emojis en assets ni en UI; coherencia con `ICONS.md` y tema en `globals.css`.
