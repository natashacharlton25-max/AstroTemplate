import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
export { renderers } from '../../renderers.mjs';

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
      const dynamicData = await getCachedSearchData();
      if (dynamicData.length < 5) {
        console.log(`Found ${dynamicData.length} dynamic pages, supplementing with fallback data`);
        searchData = [...dynamicData, ...fallbackData];
      } else {
        searchData = dynamicData;
      }
    } catch (error) {
      console.error("Error getting dynamic content, using fallback:", error);
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
