# DOT Management SEO + LLMSEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task by task.

**Goal:** Improve technical SEO and LLM discoverability for DOT Management while leaving every rendered heading, paragraph, layout, style, interaction, and media item unchanged.

**Architecture:** Add a server-only SEO source of truth for the production origin, route metadata, structured data, and LLM documents. Treat the existing long-form homepage as the sole canonical page, keep `/about`, `/services`, and `/contact` as direct-entry views, and validate the rendered output with a dependency-free HTTP contract test.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript, Next Metadata API, Metadata Routes, static Route Handlers, JSON-LD, Node.js built-in `fetch` and `node:assert`.

---

## Constraints and Baseline

- Work in the current dirty tree because it contains the already-published visual/media work.
- Never reset, checkout, delete, or reformat unrelated user changes.
- Record `git status --short` before and after implementation.
- Stage and commit only the exact SEO/LLM files named in each task.
- Do not modify visible content or any CSS/component layout.
- Use `https://dotsportsmanagement.com` as the only canonical origin.
- The owner-confirmed claims may appear in `/llms-full.txt`; do not repeat the adjective `leading` outside existing visible copy.

## Task 1: Add a failing rendered-SEO contract test

**Files:**

- Create: `scripts/seo-check.mjs`
- Modify: `package.json`

- [ ] Create a dependency-free Node script that accepts `ORIGIN` (default `http://127.0.0.1:3000`) and `EXPECT_INDEX` (default `false`).
- [ ] Fetch `/`, `/about`, `/services`, `/contact`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt`.
- [ ] Assert HTTP 200 and the correct MIME family for HTML, plain text, and XML resources.
- [ ] For every HTML route, assert the exact title and description below, exactly one canonical pointing to `https://dotsportsmanagement.com`, matching `og:url`, exact Open Graph/Twitter title and description, `twitter:card=summary_large_image`, `<html lang="en">`, exactly one `<h1>`, and the expected robots indexing policy.

```js
const pages = {
  "/": {
    title: "Motorsport Driver Management | DOT Management",
    description:
      "DOT Management provides international motorsport driver management, coaching and career development from karting through professional racing.",
  },
  "/about": {
    title: "About DOT Management & Raul Guzman",
    description:
      "Learn about DOT Management and founder Raul Guzman, combining professional racing experience with strategic driver development and career support.",
  },
  "/services": {
    title: "Driver Management Services | DOT Management",
    description:
      "Explore DOT Management services: driver management, coaching, performance partners, brand and commercial guidance, and on-track support.",
  },
  "/contact": {
    title: "Contact DOT Management | Driver Representation",
    description:
      "Contact DOT Management to discuss driver representation, coaching, career development, commercial guidance or on-track motorsport support.",
  },
};
```

- [ ] Parse the homepage JSON-LD and assert a connected `@graph`: stable Organization, WebSite, Person, ContactPoint, WebPage, ItemList, and five Service IDs; verify `founder`, `worksFor`, `contactPoint`, `isPartOf`, `about`, `mainEntity`, and every service `provider` reference.
- [ ] Assert the three duplicate route pages do not emit JSON-LD.
- [ ] Assert the sitemap contains exactly one `<loc>https://dotsportsmanagement.com</loc>`.
- [ ] Assert `llms.txt` and `llms-full.txt` contain the canonical origin, official email, the five visible service names, and no use of `leading`.
- [ ] Add `"seo:check": "node scripts/seo-check.mjs"` to `package.json`.
- [ ] Start the current app with `npm run dev -- --hostname 127.0.0.1 --port 3000` and run `npm run seo:check`; confirm it fails on the first old title/metadata assertion before implementation.
- [ ] Commit only the test harness and script entry:

```bash
git add scripts/seo-check.mjs package.json
git commit -m "test: add rendered SEO contract checks"
```

## Task 2: Build the shared SEO source of truth

**Files:**

- Create: `src/lib/seo.ts`
- Create: `src/components/json-ld.tsx`

