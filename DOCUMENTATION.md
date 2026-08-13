# DOT Management — decisions

Site copy is English. Internal notes can be Spanish.

## System

**A — Billboard.** Type is architecture, not a caption. Dual-viewport: 390 and 1440 designed together. Native scroll. No Lenis, Lucide, shadcn, pills, cards, glass, or fake stats.

## Type

- Display: Big Shoulders Display 800
- Body: Schibsted Grotesk 400
- Quotes: Source Serif 4 italic 400
- Sentence case. Tight leading on display (`0.78–0.86`). Tracking tightens as size grows (`-0.046em` on the home H1).
- Fluid scale 390→1440 (Utopia-style clamps in `mockups/html/css/a.css`).

## Space

- Shared `--pad-x` for logo, type, and hamburger — one left axis.
- Home stack: H1 → italic quote → **Send a briefing →** (red hairline, links to Contact) → proof (`Founded 2020 · We take the seat.`). No Raúl on Home. No sector `01`.
- Lockup is a link to Home on every page.
- Home desktop veil is left + bottom only. No top darkening — black D/T sit on the Monaco buildings.
- Contact is a left column; the right half of desktop is empty carbon. Instagram/email pin to the bottom.
- About and Services hairlines run edge-to-edge of the column; type stays on `--pad-x`.
- About list is category left / series right. Numbers only on Services `01–05`, where they mark a real sequence.

## Logo

Pixel-identical PNG. Never typeset “DOT”. Two files: `logo.png` (black D/T) on paper and light photos; `logo-ink.png` (ink D/T, red O unchanged) on carbon. Overlay uses black on the photo column, ink on mobile carbon. No paper plate. Always linked to Home.

## Photos

Home: Monaco Renault #85. Overlay: Monaco + kart + GT3. About: Barcelona paddock. Services: GT3 desktop; De la Torre strip on mobile On-Track.

## Next

HTML mockup in `mockups/html/` is the lock. Spec in `docs/SPEC.md`. Next.js clones this, it does not reinterpret it.

## Adversarial UI pass (2026-08-12)

The overlay is a dialog on top of the current page, not a route. It must paint **opaque carbon** (stills + nav) so Home/About never bleed through. Page root `#page` is `inert` while open; Tab cycles chrome + menu; Escape restores the hamburger. Photos are the frame (`img.bg` / `img.full` / `img.hero` / stills as grid children) — same as the HTML mockup — so Tailwind preflight and `next/image` `fill` cannot collapse them. Billboard CSS is the look; Tailwind preflight is not imported. Dev indicator off so it does not cover proof/email.

Hamburger is three lines that morph to an X (180ms, `--ease`) — not a DOM swap. Overlay fades in 220ms and **out** 180ms (`shown` stays mounted so the exit can play). About sets `data-surface="paper"` so the browser chrome (scrollbar, color-scheme) matches the paper column. Favicon / apple-touch use the sacred red O on carbon; OG is Monaco. Autofill, caret, selection, and tap-highlight are themed. Instagram opens in a new tab.

`rise` animates `translate` + `opacity`, never `transform`, so `:active { scale(0.97) }` on the Home CTA actually fires. Verify with `node scripts/motion-check.mjs` (needs Playwright).

## Scroll (2026-08-12)

Home was a single locked poster (`overflow: hidden` + fixed photo), so the wheel did nothing and the only way out was the hamburger. `/` is now a native vertical stack of the four billboards (Home → About → Services → Contact). The hamburger is a jump list, not the only path: on `/` it scrolls to the section; `/about`, `/services`, and `/contact` stay as standalone posters for share/SEO. Chrome lockup and hamburger color follow the visible board. One `h1` on `/` (Home); the other titles drop to `h2`. Photos are `position: absolute` inside each board so Monaco does not stick behind the rest of the page. No Lenis, no fullpage snap.

## Density (2026-08-12)

The first Next pass cloned four posters and felt like a prototype: unused frames sat in `mockups/html/img/`, career was five vague rows, clicks snapped. v1.1 keeps Billboard A and fills it.

- **Photos in play:** Monaco, kart, F4 (Raúl + pole wheel), paddock, Huracán on track, GT3, pit-lane De la Torre. F4 and track were in the mockup folder and never shipped.
- **The house** sits under Home: founded 2020, karting → GT3 ladder, Bologna · Mexico, three stills with captions.
- **About** is a real career (Italian F4 3rd 2016 through Italian GT) plus a two-frame film. No invented roster.
- **Services** copy is specific; `<details>` open with a grid reveal (280ms) instead of a display snap.
- **Contact** has a briefing note and the track photo on the right. 404 is the same type: “Out of the session.”
- **Click motion:** overlay links shift, CTA / Send translate, hamburger and buttons `scale(0.97)`, route changes fade (`RouteFade` 220ms), images in house/film ease to `1.045` on hover. `prefers-reduced-motion` still kills it.

## Adversarial pass (2026-08-13)

A 7/10 came from motion that could not fire and chrome that lagged the lockup. `rise` is `backwards` so CTA/overlay hover translate runs. Services is uncontrolled native `<details>` with `::details-content` height 280ms. Chrome follows the board under the lockup. Home no longer clips the proof. On `/` the CTA scrolls to Contact. Raúl portraits stay on About; House stills are kart / Monaco / GT3.

```bash
npm install
cp .env.example .env.local
npm run dev
```

