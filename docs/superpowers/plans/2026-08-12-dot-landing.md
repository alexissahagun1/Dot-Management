# DOT Landing Implementation Plan

> **For agentic workers:** Execute task-by-task against `docs/SPEC.md`. Visual lock: `mockups/html/` + `mockups/html/css/a.css`. Do not invent UI.

**Goal:** Ship a Next.js App Router site that is pixel-true to Billboard A and can send a briefing via Resend.

**Architecture:** Port `a.css` verbatim. Shared `Chrome` + `MenuDialog`. Copy lives in `src/lib/content.ts`. One Server Action for the form. Overlay is a dialog, not a route.

**Tech Stack:** Next.js latest (App Router, TS, Tailwind v4, `src/app`), `resend`, `clsx`, `next/font`, `next/image`.

---

### Task 1: Scaffold

- Create Next.js at repo root (`src/app`), keep `mockups/` and `docs/`.
- Deps: `resend`, `clsx`. No Lenis / lucide / framer-motion / sonner / shadcn.
- `.env.example` with `RESEND_API_KEY`, `CONTACT_TO`, `RESEND_FROM`.
- Copy `mockups/html/img/*` → `public/` (logos + photos).
- Port `a.css` → `src/app/billboard.css`. Point font families at `next/font` variables.

### Task 2: Content + fonts + layout

- `src/lib/content.ts` — all literal copy from the spec.
- `src/app/layout.tsx` — fonts, skip link, `Chrome`, metadata.
- `src/components/chrome.tsx` + `menu-dialog.tsx` + `lockup.tsx`.

### Task 3: Pages

- `/` `/about` `/services` `/contact` matching the HTML mockups.
- Contact form: Server Action + inline states.
- `sitemap.ts` / `robots.ts`.

### Task 4: Verify

- `npm run build` succeeds.
- Form validation unit-testable helper in `src/lib/contact.ts`.
