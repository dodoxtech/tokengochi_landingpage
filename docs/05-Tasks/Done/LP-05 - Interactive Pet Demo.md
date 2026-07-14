---
title: LP-05 - Interactive Pet Demo
tags: [task, landing-page]
status: done
priority: medium
created: 2026-07-14
due:
---

# LP-05 - Interactive Pet Demo

## Description
> The "aha" moment: let visitors feed a pet right on the page. A horizontal strip styled like a pixel desktop taskbar where the hatchling idles and wanders; a `Drop a snack 🍎` PixelButton spawns a food sprite at a random x-position, and the pet runs over and eats it. This is the section people will screen-record and share.

## Technical details
- This is the page's one real JS island (`client:visible` so it costs nothing above the fold). Vanilla TypeScript, no framework — a tiny state machine: `idle → walk(target) → eat → idle`, mirroring the real app's behavior model.
- Rendering: absolutely-positioned `<div>`s with spritesheet `steps()` animations per state; movement via `transform: translateX` transitions with linear easing and duration proportional to distance (~80px/s, matches a cozy walk). Flip sprite with `scaleX(-1)` when walking left.
- Food: sprites from `food-default-master.png` (rotate through 3–4 foods). On eat: food disappears frame-by-frame (or shrinks in 3 steps — keep it pixel-y, no smooth scale), pet plays eat frames, then a `+1 XP` pixel toast floats up in `--color-token-green`.
- Fun details: idle blink every ~6s (gag-expression frames); if the user drops 5+ snacks quickly, pet gets a brief "full" expression and a tooltip `Daily caps keep me from overeating in the real app too!` — turns a joke into an economy fact.
- Queue at most 3 pending foods; further clicks bounce the button (deny animation) so state can't explode.
- Accessibility: button is a real `<button>`; strip has `role="img"` + `aria-label` describing the scene; toast updates an `aria-live="polite"` region (`"Pet ate a snack"`). Under `prefers-reduced-motion`, pet teleports (no walk transition) and food appears/disappears without animation — the interaction still works.
- Caption under the strip: `This is the actual pet. In the real app, your Claude Code usage does the feeding.`

## Acceptance criteria
- [x] Feed interaction works with mouse, touch, and keyboard (Enter/Space on button)
- [x] No layout shift when island hydrates; island JS ≤ ~5 KB gzipped
- [x] State machine never deadlocks (spam-click test: 20 rapid clicks)
- [x] Reduced-motion variant fully functional
- [x] Works at 320px (strip scrolls or scales; button always reachable)

## Subtasks
- [x] Sprite state machine (idle/walk/eat + facing)
- [x] Food spawn/queue logic
- [x] XP toast + aria-live
- [x] Overfeed easter egg
- [x] Touch/keyboard/reduced-motion pass

## Links
- [[Tasks MOC]]
- Depends on: [[LP-01 - Scaffold Project and Design System]]
- Sprite frame data: `../tokengochi/docs/knowledge/pet-action-pack-spec.md`, `sprite-asset-pipeline.md`
