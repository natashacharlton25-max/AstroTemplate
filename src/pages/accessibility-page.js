// Accessibility Page JavaScript

class AccessibilityManager {
  constructor() {
    this.settings = {
      fontSize: 1,
      contrast: false,
      darkMode: false,
      reducedMotion: false,
      keyboardNav: false,
      skipLinks: true,
      popupAnnouncements: true,
      popupDelay: 0.4
    };
    
    this.announcer = document.getElementById('announcements');
    this.body = document.body;
    this.html = document.documentElement;
    
    this.init();
  }

  init() {
    // Load saved settings
    this.loadSettings();
    
    // Apply current settings
    this.applyAllSettings();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Setup popup integration
    this.setupPopupIntegration();
    
    // Setup keyboard navigation
    this.setupKeyboardNavigation();
    
    // Initialize skip links
    this.initializeSkipLinks();
  }

  setupEventListeners() {
    // Font size slider
    const fontSizeSlider = document.getElementById('fontSize');
    fontSizeSlider?.addEventListener('input', (e) => {
      this.settings.fontSize = parseFloat(e.target.value);
      this.applyFontSize();
      this.announce('Font size changed');
    });

    // Toggle controls
    const toggles = [
      'contrast', 'darkMode', 'reducedMotion', 'keyboardNav', 
      'skipLinks', 'popupAnnouncements'
    ];

    toggles.forEach(setting => {
      const toggle = document.getElementById(setting);
      toggle?.addEventListener('change', (e) => {
        this.settings[setting] = e.target.checked;
        this.applySetting(setting);
        this.announce(`${this.formatSettingName(setting)} ${e.target.checked ? 'enabled' : 'disabled'}`);
      });
    });

    // Popup delay slider
    const popupDelaySlider = document.getElementById('popupDelay');
    popupDelaySlider?.addEventListener('input', (e) => {
      this.settings.popupDelay = parseFloat(e.target.value);
      this.applyPopupDelay();
      this.announce('Popup animation speed changed');
    });

    // Action buttons
    document.getElementById('resetSettings')?.addEventListener('click', () => {
      this.resetSettings();
    });

    document.getElementById('saveSettings')?.addEventListener('click', () => {
      this.saveSettings();
    });

  }

