/**
 * Site Configuration
 * 
 * This file contains all the brand-specific settings and content
 * that make this template customizable. Change these values to
 * rebrand the entire site.
 */

export interface SiteConfig {
  // Brand Identity
  brand: {
    name: string;
    tagline: string;
    logo: {
      path: string;
      alt: string;
      fallback: string;
    };
    favicon: string;
  };

  // Contact Information
  contact: {
    email: string;
    phone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };

  // Design System
  theme: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      textPrimary: string;
      textLight: string;
      white: string;
      black: string;
      // Color variations
      primaryLight: string;
      primaryDark: string;
      secondaryLight: string;
      secondaryDark: string;
      // Extended palette
      accent1: string;
      accent2: string;
      neutralDark: string;
      neutralMid: string;
      neutralLight: string;
    };
    fonts: {
      body: string;
      heading: string;
      nav: string;
    };
    navigation: {
      height: string;
      mobileHeight: string;
      borderRadius: string;
      mobileBorderRadius: string;
    };
  };

  // Content
  content: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    accessibility: {
      title: string;
      description: string;
    };
    navigation: {
      items: Array<{
        label: string;
        href: string;
        external?: boolean;
      }>;
    };
    footer: {
      sections: {
        company: {
          title: string;
          items: Array<{ name: string; url: string; }>;
        };
        products: {
          title: string;
          items: Array<{ name: string; url: string; }>;
        };
        resources: {
          title: string;
          items: Array<{ name: string; url: string; }>;
        };
        legal: {
          title: string;
          items: Array<{ name: string; url: string; }>;
        };
      };
      social: Array<{
        name: string;
        url: string;
        icon: string;
      }>;
      copyright: {
        year: number;
        text: string;
      };
    };
  };

  // SEO & Meta
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    twitterHandle?: string;
  };
}

// Default configuration for "IC the Moon" brand
export const siteConfig: SiteConfig = {
  brand: {
    name: "IC the Moon",
    tagline: "Digital Accessibility & Design", 
    description: "Creating inclusive digital experiences that work for everyone, everywhere.",
    logo: {
      path: "/images/LogoPlaceholder.png",
      alt: "IC the Moon Logo",
      fallback: "IC"
    },
    favicon: "/Favicon/favicon.ico"
  },

  contact: {
    email: "natashacharlton25@googlemail.com",
    phone: "+44 (0) 123 456 789",
    address: {
      street: "123 Innovation Street",
      city: "London", 
      state: "England",
      zip: "SW1A 1AA",
      country: "UK"
    }
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
      // Color variations
      primaryLight: "#f06b8a",
      primaryDark: "#d63456",
      secondaryLight: "#2d6b9a",
      secondaryDark: "#0f3a5c",
      // Extended palette
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
  },

  content: {
    hero: {
      title: "IC the Moon",
      subtitle: "Digital Accessibility & Design",
      description: "Creating inclusive digital experiences that work for everyone, everywhere."
    },
    accessibility: {
      title: "Accessibility Features",
      description: "Customize your viewing experience with our comprehensive accessibility tools."
    },
    navigation: {
      items: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Projects", href: "/projects" },
        { label: "Insights", href: "/insights" },
        { label: "Assets", href: "/assets" }
      ]
    },
    footer: {
      sections: {
        company: {
          title: "Company",
          items: [
            { name: "About Us", url: "/about" },
            { name: "Services", url: "/services" },
            { name: "Portfolio", url: "/portfolio" },
            { name: "Blog", url: "/blog" }
          ]
        },
        products: {
          title: "Services",
          items: [
            { name: "Accessibility Audits", url: "/services/audits" },
            { name: "Design Consultation", url: "/services/design" },
            { name: "Training", url: "/services/training" },
            { name: "Support", url: "/services/support" }
          ]
        },
        resources: {
          title: "Resources",
          items: [
            { name: "Help Center", url: "/help" },
            { name: "Accessibility Guide", url: "/guide" },
            { name: "Contact", url: "/contact" },
            { name: "Status", url: "/status" }
          ]
        },
        legal: {
          title: "Legal",
          items: [
            { name: "Privacy Policy", url: "/privacy" },
            { name: "Terms of Service", url: "/terms" },
            { name: "Cookie Policy", url: "/cookies" },
            { name: "Accessibility Statement", url: "/accessibility-statement" }
          ]
        }
      },
      social: [
        { name: "Twitter", url: "https://twitter.com/icthemoon", icon: "twitter" },
        { name: "LinkedIn", url: "https://linkedin.com/company/icthemoon", icon: "linkedin" },
        { name: "GitHub", url: "https://github.com/icthemoon", icon: "github" },
        { name: "Instagram", url: "https://instagram.com/icthemoon", icon: "instagram" }
      ],
      copyright: {
        year: new Date().getFullYear(),
        text: "All rights reserved."
      }
    }
  },

  seo: {
    title: "IC the Moon - Digital Accessibility & Design",
    description: "Creating inclusive digital experiences through expert accessibility consulting and thoughtful design.",
    keywords: ["accessibility", "design", "inclusive design", "web accessibility", "UX", "digital inclusion"],
    ogImage: "/images/og-image.jpg"
  }
};

// Helper function to get theme CSS custom properties
export function getThemeCSSProperties(config: SiteConfig): Record<string, string> {
  return {
    '--brand-name': `"${config.brand.name}"`,
    '--brand-logo-path': `"${config.brand.logo.path}"`,
    '--brand-logo-fallback': `"${config.brand.logo.fallback}"`,
    '--contact-email': `"${config.contact.email}"`,
    
    // Colors
    '--color-primary': config.theme.colors.primary,
    '--color-secondary': config.theme.colors.secondary,
    '--color-background': config.theme.colors.background,
    '--color-text-primary': config.theme.colors.textPrimary,
    '--color-text-light': config.theme.colors.textLight,
    '--color-white': config.theme.colors.white,
    '--color-black': config.theme.colors.black,
    '--color-primary-light': config.theme.colors.primaryLight,
    '--color-primary-dark': config.theme.colors.primaryDark,
    '--color-secondary-light': config.theme.colors.secondaryLight,
    '--color-secondary-dark': config.theme.colors.secondaryDark,
    '--brand-accent-1': config.theme.colors.accent1,
    '--brand-accent-2': config.theme.colors.accent2,
    '--brand-neutral-dark': config.theme.colors.neutralDark,
    '--brand-neutral-mid': config.theme.colors.neutralMid,
    '--brand-neutral-light': config.theme.colors.neutralLight,
    
    // Typography
    '--font-body': config.theme.fonts.body,
    '--font-heading': config.theme.fonts.heading,
    '--font-nav': config.theme.fonts.nav,
    
    // Navigation
    '--nav-height': config.theme.navigation.height,
    '--nav-mobile-height': config.theme.navigation.mobileHeight,
    '--nav-border-radius': config.theme.navigation.borderRadius,
    '--nav-mobile-border-radius': config.theme.navigation.mobileBorderRadius,
  };
}

export default siteConfig;