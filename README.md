```
███████╗ ██████╗ ██████╗  ██████╗ ███████╗     █████╗ ██╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝    ██╔══██╗██║
█████╗  ██║   ██║██████╔╝██║  ███╗█████╗      ███████║██║
██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝      ██╔══██║██║
██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗    ██║  ██║██║
╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚═╝
```

<div align="center">

**Turn any product idea into a full, structured product plan — in under 60 seconds.**

[![Deployment](https://img.shields.io/badge/Vercel-Deployed-brightgreen?logo=vercel&logoColor=white)](https://forge-ai-nine-zeta.vercel.app)
[![Framework](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Powered by Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev)
[![Database](https://img.shields.io/badge/Database-Neon%20PostgreSQL-00e599?logo=postgresql&logoColor=white)](https://neon.tech)

[🚀 Live Demo](https://forge-ai-nine-zeta.vercel.app) · [🎬 Product Video](https://forge-ai-nine-zeta.vercel.app/demo) · [💰 Pricing](https://forge-ai-nine-zeta.vercel.app/pricing) · [📖 Docs](#getting-started)

</div>

---

## What is FORGE AI?

FORGE AI is an AI-powered product workspace that takes a raw idea ("a habit tracker for friends") and instantly produces a full product plan: target personas, feature scope, user flows, wireframes, tech stack recommendations, a launch roadmap, landing page copy, and an interactive build-mode component map — all in one unified interface.

No templates. No blank pages. Just describe your idea and start building.

---

## Features

| Feature | Description |
|---|---|
| 🧠 **AI Product Planner** | 8 AI-generated sections from a single idea prompt |
| 👥 **Persona Builder** | Detailed target-user profiles with goals, pain points, and behaviours |
| 🗺️ **Feature Scope** | Core vs. stretch features with priorities and technical risk |
| 🔄 **User Flows** | Step-by-step interaction flows, edge cases, and empty states |
| 🖼️ **Wireframes** | AI-described screen layouts with visual hierarchy guidance |
| ⚙️ **Tech Stack Advisor** | Opinionated stack recommendations with tradeoff explanations |
| 🚀 **Launch Roadmap** | Phased go-to-market plan with KPIs and distribution channels |
| ✍️ **Landing Copy** | Hero headline, feature bullets, and social proof copy |
| 🔨 **Build Mode** | Interactive React Flow component map + ER diagram |
| ♻️ **Regenerate** | Re-run any individual section with one click |
| 📤 **Markdown Export** | Export any section as Markdown |
| 🔁 **Provider Fallback** | Gemini → Anthropic → OpenAI → Mock — never a dead end |

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16.2.4 (App Router) | Full-stack React framework |
| **Language** | TypeScript 5.x | End-to-end type safety |
| **Styling** | Tailwind CSS v4 + CSS variables | Design tokens + utility classes |
| **Animation** | Framer Motion | Page transitions, whileInView |
| **State** | Zustand + persist | Client-side project store |
| **Database** | Neon PostgreSQL (serverless) | Persistent project storage |
| **ORM** | Prisma 6.x | Type-safe DB client + migrations |
| **Primary AI** | Google Gemini 2.5 Flash | All AI generation |
| **AI Fallback 1** | Anthropic Claude | Secondary provider |
| **AI Fallback 2** | OpenAI GPT-4o | Tertiary provider |
| **AI Fallback 3** | Mock provider | Local dev / offline |
| **Validation** | Zod | AI response schema enforcement |
| **Diagrams** | @xyflow/react v12 | Build Mode component map |
| **Icons** | Lucide React | UI icon set |
| **Deployment** | Vercel | CI/CD + edge runtime |

---

## Project Structure

```
ForgeAI/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout — SEO metadata, fonts, StoreHydration
│   ├── page.tsx                  # Marketing landing page (hero, features, pricing preview)
│   ├── dashboard/page.tsx        # Authenticated project list
│   ├── demo/page.tsx             # In-browser animated demo (Web Speech + Web Audio)
│   ├── pricing/page.tsx          # Pricing page (Free / Pro / Team)
│   ├── settings/page.tsx         # Account, Notifications, Billing, Privacy tabs
│   ├── privacy/page.tsx          # Privacy Policy (static, server component)
│   ├── terms/page.tsx            # Terms of Service (static, server component)
│   ├── projects/
│   │   ├── new/page.tsx          # Idea intake form (idea, platform, goal)
│   │   ├── [projectId]/page.tsx  # Workspace — sidebar + section switcher
│   │   └── [projectId]/build-mode/page.tsx  # React Flow component + ER diagrams
│   └── api/
│       ├── ai/generate/route.ts  # POST /api/ai/generate — provider router entry
│       └── projects/
│           ├── route.ts          # GET/POST /api/projects
│           └── [projectId]/
│               ├── route.ts               # GET/PATCH/DELETE a project
│               ├── generate/route.ts      # Trigger full project generation
│               ├── export/route.ts        # Export section as Markdown
│               └── sections/[sectionType]/route.ts  # CRUD for individual sections
├── components/
│   ├── layout/
│   │   ├── marketing-nav.tsx     # Sticky nav — transparent → white on scroll
│   │   ├── marketing-footer.tsx  # Dark footer with link columns
│   │   ├── workspace-sidebar.tsx # Section navigation rail
│   │   └── workspace-topbar.tsx  # Project title + action bar
│   ├── sections/                 # One component per AI section type
│   │   ├── overview-section.tsx
│   │   ├── personas-section.tsx
│   │   ├── scope-section.tsx
│   │   ├── flows-section.tsx
│   │   ├── wireframes-section.tsx
│   │   ├── stack-section.tsx     # includes normalizeStack() for Gemini nesting
│   │   ├── launch-section.tsx
│   │   ├── landing-copy-section.tsx
│   │   └── section-empty-state.tsx
│   └── store-hydration.tsx       # Zustand skipHydration — prevents SSR mismatch
├── lib/
│   ├── ai/
│   │   ├── orchestrator.ts       # Coordinates multi-section generation
│   │   ├── router.ts             # Provider selection + fallback chain
│   │   ├── types.ts              # Shared AI input/output types
│   │   ├── providers/
│   │   │   ├── gemini.ts         # Google Gemini 2.5 Flash
│   │   │   ├── anthropic.ts      # Anthropic Claude
│   │   │   ├── openai.ts         # OpenAI GPT-4o
│   │   │   └── mock.ts           # Deterministic mock (offline/dev)
│   │   ├── prompts/              # Prompt strings per section per role
│   │   │   ├── system.ts         # Shared system prompt
│   │   │   ├── strategist/       # overview, personas, scope, flows, launch
│   │   │   ├── architect/        # stack, build-mode
│   │   │   └── copywriter/       # landing-copy
│   │   └── validators/
│   │       └── index.ts          # Zod schemas — all fields .optional().default()
│   ├── db/prisma.ts              # Singleton Prisma client
│   ├── store/project-store.ts    # Zustand store — projects + sections
│   ├── visual-artifacts.ts       # React Flow node/edge builders for Build Mode
│   ├── seed-data.ts              # Demo project seed
│   └── utils.ts                  # cn() and shared helpers
├── prisma/
│   └── schema.prisma             # DB schema — User, Project, ProjectSection, etc.
├── types/
│   └── project.ts                # Core TypeScript interfaces
├── public/                       # Static assets
├── prisma.config.ts              # Prisma config (datasource URL for CLI)
├── .env.example                  # Required environment variables
└── package.json
```

---

## Database Schema

```
┌──────────────────┐       ┌──────────────────────┐
│      User        │       │       Project         │
├──────────────────┤       ├──────────────────────┤
│ id (cuid)    PK  │──┐    │ id (cuid)        PK  │
│ email        UQ  │  └───▶│ userId           FK  │
│ name             │       │ title                │
│ createdAt        │       │ rawIdea              │
│ updatedAt        │       │ goal                 │
└──────────────────┘       │ preferredPlatform    │
                           │ status               │
                           │ createdAt            │
                           │ updatedAt            │
                           └──────────┬───────────┘
                                      │ 1
                          ┌───────────┼──────────────┐
                          │           │              │
                          ▼ *         ▼ *            ▼ *
              ┌───────────────┐  ┌──────────┐  ┌──────────────┐
              │ProjectSection │  │  AIJob   │  │ProjectExport │
              ├───────────────┤  ├──────────┤  ├──────────────┤
              │ id        PK  │  │ id   PK  │  │ id       PK  │
              │ projectId FK  │  │projectId │  │ projectId FK │
              │ sectionType   │  │ section  │  │ section      │
              │ status        │  │ provider │  │ format       │
              │ content JSON  │  │ status   │  │ content      │
              │ version       │  │ error    │  │ createdAt    │
              │ generatedAt   │  │ createdAt│  └──────────────┘
              └───────────────┘  └──────────┘

Section types: overview | personas | scope | flows | wireframes |
               stack | launch | landing-copy | build-mode
```

---

## Auth Flow

> Auth is scaffolded (User model + settings UI present). Full NextAuth integration is on the roadmap. Currently, project data persists in Zustand localStorage with optional DB sync.

```
User visits /projects/new
         │
         ▼
    [Idea Form]
    title + platform + goal
         │
         ▼
    POST /api/projects
    ─────────────────
    Creates Project row in DB
    Initialises ProjectSection rows (status: pending)
    Returns { projectId }
         │
         ▼
    Redirect → /projects/[projectId]
         │
         ▼
    Workspace loads
    Zustand store hydrates from localStorage
    Missing sections upserted from DB
         │
         ▼
    User clicks "Generate" on any section
         │
         ▼
    POST /api/ai/generate
    ─────────────────────
    router.ts picks provider (Gemini → Anthropic → OpenAI → Mock)
    Prompt assembled from lib/ai/prompts/
    Response validated with Zod schema
    Validated content saved to DB via ProjectSection upsert
    Zustand store updated optimistically
         │
         ▼
    Section component re-renders with content
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm / pnpm / yarn
- PostgreSQL database (recommend [Neon](https://neon.tech) — free tier works)
- Google AI API key (Gemini 2.5 Flash)

### 1 — Clone

```bash
git clone https://github.com/roszhan2684/ForgeAI.git
cd ForgeAI
npm install
```

### 2 — Environment variables

Copy the example and fill in your values:

```bash
cp .env.example .env.local
```

```env
# Database (Neon PostgreSQL connection string)
DATABASE_URL="postgresql://user:password@host/forgeai?sslmode=require"

# AI Providers (only GEMINI_API_KEY is required — others enable fallback)
GEMINI_API_KEY="AIza..."
ANTHROPIC_API_KEY="sk-ant-..."          # optional
OPENAI_API_KEY="sk-..."                  # optional

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3 — Database setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to your database (creates all tables)
npx prisma db push

# (Optional) Open Prisma Studio to inspect data
npx prisma studio
```

### 4 — Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5 — Build for production

```bash
npm run build
npm start
```

---

## One-click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Froszhan2684%2FForgeAI&env=DATABASE_URL,GEMINI_API_KEY,NEXT_PUBLIC_APP_URL&envDescription=Required%20environment%20variables%20for%20FORGE%20AI&project-name=forge-ai&repository-name=ForgeAI)

After deploying, run `npx prisma db push` against your production `DATABASE_URL` to initialise the schema.

---

## Design System — Colour Tokens

| Token | Hex | Usage |
|---|---|---|
| `--forge-blue` | `#2563eb` | Primary CTA, links, active states |
| `--forge-blue-light` | `#eff4ff` | Icon backgrounds, chip fills |
| `--forge-blue-mid` | `#dbeafe` | Hover highlights |
| `--forge-surface` | `#f8f8f9` | Page background |
| `--forge-card` | `#ffffff` | Card backgrounds |
| `--forge-border` | `#e5e7ed` | Dividers, input borders |
| `--forge-text` | `#0f1117` | Primary text |
| `--forge-text-secondary` | `#374151` | Labels, secondary headings |
| `--forge-text-muted` | `#6b7280` | Captions, placeholders |
| `--primary` | `#2563eb` | Tailwind primary alias |
| `--destructive` | `#dc2626` | Error / danger states |
| `--radius` | `0.75rem` | Global border-radius base |
| gradient | `#2563eb → #7c3aed` | CTAs, badges, Pro plan card |

---

## Testing

```bash
# Run the AI provider smoke test
node scripts/test-ai.mjs
```

| Test | Status |
|---|---|
| Gemini 2.5 Flash connection | ✅ |
| Zod schema validation — overview | ✅ |
| Zod schema validation — stack | ✅ |
| Zod schema validation — scope | ✅ |
| Provider fallback chain | ✅ |
| `normalizeStack()` nested-key unwrap | ✅ |
| Mock provider (offline) | ✅ |

> Unit and integration test suite (Vitest) is on the roadmap.

---

## Roadmap

- [x] 8 AI-generated product sections
- [x] Provider fallback chain (Gemini → Anthropic → OpenAI → Mock)
- [x] Build Mode with React Flow diagrams
- [x] Markdown export per section
- [x] Marketing site (landing, pricing, demo, legal)
- [x] Settings UI (account, billing, notifications, privacy)
- [x] Neon PostgreSQL persistence
- [x] Vercel deployment with CI/CD
- [ ] NextAuth authentication (Google + GitHub OAuth)
- [ ] Stripe billing integration (Pro / Team plans)
- [ ] Vitest unit + integration test suite
- [ ] Real-time collaboration (shared workspaces)
- [ ] Section version history + diff view
- [ ] PDF export (full product plan)
- [ ] Slack / Notion export integration
- [ ] Mobile-responsive workspace

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes following the conventions below
4. Commit: `git commit -m "feat: describe your change"`
5. Push: `git push origin feat/your-feature`
6. Open a Pull Request against `main`

### Conventions

- **TypeScript** — all new code must be typed; avoid `any`
- **Components** — prefer inline `style` objects (consistent with existing codebase)
- **AI sections** — new sections need: prompt in `lib/ai/prompts/`, Zod schema in `lib/ai/validators/index.ts`, and a component in `components/sections/`
- **Framer Motion** — `transition` objects must only use `{ duration, delay }` — no `ease` property (TypeScript strict mode rejects bezier arrays)
- **No comments** — self-documenting names are preferred; only add a comment for a non-obvious invariant

---

## License

MIT © 2025 FORGE AI

---

<div align="center">
  <strong>Built with FORGE AI · <a href="https://forge-ai-nine-zeta.vercel.app">forge-ai-nine-zeta.vercel.app</a></strong>
</div>
