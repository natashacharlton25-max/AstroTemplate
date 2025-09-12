// Footer Data - Now imports from centralized site configuration
// This ensures consistency across the entire site
import { siteConfig } from '@/site.config';

export const footerData = {
  // Company/Site Info from centralized config
  company: {
    name: siteConfig.brand.name,
    tagline: siteConfig.brand.tagline,
    description: siteConfig.brand.description,
  },

  // Footer Links from centralized config
  links: siteConfig.content.footer.sections,

  // Social Media Links from centralized config
  social: siteConfig.content.footer.social,

  // Contact Information from centralized config
  contact: siteConfig.contact,

  // Copyright from centralized config
  copyright: siteConfig.content.footer.copyright
};