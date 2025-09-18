/**
 * Simple Navigation Initialization
 * Replace all existing nav initialization with this
 * Save as: src/components/utils/initNavigation.js
 */

import { unifiedNavSystem } from './unifiedNavSystem.js';

export function initNavigation() {
  console.log('🚀 Simple navigation init called');

  // The unified system handles its own initialization timing
  // Just expose debug functions
  window.testNavigation = testNavigationStates;
  window.debugNav = () => unifiedNavSystem.debugState();

  console.log('✅ Navigation debug functions ready');
}

// CSS is now loaded directly in Layout.astro

function testNavigationStates() {
  console.log('🧪 Testing navigation states...');
  
  const topNav = document.querySelector('#navTab') || document.querySelector('.nav-tab');
  const bottomNav = document.querySelector('.settings-tab') || document.querySelector('[data-settings-tab]');
  
  if (topNav) {
    console.log('Top nav classes:', topNav.className);
    console.log('Top nav computed opacity:', window.getComputedStyle(topNav).opacity);
    console.log('Top nav computed transform:', window.getComputedStyle(topNav).transform);
  }
  
  if (bottomNav) {
    console.log('Bottom nav classes:', bottomNav.className);
    console.log('Bottom nav computed opacity:', window.getComputedStyle(bottomNav).opacity);
    console.log('Bottom nav computed transform:', window.getComputedStyle(bottomNav).transform);
  }
  
  unifiedNavSystem.debugState();
}