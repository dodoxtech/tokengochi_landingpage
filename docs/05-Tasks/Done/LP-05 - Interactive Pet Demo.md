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
> The "aha" moment: let visitors see how AI usage becomes pet food. A horizontal strip styled like a pixel desktop taskbar where the hatchling waits while a simulated prompt is typed, a mock agent run spends tokens, the meter climbs to 20,000, and a snack drops for the pet to eat. This is the section people will screen-record and share.

## Technical details
- This is the page's one real JS island (`client:visible` so it costs nothing above the fold). Vanilla TypeScript, no framework — a tiny state machine: `idle → type prompt → run agent meter → drop snack → walk(target) → eat → idle`, mirroring the real app's behavior model.
- Rendering: absolutely-positioned `<div>`s with spritesheet `steps()` animations per state; movement via `transform: translateX` transitions with linear easing and duration proportional to distance (~80px/s, matches a cozy walk). Flip sprite with `scaleX(-1)` when walking right, matching the hatchling sheet's default facing.
- Food: the snack sprite drops automatically after the simulated token meter reaches 20,000. On eat: food disappears frame-by-frame, pet plays eat frames, then a `+1 snack` pixel toast floats up in `--color-token-green`.
- Fun detail: the threshold tooltip says `20,000 weighted tokens became one snack. Daily caps keep progress healthy.` — turns the economy rule into a visible moment.
- Accessibility: button is a real `<button>`; strip has `role="img"` + `aria-label` describing the scene; toast updates an `aria-live="polite"` region (`"Agent reached 20,000 tokens and the pet ate a snack"`). Under `prefers-reduced-motion`, typing, token progress, and food drop complete without animation — the interaction still works.
- Caption under the strip: `This is the actual pet. In the real app, local Claude Code usage fills the meter instead of this simulation.`

## Acceptance criteria
- [x] Feed interaction works with mouse, touch, and keyboard (Enter/Space on button)
- [x] No layout shift when island hydrates; island JS ≤ ~5 KB gzipped
- [x] State machine prevents duplicate runs while the prompt simulation is active
- [x] Reduced-motion variant fully functional
- [x] Works at 320px (strip scrolls or scales; button always reachable)

## Subtasks
- [x] Sprite state machine (idle/walk/eat + facing)
- [x] Prompt typing + agent token meter
- [x] Food spawn at 20,000 tokens
- [x] Snack toast + aria-live
- [x] Threshold tooltip
- [x] Touch/keyboard/reduced-motion pass

## Links
- [[Tasks MOC]]
- Depends on: [[LP-01 - Scaffold Project and Design System]]
- Sprite frame data: `../tokengochi/docs/knowledge/pet-action-pack-spec.md`, `sprite-asset-pipeline.md`
