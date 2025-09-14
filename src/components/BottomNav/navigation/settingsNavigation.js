// Settings Navigation Functionality - FIXED VERSION
export function initSettingsNavigation() {
  const settingsTab = document.querySelector('[data-settings-tab]');
  const settingsToggle = document.querySelector('[data-settings-toggle]');
  const settingsExpanded = document.querySelector('[data-settings-expanded]');
  
  if (!settingsTab) return;
  
  let isSettingsExpanded = false;
  let hoverTimer = null;
  
  // Auto-collapse function with delay
  const scheduleAutoCollapse = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      if (!isSettingsExpanded) {
        // Add exit class for staggered exit animation
        settingsExpanded?.classList.add('exiting');
        setTimeout(() => {
          settingsExpanded?.classList.remove('show');
          settingsExpanded?.classList.remove('exiting');
        }, 600);
      }
    }, 1800); // 1.8 second delay
  };
  
  const cancelAutoCollapse = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  };
  
  // FIXED: Toggle settings menu - now properly manages container active class
  const toggleSettings = () => {
    isSettingsExpanded = !isSettingsExpanded;
    
    if (isSettingsExpanded) {
      console.log('🔒 Bottom nav OPENING');
      settingsExpanded?.classList.add('show');
      settingsToggle?.classList.add('active');
      settingsTab?.classList.add('active'); // CRITICAL: Add active to container
    } else {
      console.log('🔓 Bottom nav CLOSING');
      // Add exit class for staggered exit animation
      settingsExpanded?.classList.add('exiting');
      settingsToggle?.classList.remove('active');
      settingsTab?.classList.remove('active'); // CRITICAL: Remove active from container
      
      // Remove show class after a brief delay to allow exit animation
      setTimeout(() => {
        settingsExpanded?.classList.remove('show');
        settingsExpanded?.classList.remove('exiting');
      }, 600); // Wait for staggered animation to complete
    }
  };
  
  // Handle settings toggle click and hover
  settingsToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSettings();
  });
  
  settingsToggle?.addEventListener('mouseenter', () => {
    cancelAutoCollapse();
    if (!isSettingsExpanded) {
      settingsExpanded?.classList.add('show');
    }
  });
  
  settingsTab?.addEventListener('mouseenter', () => {
    cancelAutoCollapse();
  });
  
  settingsTab?.addEventListener('mouseleave', () => {
    if (!isSettingsExpanded) {
      scheduleAutoCollapse(); // Start 1.8 second timer
    }
  });
  
  // FIXED: Close settings when clicking outside - now properly removes container active class
  document.addEventListener('click', (e) => {
    if (isSettingsExpanded && !settingsTab.contains(e.target)) {
      console.log('👆 Clicked outside - closing bottom nav');
      isSettingsExpanded = false;
      settingsExpanded?.classList.remove('show');
      settingsToggle?.classList.remove('active');
      settingsTab?.classList.remove('active'); // CRITICAL: Remove active from container
    }
  });
  
  // Show/hide scroll-to-top button based on scroll position
  const handleScroll = () => {
    const scrollTopBtn = settingsTab.querySelector('[data-action="scroll-top"]');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTopBtn) {
      const btn = scrollTopBtn;
      if (scrollTop > 200) {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      } else {
        btn.style.opacity = '0.5';
        btn.style.pointerEvents = 'none';
      }
    }
  };
  
  // Initial scroll check
  handleScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return { toggleSettings, cancelAutoCollapse };
}