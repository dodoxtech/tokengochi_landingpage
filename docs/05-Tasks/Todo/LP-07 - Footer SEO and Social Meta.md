---
title: LP-07 - Footer SEO and Social Meta
tags: [task, landing-page]
status: todo
priority: medium
created: 2026-07-14
due:
---

# LP-07 - Footer SEO and Social Meta

## Description
> Finish the page: footer, metadata, and the social share card — the share card matters because this product spreads through screenshots and dev Twitter/Reddit.

## Technical details
- **Footer:** night-soft background with a pixel "desk shelf" divider (echo the cover art shelf). Columns: product links (GitHub, Releases, Changelog), community (Issues, Ko-fi), legal (MIT license). Sleeping pet sprite (`Zzz` pixels) in a corner. `Made by dodoxtech · Not affiliated with Anthropic` line.
- **SEO head** (in `Layout.astro`):
  - `<title>Tokengochi — a desktop pet fed by your AI tokens</title>`
  - Meta description: `A pixel-art desktop pet that lives on your screen and stays happy on the tokens you burn in Claude Code. Local-first, open source, free.`
  - Canonical URL, `theme-color: #141026`, OpenGraph + Twitter card (`summary_large_image`), JSON-LD `SoftwareApplication` schema (name, OS list, free, MIT).
- **OG image (1200×630):** design a dedicated card — pet + token trail on night background with wordmark; export as static PNG in `public/og.png`. Derive from the README cover (crop/re-compose), don't just downscale it — text must be legible at thumbnail size.
- **Favicon:** derive from `tokengochi-app-icon-master-1024x1024.png` → `favicon.ico` (16/32/48) + `apple-touch-icon.png` (180) + `icon.svg` if feasible. Pixel art downscales badly — nearest-neighbor resample, then hand-check the 16px version.
- `robots.txt` + minimal `sitemap.xml` (single URL). **No analytics** — the product's whole pitch is local-first/no-tracking; the site should match.

## Acceptance criteria
- [ ] Share preview renders correctly in opengraph.xyz checker (or local metatags preview) for Twitter/X, Discord, Slack
- [ ] Favicon crisp at 16px in a browser tab
- [ ] Valid JSON-LD (Google Rich Results test passes structurally)
- [ ] Footer links all resolve; footer readable and navigable at 320px
- [ ] Zero third-party requests on the entire page (verify in network tab)

## Subtasks
- [ ] Footer layout + sleeping pet
- [ ] Head metadata + JSON-LD
- [ ] OG image design and export
- [ ] Favicon set
- [ ] robots.txt / sitemap

## Links
- [[Tasks MOC]]
- Depends on: [[LP-01 - Scaffold Project and Design System]]
