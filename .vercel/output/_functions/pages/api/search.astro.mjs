import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
export { renderers } from '../../renderers.mjs';

const precomputedSearchData = [
	{
		title: "Services",
		description: "Learn more about services",
		content: "Our Services 🔍 Business Analysis Comprehensive evaluation of your business processes and systems against industry best practices. Process optimization assessment System efficiency analysis Detailed improvement roadmap Priority-based recommendations Starting at $2,500 Most Popular 🎨 UX/UI Design Review Design consultation focusing on user experience optimization and modern interface patterns. User journey analysis Visual design and branding review Interaction pattern optimization User-centered ",
		category: "pages",
		url: "/services",
		date: "Updated recently",
		tags: [
			"services",
			"page"
		],
		type: "page"
	},
	{
		title: "Sample-blog-post",
		description: "Learn more about sample-blog-post",
		content: "Tutorial Featured 8 min read Getting Started with Web Accessibility Learn the fundamentals of creating accessible websites that work for everyone. Sarah Johnson March 15, 2024 Why Accessibility Matters When we build accessible websites, we're opening our content to a much wider audience. Consider these statistics: Over 1 billion people worldwide have some form of disability 15% of the world's population experiences some form of disability Many accessibility features benefit everyone, not just pe",
		category: "pages",
		url: "/sample-blog-post",
		date: "Updated recently",
		tags: [
			"sample-blog-post",
			"page"
		],
		type: "page"
	},
	{
		title: "Getting Started with Astro",
		description: "Learn more about getting started with astro",
		content: "Categories Keywords Featured Search in: All Website Pages Blog Projects Resources Popular keywords: about services portfolio contact projects experience skills testimonials blog resources Featured Content About Our Company Most Popular Get In Touch Recommended Our Services Trending Home › Insights › Results All Website Pages Blog Projects Resources about services portfolio contact projects experience skills testimonials blog resources Use the tabs above to explore different ways to find content,",
		category: "pages",
		url: "/results",
		date: "Updated recently",
		tags: [
			"Astro",
			"Static Sites",
			"JavaScript",
			"Tutorial"
		],
		type: "page"
	},
	{
		title: "Projects",
		description: "Learn more about projects",
		content: "Our Projects Featured Projects Explore our portfolio of innovative web applications, design systems, and digital solutions that deliver outstanding results. Web Application E-Commerce Platform Transformation Redesigned a major retail platform with modern UX principles, improving navigation flow and user experience while maintaining visual appeal and brand identity. WCAG 2.1 AA E-Commerce Screen Readers View Case Study Government Government Portal Redesign Created an accessible citizen services p",
		category: "pages",
		url: "/projects",
		date: "Updated recently",
		tags: [
			"projects",
			"page"
		],
		type: "page"
	},
	{
		title: "Hello and Welcome to the insights Page",
		description: "Learn more about hello and welcome to the insights page",
		content: "Insights & Articles Categories Archive Tags Personal Growth (2) Natural Strategies (1) Uncategorized (1) April 2025 (3) March 2025 (0) February 2025 (0) January 2025 (0) mindfulness personal growth natural strategies wellness meditation lifestyle digital detox self care balance productivity habits inspiration ))} ))} Categories Personal Growth (2) Natural Strategies (1) Uncategorized (1) April 2025 (3) March 2025 (0) February 2025 (0) January 2025 (0) mindfulness personal growth natural strategi",
		category: "pages",
		url: "/insights",
		date: "Updated recently",
		tags: [
			"welcome",
			"introduction",
			"getting-started"
		],
		type: "page"
	},
	{
		title: "Index",
		description: "Learn more about index",
		content: "",
		category: "pages",
		url: "/",
		date: "Updated recently",
		tags: [
			"index",
			"page"
		],
		type: "page"
	},
	{
		title: "Assets",
		description: "Learn more about assets",
		content: "Download Assets Category Featured Keywords All Assets Templates Checklists Guides Tools Design System Template Most Popular WCAG Checklist Essential Screen Reader Guide New Release ACCESSIBILITY WCAG DESIGN TEMPLATES TESTING MOBILE FORMS COLORS TOOLS GUIDES Template Accessible Design System Template Complete design system with accessibility-first components, color palettes, and typography guidelines. Figma + Sketch 2.4 MB 1,234 downloads Download Preview Checklist WCAG 2.1 AA Compliance Checklis",
		category: "pages",
		url: "/assets",
		date: "Updated recently",
		tags: [
			"assets",
			"page"
		],
		type: "page"
	},
	{
		title: "About",
		description: "Learn more about about",
		content: "About Your Company Our Story Your Company was founded with a simple mission: to deliver exceptional solutions that drive success. We believe that great work isn't just functional—it's strategic, innovative, and designed to help our clients thrive. What We Do We specialize in providing comprehensive business solutions, helping organizations achieve their goals and grow their success. Our services include: Strategic business consulting Custom solution development User experience design and optimiz",
		category: "pages",
		url: "/about",
		date: "Updated recently",
		tags: [
			"about",
			"page"
		],
		type: "page"
	},
	{
		title: "Search Results",
		description: "Find anything on our website with powerful search functionality",
		content: "search results find discover explore website content",
		category: "pages",
		url: "/search-results",
		date: "Updated recently",
		tags: [
			"search",
			"results",
			"find",
			"discover"
		],
		type: "page"
	}
];