- [ ] Export immutable constants for the brand, canonical origin, canonical homepage, Open Graph image, route metadata, and stable schema IDs.
- [ ] Export `isIndexableDeployment`, returning true for Vercel production and for a local production server, false for Vercel preview/development and local development.

```ts
export const isIndexableDeployment =
  process.env.VERCEL_ENV === "production" ||
  (!process.env.VERCEL_ENV && process.env.NODE_ENV === "production");
```

- [ ] Export a typed `buildPageMetadata(page)` helper. Use `title.absolute` to prevent the root template from appending a second brand name. Every route must canonicalize to the homepage and include its exact page title/description in Open Graph and Twitter metadata.
- [ ] Reuse `/opengraph-image.jpg` and set `openGraph.type = "website"`, `siteName = "DOT Management"`, `locale = "en_GB"`, the canonical homepage URL, and `twitter.card = "summary_large_image"`.
- [ ] Build a single homepage JSON-LD `@graph` with these stable IDs:

```text
https://dotsportsmanagement.com/#organization
https://dotsportsmanagement.com/#website
https://dotsportsmanagement.com/#raul-guzman
https://dotsportsmanagement.com/#contact
https://dotsportsmanagement.com/#webpage
https://dotsportsmanagement.com/#services
https://dotsportsmanagement.com/#service-driver-management
https://dotsportsmanagement.com/#service-driver-coaching
https://dotsportsmanagement.com/#service-performance-partners
https://dotsportsmanagement.com/#service-brand-and-commercial
https://dotsportsmanagement.com/#service-on-track-support
```

- [ ] Model relationships precisely: `Organization.founder -> Person`, `Organization.contactPoint -> ContactPoint`, `Person.worksFor -> Organization`, `WebPage.isPartOf -> WebSite`, `WebPage.about -> Organization`, `WebPage.mainEntity -> Organization/Person/ItemList/ContactPoint`, and each `Service.provider -> Organization`.
- [ ] Derive the five Service names/descriptions from `src/lib/content.ts` so schema and visible services cannot drift. Curate neutral organization/person copy and omit `leading`.
- [ ] Export builders for `llms.txt` and `llms-full.txt`. Keep them English-only and factual. The full file may include the confirmed Europe-since-2014, Lamborghini, and advisor-experience statements.
- [ ] Implement `JsonLd` as a server component using a native `<script type="application/ld+json">` and `JSON.stringify(data).replace(/</g, "\\u003c")`.
- [ ] Run `npx tsc --noEmit` and confirm no diagnostics.
- [ ] Commit only these two files:

```bash
git add src/lib/seo.ts src/components/json-ld.tsx
git commit -m "feat: add shared SEO and schema model"
```

## Task 3: Apply canonical metadata without changing UI

**Files:**

- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/contact/page.tsx`

- [ ] Replace the environment-derived `metadataBase` with the canonical origin from `src/lib/seo.ts`.
- [ ] Keep shared application/author metadata in the root layout and set robots metadata to `index,follow` only for indexable deployments; use `noindex,nofollow` for previews and development.
- [ ] Export `buildPageMetadata("home")`, `buildPageMetadata("about")`, `buildPageMetadata("services")`, and `buildPageMetadata("contact")` from the corresponding server pages.
- [ ] Render `<JsonLd data={homeJsonLd} />` only on the homepage. Do not change any existing visible component, prop, order, or wrapper.
- [ ] Run the local development server and `npm run seo:check`. At this checkpoint, page metadata, language, H1, JSON-LD, and preview/development noindex assertions must pass; endpoint assertions may still fail.
- [ ] Inspect the rendered pages or exact source diff and confirm no visible JSX was changed beyond the non-rendering JSON-LD script.
- [ ] Commit only the five route/layout files:

```bash
git add src/app/layout.tsx src/app/page.tsx src/app/about/page.tsx src/app/services/page.tsx src/app/contact/page.tsx
git commit -m "feat: apply canonical route metadata"
```

## Task 4: Publish crawler and LLM discovery endpoints

**Files:**

- Modify: `src/app/robots.ts`
- Modify: `src/app/sitemap.ts`
- Create: `src/app/llms.txt/route.ts`
- Create: `src/app/llms-full.txt/route.ts`

- [ ] Make `robots.ts` return `Disallow: /` for all crawlers on non-indexable deployments.
- [ ] On production, return exact ordered rules for `*`, `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, and `Claude-User` with `Allow: /`, then `GPTBot` and `ClaudeBot` with `Disallow: /`. Include only the canonical sitemap URL; do not add `Host`.
- [ ] Make `sitemap.ts` contain only the canonical homepage and omit synthetic `lastModified` values.
- [ ] Implement both LLM files as static GET Route Handlers with `export const dynamic = "force-static"` and `Content-Type: text/plain; charset=utf-8`.
- [ ] Run `npm run seo:check` against development. Confirm the entire suite passes with the non-indexable development expectation.
- [ ] Commit only the four endpoint files:

