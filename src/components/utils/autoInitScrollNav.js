/**
 * Auto-initialization script for scroll-aware navigation
 * This runs on every page to automatically set up navigation hiding/showing
 */

import { scrollNavManager } from './scrollNavigation.js';

export function initScrollAwareNavigation() {
  // Find and register top navigation
  const topNavSelectors = [
    '#navTab',
    '.nav-tab',
    '.top-nav',
    'nav[role="navigation"]',
    'nav.nav-tab'
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
        console.log('🔔 onHide callback triggered for top nav');
        // Never auto-unlock locked navigation - locked should stay locked
        // This callback should only fire if element was actually hidden
        console.log('🔔 Top nav onHide: Element should already be hidden naturally');
      }
    });

    console.log('✅ Top navigation registered for scroll-aware behavior', topNav);
  } else {
    console.warn('⚠️ Top navigation not found. Available elements:',
      topNavSelectors.map(s => document.querySelector(s)).filter(Boolean));
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
        console.log('🔔 onHide callback triggered for bottom nav');
        // Never auto-unlock locked navigation - locked should stay locked
        // This callback should only fire if element was actually hidden
        console.log('🔔 Bottom nav onHide: Element should already be hidden naturally');
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

function handleNavToggle(navElement) {
  const toggle = navElement.querySelector('.nav-toggle, .settings-toggle, [aria-controls], [data-settings-toggle]');
  const isLocking = !toggle?.classList.contains('active');

  console.log('🔄 Navigation toggle triggered:', isLocking ? 'LOCKING' : 'UNLOCKING');

  if (isLocking) {
    // LOCKING: Add force visible class (scroll manager will skip it completely)
    navElement.classList.remove('nav-hidden-top', 'nav-hidden-bottom');
    navElement.classList.add('nav-force-visible');
    navElement.setAttribute('aria-hidden', 'false');

    console.log('🔒 LOCKED - Navigation pinned, scroll manager will skip this element');
    console.log('🔒 Classes after locking:', navElement.className);
  } else {
    // UNLOCKING: Enable scroll behavior and remove force visible
    console.log('🔓 UNLOCKING - Restoring scroll behavior');
    console.log('🔓 Classes before unlock:', navElement.className);

    navElement.classList.remove('nav-force-visible');
    console.log('🔓 Classes after removing nav-force-visible:', navElement.className);

    // No need to call enableScrollBehavior since we're using early return approach

    // Immediately check if we should hide based on current scroll state
    const isScrollingDown = scrollNavManager.getScrollDirection() === 'down';
    if (isScrollingDown && window.scrollY > scrollNavManager.scrollThreshold) {
      console.log('📜 Scroll down detected - hiding navigation immediately');
      // Hide immediately since user is scrolling down
      setTimeout(() => {
        scrollNavManager.hideElement(navElement);
      }, 50); // Small delay for unlock animation
    } else {
      console.log('📜 Scroll up or at top - keeping navigation visible');
    }
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

// Function is exported at the top of the file