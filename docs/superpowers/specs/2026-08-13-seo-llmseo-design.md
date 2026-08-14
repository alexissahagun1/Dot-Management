# DOT Management SEO + LLMSEO Design

Date: 2026-08-13
Status: Approved for implementation
Site: https://dotsportsmanagement.com

## Objective

Improve how search engines and answer engines discover, understand, index, and cite DOT Management without changing the visual design or inventing claims. The site remains English-only and continues to target an international motorsport audience.

The implementation must strengthen four existing routes:

- `/`
- `/about`
- `/services`
- `/contact`

## Success Criteria

1. Every indexable route has a unique title, description, canonical URL, Open Graph URL, and social metadata.
2. The production origin is always `https://dotsportsmanagement.com`; preview deployment domains never become canonical.
3. Search engines can resolve DOT Management, Raul Guzman, the five services, and the contact channel from accurate JSON-LD.
4. `robots.txt` permits search and citation crawlers while blocking the agreed training crawlers.
5. `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt` return HTTP 200 with production URLs and factual English content.
6. All structured data is valid JSON, matches visible content, and contains no unsupported claims.
7. Lint, TypeScript, production build, metadata assertions, and production HTTP checks pass before completion is claimed.

## Decisions

- Language: English only.
- Primary intent: international motorsport driver management and development.
- Search/citation bots: allowed.
- Training bots: blocked.
- No new blog, FAQ hub, location page, testimonial, result, partner, driver, phone, or physical address.
- No `LocalBusiness`, `Review`, `AggregateRating`, `FAQPage`, or fabricated rich-result markup.
- `llms.txt` is an interoperability aid, not a ranking promise. Google explicitly states that it ignores `llms.txt` for Search visibility and rankings.

## Canonical Origin

Create one shared SEO source of truth with:

```text
https://dotsportsmanagement.com
```

Metadata, JSON-LD, robots, sitemap, social URLs, and LLM text files must use this origin. They must not derive canonical URLs from `VERCEL_URL` or a preview hostname.

## Page Metadata

### Home `/`

- Title: `Motorsport Driver Management | DOT Management`
- Description: `DOT Management provides international motorsport driver management, coaching and career development from karting through professional racing.`
- Canonical: `https://dotsportsmanagement.com/`
- Primary topic: motorsport driver management

### About `/about`

- Title: `About DOT Management & Raul Guzman`
- Description: `Learn about DOT Management and founder Raul Guzman, combining professional racing experience with strategic driver development and career support.`
- Canonical: `https://dotsportsmanagement.com/about`
- Primary topics: DOT Management, Raul Guzman, driver development

### Services `/services`

- Title: `Driver Management Services | DOT Management`
- Description: `Explore DOT Management services: driver management, coaching, performance partners, brand and commercial guidance, and on-track support.`
- Canonical: `https://dotsportsmanagement.com/services`
- Primary topics: driver management services, driver coaching, motorsport career support

### Contact `/contact`

- Title: `Contact DOT Management | Driver Representation`
- Description: `Contact DOT Management to discuss driver representation, coaching, career development, commercial guidance or on-track motorsport support.`
- Canonical: `https://dotsportsmanagement.com/contact`
- Primary topic: driver representation inquiry

## Social Metadata

Each route will reuse its unique SEO title and description for Open Graph and Twitter. All routes will use the existing production Open Graph image and declare:

- `openGraph.type = website`
- `openGraph.siteName = DOT Management`
- `openGraph.locale = en_GB`
- absolute `openGraph.url`
- `twitter.card = summary_large_image`

## Structured Data

Use server-rendered JSON-LD with stable `@id` values.

### Shared graph

`Organization`:

- `@id`: `https://dotsportsmanagement.com/#organization`
- `name`: `DOT Management`
- `alternateName`: `DOT`
- production URL
- crawlable logo URL
- email
- founding date `2020`
- founder reference to Raul Guzman
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
- `founder`/organization relationship
- no personal social profiles or credentials not present on the site

### Route-specific graph

- Home: `WebPage` about DOT, plus the shared Organization/WebSite/Person graph.
- About: `AboutPage` about the Organization and Person.
- Services: `WebPage` plus an `ItemList` containing five `Service` nodes. Each service uses the visible name and description and references DOT as provider.
- Contact: `ContactPage` plus a `ContactPoint` using `info@dotsportsmanagement.com` and English as the available language.

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

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

Sitemap: https://dotsportsmanagement.com/sitemap.xml
Host: https://dotsportsmanagement.com
```

The general allow rule continues to cover Googlebot, Bingbot, and other search crawlers. Bot-specific rules implement the user's explicit distinction between search/citation and model training.

## Sitemap

Keep a single sitemap with only the four canonical, indexable pages. Do not emit misleading build-time `lastModified` dates or unused routes. Each URL must exactly match its canonical.

## LLM Discovery Files

### `/llms.txt`

A concise machine-readable overview containing:

- canonical brand name and URL
- one-paragraph factual description
- founder
- five services
- official page links
- official email and Instagram
- a note that the site is the authoritative source for DOT Management

### `/llms-full.txt`

A longer factual representation of the visible About and Services copy, organized with Markdown headings and canonical links. It must not include hidden offers, unsupported achievements, fabricated advisors, or claims beyond the website copy.

## Content Quality

Lightly copyedit the existing English for grammar and professional clarity while preserving meaning. Examples include:

- `a great amount of cars` → `a wide range of cars`
- `traveling logistics` → `travel logistics`
- `international partners network` → `international network of partners`
- `on site` → `on-site`
- improve sentence fragments in the services copy

This is not keyword stuffing. Existing headings and the visual layout remain unchanged.

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
5. Assert one title, one description, and one canonical per route.
6. Verify robots, sitemap, and LLM discovery files contain only canonical production URLs.

### Production checks

1. Deploy explicitly to the linked `dot-management` Vercel project.
2. Confirm Vercel state `READY`.
3. Confirm HTTP 200 for all four pages, sitemap, robots, both LLM files, Open Graph image, and representative media.
4. Confirm deployed HTML contains the expected page-specific title, description, canonical, and JSON-LD node types.

## Post-Deployment Handoff

Code cannot submit or verify ownership in Google Search Console or Bing Webmaster Tools without the owner's authenticated accounts. After deployment, submit `https://dotsportsmanagement.com/sitemap.xml` to those services and request recrawling of the four canonical pages.

## Authoritative Guidance

- Google Search Central: generative AI search uses foundational SEO; no special schema or AI writing format is required, and `llms.txt` is ignored by Google Search.
- Google Search Central: accurate Organization JSON-LD on the home or About page helps disambiguate an organization.
- OpenAI: allow `OAI-SearchBot` for inclusion in ChatGPT summaries and search citations; `GPTBot` is controlled separately for potential training.
- Perplexity: allow `PerplexityBot` for search visibility.
- Anthropic: `ClaudeBot` is a training crawler and respects robots.txt opt-outs.
