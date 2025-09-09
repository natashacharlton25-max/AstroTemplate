// Search Popup JavaScript

class SearchPopup {
  constructor() {
    this.popup = document.getElementById('searchPopup');
    this.searchInput = document.getElementById('searchInput');
    this.closeBtn = document.getElementById('closeSearchPopup');
    this.clearBtn = document.getElementById('clearSearch');
    this.categoryBtns = document.querySelectorAll('.category-btn');
    this.keywordTags = document.querySelectorAll('.keyword-tag');
    this.searchResults = document.getElementById('searchResults');
    this.defaultContent = document.getElementById('defaultContent');
    this.resultsContainer = document.getElementById('resultsContainer');
    this.resultsTitle = document.getElementById('resultsTitle');
    this.resultsCount = document.getElementById('resultsCount');
    
    this.currentCategory = 'all';
    this.searchTimeout = null;
    
    // Sample data - replace with actual API calls
    this.sampleData = this.generateSampleData();
    
    this.init();
  }

  init() {
    // Close button event
    this.closeBtn?.addEventListener('click', () => this.closePopup());
    
    // Backdrop click to close
    this.popup?.addEventListener('click', (e) => {
      if (e.target === this.popup) {
        this.closePopup();
      }
    });
    
    // Search input events
    this.searchInput?.addEventListener('input', (e) => this.handleSearch(e.target.value));
    this.searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.performSearch(e.target.value);
      }
    });
    
    // Clear search button
    this.clearBtn?.addEventListener('click', () => this.clearSearch());
    
    // Category button events
    this.categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => this.selectCategory(btn));
    });
    
    // Keyword tag events
    this.keywordTags.forEach(tag => {
      tag.addEventListener('click', () => this.searchKeyword(tag));
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.closePopup();
      }
    });
    
    // Expose global function to open popup
    window.openSearchPopup = () => this.openPopup();
  }

  openPopup() {
    this.popup?.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus search input after animation
    setTimeout(() => {
      this.searchInput?.focus();
    }, 100);
  }

  closePopup() {
    this.popup?.classList.remove('show');
    document.body.style.overflow = '';
    this.clearSearch();
  }

  isOpen() {
    return this.popup?.classList.contains('show');
  }

  selectCategory(btn) {
    // Remove active from all buttons
    this.categoryBtns.forEach(b => b.classList.remove('active'));
    
    // Add active to clicked button
    btn.classList.add('active');
    
    // Store selected category
    this.currentCategory = btn.getAttribute('data-category');
    
    // Re-search if there's a current search term
    const searchTerm = this.searchInput?.value?.trim();
    if (searchTerm) {
      this.performSearch(searchTerm);
    }
  }

  searchKeyword(tag) {
    const keyword = tag.getAttribute('data-keyword');
    if (this.searchInput) {
      this.searchInput.value = keyword;
      this.performSearch(keyword);
      this.updateClearButton();
    }
  }

  handleSearch(query) {
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    // Update clear button visibility
    this.updateClearButton();
    
    // Debounce search
    this.searchTimeout = setTimeout(() => {
      if (query.trim()) {
        this.performSearch(query.trim());
      } else {
        this.showDefaultContent();
      }
    }, 300);
  }

  async performSearch(query) {
    if (!query) {
      this.showDefaultContent();
      return;
    }

    try {
      // Show loading state
      this.showSearchResults([], query, true);
      
      // Call API
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&category=${this.currentCategory}&limit=20`);
      const data = await response.json();
      
      if (response.ok) {
        // Update UI with API results
        this.showSearchResults(data.results, query, false, data.total);
      } else {
        throw new Error(data.error || 'Search failed');
      }
      
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to local search
      const results = this.filterResults(query, this.currentCategory);
      this.showSearchResults(results, query);
    }
  }

  filterResults(query, category) {
    const searchTerms = query.toLowerCase().split(' ');
    
    return this.sampleData.filter(item => {
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
      
      return searchTerms.some(term => searchableText.includes(term));
    });
  }

  showSearchResults(results, query, isLoading = false, total = null) {
    // Hide default content
    if (this.defaultContent) {
      this.defaultContent.style.display = 'none';
    }
    
    // Show search results
    if (this.searchResults) {
      this.searchResults.style.display = 'block';
    }
    
    // Update results title and count
    if (this.resultsTitle) {
      this.resultsTitle.textContent = isLoading ? `Searching for "${query}"...` : `Results for "${query}"`;
    }
    
    if (this.resultsCount) {
      if (isLoading) {
        this.resultsCount.textContent = 'Loading...';
      } else {
        const count = total !== null ? total : results.length;
        this.resultsCount.textContent = `${count} result${count !== 1 ? 's' : ''}`;
      }
    }
    
    // Render results
    if (isLoading) {
      this.renderLoadingState();
    } else {
      this.renderResults(results);
    }
  }

  showDefaultContent() {
    // Show default content
    if (this.defaultContent) {
      this.defaultContent.style.display = 'flex';
    }
    
    // Hide search results
    if (this.searchResults) {
      this.searchResults.style.display = 'none';
    }
  }

  renderLoadingState() {
    if (!this.resultsContainer) return;
    
    this.resultsContainer.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <p>Searching...</p>
      </div>
    `;
  }

  renderResults(results) {
    if (!this.resultsContainer) return;
    
    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="no-results">
          <p>No results found. Try different keywords or check a different category.</p>
        </div>
      `;
      return;
    }
    
    this.resultsContainer.innerHTML = results.map(result => `
      <a href="${result.url}" class="result-item">
        <h4 class="result-title">${this.highlightSearchTerms(result.title, this.searchInput?.value || '')}</h4>
        <p class="result-description">${this.highlightSearchTerms(result.description, this.searchInput?.value || '')}</p>
        <div class="result-meta">
          <span class="result-category">${this.getCategoryIcon(result.category)} ${result.category}</span>
          <span class="result-date">${result.date}</span>
        </div>
      </a>
    `).join('');
  }

  highlightSearchTerms(text, searchTerm) {
    if (!searchTerm) return text;
    
    const terms = searchTerm.toLowerCase().split(' ');
    let highlightedText = text;
    
    terms.forEach(term => {
      if (term.length > 2) { // Only highlight terms longer than 2 characters
        const regex = new RegExp(`(${term})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
      }
    });
    
    return highlightedText;
  }

  getCategoryIcon(category) {
    return ''; // No icons, just return empty string
  }

  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    this.updateClearButton();
    this.showDefaultContent();
  }

  updateClearButton() {
    if (!this.clearBtn || !this.searchInput) return;
    
    if (this.searchInput.value.trim()) {
      this.clearBtn.style.display = 'flex';
    } else {
      this.clearBtn.style.display = 'none';
    }
  }

  generateSampleData() {
    return [
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
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SearchPopup();
});

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchPopup;
}