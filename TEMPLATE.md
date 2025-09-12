# Rebrandable Astro Template

This Astro template is designed to be easily rebrandable. Change a few configuration values and you'll have a completely new brand identity across the entire site.

## Quick Start for Rebranding

### 1. Edit the Site Configuration

The main configuration file is `src/site.config.ts`. This contains all brand-specific settings and follows the same pattern as the existing `footerData.js`:

```typescript
export const siteConfig: SiteConfig = {
  brand: {
    name: "Your Brand Name",           // 🔄 Change this
    tagline: "Your Brand Tagline",     // 🔄 Change this
    description: "Your brand description", // 🔄 Brand description
    logo: {
      path: "/images/your-logo.png",   // 🔄 Replace logo file
      alt: "Your Brand Logo",          // 🔄 Update alt text
      fallback: "YB"                   // 🔄 Fallback initials
    },
    favicon: "/favicon.ico"            // 🔄 Replace favicon
  },

  contact: {
    email: "hello@yourdomain.com",     // 🔄 Change contact email
    phone: "+1 (555) 123-4567",       // 🔄 Optional phone
    address: {                         // 🔄 Optional address
      street: "123 Your Street",
      city: "Your City", 
      state: "Your State",
      zip: "12345",
      country: "Your Country"
    }
  },

  theme: {
    colors: {
      primary: "#your-primary-color",  // 🔄 Main brand color
      secondary: "#your-secondary",    // 🔄 Secondary brand color
      background: "#your-background",  // 🔄 Page background
      // ... more colors (see full config for all options)
    },
    fonts: {
      body: "'Your Font', sans-serif", // 🔄 Change fonts
      heading: "'Your Heading Font'"   // 🔄 Change heading font
    },
    navigation: {
      height: "45px",                  // 🔄 Nav height
      borderRadius: "35px"             // 🔄 Nav border radius
    }
  },

  content: {
    hero: {
      title: "Your Hero Title",        // 🔄 Main heading
      subtitle: "Your Subtitle",       // 🔄 Hero subtitle
      description: "Your description"  // 🔄 Hero description
    },
    navigation: {
      items: [                         // 🔄 Navigation menu
        { label: "Home", href: "/" },
        { label: "About", href: "/about" }
        // ... add your menu items
      ]
    },
    footer: {
      sections: {                      // 🔄 Footer link sections
        company: {
          title: "Company",
          items: [
            { name: "About Us", url: "/about" },
            // ... your company links
          ]
        }
        // ... more sections
      },
      social: [                        // 🔄 Social media links
        { name: "Twitter", url: "https://twitter.com/yourhandle", icon: "twitter" }
        // ... your social links
      ]
    }
  }
}
```

### 2. Run the Sync Script

After editing the configuration, run this command to sync your changes with the CSS:

```bash
npm run sync:config
```

This automatically updates all CSS custom properties to match your brand configuration.

### 3. Replace Assets

- **Logo**: Replace `/public/images/LogoPlaceholder.png` with your logo
- **Favicon**: Replace `/public/favicon.ico` with your favicon
- **OG Image**: Add your social media image at the path specified in config

### 4. Test Your Changes

```bash
npm run dev
```

Visit `http://localhost:4321` to see your rebranded site!

## Configuration Reference

### Brand Identity
- `brand.name`: Site name (appears in nav, titles, etc.)
- `brand.tagline`: Short brand tagline
- `brand.logo.path`: Path to your logo image
- `brand.favicon`: Path to your favicon

### Colors
All colors support hex, rgb, or hsl values:
- `theme.colors.primary`: Main brand color (buttons, links, accents)
- `theme.colors.secondary`: Secondary color (headings, borders)
- `theme.colors.background`: Page background color
- `theme.colors.textPrimary`: Main text color

### Typography
- `theme.fonts.body`: Font for body text and UI elements
- `theme.fonts.heading`: Font for headings (h1, h2, etc.)

### Content
- `content.hero.title`: Main hero heading
- `content.hero.subtitle`: Hero subtitle text
- `content.navigation.items`: Navigation menu items

### SEO & Social
- `seo.title`: Default page title
- `seo.description`: Default meta description
- `seo.keywords`: Array of SEO keywords
- `seo.ogImage`: Social media preview image

## How It Works

This template extends the existing `footerData.js` pattern to the entire site:

1. **Single Source of Truth**: All brand settings live in `src/site.config.ts`
2. **Auto-Generated CSS**: The build process syncs config values to CSS custom properties
3. **Component Props**: Components use config values as default props (just like BrandHero already does)
4. **Footer Integration**: The existing `footerData.js` now imports from site config for consistency
5. **Build Integration**: `npm run dev` and `npm run build` automatically sync configuration
6. **Path Aliases**: Uses `@styles/*`, `@components/*` etc. for clean imports

## File Structure

```
src/
├── site.config.ts          # 📝 Main configuration file
├── styles/
│   ├── global.css           # 📦 Consolidated styles
│   ├── tokens/variables.css # 🎨 Generated CSS variables
│   └── themes/brand.css     # 🎯 Brand-specific styles
├── components/
│   ├── Hero/BrandHero.astro # 🏠 Configurable hero component
│   └── layouts/Layout.astro # 📄 Main layout with config integration
└── pages/
    └── *.astro             # 📃 Your pages

scripts/
└── sync-config.mjs         # ⚙️ Config sync utility
```

## Advanced Customization

### Adding New Colors
1. Add color to `theme.colors` in `site.config.ts`
2. Update the CSS properties mapping in `scripts/sync-config.mjs`
3. Run `npm run sync:config`

### Custom Navigation
Edit `content.navigation.items` array:
```typescript
navigation: {
  items: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "External", href: "https://example.com", external: true }
  ]
}
```

### Multiple Brands
For managing multiple brands, you can:
1. Create multiple config files (e.g. `site.config.brand-a.ts`)
2. Use environment variables to switch between configs
3. Build separate versions for different brands

## Tips for Designers

- Use CSS custom properties in your styles: `var(--color-primary)`
- All spacing uses the design system: `var(--space-lg)`
- Typography scales are predefined: `var(--text-xl)`
- Component styles automatically adapt to color changes

## Development Commands

```bash
npm run dev          # Start dev server (auto-syncs config)
npm run build        # Build for production (syncs config first)
npm run sync:config  # Manually sync configuration with CSS
npm run preview      # Preview built site
```

## Need Help?

- **Configuration Issues**: Check `src/site.config.ts` syntax
- **Styling Issues**: Verify CSS custom properties in DevTools
- **Build Issues**: Run `npm run sync:config` manually

---

Happy rebranding! 🎨✨