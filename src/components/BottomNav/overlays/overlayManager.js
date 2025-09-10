// Overlay Management Functionality
export function initOverlayManager() {
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
        
      case 'accessibility':
        // Use the accessibility panel
        if (window.openAccessibilityPanel) {
          window.openAccessibilityPanel();
          // Close settings menu when opening panel
          const settingsExpanded = document.querySelector('[data-settings-expanded]');
          const settingsToggle = document.querySelector('[data-settings-toggle]');
          settingsExpanded?.classList.remove('show');
          settingsToggle?.classList.remove('active');
        }
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