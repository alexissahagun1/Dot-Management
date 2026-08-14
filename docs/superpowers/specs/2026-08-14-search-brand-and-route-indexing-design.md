# DOT Sports Management Search Brand and Route Indexing Design

Date: 2026-08-14
Status: Approved
Site: https://dotsportsmanagement.com

## Goal

Help Google associate `dotsportsmanagement` with DOT Sports Management and let the homepage, About, Services, and Contact routes be independently discoverable and indexable.

## Scope

- Keep the existing interface, visual copy, styling, interactions, routes, and media unchanged.
- Use `DOT Sports Management` in the homepage SEO title and Organization alternate names; retain the visible brand name `DOT Management`.
- Give `/`, `/about`, `/services`, and `/contact` self-referencing canonical URLs and matching Open Graph URLs.
- Include those four canonical URLs in `/sitemap.xml`.
- Keep the existing robots policy and one homepage Organization JSON-LD graph, extending alternate names only.
- Update the SEO verification script to require the new titles, route canonicals, Open Graph URLs, structured-data aliases, and sitemap entries.

## Exclusions

- No visible copy, H1, UI, route, redirect, or design changes.
- No blog, FAQ, location, review, LocalBusiness, or unsupported structured-data claims.
- No guarantee of a specific Google ranking; Google must recrawl and evaluate the updated signals.

## Canonical Map

| Route | Canonical URL |
| --- | --- |
| `/` | `https://dotsportsmanagement.com` |
| `/about` | `https://dotsportsmanagement.com/about` |
| `/services` | `https://dotsportsmanagement.com/services` |
| `/contact` | `https://dotsportsmanagement.com/contact` |

## Metadata

- Home title: `DOT Sports Management | Motorsport Driver Management`
- Existing descriptions stay unchanged because they accurately describe the corresponding pages.
- All routes use their own SEO title, description, canonical URL, and social URL.

## Verification

The automated SEO check must fetch the four pages, robots, and sitemap and assert page-specific canonical/social URLs, the four sitemap locations, the organization aliases, and indexability policy. Production confirmation is a Search Console sitemap refresh plus URL Inspection requests for the four URLs.
