# The Avenues — Interactive Sales Deck

A browser-based, Digideck-style interactive sales deck for **[The Avenues, Kuwait](https://www.the-avenues.com/)** — the world's #2 largest shopping mall by GLA. Built for the Liat.ai screening assignment.

**Live URL:** https://the-avenues-deck1.vercel.app

**Repository:** https://github.com/faris-sait/the-avenues-deck

## Submission snapshot

- Browser-based, non-linear sales deck built for screen-share and self-guided exploration
- Cinematic autoplay hero, interactive district map, and dedicated `/prestige` deep-dive module
- Clear business-action paths for leasing, sponsorship, and event bookings
- Branded Resend inquiry flow with production-ready HTML email template
- Built and iterated with AI-assisted design, engineering, debugging, and browser QA

## What's distinct

The deck is a single-page, Digideck-style scroll: a cinematic hero, immersive media-led sections, an interactive 12-district map, and a working luxury sub-module at `/prestige` demonstrating the expandable architecture.

## Tech stack

- **Next.js 16** (App Router) · React 19 · TypeScript
- **Tailwind CSS 4** (`@theme` tokens, no separate config file)
- **Framer Motion** for section transitions
- **Vitest** for unit tests (content shape + form validation)
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
  hero/                           Cinematic hero section
  nav/                            TopNav + ProgressRail
  sections/                       9 deck sections + SectionShell wrapper
  ui/                             Kpi, VideoTile, PaperCard
content/
  districts.ts                    Source of truth for all 12 districts
  kpis.ts                         Source of truth for KPIs (every claim cites a URL)
lib/
  motion.ts                       Framer Motion presets
```

## Design decisions

| Decision | Why |
|---|---|
| Typed `content/*.ts` over a CMS | YAGNI for a deck; every numeric claim cites a source URL inline |
| Scroll-snap + Framer Motion, not full-page transitions | Brief calls for non-linear navigation — journey is reader-led |
| 12 districts each have a sub-module slot; only Prestige built in this submission | Demonstrates expandable architecture per the brief's Phase 2 |
| Sales CTAs split into `lease`, `sponsor`, and `book` paths | Maps the deck directly to the assignment's three commercial outcomes |
| Branded email handoff via Resend | Keeps the prospect experience polished all the way from deck exploration to inquiry follow-up |
| Tailwind 4 `@theme` tokens (no `tailwind.config.ts`) | Single-source design tokens in CSS, idiomatic for Tailwind 4 |

## AI and supporting tools used

| Tool | What for |
|---|---|
| **Claude Opus 4.7** | Product reasoning, design iteration, copywriting, feature implementation, section architecture, and README polish |
| **GPT 5.4** | Bug fixing, code review, implementation cleanup, and targeted problem-solving across autoplay, invitation, and responsive behavior |
| **agent-browser CLI** (Vercel Labs) | Headless Chrome verification during development — screenshot testing |
| **FFmpeg** | Generated a lightweight looping Prestige atrium reel from official still photography to strengthen the deck's video-first storytelling |

See [`docs/ASSETS.md`](./docs/ASSETS.md) for the asset catalogue and licenses.

## What I'd add with more time

- Add dedicated sub-modules for sponsorship, event booking, and high-opportunity districts beyond `/prestige`
- Source more official motion assets so `Events`, `Grand Avenue`, and `SoKu` become even more video-led
- Ship a measured mobile-specific performance pass targeted at Lighthouse mobile bottlenecks
- Add Arabic localization (RTL) for Kuwait-specific stakeholder audiences
- Add shareable deep links like `/prestige?tenant=maison-x` for sales-rep-tailored conversations

## Verification

- `npm run lint`
- `npm test`
- `npm run build`
- Browser QA performed with `agent-browser` across desktop, tablet/mobile viewport checks, invitation flow, autoplay behavior, and CTA paths

## Credits

- Content references: [The Avenues (Wikipedia)](https://en.wikipedia.org/wiki/The_Avenues_(Kuwait)), [The Avenues official site](https://www.the-avenues.com/kuwait/en/about), [Gensler project page](https://www.gensler.com/projects/the-avenues), [List of largest malls (Wikipedia)](https://en.wikipedia.org/wiki/List_of_largest_shopping_malls)
- Fonts: Fraunces (display) + Inter (body) via `next/font/google`
