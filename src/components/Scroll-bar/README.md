# Custom Scrollbar Component

This component provides a custom-styled scrollbar that matches your brand design system.

## Files

- `CustomScrollbar.astro` - Astro component with global scrollbar styles
- `scrollbar-styles.css` - Standalone CSS file for scrollbar styling
- `README.md` - This documentation

## Features

- **Brand Colors**: Uses your design system colors (primary, secondary, background)
- **Gradient Scrollbar**: Beautiful gradient from primary to secondary color
- **Interactive States**: Hover and active states with smooth transitions
- **Dark Mode Support**: Automatically adapts to accessibility dark mode
- **Mobile Responsive**: Smaller scrollbar on mobile devices
- **Accessibility**: 
  - Respects `prefers-reduced-motion` for smooth scrolling and transitions
  - High contrast mode support
  - Firefox scrollbar styling included
- **Cross-Browser**: Works in WebKit browsers (Chrome, Safari, Edge) and Firefox

## Usage

The scrollbar is automatically applied globally when included in the Layout component.

### Automatic Usage (Recommended)
Already included in `src/layouts/Layout.astro` - no additional setup needed.

### Manual Usage
If you need to apply it to specific components:

```astro
---
import CustomScrollbar from '@components/Scroll-bar/CustomScrollbar.astro';
---

<CustomScrollbar />
```

### CSS-Only Usage
If you prefer to import just the CSS:

```astro
---
import '@components/Scroll-bar/scrollbar-styles.css';
---
```

## Customization

The scrollbar uses CSS custom properties from your design system:
- `--color-primary` - Main scrollbar color
- `--color-secondary` - Secondary scrollbar color  
- `--color-primary-light` - Hover state color
- `--color-secondary-light` - Hover state color
- `--color-primary-dark` - Active state color
- `--color-secondary-dark` - Active state color
- `--color-background` - Track and border color

## Browser Support

- **Chrome/Edge/Safari**: Full custom styling with hover effects
- **Firefox**: Basic color customization using `scrollbar-color`
- **Mobile**: Responsive sizing for touch interfaces

## Accessibility Features

- Respects `prefers-reduced-motion` to disable animations
- High contrast mode support with proper color adjustments
- Maintains usability in dark mode
- Smooth scrolling behavior (can be disabled by user preference)