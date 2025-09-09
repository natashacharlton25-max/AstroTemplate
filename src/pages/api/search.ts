import type { APIRoute } from 'astro';

export const prerender = false;

// This would typically come from a database or CMS
const searchData = [
  // Pages
  {
    title: 'About Us',
    description: 'Learn about our company mission, values, and the team behind our success.',
    content: 'about company mission values team history',
    category: 'pages',
    url: '/about',
    date: 'Updated recently',
    tags: ['about', 'company', 'mission', 'team', 'values']
  },
  {
    title: 'Our Services',
    description: 'Comprehensive overview of the services we offer to help your business grow.',
    content: 'services business solutions consulting development',
    category: 'pages',
    url: '/services',
    date: 'Updated recently',
    tags: ['services', 'business', 'solutions', 'consulting']
  },
  {
    title: 'Contact Information',
    description: 'Get in touch with us. Find our contact details and office locations.',
    content: 'contact information office locations phone email',
    category: 'pages',
    url: '/contact',
    date: 'Updated recently',
    tags: ['contact', 'information', 'office', 'phone', 'email']
  },
  {
    title: 'Portfolio Showcase',
    description: 'Explore our best work and successful project case studies.',
    content: 'portfolio showcase projects case studies work examples',
    category: 'pages',
    url: '/portfolio',
    date: 'Updated recently',
    tags: ['portfolio', 'showcase', 'projects', 'case studies']
  },

  // Blog
  {
    title: 'Getting Started Guide',
    description: 'Everything you need to know to begin your journey with our platform.',
    content: 'getting started guide tutorial beginner introduction',
    category: 'blog',
    url: '/blog/getting-started',
    date: '3 days ago',
    tags: ['getting started', 'guide', 'tutorial', 'beginner']
  },
  {
    title: 'Industry Best Practices',
    description: 'Proven strategies and methodologies for success in your industry.',
    content: 'best practices strategies methodologies industry success',
    category: 'blog',
    url: '/blog/best-practices',
    date: '1 week ago',
    tags: ['best practices', 'strategies', 'industry', 'success']
  },
  {
    title: 'Success Story Case Study',
    description: 'Real-world example of how we helped a client achieve outstanding results.',
    content: 'success story case study client results achievement',
    category: 'blog',
    url: '/blog/case-study',
    date: '2 weeks ago',
    tags: ['success story', 'case study', 'client', 'results']
  },

  // Projects
  {
    title: 'E-commerce Platform',
    description: 'Modern, scalable e-commerce solution built with cutting-edge technology.',
    content: 'ecommerce platform modern scalable technology solution',
    category: 'projects',
    url: '/projects/ecommerce-platform',
    date: '1 week ago',
    tags: ['ecommerce', 'platform', 'scalable', 'technology']
  },
  {
    title: 'Mobile App Development',
    description: 'Cross-platform mobile application with seamless user experience.',
    content: 'mobile app development cross platform user experience',
    category: 'projects',
    url: '/projects/mobile-app',
    date: '2 weeks ago',
    tags: ['mobile', 'app', 'development', 'cross platform']
  },
  {
    title: 'Brand Identity Redesign',
    description: 'Complete brand overhaul including logo, guidelines, and marketing materials.',
    content: 'brand identity redesign logo guidelines marketing materials',
    category: 'projects',
    url: '/projects/brand-redesign',
    date: '3 weeks ago',
    tags: ['brand', 'identity', 'redesign', 'logo', 'marketing']
  },
  {
    title: 'Website Optimization',
    description: 'Performance optimization and SEO improvements for better user engagement.',
    content: 'website optimization performance SEO user engagement',
    category: 'projects',
    url: '/projects/website-optimization',
    date: '1 month ago',
    tags: ['website', 'optimization', 'performance', 'SEO']
  },

  // Resources
  {
    title: 'Free Design Templates',
    description: 'Collection of high-quality design templates for various business needs.',
    content: 'free design templates business high quality collection',
    category: 'resources',
    url: '/resources/design-templates',
    date: '1 week ago',
    tags: ['templates', 'design', 'business', 'free']
  },
  {
    title: 'Business Planning Toolkit',
    description: 'Comprehensive toolkit with templates and guides for business planning.',
    content: 'business planning toolkit templates guides comprehensive',
    category: 'resources',
    url: '/resources/business-toolkit',
    date: '2 weeks ago',
    tags: ['business', 'planning', 'toolkit', 'templates', 'guides']
  },
  {
    title: 'SEO Checklist Guide',
    description: 'Step-by-step checklist to improve your website\'s search engine optimization.',
    content: 'SEO checklist guide step by step search engine optimization',
    category: 'resources',
    url: '/resources/seo-checklist',
    date: '3 weeks ago',
    tags: ['SEO', 'checklist', 'guide', 'search engine', 'optimization']
  },
  {
    title: 'Social Media Assets',
    description: 'Ready-to-use social media templates and graphics for your campaigns.',
    content: 'social media assets templates graphics campaigns ready to use',
    category: 'resources',
    url: '/resources/social-media-assets',
    date: '1 month ago',
    tags: ['social media', 'assets', 'templates', 'graphics', 'campaigns']
  }
];

export const GET: APIRoute = async ({ url }) => {
  try {
    const searchParams = new URL(url).searchParams;
    const query = searchParams.get('q')?.toLowerCase() || '';
    const category = searchParams.get('category') || 'all';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query.trim()) {
      return new Response(
        JSON.stringify({ 
          results: [], 
          total: 0, 
          message: 'Please provide a search query' 
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Filter results
    const searchTerms = query.split(' ').filter(term => term.length > 1);
    
    let filteredResults = searchData.filter(item => {
      // Category filter
      if (category !== 'all' && item.category !== category) {
        return false;
      }
      
      // Text search
      const searchableText = [
        item.title,
        item.description,
        item.content,
        ...item.tags
      ].join(' ').toLowerCase();
      
      // Check if any search term matches
      return searchTerms.some(term => searchableText.includes(term));
    });

    // Sort by relevance (simple scoring based on title matches)
    filteredResults.sort((a, b) => {
      const aScore = searchTerms.reduce((score, term) => {
        if (a.title.toLowerCase().includes(term)) score += 10;
        if (a.description.toLowerCase().includes(term)) score += 5;
        if (a.tags.some(tag => tag.toLowerCase().includes(term))) score += 3;
        return score;
      }, 0);
      
      const bScore = searchTerms.reduce((score, term) => {
        if (b.title.toLowerCase().includes(term)) score += 10;
        if (b.description.toLowerCase().includes(term)) score += 5;
        if (b.tags.some(tag => tag.toLowerCase().includes(term))) score += 3;
        return score;
      }, 0);
      
      return bScore - aScore;
    });

    // Apply limit
    const results = filteredResults.slice(0, limit);

    return new Response(
      JSON.stringify({
        results,
        total: filteredResults.length,
        query,
        category,
        hasMore: filteredResults.length > limit
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Search API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
};