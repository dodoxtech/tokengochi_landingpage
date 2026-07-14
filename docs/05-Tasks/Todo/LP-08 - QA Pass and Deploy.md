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
> Final quality gate across the whole page, then ship it with CI so every push deploys automatically.

## Technical details
- **Accessibility sweep:** keyboard-tab through the entire page (logical order, visible focus everywhere, skip-to-content link); axe-core scan zero violations; heading hierarchy h1→h2→h3 with no skips; all animations verified under `prefers-reduced-motion`.
- **Responsive sweep:** 320 / 768 / 1024 / 1440 px — no horizontal scroll, no broken sprite scaling (sprites must stay at integer multiples; use fewer/larger breakpoint steps rather than fluid sprite sizing).
- **Performance budget:** Lighthouse ≥ 95 across categories on a production build. Total JS ≤ 15 KB gzipped (demo island + OS detect + copy buttons). Images: sprites are small PNGs already; OG/cover imagery served as optimized `webp`/`png` via `astro:assets` where not spritesheet-critical. Fonts subset to latin.
- **Cross-browser:** Chrome, Firefox, Safari (Safari is the usual `image-rendering: pixelated` / `steps()` troublemaker — test the demo island there explicitly).
- **Deploy:** GitHub Pages via `withastro/action` in `.github/workflows/deploy.yml` on push to `main`. Set `site` (+ `base` if project pages) in `astro.config.mjs`. If a custom domain exists, add `CNAME`; otherwise `*.github.io` is fine for v1.
- After ship: move LP tasks to `docs/05-Tasks/Done/`, add the launch entry under `[Unreleased]` in `docs/08-Changelog/Changelog.md`, and move "Landing page v1" to Done in `docs/02-Roadmap/Roadmap.md`.

## Acceptance criteria
- [ ] axe-core: 0 violations; full keyboard navigation works
- [ ] Lighthouse ≥ 95 performance/accessibility/best-practices/SEO on the deployed URL
- [ ] Page verified in Chrome, Firefox, Safari (desktop) + one mobile viewport each for iOS Safari and Android Chrome
- [ ] CI deploys on push to main; deployed URL loads with zero console errors and zero third-party requests
- [ ] Docs updated (changelog, roadmap, tasks moved to Done)

## Subtasks
- [ ] Accessibility sweep + fixes
- [ ] Responsive sweep + fixes
- [ ] Performance audit + fixes (JS budget, font subsetting)
- [ ] Safari-specific sprite/animation testing
- [ ] GitHub Actions deploy workflow
- [ ] Post-launch docs updates

## Links
- [[Tasks MOC]]
- Depends on: all of [[LP-02 - Hero Section]], [[LP-03 - How It Works Section]], [[LP-04 - Features Grid]], [[LP-05 - Interactive Pet Demo]], [[LP-06 - Download Section]], [[LP-07 - Footer SEO and Social Meta]]
