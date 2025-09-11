// Overlay Management Functionality
export function initOverlayManager() {
  // Dark mode icon update function
  const updateDarkModeIcon = () => {
    const darkModeBtn = document.getElementById('bottomNavDarkMode');
    if (darkModeBtn) {
      const moonIcon = darkModeBtn.querySelector('.moon-icon');
      const sunIcon = darkModeBtn.querySelector('.sun-icon');
      const isDarkMode = document.body.classList.contains('accessibility-dark-mode');
      
      if (isDarkMode) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        darkModeBtn.setAttribute('aria-label', 'Switch to light mode');
      } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        darkModeBtn.setAttribute('aria-label', 'Switch to dark mode');
      }
    }
  };
  
  // Initialize dark mode icon state
  setTimeout(() => {
    updateDarkModeIcon();
  }, 100);
  
  // Expose function globally for accessibility panel to call
  window.updateBottomNavDarkModeIcon = updateDarkModeIcon;
  // Overlay management functions
  const openOverlay = (type) => {
    const overlay = document.querySelector(`[data-overlay-screen="${type}"]`);
    if (overlay) {
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
      
      // Close settings menu when opening overlay
      const settingsExpanded = document.querySelector('[data-settings-expanded]');
      const settingsToggle = document.querySelector('[data-settings-toggle]');
      settingsExpanded?.classList.remove('show');
      settingsToggle?.classList.remove('active');
    }
  };
  
  const closeOverlay = (type) => {
    const overlay = document.querySelector(`[data-overlay-screen="${type}"]`);
    if (overlay) {
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  };
  
  const closeAllOverlays = () => {
    document.querySelectorAll('.overlay-screen').forEach(overlay => {
      overlay.classList.remove('show');
    });
    document.body.style.overflow = '';
  };
  
  // Handle navigation actions
  const handleNavigationAction = (action) => {
    switch (action) {
      case 'home':
        window.location.href = '/';
        break;
        
      case 'scroll-top':
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        // Fallback for older browsers
        if (window.scrollTo) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        break;
        
      case 'contact':
        // Use the contact popup instead of overlay
        if (window.openContactPopup) {
          window.openContactPopup();
          // Close settings menu when opening popup
          const settingsExpanded = document.querySelector('[data-settings-expanded]');
          const settingsToggle = document.querySelector('[data-settings-toggle]');
          settingsExpanded?.classList.remove('show');
          settingsToggle?.classList.remove('active');
        }
        break;
        
      case 'search':
        // Use the search popup instead of overlay
        if (window.openSearchPopup) {
          window.openSearchPopup();
          // Close settings menu when opening popup
          const settingsExpanded = document.querySelector('[data-settings-expanded]');
          const settingsToggle = document.querySelector('[data-settings-toggle]');
          settingsExpanded?.classList.remove('show');
          settingsToggle?.classList.remove('active');
        }
        break;
        
      case 'dark-mode':
        // Toggle dark mode via global accessibility system
        if (window.toggleGlobalDarkMode) {
          window.toggleGlobalDarkMode();
          // Update the icon state
          updateDarkModeIcon();
          // Close settings menu after action
          const settingsExpanded = document.querySelector('[data-settings-expanded]');
          const settingsToggle = document.querySelector('[data-settings-toggle]');
          settingsExpanded?.classList.remove('show');
          settingsToggle?.classList.remove('active');
        } else if (window.globalAccessibility) {
          window.globalAccessibility.toggleDarkMode();
          // Update the icon state
          updateDarkModeIcon();
          // Close settings menu after action
          const settingsExpanded = document.querySelector('[data-settings-expanded]');
          const settingsToggle = document.querySelector('[data-settings-toggle]');
          settingsExpanded?.classList.remove('show');
          settingsToggle?.classList.remove('active');
        } else {
          console.warn('Global Accessibility not available yet');
        }
        break;
        
      case 'accessibility':
        // Navigate to accessibility page
        window.location.href = '/AccessibilityPage';
        break;
    }
  };
  
  // Set up event listeners for navigation buttons
  const settingsTab = document.querySelector('[data-settings-tab]');
  if (settingsTab) {
    settingsTab.addEventListener('click', (e) => {
      const button = e.target && e.target.closest('[data-action]');
      if (!button) return;
      
      const action = button.dataset.action;
      handleNavigationAction(action);
    });
    
    // Add keyboard navigation support
    settingsTab.addEventListener('keydown', (e) => {
      const button = e.target && e.target.closest('[data-action]');
      if (!button) return;
      
      // Handle Enter and Space key presses
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const action = button.dataset.action;
        handleNavigationAction(action);
      }
      
      // Add visual feedback for keyboard navigation
      if (e.key === 'Tab') {
        button.style.outline = '2px solid #e63961';
        button.style.outlineOffset = '2px';
        
        // Remove outline after a short delay
        setTimeout(() => {
          button.style.outline = '';
          button.style.outlineOffset = '';
        }, 3000);
      }
    });
    
    // Enhanced focus indicators for accessibility
    settingsTab.addEventListener('focus', (e) => {
      const button = e.target && e.target.closest('[data-action]');
      if (button && button.dataset.action === 'accessibility') {
        button.style.boxShadow = '0 0 0 3px rgba(230, 57, 97, 0.5)';
        button.setAttribute('aria-label', 'Accessibility Options - Press Enter to open accessibility page');
      }
    }, true);
    
    settingsTab.addEventListener('blur', (e) => {
      const button = e.target && e.target.closest('[data-action]');
      if (button && button.dataset.action === 'accessibility') {
        button.style.boxShadow = '';
        button.setAttribute('aria-label', 'Accessibility Options');
      }
    }, true);
  }
  
  // Overlay event listeners (for any remaining overlays)
  document.querySelectorAll('[data-overlay-close]').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      const type = closeBtn.getAttribute('data-overlay-close');
      if (typeof type === 'string') {
        closeOverlay(type);
      }
    });
  });
  
  // Close overlays when clicking backdrop
  document.querySelectorAll('[data-overlay-backdrop]').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      const type = backdrop.getAttribute('data-overlay-backdrop');
      if (typeof type === 'string') {
        closeOverlay(type);
      }
    });
  });
  
  // Close overlays with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllOverlays();
    }
  });
  
  return { openOverlay, closeOverlay, closeAllOverlays };
}