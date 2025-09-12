#!/usr/bin/env node

/**
 * Sync Config Script
 * 
 * This script reads the site configuration and generates CSS custom properties
 * to keep the design system in sync with the brand configuration.
 */

import { writeFile, readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

async function syncConfig() {
  try {
    console.log('🔄 Syncing site configuration with CSS variables...');
    console.log('Starting sync process...');

    // For now, let's create a simple mapping directly here since TypeScript imports are complex
    const siteConfig = {
      brand: {
        name: "IC the Moon",
        tagline: "Digital Accessibility & Design",
        description: "Creating inclusive digital experiences that work for everyone, everywhere.",
        logo: {
          path: "/images/LogoPlaceholder.png",
          fallback: "IC"
        }
      },
      contact: {
        email: "natashacharlton25@googlemail.com"
      },
      theme: {
        colors: {
          primary: "#e63961",
          secondary: "#184e77",
          background: "#fffaf6",
          textPrimary: "#5c5b5b",
          textLight: "#ebdddd",
          white: "#ffffff",
          black: "#837474",
          primaryLight: "#f06b8a",
          primaryDark: "#d63456",
          secondaryLight: "#2d6b9a",
          secondaryDark: "#0f3a5c",
          accent1: "#ffb703",
          accent2: "#fb8500",
          neutralDark: "#111319",
          neutralMid: "#727586",
          neutralLight: "#e7e8eb"
        },
        fonts: {
          body: "'Poppins', system-ui, -apple-system, sans-serif",
          heading: "'Poppins', system-ui, -apple-system, sans-serif",
          nav: "var(--font-body)"
        },
        navigation: {
          height: "45px",
          mobileHeight: "60px",
          borderRadius: "35px",
          mobileBorderRadius: "30px"
        }
      }
    };

    const cssProperties = {
      '--brand-name': `"${siteConfig.brand.name}"`,
      '--brand-tagline': `"${siteConfig.brand.tagline}"`, 
      '--brand-description': `"${siteConfig.brand.description}"`,
      '--brand-logo-path': `"${siteConfig.brand.logo.path}"`,
      '--brand-logo-fallback': `"${siteConfig.brand.logo.fallback}"`,
      '--contact-email': `"${siteConfig.contact.email}"`,
      '--color-primary': siteConfig.theme.colors.primary,
      '--color-secondary': siteConfig.theme.colors.secondary,
      '--color-background': siteConfig.theme.colors.background,
      '--color-text-primary': siteConfig.theme.colors.textPrimary,
      '--color-text-light': siteConfig.theme.colors.textLight,
      '--color-white': siteConfig.theme.colors.white,
      '--color-black': siteConfig.theme.colors.black,
      '--color-primary-light': siteConfig.theme.colors.primaryLight,
      '--color-primary-dark': siteConfig.theme.colors.primaryDark,
      '--color-secondary-light': siteConfig.theme.colors.secondaryLight,
      '--color-secondary-dark': siteConfig.theme.colors.secondaryDark,
      '--brand-accent-1': siteConfig.theme.colors.accent1,
      '--brand-accent-2': siteConfig.theme.colors.accent2,
      '--brand-neutral-dark': siteConfig.theme.colors.neutralDark,
      '--brand-neutral-mid': siteConfig.theme.colors.neutralMid,
      '--brand-neutral-light': siteConfig.theme.colors.neutralLight,
      '--font-body': siteConfig.theme.fonts.body,
      '--font-heading': siteConfig.theme.fonts.heading,
      '--font-nav': siteConfig.theme.fonts.nav,
      '--nav-height': siteConfig.theme.navigation.height,
      '--nav-mobile-height': siteConfig.theme.navigation.mobileHeight,
      '--nav-border-radius': siteConfig.theme.navigation.borderRadius,
      '--nav-mobile-border-radius': siteConfig.theme.navigation.mobileBorderRadius,
    };

    // Read the current variables.css file
    const variablesPath = resolve(projectRoot, 'src/styles/tokens/variables.css');
    let variablesContent = await readFile(variablesPath, 'utf-8');

    // Extract the section between markers
    const startMarker = '/* === GENERATED FROM SITE CONFIG - DO NOT EDIT MANUALLY === */';
    const endMarker = '/* === END GENERATED SECTION === */';
    
    const beforeSection = variablesContent.split(startMarker)[0];
    const afterMatch = variablesContent.split(endMarker);
    const afterSection = afterMatch.length > 1 ? afterMatch[1] : '';

    // Generate CSS properties from config
    const cssPropertiesText = Object.entries(cssProperties)
      .map(([property, value]) => `  ${property}: ${value};`)
      .join('\n');

    // Reconstruct the file
    const newContent = `${beforeSection}${startMarker}
:root {
${cssPropertiesText}
}
${endMarker}${afterSection}`;

    await writeFile(variablesPath, newContent, 'utf-8');

    console.log('✅ Successfully synced configuration with CSS variables');
    console.log(`   Updated: ${variablesPath}`);
    console.log(`   Properties: ${Object.keys(cssProperties).length}`);
    
    // List the updated properties for verification
    console.log('   Updated CSS properties:', Object.keys(cssProperties).join(', '));

  } catch (error) {
    console.error('❌ Error syncing configuration:', error.message);
    process.exit(1);
  }
}

// Run the sync if called directly
console.log('Script starting...');
syncConfig();

export { syncConfig };