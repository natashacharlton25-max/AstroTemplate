/**
 * Example Brand Configuration
 * 
 * Copy this file to site.config.ts and customize the values
 * to create your own brand. This example shows a fictional
 * "GreenTech Solutions" brand.
 */

import type { SiteConfig } from './site.config';

export const siteConfig: SiteConfig = {
  brand: {
    name: "GreenTech Solutions",
    tagline: "Sustainable Technology for Tomorrow",
    logo: {
      path: "/images/greentech-logo.svg",
      alt: "GreenTech Solutions Logo",
      fallback: "GT"
    },
    favicon: "/favicon-green.ico"
  },

  contact: {
    email: "hello@greentech-solutions.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Innovation Drive",
      city: "Tech City",
      state: "TC",
      zip: "12345",
      country: "United States"
    }
  },

  theme: {
    colors: {
      primary: "#10b981",        // Emerald green
      secondary: "#1f2937",      // Dark gray
      background: "#f8fafc",     // Light gray background
      textPrimary: "#374151",    // Dark gray text
      textLight: "#f9fafb",      // Light text for dark backgrounds
      white: "#ffffff",
      black: "#111827",
      // Color variations
      primaryLight: "#34d399",   // Light green
      primaryDark: "#059669",    // Dark green
      secondaryLight: "#4b5563", // Medium gray
      secondaryDark: "#111827",  // Very dark gray
      // Extended palette
      accent1: "#f59e0b",        // Amber accent
      accent2: "#dc2626",        // Red accent
      neutralDark: "#1f2937",
      neutralMid: "#6b7280",
      neutralLight: "#e5e7eb"
    },
    fonts: {
      body: "'Inter', system-ui, -apple-system, sans-serif",
      heading: "'Plus Jakarta Sans', system-ui, sans-serif",
      nav: "var(--font-body)"
    },
    navigation: {
      height: "50px",
      mobileHeight: "65px", 
      borderRadius: "12px",
      mobileBorderRadius: "16px"
    }
  },

  content: {
    hero: {
      title: "GreenTech Solutions",
      subtitle: "Sustainable Technology for Tomorrow",
      description: "We create innovative green technologies that help businesses reduce their environmental impact while improving efficiency and profitability."
    },
    accessibility: {
      title: "Accessibility Center",
      description: "Customize your experience with our comprehensive accessibility tools designed for everyone."
    },
    navigation: {
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "About", href: "/about" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Resources", href: "/resources" },
        { label: "Contact", href: "/contact" }
      ]
    },
    footer: {
      sections: {
        company: {
          title: "Company",
          items: [
            { name: "About Us", url: "/about" },
            { name: "Solutions", url: "/solutions" },
            { name: "Case Studies", url: "/case-studies" },
            { name: "Careers", url: "/careers" }
          ]
        },
        products: {
          title: "Solutions",
          items: [
            { name: "Energy Solutions", url: "/solutions/energy" },
            { name: "Waste Management", url: "/solutions/waste" },
            { name: "Carbon Tracking", url: "/solutions/carbon" },
            { name: "Consulting", url: "/solutions/consulting" }
          ]
        },
        resources: {
          title: "Resources",
          items: [
            { name: "Documentation", url: "/docs" },
            { name: "Support", url: "/support" },
            { name: "Blog", url: "/blog" },
            { name: "Contact", url: "/contact" }
          ]
        },
        legal: {
          title: "Legal",
          items: [
            { name: "Privacy Policy", url: "/privacy" },
            { name: "Terms of Service", url: "/terms" },
            { name: "Environmental Policy", url: "/environmental-policy" },
            { name: "Compliance", url: "/compliance" }
          ]
        }
      },
      social: [
        { name: "LinkedIn", url: "https://linkedin.com/company/greentech-solutions", icon: "linkedin" },
        { name: "Twitter", url: "https://twitter.com/greentech_sol", icon: "twitter" },
        { name: "Instagram", url: "https://instagram.com/greentech.solutions", icon: "instagram" },
        { name: "GitHub", url: "https://github.com/greentech-solutions", icon: "github" }
      ],
      copyright: {
        year: new Date().getFullYear(),
        text: "All rights reserved. Building a sustainable future together."
      }
    }
  },

  seo: {
    title: "GreenTech Solutions - Sustainable Technology Innovation",
    description: "Leading provider of sustainable technology solutions that help businesses reduce environmental impact while maximizing efficiency and profitability.",
    keywords: [
      "sustainable technology", 
      "green solutions", 
      "environmental technology", 
      "clean tech", 
      "renewable energy", 
      "carbon reduction"
    ],
    ogImage: "/images/greentech-og-image.jpg",
    twitterHandle: "@GreenTechSolutions"
  }
};

export default siteConfig;