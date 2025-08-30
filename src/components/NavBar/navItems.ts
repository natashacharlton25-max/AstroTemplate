export interface MegaMenuItem {
  title: string;
  description: string;
  href: string;
  image?: string;
}

export interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenu {
  sections: MegaMenuSection[];
}

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
  hasMegaMenu?: boolean;
  megaMenu?: MegaMenu;
}

export const links: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { 
    href: '/projects', 
    label: 'Projects',
    hasMegaMenu: true,
    megaMenu: {
      sections: [
        {
          title: 'Featured Projects',
          items: [
            { title: 'Enterprise Solutions', description: 'Large-scale web applications', image: '/images/Placeholder.jpg', href: '/projects/enterprise' },
            { title: 'Creative Websites', description: 'Beautiful portfolio sites', image: '/images/Placeholder.jpg', href: '/projects/creative' },
            { title: 'E-commerce Platforms', description: 'Online stores & marketplaces', image: '/images/Placeholder.jpg', href: '/projects/ecommerce' }
          ]
        },
        {
          title: 'Recent Work',
          items: [
            { title: 'SaaS Dashboard', description: 'Modern analytics platform', href: '/projects/saas' },
            { title: 'Mobile App Design', description: 'iOS & Android interfaces', href: '/projects/mobile' },
            { title: 'Brand Identity', description: 'Complete visual rebrand', href: '/projects/branding' }
          ]
        },
        {
          title: 'Technologies',
          items: [
            { title: 'React & Next.js', description: 'Frontend frameworks', href: '/projects/react' },
            { title: 'Node.js APIs', description: 'Backend development', href: '/projects/nodejs' },
            { title: 'Cloud Solutions', description: 'AWS & deployment', href: '/projects/cloud' }
          ]
        }
      ]
    }
  },
  { 
    href: '/resources', 
    label: 'Resources',
    hasMegaMenu: true,
    megaMenu: {
      sections: [
        {
          title: 'Documentation',
          items: [
            { title: 'API Reference', description: 'Complete API documentation', image: '/images/Placeholder.jpg', href: '/resources/api' },
            { title: 'Design System', description: 'UI components & guidelines', image: '/images/Placeholder.jpg', href: '/resources/design' },
            { title: 'Best Practices', description: 'Development standards', image: '/images/Placeholder.jpg', href: '/resources/practices' }
          ]
        },
        {
          title: 'Tools & Downloads',
          items: [
            { title: 'Code Templates', description: 'Starter templates', href: '/resources/templates' },
            { title: 'Asset Library', description: 'Icons & graphics', href: '/resources/assets' },
            { title: 'Plugins', description: 'Useful extensions', href: '/resources/plugins' }
          ]
        },
        {
          title: 'Learning',
          items: [
            { title: 'Tutorials', description: 'Step-by-step guides', href: '/resources/tutorials' },
            { title: 'Video Courses', description: 'In-depth training', href: '/resources/courses' },
            { title: 'Community', description: 'Forums & discussions', href: '/resources/community' }
          ]
        }
      ]
    }
  },
  { 
    href: '/luna', 
    label: 'Luna',
    hasMegaMenu: true,
    megaMenu: {
      sections: [
        {
          title: 'Luna Platform',
          items: [
            { title: 'AI Assistant', description: 'Intelligent automation tools', image: '/images/Placeholder.jpg', href: '/luna/ai' },
            { title: 'Analytics Dashboard', description: 'Data insights & reporting', image: '/images/Placeholder.jpg', href: '/luna/analytics' },
            { title: 'Workflow Builder', description: 'Custom automation flows', image: '/images/Placeholder.jpg', href: '/luna/workflow' }
          ]
        },
        {
          title: 'Features',
          items: [
            { title: 'Smart Scheduling', description: 'Automated task management', href: '/luna/scheduling' },
            { title: 'Team Collaboration', description: 'Real-time communication', href: '/luna/collaboration' },
            { title: 'Integrations', description: 'Connect your tools', href: '/luna/integrations' }
          ]
        },
        {
          title: 'Getting Started',
          items: [
            { title: 'Quick Start Guide', description: 'Get up and running', href: '/luna/quickstart' },
            { title: 'API Documentation', description: 'Developer resources', href: '/luna/docs' },
            { title: 'Support Center', description: 'Help & tutorials', href: '/luna/support' }
          ]
        }
      ]
    }
  },
  { 
    href: 'https://insights.icthemoon.com/', 
    label: 'Insights', 
    external: true,
    hasMegaMenu: true,
    megaMenu: {
      sections: [
        {
          title: 'Latest Insights',
          items: [
            { title: 'Web Development Trends', description: '2024 technology landscape', image: '/images/Placeholder.jpg', href: 'https://insights.icthemoon.com/trends-2024' },
            { title: 'Design Psychology', description: 'User experience principles', image: '/images/Placeholder.jpg', href: 'https://insights.icthemoon.com/design-psychology' },
            { title: 'Performance Optimization', description: 'Speed up your site', image: '/images/Placeholder.jpg', href: 'https://insights.icthemoon.com/performance' }
          ]
        },
        {
          title: 'Popular Posts',
          items: [
            { title: 'React Best Practices', description: 'Clean code techniques', href: 'https://insights.icthemoon.com/react-practices' },
            { title: 'SEO in 2024', description: 'Modern optimization', href: 'https://insights.icthemoon.com/seo-2024' },
            { title: 'AI in Development', description: 'Tools & workflows', href: 'https://insights.icthemoon.com/ai-development' }
          ]
        },
        {
          title: 'Categories',
          items: [
            { title: 'Development', description: 'Code & frameworks', href: 'https://insights.icthemoon.com/development' },
            { title: 'Design', description: 'UI/UX & creativity', href: 'https://insights.icthemoon.com/design' },
            { title: 'Business', description: 'Strategy & growth', href: 'https://insights.icthemoon.com/business' }
          ]
        }
      ]
    }
  },
  { href: '/contact', label: 'Contact' },
];