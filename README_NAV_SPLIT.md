
# Nav Split Refactor (Desktop vs Mobile)

## What changed
- **Two separate components**: `NavDesktop.astro` (desktop/full-width) and `NavMobile.astro` (mobile)
- **Separate scripts**: `desktop/functions.desktop.ts` and `mobile/functions.mobile.ts`
- **Shared data**: `navItems.ts` holds the menu items and mega menu data
- **Global brand tokens**: keep `src/styles/brand.css` imported **once** from your main Layout

## Why desktop overlapped with mobile before
- Shared class names (e.g., `.gm-*`) and a single global CSS file meant **one change impacted both**.
- Global JS querying generic selectors (like `.gm-nav`, `.gm-container`, `.gm-mega`) would bind to **both DOM trees** if both were present.
- Mega menu containers were absolutely positioned without scoping to the desktop variant, causing **stacking/context collisions**.

## Duplications/Over-complex areas to check in your originals
- **Global navStyles.css**: layout + animation rules for *both* variants mixed together.
- **One mega-menu wrapper** controlling both breakpoints.
- **Transition timings** declared multiple times for the same elements.
- **Multiple `querySelector` usages** using broad selectors (e.g., `.gm-item`, `.gm-mega`) which will match both mobile and desktop nodes.

## How to integrate
1. Copy `src/components/NavBar/**` into your project.
2. Ensure `src/styles/brand.css` is imported once in `src/layouts/Layout.astro`.
3. On your page (e.g., `src/pages/index.astro`), render both components:
   ```astro
   ---
   import NavDesktop from "@/components/NavBar/NavDesktop.astro";
   import NavMobile from "@/components/NavBar/NavMobile.astro";
   ---
   <NavDesktop />
   <NavMobile />
   ```
4. Move your real data into `navItems.ts` (we included a placeholder if we couldn't find your file).

## Customisation
- Desktop classes are prefixed `gmd-`; mobile classes `gmm-` to avoid collisions.
- Tweak desktop-only animations inside `NavDesktop.astro` without affecting mobile.
- If you have a transition manager from your original repo, import it **only** in `functions.desktop.ts`.