```bash
git add src/app/robots.ts src/app/sitemap.ts src/app/llms.txt/route.ts src/app/llms-full.txt/route.ts
git commit -m "feat: publish crawler and LLM discovery files"
```

## Task 5: Full local verification and scope audit

**Files:**

- Modify if necessary: only the files introduced or explicitly listed above

- [ ] Run `npm run lint`; expect zero errors. The existing `scripts/motion-check.mjs` unused-variable warning may remain if unchanged.
- [ ] Run `npx tsc --noEmit`; expect exit code 0.
- [ ] Run `npm run build -- --webpack`; expect every route, including both `.txt` handlers, to build successfully.
- [ ] Start the production build with `npm run start -- --hostname 127.0.0.1 --port 3000` and run `EXPECT_INDEX=true npm run seo:check`; expect all assertions to pass.
- [ ] Check HTTP/trailing slash behavior locally:

```bash
curl -sSIL http://127.0.0.1:3000/about/
curl -sSIL http://127.0.0.1:3000/services/
curl -sSIL http://127.0.0.1:3000/contact/
```

- [ ] Review `git diff --check`, `git status --short`, the exact SEO commits, and the working-tree diff. Confirm no existing visual/media changes were reverted or unintentionally staged.
- [ ] If any correction is needed, update only the SEO files, rerun the smallest failing check, then rerun the full verification set and commit the correction explicitly.

## Task 6: Deploy and verify production

**Files:** None unless production verification reveals a defect.

- [ ] Review the full current deployment scope, including the pre-existing dirty visual/media work already published previously.
- [ ] Deploy to the linked Vercel project and wait for state `READY`.
- [ ] Run the contract test against production:

```bash
ORIGIN=https://dotsportsmanagement.com EXPECT_INDEX=true npm run seo:check
```

- [ ] Verify canonical host behavior and status chains:

```bash
curl -sSIL http://dotsportsmanagement.com/
curl -sSIL https://www.dotsportsmanagement.com/
curl -sSIL https://dotsportsmanagement.com/about/
curl -sSIL https://dotsportsmanagement.com/services/
curl -sSIL https://dotsportsmanagement.com/contact/
```

- [ ] Verify response MIME types for `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/opengraph-image.jpg`, and representative media.
- [ ] Verify a preview deployment emits `noindex,nofollow` and disallows crawling.
- [ ] Report the deployment URL, Vercel inspector URL, validation results, exact commits, and the unchanged-UI guarantee.
- [ ] Hand off the authenticated follow-up: submit the sitemap and request canonical-home recrawling in Google Search Console and Bing Webmaster Tools.

## Final Self-Review

- [ ] Every approved spec requirement maps to an implementation task or assertion.
- [ ] No placeholders, invented claims, fabricated schema entities, or hidden SEO copy are present.
- [ ] `title.absolute` prevents double branding.
- [ ] Canonical, Open Graph URL, sitemap URL, JSON-LD URLs, and LLM canonical links match byte-for-byte.
- [ ] Preview and production indexing policies differ intentionally and are tested.
- [ ] The implementation does not alter visible UI or responsive behavior.