  setupPopupIntegration() {
    // Override popup functions to integrate accessibility settings
    const originalOpenContact = window.openContactPopup;
    const originalOpenSearch = window.openSearchPopup;

    if (originalOpenContact) {
      window.openContactPopup = () => {
        if (this.settings.popupAnnouncements) {
          this.announce('Contact form opened');
        }
        originalOpenContact();
        if (this.settings.autoFocus) {
          this.focusFirstInput('#contactPopup');
        }
      };
    }

    if (originalOpenSearch) {
      window.openSearchPopup = () => {
        if (this.settings.popupAnnouncements) {
          this.announce('Search opened');
        }
        originalOpenSearch();
        if (this.settings.autoFocus) {
          this.focusFirstInput('#searchPopup');
        }
      };
    }

    // Listen for popup close events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.settings.escapeClose) {
        const openPopup = document.querySelector('.popup-overlay.show, .search-popup-overlay.show');
        if (openPopup && this.settings.popupAnnouncements) {
          this.announce('Popup closed');
        }
      }
    });
  }

  setupKeyboardNavigation() {
    // Enhanced keyboard navigation for the accessibility page
    document.addEventListener('keydown', (e) => {
      // Tab navigation enhancements
      if (e.key === 'Tab' && this.settings.keyboardNav) {
        // Add visual feedback for enhanced keyboard navigation
        const activeElement = document.activeElement;
        if (activeElement) {
          activeElement.style.outline = '3px solid #e63961';
          activeElement.style.outlineOffset = '2px';
          activeElement.style.boxShadow = '0 0 0 5px rgba(230, 57, 97, 0.3)';
        }
      }
      
      // Quick keyboard shortcuts for common actions
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'h':
            // Alt+H for Home
            e.preventDefault();
            window.location.href = '/';
            break;
          case 'c':
            // Alt+C for Contact
            e.preventDefault();
            if (window.openContactPopup) {
              window.openContactPopup();
            }
            break;
          case 's':
            // Alt+S for Search
            e.preventDefault();
            if (window.openSearchPopup) {
              window.openSearchPopup();
            }
            break;
          case 'a':
            // Alt+A for Accessibility page (already on it, scroll to top)
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.announce('Scrolled to top of accessibility page');
            break;
        }
      }
    });
    
    // Remove enhanced outline when focus is lost
    document.addEventListener('focusout', (e) => {
      if (e.target && this.settings.keyboardNav) {
        setTimeout(() => {
          e.target.style.outline = '';
          e.target.style.outlineOffset = '';
          e.target.style.boxShadow = '';
        }, 100);
      }
    });
  }

  initializeSkipLinks() {
    const skipLinksContainer = document.getElementById('skipLinks');
    if (!skipLinksContainer) return;

    // Show/hide skip links based on setting
    if (this.settings.skipLinks) {
      skipLinksContainer.style.display = 'flex';
    } else {
      skipLinksContainer.style.display = 'none';
    }

    // Add smooth scrolling for skip links
    skipLinksContainer.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          target.scrollIntoView({ 
            behavior: this.settings.reducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
          
          // Focus the target for accessibility
          if (target.tabIndex === -1) {
            target.tabIndex = -1;
          }
          target.focus();
          
          this.announce(`Skipped to ${target.textContent || targetId}`);
        }
      });
    });
  }

  focusFirstInput(popupSelector) {
    setTimeout(() => {
      const popup = document.querySelector(popupSelector);
      if (popup) {
        const firstInput = popup.querySelector('input, textarea, button, [tabindex]:not([tabindex="-1"])');
        if (firstInput) {
          firstInput.focus();
        }
      }
    }, this.settings.popupDelay * 1000 + 100);
  }

  applySetting(setting) {
    switch (setting) {
      case 'fontSize':
        this.applyFontSize();
        break;
      case 'contrast':
        this.applyHighContrast();
        break;
      case 'darkMode':
        this.applyDarkMode();
        break;
      case 'reducedMotion':
        this.applyReducedMotion();
        break;
      case 'keyboardNav':
        this.applyEnhancedKeyboard();
        break;
      case 'skipLinks':
        this.applySkipLinks();
        break;
      case 'popupDelay':
        this.applyPopupDelay();
        break;
      default:
        // Handle other settings that don't need immediate application
        break;
    }
  }

  applyAllSettings() {
    this.applyFontSize();
    this.applyHighContrast();
    this.applyDarkMode();
    this.applyReducedMotion();
    this.applyEnhancedKeyboard();
    this.applySkipLinks();
    this.applyPopupDelay();
    this.updateUI();
  }

  applyFontSize() {
    this.html.style.fontSize = `${this.settings.fontSize}rem`;
  }

  applyHighContrast() {
    if (this.settings.contrast) {
      this.body.classList.add('accessibility-high-contrast');
    } else {
      this.body.classList.remove('accessibility-high-contrast');
    }
  }

  applyDarkMode() {
    if (this.settings.darkMode) {
      this.body.classList.add('accessibility-dark-mode');
    } else {
      this.body.classList.remove('accessibility-dark-mode');
    }
  }

  applyReducedMotion() {
    if (this.settings.reducedMotion) {
      this.body.classList.add('accessibility-reduced-motion');
    } else {
      this.body.classList.remove('accessibility-reduced-motion');
    }
  }

  applyEnhancedKeyboard() {
    if (this.settings.keyboardNav) {
      this.body.classList.add('accessibility-enhanced-focus');
    } else {
      this.body.classList.remove('accessibility-enhanced-focus');
    }
  }

  applySkipLinks() {
    const skipLinks = document.getElementById('skipLinks');
    if (skipLinks) {
      skipLinks.style.display = this.settings.skipLinks ? 'flex' : 'none';
    }
  }

  applyPopupDelay() {
    // Update CSS custom property for popup animation duration
    this.html.style.setProperty('--popup-duration', `${this.settings.popupDelay}s`);
    
    // Update existing popup styles if they exist
    const popups = document.querySelectorAll('.popup-overlay, .search-popup-overlay');
    popups.forEach(popup => {
      popup.style.transitionDuration = `${this.settings.popupDelay}s`;
    });
  }

  updateUI() {
    // Update slider values
    const fontSizeSlider = document.getElementById('fontSize');
    if (fontSizeSlider) {
      fontSizeSlider.value = this.settings.fontSize;
    }

    const popupDelaySlider = document.getElementById('popupDelay');
    if (popupDelaySlider) {
      popupDelaySlider.value = this.settings.popupDelay;
    }

    // Update toggle states
    Object.keys(this.settings).forEach(setting => {
      const toggle = document.getElementById(setting);
      if (toggle && typeof this.settings[setting] === 'boolean') {
        toggle.checked = this.settings[setting];
      }
    });
  }

  announce(message) {
    if (this.announcer && this.settings.popupAnnouncements) {
      this.announcer.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        this.announcer.textContent = '';
      }, 1000);
    }
  }

  formatSettingName(setting) {
    return setting
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  saveSettings() {
    try {
      // Save single JSON object (simplified storage)
      localStorage.setItem('accessibility-settings', JSON.stringify(this.settings));
      
      // Trigger global accessibility update
      if (window.globalAccessibility) {
        window.globalAccessibility.reloadSettings();
        window.globalAccessibility.applySettings();
      }
      
      this.announce('Settings saved successfully');
      
      // Show visual feedback
      const saveBtn = document.getElementById('saveSettings');
      if (saveBtn) {
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Saved!';
        saveBtn.style.background = 'var(--color-accent-1)';
        
        setTimeout(() => {
          saveBtn.textContent = originalText;
          saveBtn.style.background = '';
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to save accessibility settings:', error);
      this.announce('Failed to save settings');
    }
  }

  loadSettings() {
    try {
      // Load from single JSON object (simplified storage)
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.settings = { ...this.settings, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load accessibility settings:', error);
    }
  }

  resetSettings() {
    // Reset to defaults
    this.settings = {
      fontSize: 1,
      contrast: false,
      darkMode: false,
      reducedMotion: false,
      keyboardNav: false,
      skipLinks: true,
      popupAnnouncements: true,
      popupDelay: 0.4
    };

    // Save reset settings (simplified storage)
    localStorage.setItem('accessibility-settings', JSON.stringify(this.settings));
    
    // Trigger global accessibility update
    if (window.globalAccessibility) {
      window.globalAccessibility.reloadSettings();
      window.globalAccessibility.applySettings();
    }

    // Apply and update UI
    this.applyAllSettings();
    this.announce('Settings reset to defaults');

    // Show visual feedback
    const resetBtn = document.getElementById('resetSettings');
    if (resetBtn) {
      const originalText = resetBtn.textContent;
      resetBtn.textContent = 'Reset!';
      resetBtn.style.background = 'var(--color-primary)';
      
      setTimeout(() => {
        resetBtn.textContent = originalText;
        resetBtn.style.background = '';
      }, 2000);
    }
  }

  // Public method to get current settings for other scripts
  getSettings() {
    return { ...this.settings };
  }

  // Public method to update a setting programmatically
  updateSetting(key, value) {
    if (key in this.settings) {
      this.settings[key] = value;
      this.applySetting(key);
      this.updateUI();
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.accessibilityManager = new AccessibilityManager();
});

// Expose for other scripts
window.AccessibilityManager = AccessibilityManager;

// Auto-detect system preferences and suggest settings
document.addEventListener('DOMContentLoaded', () => {
  // Check for system dark mode preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    const darkModeToggle = document.getElementById('darkMode');
    if (darkModeToggle && !darkModeToggle.checked) {
      // Show a subtle suggestion (could be implemented as a toast notification)
      console.log('System dark mode detected - consider enabling dark mode in accessibility settings');
    }
  }

  // Check for reduced motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reducedMotionToggle = document.getElementById('reducedMotion');
    if (reducedMotionToggle && !reducedMotionToggle.checked) {
      reducedMotionToggle.checked = true;
      reducedMotionToggle.dispatchEvent(new Event('change'));
    }
  }

  // Check for high contrast preference
  if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
    const contrastToggle = document.getElementById('contrast');
    if (contrastToggle && !contrastToggle.checked) {
      console.log('System high contrast detected - consider enabling high contrast mode');
    }
  }
});