const prerender = false;
async function getSearchableContent() {
  const searchData = [];
  try {
    const pageFiles = await glob("src/pages/**/*.astro");
    for (const filePath of pageFiles) {
      if (filePath.includes("/api/") || filePath.includes("search-results")) continue;
      try {
        const fullPath = path.resolve(filePath);
        const content = await fs.promises.readFile(fullPath, "utf-8");
        const fileName = path.basename(filePath, ".astro");
        const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
        let title = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        let description = "";
        let tags = [];
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const titleMatch = frontmatter.match(/title:\s*['"]([^'"]+)['"]/);
          if (titleMatch) title = titleMatch[1];
          const descMatch = frontmatter.match(/description:\s*['"]([^'"]+)['"]/);
          if (descMatch) description = descMatch[1];
          const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
          if (tagsMatch) {
            tags = tagsMatch[1].split(",").map((tag) => tag.trim().replace(/['"]/g, ""));
          }
        }
        const textContent = content.replace(/---[\s\S]*?---/, "").replace(/<[^>]*>/g, " ").replace(/\{[^}]*\}/g, " ").replace(/\s+/g, " ").trim();
        let url = filePath.replace(/^src[\/\\]pages[\/\\]/, "").replace(/\.astro$/, "").replace(/[\/\\]index$/, "").replace(/\\/g, "/");
        if (!url.startsWith("/")) {
          url = "/" + url;
        }
        if (url === "/index" || url === "/") {
          url = "/";
        }
        searchData.push({
          title,
          description: description || `Learn more about ${title.toLowerCase()}`,
          content: textContent.substring(0, 500),
          // First 500 chars
          category: "pages",
          url,
          date: "Updated recently",
          tags: tags.length > 0 ? tags : [fileName, "page"],
          type: "page"
        });
      } catch (error) {
        console.warn(`Could not process page: ${filePath}`, error);
      }
    }
    const mdFiles = await glob("src/content/**/*.md");
    for (const filePath of mdFiles) {
      try {
        const fullPath = path.resolve(filePath);
        const content = await fs.promises.readFile(fullPath, "utf-8");
        const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
        let title = path.basename(filePath, ".md");
        let description = "";
        let tags = [];
        let publishDate = "Recently";
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const titleMatch = frontmatter.match(/title:\s*['"]([^'"]+)['"]/);
          if (titleMatch) title = titleMatch[1];
          const descMatch = frontmatter.match(/description:\s*['"]([^'"]+)['"]/);
          if (descMatch) description = descMatch[1];
          const dateMatch = frontmatter.match(/date:\s*['"]?([^'"]+)['"]?/);
          if (dateMatch) publishDate = dateMatch[1];
          const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
          if (tagsMatch) {
            tags = tagsMatch[1].split(",").map((tag) => tag.trim().replace(/['"]/g, ""));
          }
        }
        const textContent = content.replace(/---[\s\S]*?---/, "").replace(/[#*`]/g, "").replace(/\s+/g, " ").trim();
        const url = path.basename(filePath, ".md");
        searchData.push({
          title,
          description: description || textContent.substring(0, 150),
          content: textContent.substring(0, 500),
          category: "blog",
          url,
          date: publishDate,
          tags: tags.length > 0 ? tags : ["blog", "post"],
          type: "blog"
        });
      } catch (error) {
        console.warn(`Could not process markdown: ${filePath}`, error);
      }
    }
    const manualPages = [
      {
        title: "Search Results",
        description: "Find anything on our website with powerful search functionality",
        content: "search results find discover explore website content",
        category: "pages",
        url: "/search-results",
        date: "Updated recently",
        tags: ["search", "results", "find", "discover"],
        type: "page"
      }
    ];
    searchData.push(...manualPages);
  } catch (error) {
    console.error("Error scanning content:", error);
  }
  return searchData;
}
let searchDataCache = [];
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1e3;
async function getCachedSearchData() {
  const now = Date.now();
  if (!searchDataCache.length || now - lastCacheTime > CACHE_DURATION) {
    searchDataCache = await getSearchableContent();
    lastCacheTime = now;
  }
  return searchDataCache;
}
async function getSearchData() {
  if (precomputedSearchData.length) {
    return precomputedSearchData;
  }
  return await getCachedSearchData();
}
const fallbackData = [
  // Pages
  {
    title: "About Us",
    description: "Learn about our company mission, values, and the team behind our success.",
    content: "about company mission values team history",
    category: "pages",
    url: "/about",
    date: "Updated recently",
    tags: ["about", "company", "mission", "team", "values"]
  },
  {
    title: "Our Services",
    description: "Comprehensive overview of the services we offer to help your business grow.",
    content: "services business solutions consulting development",
    category: "pages",
    url: "/services",
    date: "Updated recently",
    tags: ["services", "business", "solutions", "consulting"]
  },
  {
    title: "Contact Information",
    description: "Get in touch with us. Find our contact details and office locations.",
    content: "contact information office locations phone email",
    category: "pages",
    url: "/contact",
    date: "Updated recently",
    tags: ["contact", "information", "office", "phone", "email"]
  },
  {
    title: "Portfolio Showcase",
    description: "Explore our best work and successful project case studies.",
    content: "portfolio showcase projects case studies work examples",
    category: "pages",
    url: "/portfolio",
    date: "Updated recently",
    tags: ["portfolio", "showcase", "projects", "case studies"]
  },
  // Blog
  {
    title: "Getting Started Guide",
    description: "Everything you need to know to begin your journey with our platform.",
    content: "getting started guide tutorial beginner introduction blog post",
    category: "blog",
    url: "getting-started",
    date: "3 days ago",
    tags: ["getting started", "guide", "tutorial", "beginner", "blog"]
  },
  {
    title: "Industry Best Practices",
    description: "Proven strategies and methodologies for success in your industry.",
    content: "best practices strategies methodologies industry success blog post",
    category: "blog",
    url: "best-practices",
    date: "1 week ago",
    tags: ["best practices", "strategies", "industry", "success", "blog"]
  },
  {
    title: "Success Story Case Study",
    description: "Real-world example of how we helped a client achieve outstanding results.",
    content: "success story case study client results achievement blog post",
    category: "blog",
    url: "case-study",
    date: "2 weeks ago",
    tags: ["success story", "case study", "client", "results", "blog"]
  },
  // Projects
  {
    title: "E-commerce Platform",
    description: "Modern, scalable e-commerce solution built with cutting-edge technology.",
    content: "ecommerce platform modern scalable technology solution",
    category: "projects",
    url: "ecommerce-platform",
    date: "1 week ago",
    tags: ["ecommerce", "platform", "scalable", "technology"]
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile application with seamless user experience.",
    content: "mobile app development cross platform user experience",
    category: "projects",
    url: "mobile-app",
    date: "2 weeks ago",
    tags: ["mobile", "app", "development", "cross platform"]
  },
  {
    title: "Brand Identity Redesign",
    description: "Complete brand overhaul including logo, guidelines, and marketing materials.",
    content: "brand identity redesign logo guidelines marketing materials",
    category: "projects",
    url: "brand-redesign",
    date: "3 weeks ago",
    tags: ["brand", "identity", "redesign", "logo", "marketing"]
  },
  {
    title: "Website Optimization",
    description: "Performance optimization and SEO improvements for better user engagement.",
    content: "website optimization performance SEO user engagement",
    category: "projects",
    url: "website-optimization",
    date: "1 month ago",
    tags: ["website", "optimization", "performance", "SEO"]
  },
  // Resources
  {
    title: "Free Design Templates",
    description: "Collection of high-quality design templates for various business needs.",
    content: "free design templates business high quality collection",
    category: "resources",
    url: "design-templates",
    date: "1 week ago",
    tags: ["templates", "design", "business", "free"]
  },
  {
    title: "Business Planning Toolkit",
    description: "Comprehensive toolkit with templates and guides for business planning.",
    content: "business planning toolkit templates guides comprehensive",
    category: "resources",
    url: "business-toolkit",
    date: "2 weeks ago",
    tags: ["business", "planning", "toolkit", "templates", "guides"]
  },
  {
    title: "SEO Checklist Guide",
    description: "Step-by-step checklist to improve your website's search engine optimization.",
    content: "SEO checklist guide step by step search engine optimization",
    category: "resources",
    url: "seo-checklist",
    date: "3 weeks ago",
    tags: ["SEO", "checklist", "guide", "search engine", "optimization"]
  },
  {
    title: "Social Media Assets",
    description: "Ready-to-use social media templates and graphics for your campaigns.",
    content: "social media assets templates graphics campaigns ready to use",
    category: "resources",
    url: "social-media-assets",
    date: "1 month ago",
    tags: ["social media", "assets", "templates", "graphics", "campaigns"]
  }
];
const GET = async ({ url }) => {
  try {
    const searchParams = new URL(url).searchParams;
    const query = searchParams.get("q")?.toLowerCase() || "";
    const category = searchParams.get("category") || "all";
    const limit = parseInt(searchParams.get("limit") || "10");
    if (!query.trim()) {
      return new Response(
        JSON.stringify({
          results: [],
          total: 0,
          message: "Please provide a search query"
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    let searchData;
    try {
      const dynamicData = await getSearchData();
      if (false) ; else {
        searchData = dynamicData;
      }
    } catch (error) {
      console.error("Error getting search content, using fallback:", error);
      searchData = fallbackData;
    }
    const searchTerms = query.split(" ").filter((term) => term.length > 1);
    let filteredResults = searchData.filter((item) => {
      if (category !== "all" && item.category !== category) {
        return false;
      }
      const searchableText = [
        item.title,
        item.description,
        item.content,
        ...item.tags
      ].join(" ").toLowerCase();
      return searchTerms.some((term) => searchableText.includes(term));
    });
    filteredResults.sort((a, b) => {
      const aScore = searchTerms.reduce((score, term) => {
        if (a.title.toLowerCase().includes(term)) score += 10;
        if (a.description.toLowerCase().includes(term)) score += 5;
        if (a.tags.some((tag) => tag.toLowerCase().includes(term))) score += 3;
        return score;
      }, 0);
      const bScore = searchTerms.reduce((score, term) => {
        if (b.title.toLowerCase().includes(term)) score += 10;
        if (b.description.toLowerCase().includes(term)) score += 5;
        if (b.tags.some((tag) => tag.toLowerCase().includes(term))) score += 3;
        return score;
      }, 0);
      return bScore - aScore;
    });
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
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Search API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
