Template Upgrade: Claude Code PR Playbook

Goal: Make this Astro template truly brand-swappable, simpler to maintain, and consistent.
Style: Small, safe steps. Each section = one PR.

0) Preparation (one-time)

Prompt for Claude Code

You are acting as a cautious refactor assistant. Use minimal changes per PR.

Task:
1) Open the workspace and run a quick scan for errors/warnings.
2) Create a new branch: chore/setup-pr-workflow.
3) Add .editorconfig (2 spaces for JSON/YAML, 2 for TS/JS/ASTRO, end of line lf).
4) Ensure Prettier + ESLint configs exist; if missing, create minimal ones.
5) Add simple Husky or npm pre-push script that runs: `astro check` and `eslint .` only.

Deliverables:
- Files added/edited with brief commit messages.
- Do NOT modify any feature code yet.

PR 1 — Centralise Brand Tokens (Code-first)

Prompt for Claude Code

Create branch: feat/brand-config

Goal:
Move brand tokens from CSS to TypeScript objects, while keeping CSS variables for runtime.

Steps:
1) Create /src/brand/brand.config.ts exporting:
   - getActiveBrandId(): string (from env, cookie, or default).
   - loadBrandTokens(id): returns a typed tokens object (colors, fonts, radii, shadows, assets, seo).
2) Create /src/brand/brands/ic-the-moon/tokens.ts with current palette, fonts, assets.
3) Create /src/brand/brands/ic-the-moon/theme.css that maps tokens -> CSS variables (:root.brand-ic-the-moon { --color-primary: ... }).
4) Update tailwind.config to read base tokens at build time (colors/fonts/radius) and expose via theme.extend.
5) Add a small BrandProvider island that sets `class="brand-<id>"` on <html>.

Constraints:
- Do not break existing styling; keep existing variables.css and brand.css for now.
- Add simple docs at /src/brand/README.md: how to add a new brand.

Make precise commits; open PR with a summary.

PR 2 — Navigation Consolidation (One state, two views)

Prompt for Claude Code

Create branch: feat/nav-unify

Goal:
Unify nav logic into one small state module; keep separate desktop/mobile views.

Steps:
1) Add /src/components/nav/navState.ts (tiny store: isOpen, activeMenu, methods).
2) Add /src/components/nav/navTokens.ts (timings/easings/delays only).
3) Ensure one data source /src/components/nav/navData.ts (labels, hrefs).
4) Refactor TabNav.astro to:
   - Consume navState and navTokens.
   - Remove most custom CSS; prefer Tailwind utilities.
   - Eliminate excessive `!important`.
5) Split views:
   - NavDesktop.tsx (presentational)
   - NavMobile.tsx (presentational)
   Both read the same state/data.

Acceptance:
- No visual regressions; mobile menu no longer overlaps content.
- Minimal CSS with utilities, transitions controlled in navTokens.

Open PR with before/after notes.

PR 3 — Accessibility Panel: Single Island, Single Store

Prompt for Claude Code

Create branch: feat/a11y-panel-single-store

Goal:
One React island manages all accessibility preferences and persists them.

Steps:
1) Create /src/components/Accessibility/AccessibilityPanel.tsx with toggles:
   - dyslexia font, font-size scale, line-height, dark mode, monochrome/high-contrast, plain-text mode.
2) Create /src/components/Accessibility/a11yStore.ts with localStorage keys (a11y:*).
3) Panel applies classes on <html> for each toggle; use CSS variables to cascade.
4) Reduce blur/backdrop on mobile or when prefers-reduced-motion is on.
5) Replace scattered toggle logic; remove duplicates.

Acceptance:
- Previous options still work.
- Preferences persist across pages.
- No inline style overrides; rely on classes & variables.

Open PR with a brief migration note.

PR 4 — Content Collections for Menus & Page Blocks

Prompt for Claude Code

Create branch: feat/content-collections

Goal:
Move repeatable content (menus, hero copy, blocks) into Astro Content Collections.

Steps:
1) Add src/content/config.ts with Zod schemas for `menus` and `pages`.
2) Add src/content/menus/ic-the-moon.json (nav structure).
3) Update Nav components to read from the menus collection by active brand id.
4) Move BrandHero text (title/subtitle) into a `pages` collection example.
5) Provide a fallback for missing brand-specific entries.

Acceptance:
- Build passes with `astro check`.
- Nav & hero render the same data, now from collections.

Open PR with short usage examples in README.

PR 5 — CSS Order & Utilities Clean Pass

Prompt for Claude Code

Create branch: chore/css-order-pass

Goal:
Enforce consistent CSS cascade and reduce custom CSS where Tailwind can cover.

Steps:
1) Ensure imports in Layout.astro follow:
   variables.css -> reset.css -> typography.css -> utilities -> brand/theme -> component styles.
2) In TabNav and any other components with lots of `!important`, replace with Tailwind utilities and minimal component CSS.
3) Keep brand.css only for tokenized variables or unique component quirks.

Acceptance:
- Visual parity maintained.
- CSS shrinks; `!important` usage drastically reduced.

Open PR with diff stats.

PR 6 — DX: Checks, Scripts, and Smoke Tests

Prompt for Claude Code

Create branch: chore/dx-quality-gate

Goal:
Lightweight quality gates without slowing you down.

Steps:
1) Add NPM scripts: dev, build, preview, typecheck (astro check + tsc --noEmit), lint, format, test.
2) Add a couple of Playwright smoke tests:
   - Nav opens/closes.
   - A11y panel toggles classes on <html>.
3) Pre-push script runs `astro check` and `eslint .` only.

Acceptance:
- Scripts run on Windows and macOS.
- Tests are fast and stable.

Open PR with instructions in README.

Optional — Brand Preview Without Rebuild

Prompt for Claude Code

Create branch: feat/brand-preview

Goal:
Preview different brands by query param or cookie in the same build.

Steps:
1) Middleware (or client island) reads ?brand=<id>; sets cookie/localStorage.
2) BrandProvider loads the corresponding theme.css and sets html class.
3) Add a /brand-preview page with a dropdown (dev-only).

Acceptance:
- Switching brands updates tokens live.
- No full rebuild needed for previews.

Open PR with short demo GIF (optional).

PR Template (use for each PR)

Prompt for Claude Code

Create a .github/pull_request_template.md with:

## Summary
Short, plain-English explanation.

## Changes
- Bullet list of changes.

## Risk/Impact
- Expected impact and possible regressions.

## Test Plan
- Steps or Playwright test names.

## Screenshots
- Before/After (if UI).

After Merging All PRs

Prompt for Claude Code

Goal:
1) Update README with "How to add a new brand":
   - Duplicate /src/brand/brands/ic-the-moon
   - Edit tokens.ts, theme.css, assets (logo, favicon).
   - Add menus JSON to content collections.
   - Preview with ?brand=<id> or Brand Preview page.
2) Add short "Maintenance cheatsheet":
   - Where to change typography, colors, nav timings, and a11y defaults.
3) Run full check: astro check, lint, tests, preview. Provide final summary.

Constraints: Keep docs concise and scannable.

Quick Notes

Keep each branch focused. One intent per PR = easy reviews and clean rollbacks.

Prefer utilities + variables over bespoke CSS.

Centralise timing/easing in one place to avoid “ghost animations.”

Ship early, ship often. Small wins compound.