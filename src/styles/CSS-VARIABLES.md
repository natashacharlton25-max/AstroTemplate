# CSS Custom Properties Documentation

This document outlines all CSS custom properties (CSS variables) used in the IC the Moon Astro template. These variables enable consistent theming and easy customization across the entire site.

## Brand Variables
These variables are automatically generated from `src/site.config.ts` via the sync script.

### Brand Identity
- `--brand-name` - The brand name (e.g., "IC the Moon")
- `--brand-tagline` - The brand tagline (e.g., "Digital Accessibility & Design")
- `--brand-description` - Brand description text

### Colors
- `--brand-primary` - Primary brand color (#e63961)
- `--brand-secondary` - Secondary brand color (#184e77)
- `--brand-background` - Main background color (#faf7f4)
- `--brand-text-light` - Light text color for dark backgrounds (#faf7f4)
- `--brand-text-dark` - Dark text color (#333333)

### Typography
- `--font-primary` - Primary font family ("Poppins", sans-serif)
- `--font-secondary` - Secondary font family ("Inter", sans-serif)
- `--font-nav` - Navigation font family ("Poppins", sans-serif)

### Assets
- `--logo-path` - Path to the logo image
- `--logo-alt` - Alt text for the logo
- `--favicon-path` - Path to the favicon

## Component-Specific Variables

### Navigation
- `--nav-height` - Height of navigation elements (48px)
- `--nav-mobile-height` - Height on mobile devices (40px)
- `--nav-border-radius` - Border radius for nav elements (28px)
- `--nav-mobile-border-radius` - Mobile border radius (20px)

### Glass Effects
- `--glass-backdrop-blur` - Backdrop blur for glass morphism (blur(12px))

### Transitions
- `--transition-base` - Base transition duration (0.3s)
- `--transition-fast` - Fast transition (0.2s)

### Shadows
- `--shadow-sm` - Small shadow
- `--shadow-md` - Medium shadow (4px 0 16px rgba(24, 78, 119, 0.1))
- `--shadow-lg` - Large shadow (8px 0 20px color-mix(...))

### Z-Index Layers
- Navigation overlay: 998
- Navigation tab: 999
- Navigation expanded: 1000
- Navigation items: 1001

## Usage Examples

### Using Brand Colors
```css
.my-component {
  background-color: var(--brand-primary);
  color: var(--brand-text-light);
  border: 1px solid var(--brand-secondary);
}
```

### Color Mixing for Transparency
```css
.translucent-element {
  background: color-mix(in srgb, var(--brand-secondary) 20%, transparent);
  box-shadow: 4px 0 16px color-mix(in srgb, var(--brand-primary) 25%, transparent);
}
```

### Responsive Variables
```css
@media (max-width: 768px) {
  .nav-element {
    height: var(--nav-mobile-height);
    border-radius: var(--nav-mobile-border-radius);
  }
}
```

## Adding New Variables

1. **Brand Variables**: Add to `src/site.config.ts` and they'll be auto-generated
2. **Component Variables**: Add to the appropriate CSS file and document here
3. **Theme Variables**: Add to `src/styles/themes/brand.css`

## File Locations

- **Generated Variables**: `src/styles/tokens/variables.css` (auto-generated)
- **Brand Theme**: `src/styles/themes/brand.css`
- **Component Styles**: `src/components/[Component]/styles/`

## Maintenance Notes

- Variables in `src/styles/tokens/variables.css` are auto-generated - do not edit manually
- Run `npm run sync:config` to regenerate variables from site config
- Use semantic naming (what it represents, not what it looks like)
- Group related variables with CSS comments for better organization