// Footer Data - Easy to edit links, content, and social media
export const footerData = {
  // Company/Site Info
  company: {
    name: "Your Company",
    tagline: "Building amazing experiences",
    description: "We create innovative solutions that transform ideas into reality.",
  },

  // Footer Links organized by sections
  links: {
    company: {
      title: "Company",
      items: [
        { name: "About Us", url: "/about" },
        { name: "Careers", url: "/careers" },
        { name: "Press", url: "/press" },
        { name: "Blog", url: "/blog" }
      ]
    },
    
    products: {
      title: "Products",
      items: [
        { name: "Features", url: "/features" },
        { name: "Pricing", url: "/pricing" },
        { name: "API", url: "/api" },
        { name: "Documentation", url: "/docs" }
      ]
    },

    resources: {
      title: "Resources",
      items: [
        { name: "Help Center", url: "/help" },
        { name: "Community", url: "/community" },
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
        { name: "GDPR", url: "/gdpr" }
      ]
    }
  },

  // Social Media Links
  social: [
    { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com", icon: "github" },
    { name: "Instagram", url: "https://instagram.com", icon: "instagram" }
  ],

  // Contact Information
  contact: {
    email: "hello@yourcompany.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Innovation Drive",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA"
    }
  },

  // Copyright and Legal
  copyright: {
    year: new Date().getFullYear(),
    text: "All rights reserved."
  }
};