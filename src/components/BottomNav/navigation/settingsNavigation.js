// Settings Navigation Functionality
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
  
  // Toggle settings menu
  const toggleSettings = () => {
    isSettingsExpanded = !isSettingsExpanded;
    
    if (isSettingsExpanded) {
      settingsExpanded?.classList.add('show');
      settingsToggle?.classList.add('active');
    } else {
      // Add exit class for staggered exit animation
      settingsExpanded?.classList.add('exiting');
      settingsToggle?.classList.remove('active');
      
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
  
  // Close settings when clicking outside
  document.addEventListener('click', (e) => {
    if (isSettingsExpanded && !settingsTab.contains(e.target)) {
      isSettingsExpanded = false;
      settingsExpanded?.classList.remove('show');
      settingsToggle?.classList.remove('active');
    }
  });
  
  // Show/hide scroll-to-top button based on scroll position
  let lastScrollTop = 0;
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
    lastScrollTop = scrollTop;
  };
  
  // Initial scroll check
  handleScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return { toggleSettings, cancelAutoCollapse };
}