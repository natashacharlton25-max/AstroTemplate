/**
 * Auto-initialization script for scroll-aware navigation
 * This runs on every page to automatically set up navigation hiding/showing
 */

import { scrollNavManager } from './scrollNavigation.js';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initScrollAwareNavigation();
});

function initScrollAwareNavigation() {
  // Find and register top navigation
  const topNavSelectors = [
    '#navTab',
    '.nav-tab',
    '.top-nav',
    'nav[role="navigation"]'
  ];
  
  let topNav = null;
  for (const selector of topNavSelectors) {
    topNav = document.querySelector(selector);
    if (topNav) break;
  }
  
  if (topNav) {
    scrollNavManager.registerNavElement(topNav, {
      hideOnScrollDown: true,
      showOnScrollUp: true,
      onHide: () => {
        // Auto-close any open menu when hiding
        const activeMenu = topNav.querySelector('.nav-expanded.active, .nav-expanded[aria-hidden="false"]');
        if (activeMenu) {
          const toggle = topNav.querySelector('.nav-toggle, [aria-controls]');
          toggle?.click();
        }
      }
    });
    
    console.log('✅ Top navigation registered for scroll-aware behavior');
  }
  
  // Find and register bottom navigation
  const bottomNavSelectors = [
    '.settings-tab',
    '.bottom-nav',
    '[data-settings-tab]'
  ];
  
  let bottomNav = null;
  for (const selector of bottomNavSelectors) {
    bottomNav = document.querySelector(selector);
    if (bottomNav) break;
  }
  
  if (bottomNav) {
    scrollNavManager.registerNavElement(bottomNav, {
      hideOnScrollDown: true,
      showOnScrollUp: true,
      onHide: () => {
        // Auto-close any open bottom menu when hiding
        const activeMenu = bottomNav.querySelector('.settings-expanded.active, [data-settings-expanded].active');
        if (activeMenu) {
          const toggle = bottomNav.querySelector('.settings-toggle, [data-settings-toggle]');
          toggle?.click();
        }
      }
    });
    
    console.log('✅ Bottom navigation registered for scroll-aware behavior');
  }
  
  // Set up manual override handlers
  setupManualOverrides(topNav, bottomNav);
  
  // Set up responsive behavior
  setupResponsiveBehavior();
}

function setupManualOverrides(topNav, bottomNav) {
  // Handle top nav manual toggling
  if (topNav) {
    const topToggle = topNav.querySelector('.nav-toggle, [aria-controls]');
    if (topToggle) {
      topToggle.addEventListener('click', () => {
        handleNavToggle(topNav, 'top');
      });
    }
  }
  
  // Handle bottom nav manual toggling  
  if (bottomNav) {
    const bottomToggle = bottomNav.querySelector('.settings-toggle, [data-settings-toggle]');
    if (bottomToggle) {
      bottomToggle.addEventListener('click', () => {
        handleNavToggle(bottomNav, 'bottom');
      });
    }
  }
}

function handleNavToggle(navElement, position) {
  const isOpening = !navElement.classList.contains('active');
  
  if (isOpening) {
    // Nav is opening - pause scroll hiding and force visible
    scrollNavManager.pauseScrollHiding(5000); // 5 seconds
    navElement.classList.add('nav-force-visible');
  } else {
    // Nav is closing - remove force visible after a brief delay
    setTimeout(() => {
      navElement.classList.remove('nav-force-visible');
    }, 300);
  }
}

function setupResponsiveBehavior() {
  // On mobile, be less aggressive with hiding
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  
  function handleMediaChange(e) {
    if (e.matches) {
      // Mobile - increase scroll threshold
      scrollNavManager.scrollThreshold = 80;
    } else {
      // Desktop - normal threshold
      scrollNavManager.scrollThreshold = 50;
    }
  }
  
  mediaQuery.addEventListener('change', handleMediaChange);
  handleMediaChange(mediaQuery);
}

// Export for manual initialization if needed
export { initScrollAwareNavigation };