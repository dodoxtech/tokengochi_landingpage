---
title: 001 - Astro and Tailwind Stack Choice
tags: [adr]
status: accepted
created: 2026-07-14
---

# 001 - Astro and Tailwind Stack Choice

## Context
> The Tokengochi landing page is a single static marketing page: a hero, a few
> feature sections, and CTAs. It needs fast first paint, no required JS for
> content to render, and a way to encode the "cozy pixel night desk" visual
> identity (hard pixel shadows, chunky borders, self-hosted pixel + sans
> fonts) as reusable, typed tokens and components. See
> [[LP-01 - Scaffold Project and Design System]] for the full design spec.

## Decision
> Use **Astro 7** + **Tailwind CSS 4** (via `@tailwindcss/vite`) + TypeScript
> (strict). Components are `.astro` files by default; no UI framework
> (React/Vue/Svelte) is added unless a later task needs real client-side
> interactivity that can't be done with a vanilla `<script>` island.
>
> Note: the original task brief specified Astro 5, written before this repo
> was scaffolded. By the time of scaffolding, npm's latest was Astro 7 (two
> majors ahead) — the user chose to scaffold on latest rather than pin to the
> now-outdated version named in the brief, since there's no reason to start a
> new project two majors behind for a static page with no legacy Astro 5
> integrations to preserve.
>
> Fonts are self-hosted via `@fontsource-variable/dm-sans` and
> `@fontsource/pixelify-sans`, imported through `global.css` and re-imported
> with `?url` in `Layout.astro` so the two above-the-fold font files can be
> preloaded with a URL that's guaranteed to match Vite's hashed output
> (avoids a preload that doesn't match what's actually fetched).
>
> Design tokens live in one `@theme` block in `src/styles/global.css` (colors,
> `--font-heading`, `--font-body`), which Tailwind 4 turns directly into
> utilities (`bg-night`, `text-cream`, `font-heading`, ...) with no separate
> `tailwind.config` needed.

## Alternatives considered
> - **Next.js / React** — rejected: pulls in a client JS runtime and hydration
>   for a page that's mostly static content; works against the "zero-JS-by-
>   default" goal in the task brief.
> - **Plain Vite + hand-written HTML/CSS** — rejected: loses Astro's
>   component model (`.astro` files, slots, scoped styles) and built-in static
>   asset/image handling for very little benefit at this scale.
> - **Tailwind 3 with a JS config file** — rejected: Tailwind 4's CSS-native
>   `@theme` block is a better fit for "one canonical token source" than a
>   `tailwind.config.ts` object, and avoids maintaining two token
>   representations in parallel.

## Consequences
> - Any later LP task that assumed Astro 5-specific docs/APIs should
>   double-check against Astro 7 (mostly additive; no known breaking impact
>   on the patterns used so far — layouts, `.astro` components, static
>   build).
> - Adding a UI framework later (e.g. for a genuinely interactive island)
>   means adding an `@astrojs/<framework>` integration; nothing here blocks
>   that.
> - All future color/font decisions should extend the single `@theme` block
>   in `src/styles/global.css` rather than introducing a second source of
>   truth.

## Links
- [[Decisions MOC]]
- [[LP-01 - Scaffold Project and Design System]]
