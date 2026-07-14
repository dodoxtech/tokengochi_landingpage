---
title: LP-03 - How It Works Section
tags: [task, landing-page]
status: done
priority: high
created: 2026-07-14
due:
---

# LP-03 - How It Works Section

## Description
> Explain the passive loop in three beats so a visitor instantly gets the mechanic. Framed like a game tutorial: three `PixelCard`s in a row, each with a sprite illustration, connected by a dotted pixel arrow.
>
> 1. **You code.** `Use Claude Code like you already do. Tokengochi tails your local session logs — nothing leaves your machine.` (sprite: mini editor window)
> 2. **Tokens become food.** `Every 20,000 weighted tokens fills the food meter and drops a snack on your screen.` (sprite: food items from `food-default-master.png`)
> 3. **Your pet thrives.** `It runs over, eats, gains XP, and evolves over days and weeks. Miss a day? It gets hungry, not dead.` (sprite: hatchling eat/happy frames)

## Technical details
- Section id `#how-it-works` (hero anchor target). Section heading in Pixelify Sans with a step-counter aesthetic (`01 / 02 / 03` badges in `--color-token-green` on `--color-ink`).
- Cards: `PixelCard` on `--color-night-soft`; sprite illustrations at fixed integer scale inside a `--color-cream` inset panel (echoes the app icon look).
- Connector arrows: repeating-linear-gradient dashed line + pixel arrowhead, hidden on mobile (cards stack vertically with the numbered badges carrying the sequence).
- Scroll-in reveal: single `IntersectionObserver` adding a class; cards fade+rise 8px with 80ms stagger. Skip entirely under `prefers-reduced-motion`.
- Below the three cards, one reassurance strip (small text, icons): `Local-first · No accounts · Daily caps stop wasteful burning` — preempts the "does this incentivize wasting tokens?" objection using the economy's diminishing-returns design.

## Acceptance criteria
- [x] A first-time visitor can restate the loop after reading only this section (copy review)
- [x] Cards keyboard/screen-reader friendly: ordered list semantics (`<ol>`), sprites have empty `alt` (decorative) with meaning carried by text
- [x] Layout holds at 320px (stacked), 768px (stacked or 3-up if it fits), 1024px+ (3-up with arrows)
- [x] Reveal animation skipped under reduced motion

## Subtasks
- [x] Section layout + step cards
- [x] Sprite panels (crop/scale from source spritesheets)
- [x] Connector arrows
- [x] IntersectionObserver reveal (one shared utility, reused by later sections)
- [x] Reassurance strip

## Links
- [[Tasks MOC]]
- Depends on: [[LP-01 - Scaffold Project and Design System]]
- Economy facts: `../tokengochi/docs/knowledge/game-economy.md`
