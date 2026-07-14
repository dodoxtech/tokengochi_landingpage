---
title: LP-06 - Download Section
tags: [task, landing-page]
status: todo
priority: high
created: 2026-07-14
due:
---

# LP-06 - Download Section

## Description
> Convert interest into installs. One big OS-matched primary button plus an "all platforms" table, and honest, friendly handling of the unsigned-build warnings so first-launch friction doesn't turn into churn.

## Technical details
- Section id `#download`. Hero CTA links here.
- **OS detection:** tiny inline script reading `navigator.userAgentData?.platform ?? navigator.platform`; sets the primary button label (`Download for macOS` / `Windows` / `Linux`) and href. Fallback when undetectable: generic `Download` → GitHub releases page. Progressive enhancement — the button works as a plain releases link before/without JS.
- **Release links:** hardcode `https://github.com/dodoxtech/tokengochi/releases/latest` (GitHub redirects to the newest tag) rather than calling the GitHub API at runtime — no rate limits, no client fetch. Optionally fetch the version number at **build time** in Astro frontmatter to render `v x.y.z` text; build must not fail if the fetch does (fall back to omitting the version).
- Platform table mirroring the README: macOS (Apple Silicon / Intel `.dmg`), Windows `.exe`, Linux `.deb` / AppImage — as `PixelCard` rows with pixel OS icons.
- **Unsigned-build callout:** a collapsible `<details>` per OS styled as a pixel dialog box titled `Your OS will act suspicious. That's expected.` with the exact steps from the README (right-click → Open / SmartScreen → Run anyway / `chmod +x`). Code snippets in a `<code>` block with a copy button (tiny JS, `navigator.clipboard`, visible "Copied!" state).
- Close with the pet sprite waving + `Free & open source. If it made your terminal less lonely → Ko-fi` link.

## Acceptance criteria
- [ ] Correct OS label on macOS, Windows, Linux user agents (test via devtools UA emulation)
- [ ] All links resolve to the live releases page; no runtime GitHub API calls
- [ ] `<details>` callouts keyboard-accessible with visible focus; copy button announces success to screen readers (`aria-live`)
- [ ] Section works fully with JS disabled (generic download link)
- [ ] Build succeeds offline (version fetch is optional-fail)

## Subtasks
- [ ] Section layout + platform table
- [ ] OS detection enhancement
- [ ] Build-time version fetch with graceful fallback
- [ ] Unsigned-build pixel dialogs + copy buttons
- [ ] Ko-fi / open-source strip

## Links
- [[Tasks MOC]]
- Depends on: [[LP-01 - Scaffold Project and Design System]]
- Install facts: `../tokengochi/README.md` (Installing section)
