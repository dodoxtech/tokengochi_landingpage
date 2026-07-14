---
title: LP-01 - Scaffold Project and Design System
tags: [task, landing-page]
status: todo
priority: high
created: 2026-07-14
due:
---

# LP-01 - Scaffold Project and Design System

## Description
> Bootstrap the landing page codebase and encode the Tokengochi visual identity as reusable design tokens. Every later task builds on this. The site is a single static page — optimize for zero-JS-by-default and fast first paint.
>
> **Stack:** Astro 5 + Tailwind CSS 4 (via `@tailwindcss/vite`), TypeScript. No React unless an island genuinely needs it — prefer vanilla `<script>` islands. Deployed as a fully static build (see [[LP-08 - QA Pass and Deploy]]).

## Design direction (canonical — all LP tasks reference this)

**Style: "Cozy pixel night desk."** The landing page should feel like the README cover art: a warm, chubby pixel pet glowing against a late-night coding scene. Pixel-art charm for personality, modern clean layout for readability. NOT a retro-everything site — pixel elements are accents (sprites, borders, headings), body content stays crisp and legible.

**Color tokens** (extracted from the cover art and app icon, defined in Tailwind `@theme`):

| Token | Hex | Use |
|---|---|---|
| `--color-night` | `#141026` | Page background (deep indigo night sky) |
| `--color-night-soft` | `#241E42` | Cards / section surfaces |
| `--color-pet-orange` | `#F5A73B` | Primary accent, CTAs (the pet's body) |
| `--color-pet-deep` | `#EA7A2B` | CTA hover, hard shadows on orange |
| `--color-token-green` | `#6EE7A0` | Token/food glow, success, highlights |
| `--color-moon-yellow` | `#FFD466` | Secondary highlight, stars, streaks |
| `--color-cream` | `#FBF0D7` | Light cards (like the app icon bg), pet belly |
| `--color-ink` | `#1D1830` | Text on cream/orange surfaces |
| `--color-text` | `#F2EDE2` | Body text on dark |
| `--color-text-dim` | `#A79FC2` | Secondary text on dark |

Contrast: `--color-text` on `--color-night` and `--color-ink` on `--color-cream`/`--color-pet-orange` all clear 4.5:1 — verify with a checker after any adjustment.

**Typography:**
- Headings: **Pixelify Sans** (Google Fonts, self-hosted via `@fontsource`) — pixel personality without Press-Start-2P's unreadability. h1 only for the hero headline.
- Body/UI: **DM Sans** — clean, friendly, readable.
- Type scale: `clamp()`-based fluid sizes; hero h1 ~`clamp(2.25rem, 6vw, 4rem)`.

**Signature visual rules (no generic AI look):**
- **Hard pixel shadows**, never blurred: `box-shadow: 4px 4px 0 var(--color-ink)` on cards/buttons.
- **Chunky 2–3px borders** in `--color-ink`; border-radius small (4–8px) or stepped "pixel corners" via clip-path on hero elements — no `rounded-2xl` everywhere.
- All sprites rendered with `image-rendering: pixelated` at 2–4× integer scale.
- Flat fills; the only glow allowed is the token-green trail (small `drop-shadow` on token/food pixels only).
- Spacing on a 4px scale; sections separated by generous but unequal rhythm (hero tallest).
- Respect `prefers-reduced-motion` in every animation (this rule applies to all LP tasks).

## Acceptance criteria
- [ ] `npm create astro` scaffold committed; `npm run dev` and `npm run build` work
- [ ] Tailwind 4 configured with all tokens above in a single `@theme` block in `src/styles/global.css`
- [ ] Fonts self-hosted via `@fontsource-variable/dm-sans` + `@fontsource/pixelify-sans` (no runtime Google Fonts request)
- [ ] `PixelCard` and `PixelButton` Astro components exist implementing the border/hard-shadow rules, with hover state (translate 2px into shadow) and visible focus ring (`outline: 3px solid var(--color-token-green)`)
- [ ] Sprite assets copied from `../tokengochi/ui/assets/sprites/` (hatchling, food items, effects) into `src/assets/sprites/` with a README noting the source path
- [ ] Base layout (`Layout.astro`) with `<html lang="en">`, dark bg, font preloads, and empty `<slot />`

## Subtasks
- [ ] Scaffold Astro + Tailwind 4 + TypeScript strict
- [ ] Define `@theme` tokens and global styles (selection color: pet-orange; scrollbar styling optional)
- [ ] Add fonts and preload the two files used above the fold
- [ ] Build `PixelCard` / `PixelButton` primitives
- [ ] Copy and organize sprite assets; add `image-rendering: pixelated` utility class
- [ ] Write an ADR in `docs/04-Decisions/` for the Astro + Tailwind stack choice

## Links
- [[Tasks MOC]]
- Source repo assets: `../tokengochi/ui/assets/sprites/`, `../tokengochi/docs/assets/readme-cover-tokengochi-1600x900.png`
