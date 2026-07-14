---
title: LP-08 - QA Pass and Deploy
tags: [task, landing-page]
status: todo
priority: high
created: 2026-07-14
due:
---

# LP-08 - QA Pass and Deploy

## Description
> Final quality gate across the whole page, then ship it on Vercel so every push creates the right preview or production deployment automatically.

## Technical details
- **Accessibility sweep:** keyboard-tab through the entire page (logical order, visible focus everywhere, skip-to-content link); axe-core scan zero violations; heading hierarchy h1→h2→h3 with no skips; all animations verified under `prefers-reduced-motion`.
- **Responsive sweep:** 320 / 768 / 1024 / 1440 px — no horizontal scroll, no broken sprite scaling (sprites must stay at integer multiples; use fewer/larger breakpoint steps rather than fluid sprite sizing).
- **Performance budget:** Lighthouse ≥ 95 across categories on a production build. Total JS ≤ 15 KB gzipped (demo island + OS detect + copy buttons). Images: sprites are small PNGs already; OG/cover imagery served as optimized `webp`/`png` via `astro:assets` where not spritesheet-critical. Fonts subset to latin.
- **Cross-browser:** Chrome, Firefox, Safari (Safari is the usual `image-rendering: pixelated` / `steps()` troublemaker — test the demo island there explicitly).
- **Deploy:** Vercel Git Integration. Import the GitHub repository into Vercel, use the Astro framework preset, `npm run build` as the build command, and `dist` as the output directory. Production deploys must come from `main`; pull requests and non-production branches should create Vercel Preview Deployments. Keep `site` in `astro.config.mjs` set to `https://tokengochi.dodoxtech.com`. Configure `tokengochi.dodoxtech.com` in Vercel Domains and point the DNS record there rather than using a GitHub Pages `CNAME`.
- After ship: move LP tasks to `docs/05-Tasks/Done/`, add the launch entry under `[Unreleased]` in `docs/08-Changelog/Changelog.md`, and move "Landing page v1" to Done in `docs/02-Roadmap/Roadmap.md`.

## Acceptance criteria
- [ ] axe-core: 0 violations; full keyboard navigation works
- [ ] Lighthouse ≥ 95 performance/accessibility/best-practices/SEO on the deployed URL
- [ ] Page verified in Chrome, Firefox, Safari (desktop) + one mobile viewport each for iOS Safari and Android Chrome
- [ ] Vercel deploys `main` to Production and pull requests/branches to Preview; deployed URL loads with zero console errors and zero third-party requests
- [ ] `https://tokengochi.dodoxtech.com` is attached in Vercel Domains, resolves over HTTPS, and is the canonical production URL
- [ ] Docs updated (changelog, roadmap, tasks moved to Done)

## Subtasks
- [x] Accessibility sweep + fixes
- [x] Responsive sweep + fixes
- [x] Performance audit + fixes (JS budget, font subsetting)
- [ ] Safari-specific sprite/animation testing
- [x] Vercel deployment config
- [ ] Vercel project import + Git Integration setup
- [ ] Custom domain DNS + HTTPS verification
- [ ] Post-launch docs updates

## QA notes
- 2026-07-14 local production build passes `npm run astro -- check` and `npm run build`.
- Chrome CDP sweep at 320 / 768 / 1024 / 1440 px: no document horizontal overflow, one `h1`, no heading skips, no missing image alt attributes, no nameless links/buttons, no runtime errors, and no third-party requests on initial page load.
- JS budget: generated external JavaScript is 1.2 KB gzipped, well under the 15 KB target. Fonts are limited to latin `.woff2` assets.
- Vercel config added with `npm ci`, `npm run build`, and `dist`. Production deployment still needs Vercel project import, domain attachment, DNS, HTTPS verification, and deployed Lighthouse validation.

## Links
- [[Tasks MOC]]
- Depends on: all of [[LP-02 - Hero Section]], [[LP-03 - How It Works Section]], [[LP-04 - Features Grid]], [[LP-05 - Interactive Pet Demo]], [[LP-06 - Download Section]], [[LP-07 - Footer SEO and Social Meta]]
