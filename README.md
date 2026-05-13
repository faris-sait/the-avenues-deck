# The Avenues — Interactive Sales Deck

A browser-based, Digideck-style interactive sales deck for **[The Avenues, Kuwait](https://www.the-avenues.com/)** — the world's #2 largest shopping mall by GLA. Built for the Liat.ai screening assignment.

**Live URL:** <vercel-preview-url — replace before submission>

## What's distinct

Slide 1 opens with a cream **paper invitation pinned to the viewport**. The viewer drags across it and a Verlet-cloth simulation (ported from [dissimulate/Tearable-Cloth](https://github.com/dissimulate/Tearable-Cloth)) shreds the paper, revealing the cinematic hero behind. From there the deck is pure Digideck polish: 8 video-anchored sections, an interactive 12-district map, and a working luxury sub-module at `/prestige` demonstrating the expandable architecture.

A 14-second idle timer gracefully fades the overlay if a viewer doesn't drag; a "Skip intro" button is always visible; `prefers-reduced-motion` bypasses the animation entirely.

## Tech stack

- **Next.js 16** (App Router) · React 19 · TypeScript
- **Tailwind CSS 4** (`@theme` tokens, no separate config file)
- **Framer Motion** for section transitions
- **Vitest** for unit tests (cloth physics + content shape + form validation)
- **Resend** (Zod-validated inquiry form, server route)
- **Vercel** for hosting

## Setup

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Environment variables (optional)

The inquiry form on the "Take Action" section works without configuration — it just logs payloads to the console. To actually send emails via Resend:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `INQUIRY_RECIPIENT` | Email address that should receive form submissions (defaults to `leasing@example.com`) |

Add these in **Vercel → Project Settings → Environment Variables**, then redeploy.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server on `:3000` |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm test` | Vitest run |
| `npm run lint` | Next.js lint |

## Project structure

```
app/
  api/contact/route.ts            POST /api/contact — Zod-validated, Resend-backed
  prestige/{layout,page}.tsx      Phase-2 deep-dive sub-module
  layout.tsx                      Fonts + theme
  page.tsx                        Single-page deck stitching all sections
components/
  hero/                           Verlet cloth + tearable invitation
  nav/                            TopNav + ProgressRail
  sections/                       9 deck sections + SectionShell wrapper
  ui/                             Kpi, VideoTile, PaperCard
content/
  districts.ts                    Source of truth for all 12 districts
  kpis.ts                         Source of truth for KPIs (every claim cites a URL)
lib/
  cloth-sim/                      Headless Verlet physics (Point, Constraint, Cloth) + tests
  motion.ts                       Framer Motion presets
```

## Design decisions

| Decision | Why |
|---|---|
| Tearable paper only on slide 1 | Memorable hook, but doesn't fight content legibility on the sales sections |
| Verlet cloth ported to TS, dynamically imported | Type safety + smaller initial bundle for future routes |
| `prefers-reduced-motion` short-circuits the hero; 14s idle fade; skip-intro button | Accessibility — never trap a viewer |
| Typed `content/*.ts` over a CMS | YAGNI for a deck; every numeric claim cites a source URL inline |
| Scroll-snap + Framer Motion, not full-page transitions | Brief calls for non-linear navigation — journey is reader-led |
| 12 districts each have a sub-module slot; only Prestige built in this submission | Demonstrates expandable architecture per the brief's Phase 2 |
| Tailwind 4 `@theme` tokens (no `tailwind.config.ts`) | Single-source design tokens in CSS, idiomatic for Tailwind 4 |

## AI tools used

| Tool | What for |
|---|---|
| **Claude** (Anthropic) | Product reasoning, copywriting, all code in `lib/`, `components/`, sections, route handlers |
| **agent-browser CLI** (Vercel Labs) | Headless Chrome verification during development — drag interaction + screenshot testing |
| **Midjourney / Imagen** *(planned)* | Paper texture for the cloth veil; section divider plates; activation concept render |
| **Topaz / Real-ESRGAN** *(planned)* | Upscaling lower-resolution press photos when sourced |
| **Runway / Veo** *(optional)* | Cinematic B-roll where official Avenues reels don't cover a beat |

See [`docs/ASSETS.md`](./docs/ASSETS.md) for the asset catalogue and licenses.

## What I'd add with more time

- **Source real Avenues video reels and stills** — the deck currently uses placeholder posters that render as charcoal rectangles; visual impact jumps once real reels land
- **AVIF / WebP image pipeline** — Next/Image and `<picture>` fallbacks once posters exist
- Build out the other 11 district sub-modules following the `/prestige` template
- Mobile-portrait polish pass (currently desktop + tablet only)
- Arabic localization (RTL) — Kuwait is bilingual
- "Compare to your city" interactive surfacing the closest GCC airport to the prospect
- Per-tenant deep-link presets so a sales rep can share `/prestige?tenant=maison-x` and the deck arrives pre-framed

## Submission

Email to `medi@liat.ai` with: live URL + this repo URL + optional 1-page write-up.

## Credits

- Tearable cloth physics adapted from [dissimulate/Tearable-Cloth](https://github.com/dissimulate/Tearable-Cloth) — Verlet integration
- Content references: [The Avenues (Wikipedia)](https://en.wikipedia.org/wiki/The_Avenues_(Kuwait)), [The Avenues official site](https://www.the-avenues.com/kuwait/en/about), [Gensler project page](https://www.gensler.com/projects/the-avenues), [List of largest malls (Wikipedia)](https://en.wikipedia.org/wiki/List_of_largest_shopping_malls)
- Fonts: Fraunces (display) + Inter (body) via `next/font/google`
