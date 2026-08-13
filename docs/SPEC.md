# DOT Management — product spec

**Status:** locked. Next.js clones this. It does not reinterpret it.

**Visual source of truth:** `mockups/html/{home,overlay,about,services,contact}.html` + `mockups/html/css/a.css` (system A — Billboard). Preview: `http://127.0.0.1:8767/home.html`.

**Copy language:** English on the site. Internal notes may be Spanish.

---

## 1. Product

DOT Management is a driver-management house founded in 2020. It supports young-driver careers from karting through GT3. The founder is Raúl Guzmán Marchina (About only — never on Home).

**Not in v1:** driver roster, i18n, Calendly, FAQ, stats, blog.

**Conversion:** one act — send a briefing. Instagram and email are secondary.

| Channel | Value |
|---|---|
| Instagram | https://instagram.com/dotmanagement_ |
| Email | info@dotsportsmanagement.com |

---

## 2. Routes

| Path | Page | Overlay current |
|---|---|---|
| `/` | Home | Home |
| `/about` | About | About |
| `/services` | Services | Services |
| `/contact` | Contact | Contact |

The menu is **not a route**. It is a full-viewport dialog on every page. Close returns to the page that opened it (not always Home). Escape and the X close it. Focus traps while open. `aria-current="page"` on the active link.

---

## 3. Visual world

Billboard A. Type is architecture. Dual-viewport: **390** and **1440** designed together.

| Token | Value |
|---|---|
| Carbon | `#0B0B0A` |
| Ink / paper | `#EDEAE3` |
| Red | `#F00000` |
| Display | Big Shoulders Display 800 |
| Body | Schibsted Grotesk 400 / 500 |
| Quote | Source Serif 4 italic 400 |
| Ease | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Break | `760px` (layout split) |

Type and space: the CSS custom properties in `mockups/html/css/a.css` (`--t-*`, `--pad-x`, `--lockup`, gaps). Port them verbatim.

`min-height: 100dvh`. Never `h-screen`. Touch targets ≥44px. Hover only under `@media (hover: hover) and (pointer: fine)`.

**Forbidden:** pills, cards, Lucide, shadcn, Relume, bento, glass, orbs, fake stats, FAQ, Calendly, Lenis, Framer Motion, Sonner, Inter / Montserrat / Geist / Space Grotesk.

---

## 4. Logo

Never typeset “DOT”. Never recolor the O. Never Image Trace.

| File | Use |
|---|---|
| `public/logo.png` | Black D/T. Home, About, overlay **desktop** (sits on the photo column). |
| `public/logo-ink.png` | Ink D/T, red O unchanged. Services, Contact, overlay **mobile** (carbon). |

No paper plate. Lockup is always a link to `/`. Width: `--lockup`.

---

## 5. Pages (copy is literal)

### Home `/`

Photo: Monaco Renault #85. Desktop `object-position: 18% 46%`. Mobile `58% 56%`. Veil: left+bottom desktop; bottom-weighted mobile. **No top darkening** (black D/T must read on the buildings).

```
Driver
management.
Timing is everything.
Send a briefing →     → /contact
Founded 2020 · We take the seat.
```

No `01`. No Raúl in the readable type. Hero `alt`: `Raúl Guzmán, Formula Renault 85, Monaco`. One `priority` image.

### About `/about`

Paper / photo split. Hamburger `is-dark` (carbon). Photo: Barcelona paddock, `object-position: 44% 12%`. Mobile: photo `44dvh` on top, then copy.

```
Raúl Guzmán Marchina
Mexican racing driver. Twelve years in Europe — karting, F4, Formula Renault, Formula Regional, Lamborghini Super Trofeo, GT3 and prototypes. Lamborghini Squadra Corse Driver Academy, 2020.

Karting            SKUSA
F4                 ITALY
Formula Renault    MONACO
Super Trofeo       LAMBORGHINI
GT3                PROTOTYPES
```

No row numbers. Hairlines edge-to-edge of the paper column.

### Services `/services`

Native `<details>`. First item open. Numbers `01–05` in red. Desktop: GT3 photo right. Mobile: no hero; On-Track open shows De la Torre strip.

| # | Title | Body |
|---|---|---|
| 01 | Driver Management | Contracts, calendar and career path. The decisions that keep a driver in the right seat at the right time. |
| 02 | Driver Coaching | On-track and simulator. Data, lines and the calls that win sessions. |
| 03 | Performance Partners | Engineers, physio, mental performance — the people around the car. |
| 04 | Branding & Commercial | Sponsors, image and the long commercial path of a career. |
| 05 | On-Track Support | Paddock, pit and radio. We are there when the session starts. |

### Contact `/contact`

Left column. Right half empty carbon. Title + form optically centered; Instagram/email pinned to the bottom.

```
Send a briefing.
Name
Category / series
Message
Send →
@dotmanagement_
info@dotsportsmanagement.com
```

Underline fields. No boxes. `Send →` is `type="submit"` in Big Shoulders. Inline success / error / sending under the button. **No toasts.**

### Overlay (dialog)

Desktop: 38% stills (Monaco / kart / GT3) + 62% carbon links. Mobile: type only. Links: Home, About, Services, Contact (sentence case). Footer: IG + email.

---

## 6. Form

Server Action (not a public JSON API unless needed). Resend.

| Env | Purpose |
|---|---|
| `RESEND_API_KEY` | Send |
| `CONTACT_TO` | Inbox (`info@dotsportsmanagement.com` default) |
| `RESEND_FROM` | Verified sender |

Validate: name, series, message — all required, trimmed, max 200 / 200 / 4000 chars. Honeypot field. On success: keep the page, show “Briefing sent.” On failure: “Could not send. Email info@dotsportsmanagement.com.”

---

## 7. Motion

Chrome and CTA: ≤300ms, `--ease`. Home stack and overlay links: `rise` 720ms / 560ms. `prefers-reduced-motion: reduce` kills those animations. Native scroll. **No Lenis.** GSAP only if a later scroll scene needs it; v1 is CSS.

---

## 8. SEO / a11y

- `next/font` for the three families (no render-blocking Google CSS).
- Titles: `DOT Management` / `About — DOT Management` / `Services — DOT Management` / `Contact — DOT Management`.
- `sitemap.ts`, `robots.ts`, `metadataBase` from `VERCEL_PROJECT_PRODUCTION_URL` or `https://dotsportsmanagement.com`.
- Skip link. Focus-visible 2px ink (carbon on About). `dialog` + `aria-modal` for the menu. One H1 per page.

---

## 9. Stack

`create-next-app@latest` App Router, TypeScript, Tailwind v4, `src/app`. Deps: `resend`, `clsx`. Reject: lenis, lucide, framer-motion, sonner, shadcn, R3F.

Billboard CSS ports `a.css` (do not restyle in Tailwind utilities). Tailwind is for app chrome we do not have yet — the site look is the ported stylesheet.

---

## 10. Acceptance

A reviewer at 390 and 1440 cannot tell the Next app from `mockups/html/` except: overlay is a dialog, the form sends, lockup/CTA are real links, fonts are `next/font`.
