# Search Brand and Route Indexing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the four public DOT routes independently canonical and discoverable while strengthening the DOT Sports Management brand signal in search metadata.

**Architecture:** `src/lib/seo.ts` remains the metadata source of truth and derives an absolute URL from each page's route. `src/app/sitemap.ts` publishes that same canonical URL set. The existing HTTP-level SEO checker asserts the public contract before and after the implementation.

**Tech Stack:** Next.js 16 App Router, TypeScript, Node `assert`, `scripts/seo-check.mjs`.

---

## File structure

- Modify `scripts/seo-check.mjs`: define expected page URLs, assert route-specific canonical and Open Graph URLs, organization aliases, and all sitemap entries.
- Modify `src/lib/seo.ts`: store each route path with its metadata, derive route canonicals, and add brand aliases to Organization JSON-LD.
- Modify `src/app/sitemap.ts`: emit the four route canonicals from the shared SEO configuration.

### Task 1: Define the failing public SEO contract

**Files:**
- Modify: `scripts/seo-check.mjs:10-34, 108-177, 261-266`
- Test: `scripts/seo-check.mjs`

- [ ] **Step 1: Change expected metadata to the desired behavior**

```js
const pages = {
  "/": {
    title: "DOT Sports Management | Motorsport Driver Management",
    canonical: "https://dotsportsmanagement.com",
  },
  "/about": {
    canonical: "https://dotsportsmanagement.com/about",
  },
  "/services": {
    canonical: "https://dotsportsmanagement.com/services",
  },
  "/contact": {
    canonical: "https://dotsportsmanagement.com/contact",
  },
};
```

Replace the global canonical assertions with `expected.canonical`; assert `organization.alternateName` equals `["DOT", "DOT Sports Management", "dotsportsmanagement.com"]`; assert sitemap locations equal the four canonical URLs in route order.

- [ ] **Step 2: Run the check against production to verify it fails**

Run: `ORIGIN=https://dotsportsmanagement.com EXPECT_INDEX=true npm run seo:check`

Expected: failure reporting the current homepage title, route canonical, Organization aliases, or one-entry sitemap mismatch.

- [ ] **Step 3: Commit the failing contract**

```bash
git add scripts/seo-check.mjs
git commit -m "test: define route SEO indexing contract"
```

### Task 2: Implement route-specific metadata and brand aliases

**Files:**
- Modify: `src/lib/seo.ts:10-62, 95-113`
- Test: `scripts/seo-check.mjs`

- [ ] **Step 1: Add the minimal route data and canonical helper**

```ts
const pageSeo = {
  home: { path: "/", title: "DOT Sports Management | Motorsport Driver Management" },
  about: { path: "/about", title: "About DOT Management & Raul Guzman" },
  services: { path: "/services", title: "Driver Management Services | DOT Management" },
  contact: { path: "/contact", title: "Contact DOT Management | Driver Representation" },
} as const;

export function pageCanonical(page: SeoPage) {
  return new URL(pageSeo[page].path, `${SITE_ORIGIN}/`).toString().replace(/\/$/, "");
}
```

Use `pageCanonical(page)` for `alternates.canonical` and `openGraph.url`. Keep existing descriptions and social image behavior unchanged. In the Organization node, use `alternateName: ["DOT", "DOT Sports Management", "dotsportsmanagement.com"]`.

- [ ] **Step 2: Run the check to verify the metadata contract passes locally**

Run: start the production build locally, then `EXPECT_INDEX=true npm run seo:check`.

Expected: metadata and JSON-LD assertions pass; the sitemap assertion remains the only failure until Task 3.

- [ ] **Step 3: Commit the metadata implementation**

```bash
git add src/lib/seo.ts
git commit -m "feat: add DOT Sports Management search signals"
```

### Task 3: Publish the complete sitemap

**Files:**
- Modify: `src/app/sitemap.ts:1-6`
- Test: `scripts/seo-check.mjs`

- [ ] **Step 1: Emit the shared page canonicals**

```ts
import { pageCanonical } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["home", "about", "services", "contact"].map((page) => ({
    url: pageCanonical(page),
  }));
}
```

Type the page keys as `SeoPage[]` so only known routes enter the sitemap.

- [ ] **Step 2: Run the full SEO check and static validation**

Run:

```bash
npx tsc --noEmit
npm run lint
EXPECT_INDEX=true npm run seo:check
```

Expected: all commands exit 0; the check reports four sitemap URLs and page-specific canonicals.

- [ ] **Step 3: Commit the sitemap implementation**

```bash
git add src/app/sitemap.ts
git commit -m "feat: publish all canonical routes in sitemap"
```

### Task 4: Verify the production artifact after deployment

**Files:**
- Verify only: `https://dotsportsmanagement.com/`, `/about`, `/services`, `/contact`, `/sitemap.xml`

- [ ] **Step 1: Deploy the approved commits through the existing release workflow**

Expected: the production deployment is ready and serves the new build.

- [ ] **Step 2: Run the production SEO contract**

Run: `ORIGIN=https://dotsportsmanagement.com EXPECT_INDEX=true npm run seo:check`

Expected: exit 0 and `SEO checks passed for https://dotsportsmanagement.com (index=true).`

- [ ] **Step 3: Refresh discovery in Search Console**

Open the submitted sitemap, request a refresh if offered, and inspect `/`, `/about`, `/services`, and `/contact`. Request indexing for each URL after Google reads the deployed sitemap.

