/**
 * Scroll-aware navigation utility
 * Handles hiding/showing navigation elements based on scroll direction
 */

class ScrollNavigationManager {
  constructor() {
    this.lastScrollY = window.scrollY;
    this.ticking = false;
    this.scrollThreshold = 50; // Minimum scroll distance to trigger hide/show
    this.isScrollingDown = false;
    this.navElements = new Map();
    
    this.init();
  }

  init() {
    // Throttled scroll listener using requestAnimationFrame
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    const scrollDelta = Math.abs(currentScrollY - this.lastScrollY);

    // Only trigger if scrolled more than threshold
    if (scrollDelta < this.scrollThreshold) return;

    const scrollingDown = currentScrollY > this.lastScrollY;
    
    // Only update if direction actually changed
    if (this.isScrollingDown !== scrollingDown) {
      this.isScrollingDown = scrollingDown;
      this.updateNavigationVisibility();
    }

    this.lastScrollY = currentScrollY;
  }

  updateNavigationVisibility() {
    this.navElements.forEach((config, element) => {
      const { hideOnScrollDown, showOnScrollUp, onHide, onShow } = config;
      
      if (this.isScrollingDown && hideOnScrollDown) {
        this.hideElement(element);
        if (onHide) onHide();
      } else if (!this.isScrollingDown && showOnScrollUp) {
        this.showElement(element);
        if (onShow) onShow();
      }
    });
  }

  hideElement(element) {
    if (!element) return;
    
    // Add hiding classes based on element position
    if (element.classList.contains('nav-tab') || element.classList.contains('top-nav')) {
      // Top navigation - slide up
      element.classList.add('nav-hidden-top');
    } else if (element.classList.contains('settings-tab') || element.classList.contains('bottom-nav')) {
      // Bottom navigation - slide down
      element.classList.add('nav-hidden-bottom');
    }
    
    element.setAttribute('aria-hidden', 'true');
  }

  showElement(element) {
    if (!element) return;
    
    // Remove hiding classes
    element.classList.remove('nav-hidden-top', 'nav-hidden-bottom');
    element.setAttribute('aria-hidden', 'false');
  }

  /**
   * Register a navigation element for scroll-aware behavior
   * @param {HTMLElement} element - The navigation element
   * @param {Object} options - Configuration options
   */
  registerNavElement(element, options = {}) {
    if (!element) return;

    const config = {
      hideOnScrollDown: true,
      showOnScrollUp: true,
      onHide: null,
      onShow: null,
      ...options
    };

    this.navElements.set(element, config);
  }

  /**
   * Unregister a navigation element
   * @param {HTMLElement} element - The navigation element to remove
   */
  unregisterNavElement(element) {
    this.navElements.delete(element);
  }

  /**
   * Temporarily disable scroll hiding (useful when nav is manually opened)
   * @param {number} duration - Time in ms to disable (default: 3000ms)
   */
  pauseScrollHiding(duration = 3000) {
    const originalMap = new Map(this.navElements);
    
    // Temporarily disable hiding
    this.navElements.forEach((config) => {
      config.hideOnScrollDown = false;
    });

    // Re-enable after duration
    setTimeout(() => {
      originalMap.forEach((config, element) => {
        if (this.navElements.has(element)) {
          this.navElements.set(element, config);
        }
      });
    }, duration);
  }

  /**
   * Force show all registered navigation elements
   */
  showAllNavigation() {
    this.navElements.forEach((config, element) => {
      this.showElement(element);
    });
  }

  /**
   * Get current scroll direction
   * @returns {string} 'up' or 'down'
   */
  getScrollDirection() {
    return this.isScrollingDown ? 'down' : 'up';
  }
}

// Export singleton instance
export const scrollNavManager = new ScrollNavigationManager();

// Convenience function for quick setup
export function initScrollAwareNav(selector, options = {}) {
  const element = document.querySelector(selector);
  if (element) {
    scrollNavManager.registerNavElement(element, options);
  }
  return element;
}

// Auto-detect and register common navigation elements
export function autoRegisterNavigation() {
  // Register top navigation
  const topNav = document.querySelector('.nav-tab, #navTab, .top-nav');
  if (topNav) {
    scrollNavManager.registerNavElement(topNav, {
      onHide: () => console.log('Top nav hidden'),
      onShow: () => console.log('Top nav shown')
    });
  }

  // Register bottom navigation
  const bottomNav = document.querySelector('.settings-tab, .bottom-nav');
  if (bottomNav) {
    scrollNavManager.registerNavElement(bottomNav, {
      onHide: () => console.log('Bottom nav hidden'),
      onShow: () => console.log('Bottom nav shown')
    });
  }
}