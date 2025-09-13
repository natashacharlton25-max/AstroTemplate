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
      // Skip completely if element is force visible (locked state)
      if (element.classList.contains('nav-force-visible')) {
        console.log('⏭️ SKIPPING locked element - keeping visible:', element.className);
        return; // Don't process locked elements at all
      }

      const { hideOnScrollDown, showOnScrollUp, onHide, onShow } = config;

      if (this.isScrollingDown && hideOnScrollDown) {
        console.log('📜⬇️ Scroll down - attempting to hide:', element.className);
        const wasHidden = this.hideElement(element);
        // Only call onHide if element was actually hidden
        if (wasHidden && onHide) onHide();
      } else if (!this.isScrollingDown && showOnScrollUp) {
        console.log('📜⬆️ Scroll up - showing:', element.className);
        this.showElement(element);
        if (onShow) onShow();
      }
    });
  }

  hideElement(element) {
    if (!element) return false;

    // Don't hide if element is force visible (locked state)
    if (element.classList.contains('nav-force-visible')) {
      console.log('🔒 LOCKED - Element prevented from hiding:', element.className);
      return false; // Element was NOT hidden
    }

    console.log('👋 HIDING navigation element:', element.className);

    // Add hiding classes based on element position
    if (element.classList.contains('nav-tab') || element.classList.contains('top-nav')) {
      // Top navigation - slide left
      element.classList.add('nav-hidden-top');
      console.log('💨 Added nav-hidden-top class');
    } else if (element.classList.contains('settings-tab') || element.classList.contains('bottom-nav')) {
      // Bottom navigation - slide right
      element.classList.add('nav-hidden-bottom');
      console.log('💨 Added nav-hidden-bottom class');
    } else if (element.classList.contains('insights-nav-tabs')) {
      // Insights navigation - treat as top navigation
      element.classList.add('nav-hidden-top');
      console.log('💨 Added nav-hidden-top class for insights nav');
    } else {
      console.log('❌ No matching nav class found for element:', element.className);
    }

    element.setAttribute('aria-hidden', 'true');
    return true; // Element was successfully hidden
  }

  showElement(element) {
    if (!element) return;

    console.log('👀 SHOWING navigation element:', element.className);

    // Remove hiding classes
    element.classList.remove('nav-hidden-top', 'nav-hidden-bottom');
    element.setAttribute('aria-hidden', 'false');
    console.log('✨ Removed nav-hidden classes');
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
   * @param {HTMLElement} specificElement - If provided, only pause this element
   */
  pauseScrollHiding(duration = 3000, specificElement = null) {
    if (specificElement) {
      // Only pause the specific element
      const config = this.navElements.get(specificElement);
      if (config) {
        const originalHideOnScrollDown = config.hideOnScrollDown;
        config.hideOnScrollDown = false;

        // Re-enable after duration
        setTimeout(() => {
          if (this.navElements.has(specificElement)) {
            config.hideOnScrollDown = originalHideOnScrollDown;
          }
        }, duration);
      }
    } else {
      // Global pause (legacy behavior)
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
  }

  /**
   * Re-enable scroll hiding for a specific element
   * @param {HTMLElement} element - The element to re-enable scroll hiding for
   */
  enableScrollHiding(element) {
    const config = this.navElements.get(element);
    if (config) {
      config.hideOnScrollDown = true;
      console.log('🔄 Re-enabled scroll hiding for:', element.className);
    }
  }

  /**
   * Completely disable scroll behavior for an element (for locked state)
   * @param {HTMLElement} element - The element to disable scroll for
   */
  disableScrollBehavior(element) {
    const config = this.navElements.get(element);
    if (config) {
      config.hideOnScrollDown = false;
      config.showOnScrollUp = false;
      console.log('🚫 Disabled all scroll behavior for:', element.className);
    }
  }

  /**
   * Enable scroll behavior for an element (for unlocked state)
   * @param {HTMLElement} element - The element to enable scroll for
   */
  enableScrollBehavior(element) {
    const config = this.navElements.get(element);
    if (config) {
      config.hideOnScrollDown = true;
      config.showOnScrollUp = true;
      console.log('✅ Enabled all scroll behavior for:', element.className);
    }
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