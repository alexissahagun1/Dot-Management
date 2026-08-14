# DOT Management SEO + LLMSEO Design

Date: 2026-08-13
Status: Approved for implementation
Site: https://dotsportsmanagement.com

## Objective

Improve how search engines and answer engines discover, understand, index, and cite DOT Management without changing visual structure, styles, or visible copy and without inventing claims. The site remains English-only and continues to target an international motorsport audience.

The implementation must strengthen four existing routes:

- `/`
- `/about`
- `/services`
- `/contact`

## Success Criteria

1. The canonical homepage has a unique title, description, canonical URL, Open Graph URL, and social metadata; duplicate direct routes consolidate their canonical and Open Graph URL to the homepage while retaining route-specific titles and descriptions for browser usability.
2. The production origin is always `https://dotsportsmanagement.com`; preview deployment domains never become canonical.
3. Search engines can resolve DOT Management, Raul Guzman, the five services, and the contact channel from one connected, accurate JSON-LD graph on the canonical homepage.
4. `robots.txt` permits search and citation crawlers while blocking the agreed training crawlers.
5. `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt` return HTTP 200 with production URLs and factual English content.
6. All structured data is valid JSON, matches visible content, and contains no unsupported claims.
7. Lint, TypeScript, production build, metadata assertions, and production HTTP checks pass before completion is claimed.

## Decisions

- Language: English only.
- Primary intent: international motorsport driver management and development.
- Search/citation bots: allowed.
- Training bots: blocked.
- No new blog, FAQ hub, location page, testimonial, result, partner, driver, phone, physical address, hidden SEO copy, or visible content block.
- No `LocalBusiness`, `Review`, `AggregateRating`, `FAQPage`, or fabricated rich-result markup.
- `llms.txt` is an interoperability aid, not a ranking promise. Google explicitly states that it ignores `llms.txt` for Search visibility and rankings.
- The owner confirmed that Raul Guzman has worked in Europe since 2014, worked with Lamborghini for several years, and that DOT's advisors include people with Formula 1, Road to F1, and sports car racing experience.
- The marketing adjective `leading` will not be repeated in metadata, JSON-LD, or LLM discovery files.

## Canonical Origin

Create one shared SEO source of truth with:

```text
https://dotsportsmanagement.com
```

Metadata, JSON-LD, robots, sitemap, social URLs, and LLM text files must use this origin. They must not derive canonical URLs from `VERCEL_URL` or a preview hostname.

Because `/` already renders the complete About, Services, and Contact content, the site is treated as one canonical long-form landing page. `/about`, `/services`, and `/contact` remain usable direct-entry routes but canonicalize to `/`. They are omitted from the sitemap to avoid sending contradictory duplication signals without changing the UI.

## Page Metadata

### Home `/`

- Title: `Motorsport Driver Management | DOT Management`
- Description: `DOT Management provides international motorsport driver management, coaching and career development from karting through professional racing.`
- Canonical: `https://dotsportsmanagement.com/`
- Primary topic: motorsport driver management

### About `/about`

- Title: `About DOT Management & Raul Guzman`
- Description: `Learn about DOT Management and founder Raul Guzman, combining professional racing experience with strategic driver development and career support.`
- Canonical: `https://dotsportsmanagement.com/`
- Primary topics: DOT Management, Raul Guzman, driver development

### Services `/services`

- Title: `Driver Management Services | DOT Management`
- Description: `Explore DOT Management services: driver management, coaching, performance partners, brand and commercial guidance, and on-track support.`
- Canonical: `https://dotsportsmanagement.com/`
- Primary topics: driver management services, driver coaching, motorsport career support

### Contact `/contact`

- Title: `Contact DOT Management | Driver Representation`
- Description: `Contact DOT Management to discuss driver representation, coaching, career development, commercial guidance or on-track motorsport support.`
- Canonical: `https://dotsportsmanagement.com/`
- Primary topic: driver representation inquiry

## Social Metadata

Each route will reuse its SEO title and description for social metadata. All routes will use the existing production Open Graph image and declare:

- `openGraph.type = website`
- `openGraph.siteName = DOT Management`
- `openGraph.locale = en_GB`
- `openGraph.url = https://dotsportsmanagement.com/` to match the canonical
- `twitter.card = summary_large_image`

## Structured Data

Use one server-rendered JSON-LD graph on the canonical homepage with stable `@id` values.

### Shared graph

`Organization`:

- `@id`: `https://dotsportsmanagement.com/#organization`
- `name`: `DOT Management`
- `alternateName`: `DOT`
- production URL
- crawlable logo URL
- email
- founding date `2020`
- `founder` reference to Raul Guzman
- `contactPoint` reference to the shared ContactPoint node
- Instagram `sameAs`
- description derived from visible copy
- relevant `knowsAbout` topics only

`WebSite`:

- `@id`: `https://dotsportsmanagement.com/#website`
- production URL and name
- `publisher` reference to the organization
- `inLanguage = en`

`Person`:

- `@id`: `https://dotsportsmanagement.com/#raul-guzman`
- `name = Raul Guzman`
- factual role derived from visible copy
- `worksFor` reference to DOT Management
- no personal social profiles or credentials not present on the site

