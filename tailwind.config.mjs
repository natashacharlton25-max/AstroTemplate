/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: ['glass-blur'],
  theme: {
    extend: {
      colors: {
        'primary': '#184e77',
        'accent': '#e63961',
        'cream': '#fffaf6',
      },
    },
  },
  plugins: [],
}