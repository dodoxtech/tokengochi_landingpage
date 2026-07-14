---
title: LP-04 - Features Grid
tags: [task, landing-page]
status: todo
priority: medium
created: 2026-07-14
due:
---

# LP-04 - Features Grid

## Description
> Show what makes Tokengochi lovable and trustworthy. Not a uniform stock grid — a bento-style layout where the two emotional features get big cells and the technical trust points get compact ones.
>
> **Big cells:**
> - **It actually lives on your screen** — wanders screen edges and your taskbar, chases food, sleeps when you do. Illustrate with a wide strip showing the pet mid-walk (walk-cycle frames).
> - **Progression that respects your time** — streaks, evolution stages, cosmetics (show hat/scarf sprites from `shop-items-master.png`), collection album. Earned in-app, never bought.
>
> **Compact cells:**
> - **Local-first** — state in SQLite on your machine; the core loop makes zero network calls.
> - **Cross-platform** — macOS, Windows, Linux (X11 first, Wayland best-effort). Show three OS pixel icons.
> - **Near-zero footprint** — <100 MB RAM, negligible idle CPU.
> - **Extensible** — provider model for other LLM CLIs beyond Claude Code.

## Technical details
- CSS grid: `grid-template-columns: repeat(6, 1fr)` on `lg`; big cells span 3×2, compact cells 3×1 or 2×1 — tune so nothing looks orphaned. Single column on mobile, big cells first.
- All cells are `PixelCard`; big cells get a cream inner panel for sprite scenes, compact cells are text-forward with one small sprite/icon each.
- Walk-cycle strip in the first big cell: `steps()` spritesheet animation, pet slowly walks the cell width and loops (translate + background-position). Static frame under reduced motion.
- Numbers (<100 MB, 20k tokens) styled as pixel "stat chips" in `--color-token-green` on `--color-ink` — they're the credibility anchors, make them scannable.
- Reuse the LP-03 IntersectionObserver reveal utility.

## Acceptance criteria
- [ ] Bento layout with clear visual hierarchy (emotional > technical) at 1024px+; clean single column at 320px
- [ ] Every claim in the copy is true per `../tokengochi/docs/product.md` and README (no invented specs)
- [ ] Walk animation loops without jank and freezes under reduced motion
- [ ] Semantic structure: section h2 + each cell an `<article>` with h3

## Subtasks
- [ ] Bento grid layout
- [ ] Walk-cycle cell
- [ ] Cosmetics/progression cell (arrange item sprites)
- [ ] Four compact trust cells with stat chips
- [ ] Copy pass against source docs

## Links
- [[Tasks MOC]]
- Depends on: [[LP-01 - Scaffold Project and Design System]], reveal utility from [[LP-03 - How It Works Section]]
