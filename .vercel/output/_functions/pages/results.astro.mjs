/* empty css                                 */
import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CzAMUll2.mjs';
import 'kleur/colors';
import { s as siteConfig, $ as $$Layout } from '../chunks/Layout_ZoZwWIkn.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Results = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Results;
  const { url } = Astro2;
  const searchParams = new URLSearchParams(url.search);
  const filterType = searchParams.get("type") || "all";
  const filterValue = searchParams.get("value") || "";
  const searchQuery = searchParams.get("q") || "";
  parseInt(searchParams.get("page") || "1");
  const allContent = [
    // Blog Posts
    {
      id: 1,
      title: "Getting Started with Astro",
      excerpt: "Learn the fundamentals of building static sites with Astro framework and modern web technologies.",
      slug: "getting-started-with-astro",
      url: "/blog/getting-started-with-astro",
      publishedAt: "2024-01-15",
      category: "blog",
      tags: ["Astro", "Static Sites", "JavaScript", "Tutorial"],
      author: "John Doe",
      readTime: "5 min read",
      type: "blog"
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      excerpt: "Explore advanced TypeScript patterns and techniques for building robust applications.",
      slug: "advanced-typescript-patterns",
      url: "/blog/advanced-typescript-patterns",
      publishedAt: "2024-01-10",
      category: "blog",
      tags: ["TypeScript", "Patterns", "JavaScript", "Advanced"],
      author: "Jane Smith",
      readTime: "8 min read",
      type: "blog"
    },
    {
      id: 3,
      title: "Modern CSS Grid Layouts",
      excerpt: "Master CSS Grid to create complex, responsive layouts with ease and flexibility.",
      slug: "modern-css-grid-layouts",
      url: "/blog/modern-css-grid-layouts",
      publishedAt: "2024-01-05",
      category: "blog",
      tags: ["CSS", "Grid", "Layouts", "Responsive"],
      author: "Mike Johnson",
      readTime: "6 min read",
      type: "blog"
    },
    // Pages
    {
      id: 10,
      title: "About Our Company",
      excerpt: "Learn about our mission, values, and the team behind our success.",
      slug: "about",
      url: "/about",
      publishedAt: "2024-01-01",
      category: "pages",
      tags: ["about", "company", "mission", "team", "values"],
      author: "Company",
      readTime: "3 min read",
      type: "page"
    },
    {
      id: 11,
      title: "Our Services",
      excerpt: "Comprehensive overview of the services we offer to help your business grow.",
      slug: "services",
      url: "/services",
      publishedAt: "2024-01-01",
      category: "pages",
      tags: ["services", "business", "solutions", "consulting"],
      author: "Company",
      readTime: "4 min read",
      type: "page"
    },
    {
      id: 12,
      title: "Contact Information",
      excerpt: "Get in touch with us. Find our contact details and office locations.",
      slug: "contact",
      url: "/contact",
      publishedAt: "2024-01-01",
      category: "pages",
      tags: ["contact", "information", "office", "phone", "email"],
      author: "Company",
      readTime: "2 min read",
      type: "page"
    },
    {
      id: 13,
      title: "Portfolio Showcase",
      excerpt: "Explore our best work and successful project case studies.",
      slug: "portfolio",
      url: "/portfolio",
      publishedAt: "2024-01-01",
      category: "pages",
      tags: ["portfolio", "showcase", "projects", "case studies", "work"],
      author: "Company",
      readTime: "5 min read",
      type: "page"
    },
    // Projects
    {
      id: 20,
      title: "E-commerce Platform Development",
      excerpt: "Modern, scalable e-commerce solution built with cutting-edge technology.",
      slug: "ecommerce-platform",
      url: "/projects/ecommerce-platform",
      publishedAt: "2024-01-01",
      category: "projects",
      tags: ["ecommerce", "platform", "scalable", "technology", "development"],
      author: "Development Team",
      readTime: "6 min read",
      type: "project"
    },
    {
      id: 21,
      title: "Mobile App Development",
      excerpt: "Cross-platform mobile application with seamless user experience.",
      slug: "mobile-app",
      url: "/projects/mobile-app",
      publishedAt: "2024-01-01",
      category: "projects",
      tags: ["mobile", "app", "development", "cross platform", "UX"],
      author: "Development Team",
      readTime: "7 min read",
      type: "project"
    },
    {
      id: 22,
      title: "Brand Identity Redesign",
      excerpt: "Complete brand overhaul including logo, guidelines, and marketing materials.",
      slug: "brand-redesign",
      url: "/projects/brand-redesign",
      publishedAt: "2024-01-01",
      category: "projects",
      tags: ["brand", "identity", "redesign", "logo", "marketing"],
      author: "Design Team",
      readTime: "5 min read",
      type: "project"
    },
    // Resources
    {
      id: 30,
      title: "Free Design Templates",
      excerpt: "Collection of high-quality design templates for various business needs.",
      slug: "design-templates",
      url: "/resources/design-templates",
      publishedAt: "2024-01-01",
      category: "resources",
      tags: ["templates", "design", "business", "free", "downloads"],
      author: "Design Team",
      readTime: "3 min read",
      type: "resource"
    },
    {
      id: 31,
      title: "Business Planning Toolkit",
      excerpt: "Comprehensive toolkit with templates and guides for business planning.",
      slug: "business-toolkit",
      url: "/resources/business-toolkit",
      publishedAt: "2024-01-01",
      category: "resources",
      tags: ["business", "planning", "toolkit", "templates", "guides"],
      author: "Business Team",
      readTime: "8 min read",
      type: "resource"
    },
    {
      id: 32,
      title: "SEO Guide for Beginners",
      excerpt: "Everything you need to know to get started with search engine optimization.",
      slug: "seo-guide",
      url: "/resources/seo-guide",
      publishedAt: "2024-01-01",
      category: "resources",
      tags: ["SEO", "guide", "beginners", "optimization", "search"],
      author: "Marketing Team",
      readTime: "10 min read",
      type: "resource"
    }
  ];
  let filteredContent = allContent;
  let pageTitle = "All Content";
  let displayTitle = "All Content";
  if (searchQuery) {
    filteredContent = filteredContent.filter(
      (item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    pageTitle = "Search Results";
    displayTitle = `Search results for "${searchQuery}"`;
  }
  if (filterType === "category" && filterValue && !searchQuery) {
    filteredContent = allContent.filter(
      (item) => item.category.toLowerCase() === filterValue.toLowerCase()
    );
    pageTitle = "Search Results";
    displayTitle = `Content in "${filterValue}"`;
  } else if (filterType === "tag" && filterValue && !searchQuery) {
    filteredContent = allContent.filter(
      (item) => item.tags.some((tag) => tag.toLowerCase() === filterValue.toLowerCase())
    );
    pageTitle = "Search Results";
    displayTitle = `Content tagged with "${filterValue}"`;
  } else if (filterType === "archive" && filterValue && !searchQuery) {
    const [year, month] = filterValue.split("-");
    filteredContent = allContent.filter((item) => {
      const itemDate = new Date(item.publishedAt);
      const itemYear = itemDate.getFullYear().toString();
      const itemMonth = (itemDate.getMonth() + 1).toString().padStart(2, "0");
      return itemYear === year && (!month || itemMonth === month);
    });
    pageTitle = "Search Results";
    if (month) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      displayTitle = `Content from ${monthNames[parseInt(month) - 1]} ${year}`;
    } else {
      displayTitle = `Content from ${year}`;
    }
  } else ;
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${pageTitle} | ${siteConfig.brand.name}`, "description": `Browse ${pageTitle.toLowerCase()} on ${siteConfig.brand.name}`, "data-astro-cid-pttseihw": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="page-content" data-astro-cid-pttseihw> <!-- Page Header with Red Background - Simple Title Only --> <section class="page-header" data-astro-cid-pttseihw> <div class="page-header-content" data-astro-cid-pttseihw> <h1 data-astro-cid-pttseihw>${pageTitle}</h1> </div> <!-- Simple top-right pill navigation --> <div class="page-nav-pills" data-astro-cid-pttseihw> <button class="pill-button" data-filter="categories" aria-label="Search Categories" data-astro-cid-pttseihw> <span class="pill-text" data-astro-cid-pttseihw>Categories</span> </button> <button class="pill-button" data-filter="keywords" aria-label="Keywords" data-astro-cid-pttseihw> <span class="pill-text" data-astro-cid-pttseihw>Keywords</span> </button> <button class="pill-button" data-filter="featured" aria-label="Featured" data-astro-cid-pttseihw> <span class="pill-text" data-astro-cid-pttseihw>Featured</span> </button> </div> <!-- Slide-out card that follows the button --> <div class="slide-out-card" id="slideOutCard" data-astro-cid-pttseihw> <div class="card-content" id="cardContent" data-astro-cid-pttseihw> <!-- Content will be loaded here based on selected filter --> </div> </div> </section> <!-- Dropdown Content Area for results tabs --> <section class="results-dropdown-content" id="resultsDropdownContent" data-astro-cid-pttseihw> <div class="dropdown-content-wrapper" data-astro-cid-pttseihw></div> </section> <!-- Mobile Collapsible Content Area --> <section class="mobile-collapsible-content" id="mobileCollapsibleContent" data-astro-cid-pttseihw> <!-- Search In Widget --> <div class="mobile-section" id="mobileSearchInSection" style="display: none;" data-astro-cid-pttseihw> <div class="mobile-section-content" data-astro-cid-pttseihw> <h3 data-astro-cid-pttseihw>Search in:</h3> <div class="category-buttons" data-astro-cid-pttseihw> <button class="category-btn active" data-category="all" data-astro-cid-pttseihw>All<br data-astro-cid-pttseihw>Website</button> <button class="category-btn" data-category="pages" data-astro-cid-pttseihw>Pages</button> <button class="category-btn" data-category="blog" data-astro-cid-pttseihw>Blog</button> <button class="category-btn" data-category="projects" data-astro-cid-pttseihw>Projects</button> <button class="category-btn" data-category="resources" data-astro-cid-pttseihw>Resources</button> </div> </div> </div> <!-- Keywords Widget --> <div class="mobile-section" id="mobileKeywordsSection" style="display: none;" data-astro-cid-pttseihw> <div class="mobile-section-content" data-astro-cid-pttseihw> <h3 data-astro-cid-pttseihw>Popular keywords:</h3> <div class="keyword-tags" data-astro-cid-pttseihw> <button class="keyword-tag" data-keyword="about" data-astro-cid-pttseihw>about</button> <button class="keyword-tag" data-keyword="services" data-astro-cid-pttseihw>services</button> <button class="keyword-tag" data-keyword="portfolio" data-astro-cid-pttseihw>portfolio</button> <button class="keyword-tag" data-keyword="contact" data-astro-cid-pttseihw>contact</button> <button class="keyword-tag" data-keyword="projects" data-astro-cid-pttseihw>projects</button> <button class="keyword-tag" data-keyword="experience" data-astro-cid-pttseihw>experience</button> <button class="keyword-tag" data-keyword="skills" data-astro-cid-pttseihw>skills</button> <button class="keyword-tag" data-keyword="testimonials" data-astro-cid-pttseihw>testimonials</button> <button class="keyword-tag" data-keyword="blog" data-astro-cid-pttseihw>blog</button> <button class="keyword-tag" data-keyword="resources" data-astro-cid-pttseihw>resources</button> </div> </div> </div> <!-- Featured Widget --> <div class="mobile-section" id="mobileFeaturedSection" style="display: none;" data-astro-cid-pttseihw> <div class="mobile-section-content" data-astro-cid-pttseihw> <h3 data-astro-cid-pttseihw>Featured Content</h3> <div class="featured-cards" data-astro-cid-pttseihw> <a href="/about" class="featured-card" data-astro-cid-pttseihw> <div class="featured-content" data-astro-cid-pttseihw> <h4 data-astro-cid-pttseihw>About Our Company</h4> <span class="featured-meta" data-astro-cid-pttseihw>Most Popular</span> </div> </a> <a href="/contact" class="featured-card" data-astro-cid-pttseihw> <div class="featured-content" data-astro-cid-pttseihw> <h4 data-astro-cid-pttseihw>Get In Touch</h4> <span class="featured-meta" data-astro-cid-pttseihw>Recommended</span> </div> </a> <a href="/services" class="featured-card" data-astro-cid-pttseihw> <div class="featured-content" data-astro-cid-pttseihw> <h4 data-astro-cid-pttseihw>Our Services</h4> <span class="featured-meta" data-astro-cid-pttseihw>Trending</span> </div> </a> </div> </div> </div> </section> <!-- Title and Navigation Section --> <section class="title-nav-section" data-astro-cid-pttseihw> <div class="main-content-wrapper content-aligned" data-astro-cid-pttseihw> <div class="title-nav-wrapper" data-astro-cid-pttseihw> <!-- Left side: Title and Breadcrumb --> <div class="title-breadcrumb" data-astro-cid-pttseihw> <h2 class="display-title" data-astro-cid-pttseihw>${displayTitle}</h2> <nav class="breadcrumb" data-astro-cid-pttseihw> <a href="/" class="breadcrumb-link" data-astro-cid-pttseihw>Home</a> <span class="breadcrumb-separator" data-astro-cid-pttseihw>›</span> <a href="/insights" class="breadcrumb-link" data-astro-cid-pttseihw>Insights</a> <span class="breadcrumb-separator" data-astro-cid-pttseihw>›</span> <span class="breadcrumb-current" data-astro-cid-pttseihw>Results</span> </nav> </div> <!-- Right side: Search Bar --> <div class="search-container" data-astro-cid-pttseihw> <form class="search-form" method="get" data-astro-cid-pttseihw> <div class="search-input-wrapper" data-astro-cid-pttseihw> <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" data-astro-cid-pttseihw> <path d="M21 21L15.5 15.5M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-pttseihw></path> </svg> <input type="text" name="q"${addAttribute(searchQuery, "value")} placeholder="Search" class="search-input" aria-label="Search insights" data-astro-cid-pttseihw> <button type="submit" class="search-submit" aria-label="Search" data-astro-cid-pttseihw> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" data-astro-cid-pttseihw> <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-pttseihw></path> </svg> </button> </div> ${filterType !== "all" && !searchQuery && renderTemplate`<input type="hidden" name="type"${addAttribute(filterType, "value")} data-astro-cid-pttseihw>`} ${filterValue && !searchQuery && renderTemplate`<input type="hidden" name="value"${addAttribute(filterValue, "value")} data-astro-cid-pttseihw>`} </form> </div> </div> </div> </section> <!-- Content Section - widgets for dropdown functionality only --> <section class="content-section" data-astro-cid-pttseihw> <div class="container content-aligned" data-astro-cid-pttseihw> <!-- Always show content sections for dropdown functionality --> <div class="content-sections" style="display: none;" data-astro-cid-pttseihw> <!-- Search Categories --> <div class="content-section widget" id="searchInWidget" style="display: none;" data-astro-cid-pttseihw> <div class="category-buttons" data-astro-cid-pttseihw> <button class="category-btn active" data-category="all" data-astro-cid-pttseihw>All<br data-astro-cid-pttseihw>Website</button> <button class="category-btn" data-category="pages" data-astro-cid-pttseihw>Pages</button> <button class="category-btn" data-category="blog" data-astro-cid-pttseihw>Blog</button> <button class="category-btn" data-category="projects" data-astro-cid-pttseihw>Projects</button> <button class="category-btn" data-category="resources" data-astro-cid-pttseihw>Resources</button> </div> </div> <!-- Popular Keywords --> <div class="content-section widget" id="keywordsWidget" style="display: none;" data-astro-cid-pttseihw> <div class="keyword-tags" data-astro-cid-pttseihw> <button class="keyword-tag" data-keyword="about" data-astro-cid-pttseihw>about</button> <button class="keyword-tag" data-keyword="services" data-astro-cid-pttseihw>services</button> <button class="keyword-tag" data-keyword="portfolio" data-astro-cid-pttseihw>portfolio</button> <button class="keyword-tag" data-keyword="contact" data-astro-cid-pttseihw>contact</button> <button class="keyword-tag" data-keyword="projects" data-astro-cid-pttseihw>projects</button> <button class="keyword-tag" data-keyword="experience" data-astro-cid-pttseihw>experience</button> <button class="keyword-tag" data-keyword="skills" data-astro-cid-pttseihw>skills</button> <button class="keyword-tag" data-keyword="testimonials" data-astro-cid-pttseihw>testimonials</button> <button class="keyword-tag" data-keyword="blog" data-astro-cid-pttseihw>blog</button> <button class="keyword-tag" data-keyword="resources" data-astro-cid-pttseihw>resources</button> </div> </div> <!-- Default Content --> <div class="content-section" data-astro-cid-pttseihw> <div class="default-content" data-astro-cid-pttseihw> <p data-astro-cid-pttseihw>Use the tabs above to explore different ways to find content, discover popular keywords, or browse our featured selections. You can also use the search bar to find specific information across our website.</p> <p data-astro-cid-pttseihw>Start by clicking on one of the navigation tabs above to see available options, or enter a search term in the search box.</p> </div> </div> <!-- Featured Posts (Combined Suggested & Popular) --> <div class="content-section widget" id="featuredWidget" style="display: none;" data-astro-cid-pttseihw> <div class="featured-cards" data-astro-cid-pttseihw> <a href="/about" class="featured-card" data-astro-cid-pttseihw> <div class="featured-content" data-astro-cid-pttseihw> <h4 data-astro-cid-pttseihw>About Our Company</h4> <span class="featured-meta" data-astro-cid-pttseihw>Most Popular</span> </div> </a> <a href="/contact" class="featured-card" data-astro-cid-pttseihw> <div class="featured-content" data-astro-cid-pttseihw> <h4 data-astro-cid-pttseihw>Get In Touch</h4> <span class="featured-meta" data-astro-cid-pttseihw>Recommended</span> </div> </a> <a href="/services" class="featured-card" data-astro-cid-pttseihw> <div class="featured-content" data-astro-cid-pttseihw> <h4 data-astro-cid-pttseihw>Our Services</h4> <span class="featured-meta" data-astro-cid-pttseihw>Trending</span> </div> </a> <a href="/portfolio" class="featured-card" data-astro-cid-pttseihw> <div class="featured-content" data-astro-cid-pttseihw> <h4 data-astro-cid-pttseihw>Portfolio</h4> <span class="featured-meta" data-astro-cid-pttseihw>Showcase</span> </div> </a> <a href="/team" class="featured-card" data-astro-cid-pttseihw> <div class="featured-content" data-astro-cid-pttseihw> <h4 data-astro-cid-pttseihw>Our Team</h4> <span class="featured-meta" data-astro-cid-pttseihw>Meet Us</span> </div> </a> <a href="/resources" class="featured-card" data-astro-cid-pttseihw> <div class="featured-content" data-astro-cid-pttseihw> <h4 data-astro-cid-pttseihw>Resources</h4> <span class="featured-meta" data-astro-cid-pttseihw>Free Tools</span> </div> </a> </div> </div> </div> </div> </section> <!-- Results Section - Direct to page level, not in containers --> <div class="main-content-wrapper content-aligned" style="padding-top: 0.25rem;" data-astro-cid-pttseihw> ${filteredContent.length > 0 ? renderTemplate`<div class="entries" data-astro-cid-pttseihw> ${filteredContent.map((item) => renderTemplate`<article class="entry-card" itemscope itemtype="https://schema.org/BlogPosting" data-astro-cid-pttseihw> <div class="card-header" data-astro-cid-pttseihw> <div class="meta-categories" data-astro-cid-pttseihw> <a${addAttribute(`/results?type=category&value=${encodeURIComponent(item.category)}`, "href")} class="category-pill" itemprop="about" data-astro-cid-pttseihw> ${item.category} </a> </div> <div class="meta-date" data-astro-cid-pttseihw> <time${addAttribute(item.publishedAt, "datetime")} itemprop="datePublished" data-astro-cid-pttseihw> ${formatDate(item.publishedAt)} </time> </div> </div> <h2 class="entry-title" itemprop="headline" data-astro-cid-pttseihw> <a${addAttribute(item.url, "href")} itemprop="url" data-astro-cid-pttseihw>${item.title}</a> </h2> <p class="entry-excerpt" itemprop="description" data-astro-cid-pttseihw> ${item.excerpt} </p> <div class="card-footer" data-astro-cid-pttseihw> <div class="meta-tags" data-astro-cid-pttseihw> <div class="tags-container" data-astro-cid-pttseihw> ${item.tags.map((tag) => renderTemplate`<a${addAttribute(`/results?type=tag&value=${encodeURIComponent(tag)}`, "href")} class="tag-pill" itemprop="keywords" data-astro-cid-pttseihw> ${tag} </a>`)} </div> </div> </div> </article>`)} </div>` : renderTemplate`<div class="no-results" data-astro-cid-pttseihw> <h2 data-astro-cid-pttseihw>No results found</h2> <p data-astro-cid-pttseihw>Sorry, we couldn't find any results matching your criteria.</p> <button onclick="history.back()" class="back-link" data-astro-cid-pttseihw>← Back</button> </div>`} </div> </main> ` })} ${renderScript($$result, "/home/runner/work/AstroTemplate/AstroTemplate/src/pages/results.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/runner/work/AstroTemplate/AstroTemplate/src/pages/results.astro", void 0);

const $$file = "/home/runner/work/AstroTemplate/AstroTemplate/src/pages/results.astro";
const $$url = "/results";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Results,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
