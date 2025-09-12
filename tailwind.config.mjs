/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html',
  ],
  safelist: [
    // Accessibility classes that are added dynamically
    'accessibility-dark-mode',
    'accessibility-plain-text-mode', 
    'accessibility-keyboard-helpers',
    'accessibility-screen-reader-helpers',
    'accessibility-high-contrast',
    // Dynamic background and font classes
    'bg-cream', 'bg-blue', 'bg-pink', 'bg-dark', 'bg-gray',
    'font-atkinson', 'font-opendyslexic',
    // Glassmorphic utility classes
    'glass-light', 'glass-medium', 'glass-heavy', 'glass-blur',
    // Navigation states
    'show', 'exiting', 'active',
    // Footer reveal states  
    'tight'
  ],
  theme: {
    extend: {
      colors: {
        // Use CSS custom properties for brand colors
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)', 
        'background': 'var(--color-background)',
        'accent': 'var(--color-primary)',
        'cream': 'var(--color-background)',
      },
      fontFamily: {
        'body': 'var(--font-body)',
        'heading': 'var(--font-heading)',
        'nav': 'var(--font-nav)',
      },
      spacing: {
        'nav': 'var(--nav-height)',
        'nav-mobile': 'var(--nav-mobile-height)',
      },
      borderRadius: {
        'nav': 'var(--nav-border-radius)',
        'nav-mobile': 'var(--nav-mobile-border-radius)',
      }
    },
  },
  plugins: [],
}