`ContactPoint`:

- `@id`: `https://dotsportsmanagement.com/#contact`
- email `info@dotsportsmanagement.com`
- `contactType = customer inquiries`
- `availableLanguage = English`

### Connected homepage graph

- A `WebPage` node uses the homepage URL and references the `WebSite` with `isPartOf`.
- The `WebPage` uses `about` to reference DOT Management and `mainEntity` to reference the Organization, Person, service list, and ContactPoint.
- An `ItemList` contains five `Service` nodes. Each service uses the visible name and description and references DOT as provider.
- `Organization.founder` points to the Person; `Person.worksFor` points to the Organization; `Organization.contactPoint` points to the ContactPoint.
- Duplicate direct routes do not emit competing organization/service graphs.

JSON-LD text must escape `<` to prevent script termination and must never serialize user-controlled data.

## Robots Policy

`robots.txt` will express the following policy:

```text
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

Sitemap: https://dotsportsmanagement.com/sitemap.xml
```

The general allow rule continues to cover Googlebot, Bingbot, and other search crawlers. Bot-specific rules implement the user's explicit distinction between search/citation and the two agreed training crawlers, GPTBot and ClaudeBot. `Host` is intentionally omitted because it is outside the portable RFC 9309 rule set and is not supported by Google.

## Sitemap

Keep a single sitemap with only `https://dotsportsmanagement.com/`. Do not list direct routes that canonicalize to the homepage. Do not emit misleading build-time `lastModified` dates or unused routes.

## LLM Discovery Files

### `/llms.txt`

A concise machine-readable overview containing:

- canonical brand name and URL
- one-paragraph factual description
- founder
- five services
- official direct-entry page links, with the homepage identified as canonical
- official email and Instagram
- a note that the site is the authoritative source for DOT Management

### `/llms-full.txt`

A longer factual representation of the About and Services content, organized with Markdown headings and canonical links. It may include the owner-confirmed Raul/Lamborghini/advisor facts, but must omit the unsubstantiated adjective `leading` and must not include hidden offers, unsupported achievements, fabricated names, or claims beyond the confirmed source material.

## Visible Content and UI

Do not modify the rendered headings, paragraphs, layout, styles, interactions, media order, or responsive behavior. SEO/LLM text is curated from the confirmed source material in a shared server-only SEO module rather than rewriting visible copy. Do not inject hidden SEO text.

## Accessibility and Image Semantics

- Preserve meaningful alt text for editorial images.
- Keep empty alt text only for decorative menu imagery.
- Do not inject SEO-only hidden text into the visual page.
- Reuse the existing optimized image pipeline and explicit dimensions.

## Validation

### Local checks

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build -- --webpack` if local Turbopack is prevented from opening its internal process port; production still builds with Vercel Turbopack.
4. Parse every generated JSON-LD script with `JSON.parse`.
5. Validate Schema.org relationships and domains/ranges for `founder`, `worksFor`, `contactPoint`, `isPartOf`, `about`, and `mainEntity`.
6. Assert exact rendered title, description, canonical, Open Graph, and Twitter values per route, including no double brand suffix.
7. Assert `<html lang="en">` and one indexable H1 per route.
8. Assert exact allow/disallow behavior for `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `Claude-User`, `GPTBot`, and `ClaudeBot`.
9. Verify sitemap/canonical parity byte-for-byte, expected MIME types, HTTPS redirects, `www` behavior, and trailing-slash behavior.
10. Verify Vercel preview deployments emit `noindex, nofollow` while production remains `index, follow`.
11. Record `git status` before editing, never reset or checkout user changes, review the exact final diff, and confirm production deployment scope before publishing.

### Production checks

1. Deploy explicitly to the linked `dot-management` Vercel project.
2. Confirm Vercel state `READY`.
3. Confirm HTTP 200 and correct Content-Type for all four pages, sitemap, robots, both LLM files, Open Graph image, and representative media.
4. Confirm deployed HTML contains the expected page-specific title, description, canonical, robots meta, and homepage JSON-LD graph.
5. Confirm `http://`, `www`, and direct route requests resolve consistently with the canonical strategy.

## Post-Deployment Handoff

Code cannot submit or verify ownership in Google Search Console or Bing Webmaster Tools without the owner's authenticated accounts. After deployment, submit `https://dotsportsmanagement.com/sitemap.xml` to those services, request recrawling of the canonical homepage, and use URL Inspection on the three direct-entry routes to confirm that the engines recognize the declared homepage canonical.

## Authoritative Guidance

- Google Search Central: generative AI search uses foundational SEO; no special schema or AI writing format is required, and `llms.txt` is ignored by Google Search.
- Google Search Central: accurate Organization JSON-LD on the home or About page helps disambiguate an organization.
- OpenAI: allow `OAI-SearchBot` for inclusion in ChatGPT summaries and search citations; `GPTBot` is controlled separately for potential training.
- Perplexity: allow `PerplexityBot` for search visibility.
- Anthropic: `ClaudeBot` is a training crawler and respects robots.txt opt-outs.
