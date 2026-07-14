---
title: LP-02 - Hero Section
tags: [task, landing-page]
status: todo
priority: high
created: 2026-07-14
due:
---

# LP-02 - Hero Section

## Description
> The hero must answer "what is this?" in 3 seconds and make people smile. Centerpiece: the hatchling sprite on a pixel desk shelf, with a looping animation of glowing token pixels flying out of a mini code editor and turning into fruit that the pet eats.
>
> **Copy (draft, refine in place):**
> - h1: `Your AI tokens feed a tiny friend.`
> - Sub: `Tokengochi is a desktop pet that lives on your screen and stays happy on the tokens you burn in Claude Code. Every 20,000 tokens = 1 snack. No accounts, no server — just a hungry pixel buddy.`
> - Primary CTA: `Download for macOS` (OS-detected label, see [[LP-06 - Download Section]]) · Secondary: `See how it works ↓` (anchor scroll)
> - Small trust line under CTAs: `Free & open source · MIT · macOS / Windows / Linux`

## Technical details
- Layout: two-column on `lg` (copy left, animated scene right), stacked on mobile with scene below copy. Max content width ~1100px.
- Background: `--color-night` with a sparse CSS-only starfield (absolutely-positioned 2px/3px squares in `--color-moon-yellow` and `--color-text-dim`, ~15 of them, subtle 3–4s opacity twinkle). No canvas, no particle library.
- **Token-to-food animation:** a small pixel "editor window" (pure HTML/CSS, colored bars as fake code lines) emits green token squares that arc toward the pet and become a fruit sprite; pet plays its eat frames. Implement as CSS keyframe animation on 4–6 absolutely-positioned elements with staggered `animation-delay`, looping every ~6s. Sprite frame animation via `steps()` on `background-position` against the hatchling spritesheet (`hatchling.png` — check frame grid in `../tokengochi/docs/knowledge/sprite-asset-pipeline.md`).
- `prefers-reduced-motion`: freeze to a single static frame of pet + fruit, keep twinkle off.
- Nav bar above hero: logo (app icon at 32px, pixelated) + wordmark in Pixelify Sans, links to `How it works · Features · Download · GitHub`. Plain anchor links, sticky NOT required for v1.
- Hero images: inline the small sprites; `fetchpriority="high"` on the pet sprite; explicit width/height everywhere (no CLS).

## Acceptance criteria
- [ ] Value prop readable without scrolling at 320px and 1440px
- [ ] Animation loops smoothly, pure CSS (no JS rAF loop), <5% CPU on an idle tab
- [ ] Reduced-motion variant verified in devtools emulation
- [ ] CTAs are real `<a>` elements with visible focus states; anchor CTA scrolls with `scroll-behavior: smooth` (disabled under reduced motion)
- [ ] Lighthouse: no CLS contribution from hero, LCP element is the h1 or pet sprite under 2.5s locally

## Subtasks
- [ ] Nav bar component
- [ ] Hero copy + CTA layout
- [ ] Starfield background
- [ ] Editor→token→food→eat animation loop
- [ ] Mobile layout pass

## Links
- [[Tasks MOC]]
- Depends on: [[LP-01 - Scaffold Project and Design System]]
