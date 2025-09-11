// Enhanced AccessibilityPanel with Dark Mode Support

class AccessibilityPanel {
  constructor() {
    console.log('AccessibilityPanel initializing...');
    
    this.plainTextToggle = document.getElementById('plainTextToggle');
    this.plainTextCustomization = document.getElementById('plainTextCustomization');
    this.liveRegion = document.getElementById('accessibilityLiveRegion');
    
    // Load settings from localStorage (including dark mode)
    this.settings = {
      keyboardHelpers: localStorage.getItem('accessibility-keyboardHelpers') === 'true',
      screenReaderHelpers: localStorage.getItem('accessibility-screenReaderHelpers') === 'true',
      plainTextMode: localStorage.getItem('accessibility-plainTextMode') === 'true',
      darkMode: localStorage.getItem('accessibility-darkMode') === 'true',
      fontSize: parseInt(localStorage.getItem('accessibility-fontSize') || '100'),
      lineSpacing: parseInt(localStorage.getItem('accessibility-lineSpacing') || '160'),
      fontFamily: localStorage.getItem('accessibility-fontFamily') || 'default',
      backgroundColor: localStorage.getItem('accessibility-backgroundColor') || 'white'
    };
    
    this.init();
  }

  init() {
    // Initialize dark mode first
    this.initializeDarkMode();
    
    // Initialize UI based on current settings
    this.syncUIWithSettings();
    this.applySettings();
    
    // Setting change events
    document.querySelectorAll('[data-setting]').forEach(control => {
      if (control.type === 'checkbox') {
        control.addEventListener('change', () => this.handleCheckboxChange(control));
      } else if (control.type === 'range') {
        control.addEventListener('input', () => this.handleRangeChange(control));
      } else if (control.type === 'radio') {
        control.addEventListener('change', () => this.handleRadioChange(control));
      } else if (control.tagName === 'SELECT') {
        control.addEventListener('change', () => this.handleSelectChange(control));
      } else if (control.tagName === 'BUTTON') {
        control.addEventListener('click', () => this.handleButtonClick(control));
      }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    
    // Reset settings button
    const resetBtn = document.getElementById('resetAccessibilitySettings');
    resetBtn?.addEventListener('click', () => this.resetAllSettings());
    
    // Share tips button
    const shareTipsBtn = document.getElementById('shareAccessibilityTips');
    shareTipsBtn?.addEventListener('click', () => this.shareAccessibilityTips());
    
    // Preset card events
    document.querySelectorAll('[data-preset]').forEach(card => {
      card.addEventListener('click', (e) => this.applyPreset(e.target.closest('[data-preset]').dataset.preset));
    });
    
    // Listen for system theme changes
    this.setupSystemThemeListener();
    
    // Expose global functions for other components
    window.accessibilityPanelInstance = this;
    
    console.log('AccessibilityPanel initialized with settings:', this.settings);
  }

  initializeDarkMode() {
    // Check if user has a saved preference
    const savedDarkMode = localStorage.getItem('accessibility-darkMode');
    
    if (savedDarkMode === null) {
      // No saved preference, use system preference
      this.settings.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Don't apply dark mode here - it's already applied by critical CSS
    // Just update the UI state to match what's already applied
    this.updateDarkModeToggleState();
  }

  setupSystemThemeListener() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    darkModeQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedDarkMode = localStorage.getItem('accessibility-darkMode');
      if (savedDarkMode === null) {
        this.settings.darkMode = e.matches;
        this.applyDarkMode();
        this.announceToScreenReader(`Automatically switched to ${e.matches ? 'dark' : 'light'} mode`);
      }
    });
    
    // Handle high contrast preference changes
    highContrastQuery.addEventListener('change', (e) => {
      this.handleHighContrastChange(e.matches);
    });
    
    // Initial high contrast setup
    if (highContrastQuery.matches) {
      this.handleHighContrastChange(true);
    }
  }
  
  handleHighContrastChange(isHighContrast) {
    if (isHighContrast) {
      document.body.classList.add('accessibility-high-contrast');
      this.announceToScreenReader('High contrast mode detected and applied');
    } else {
      document.body.classList.remove('accessibility-high-contrast');
      this.announceToScreenReader('High contrast mode disabled');
    }
  }

  toggleDarkMode() {
    this.settings.darkMode = !this.settings.darkMode;
    localStorage.setItem('accessibility-darkMode', this.settings.darkMode.toString());
    
    this.applyDarkMode();
    this.updateDarkModeToggleState();
    this.announceToScreenReader(`Switched to ${this.settings.darkMode ? 'dark' : 'light'} mode`);
  }

  applyDarkMode() {
    if (this.settings.darkMode) {
      document.body.classList.add('accessibility-dark-mode');
    } else {
      document.body.classList.remove('accessibility-dark-mode');
    }
    
    this.updateDarkModeToggleState();
    
    // Notify bottom nav to update icon
    if (window.updateBottomNavDarkModeIcon) {
      window.updateBottomNavDarkModeIcon();
    }
  }

  updateDarkModeToggleState() {
    // Update the dark mode checkbox in the panel
    const darkModeCheckbox = document.getElementById('darkMode');
    if (darkModeCheckbox) {
      darkModeCheckbox.checked = this.settings.darkMode;
    }
  }

  handleCheckboxChange(control) {
    const setting = control.dataset.setting;
    
    if (setting === 'keyboardHelpers' || setting === 'screenReaderHelpers') {
      this.settings[setting] = control.checked;
      localStorage.setItem(`accessibility-${setting}`, control.checked.toString());
      this.applySettings();
      
      const featureName = setting === 'keyboardHelpers' ? 'Keyboard helpers' : 'Screen reader helpers';
      this.announceToScreenReader(`${featureName} ${control.checked ? 'enabled' : 'disabled'}`);
    } else if (setting === 'darkMode') {
      this.toggleDarkMode();
    }
  }

  handleKeyDown(e) {
    // T key to toggle plain text mode (only if not in input field)
    if (e.key === 't' || e.key === 'T') {
      const target = e.target;
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        e.preventDefault();
        this.togglePlainTextMode();
      }
    }
    
    // D key to toggle dark mode (only if not in input field)
    if (e.key === 'd' || e.key === 'D') {
      const target = e.target;
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        e.preventDefault();
        this.toggleDarkMode();
      }
    }
  }

  syncUIWithSettings() {
    // Sync checkboxes
    const keyboardCheckbox = document.getElementById('keyboardHelpers');
    if (keyboardCheckbox) keyboardCheckbox.checked = this.settings.keyboardHelpers;
    
    const screenReaderCheckbox = document.getElementById('screenReaderHelpers');
    if (screenReaderCheckbox) screenReaderCheckbox.checked = this.settings.screenReaderHelpers;
    
    const darkModeCheckbox = document.getElementById('darkMode');
    if (darkModeCheckbox) darkModeCheckbox.checked = this.settings.darkMode;
    
    // Sync plain text toggle
    if (this.plainTextToggle) {
      this.plainTextToggle.setAttribute('aria-pressed', this.settings.plainTextMode.toString());
    }
    
    // Sync plain text customization visibility
    if (this.plainTextCustomization) {
      this.plainTextCustomization.style.display = this.settings.plainTextMode ? 'block' : 'none';
    }
    
    // Sync range sliders
    const fontSizeSlider = document.getElementById('fontSize');
    if (fontSizeSlider) {
      fontSizeSlider.value = this.settings.fontSize.toString();
      const fontSizeValue = document.getElementById('fontSizeValue');
      if (fontSizeValue) fontSizeValue.textContent = `${this.settings.fontSize}%`;
    }
    
    const lineSpacingSlider = document.getElementById('lineSpacing');
    if (lineSpacingSlider) {
      lineSpacingSlider.value = this.settings.lineSpacing.toString();
      const lineSpacingValue = document.getElementById('lineSpacingValue');
      if (lineSpacingValue) lineSpacingValue.textContent = `${this.settings.lineSpacing}%`;
    }
    
    // Sync font family selects (both in plain text customization and general)
    const fontFamilySelect = document.getElementById('fontFamily');
    if (fontFamilySelect) fontFamilySelect.value = this.settings.fontFamily;
    
    const fontFamilyGeneralSelect = document.getElementById('fontFamilyGeneral');
    if (fontFamilyGeneralSelect) fontFamilyGeneralSelect.value = this.settings.fontFamily;
    
    // Sync background color radio buttons and add dark mode options
    this.updateBackgroundColorOptions();
    
    // Update dark mode toggle state
    this.updateDarkModeToggleState();
  }

  updateBackgroundColorOptions() {
    const backgroundRadios = document.querySelectorAll('input[name="backgroundColor"]');
    
    // Add dark mode specific background options if in dark mode
    if (this.settings.darkMode) {
      this.addDarkModeBackgroundOptions();
    }
    
    backgroundRadios.forEach(radio => {
      radio.checked = radio.value === this.settings.backgroundColor;
    });
  }

  addDarkModeBackgroundOptions() {
    // Check if dark mode options already exist
    const existingDarkOption = document.querySelector('input[value="dark"]');
    if (existingDarkOption) return;
    
    const colorOptions = document.querySelector('.color-options');
    if (!colorOptions) return;
    
    // Add dark background option
    const darkOption = this.createColorOption('dark', '#1a1a1a', 'Dark');
    const grayOption = this.createColorOption('gray', '#2a2a2a', 'Gray');
    
    colorOptions.appendChild(darkOption);
    colorOptions.appendChild(grayOption);
  }

  createColorOption(value, color, label) {
    const option = document.createElement('label');
    option.className = 'color-option';
    
    option.innerHTML = `
      <input type="radio" name="backgroundColor" value="${value}" data-setting="backgroundColor">
      <span class="color-swatch" style="background: ${color};"></span>
      <span class="color-label">${label}</span>
    `;
    
    // Add event listener
    const radio = option.querySelector('input');
    radio.addEventListener('change', () => this.handleRadioChange(radio));
    
    return option;
  }

  applyPlainTextSettings() {
    if (!this.settings.plainTextMode) return;
    
    let style = document.getElementById('accessibility-plain-text-styles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'accessibility-plain-text-styles';
      document.head.appendChild(style);
    }
    
    // Get appropriate background colors based on current theme
    const backgroundColors = this.getBackgroundColorsForTheme();
    
    style.textContent = `
      .accessibility-plain-text-mode {
        font-size: ${this.settings.fontSize}% !important;
        line-height: ${this.settings.lineSpacing / 100} !important;
      }
      
      .accessibility-plain-text-mode * {
        font-size: inherit !important;
        line-height: inherit !important;
      }
      
      ${backgroundColors}
    `;
    
    // Apply font class
    document.body.classList.remove('font-default', 'font-atkinson', 'font-opendyslexic');
    document.body.classList.add(`font-${this.settings.fontFamily}`);
    
    // Apply background class (this is now handled by applyBackgroundColor method)
    // document.body.classList.remove('bg-white', 'bg-cream', 'bg-blue', 'bg-pink', 'bg-dark', 'bg-gray');
    // document.body.classList.add(`bg-${this.settings.backgroundColor}`);
  }

  applyBackgroundColor() {
    // Remove all background color classes
    document.body.classList.remove('bg-white', 'bg-cream', 'bg-blue', 'bg-pink', 'bg-dark', 'bg-gray');
    
    // Apply the selected background color class
    if (this.settings.backgroundColor && this.settings.backgroundColor !== 'default') {
      document.body.classList.add(`bg-${this.settings.backgroundColor}`);
    }
    
    // Also apply font class for consistency
    document.body.classList.remove('font-default', 'font-atkinson', 'font-opendyslexic');
    document.body.classList.add(`font-${this.settings.fontFamily}`);
  }

  getBackgroundColorsForTheme() {
    if (this.settings.darkMode) {
      return `
        .accessibility-plain-text-mode.bg-white { 
          background: #1a1a1a !important; 
          color: #e5e5e5 !important; 
        }
        .accessibility-plain-text-mode.bg-cream { 
          background: #2a2520 !important; 
          color: #e5dcc0 !important; 
        }
        .accessibility-plain-text-mode.bg-blue { 
          background: #0d1a2a !important; 
          color: #b3d9ff !important; 
        }
        .accessibility-plain-text-mode.bg-pink { 
          background: #2a1a25 !important; 
          color: #ffb3d9 !important; 
        }
        .accessibility-plain-text-mode.bg-dark { 
          background: #0f0f0f !important; 
          color: #e5e5e5 !important; 
        }
        .accessibility-plain-text-mode.bg-gray { 
          background: #2a2a2a !important; 
          color: #d0d0d0 !important; 
        }
      `;
    } else {
      return `
        .accessibility-plain-text-mode.bg-white { 
          background: #ffffff !important; 
          color: #000000 !important; 
        }
        .accessibility-plain-text-mode.bg-cream { 
          background: #f5f5dc !important; 
          color: #000000 !important; 
        }
        .accessibility-plain-text-mode.bg-blue { 
          background: #e6f3ff !important; 
          color: #000033 !important; 
        }
        .accessibility-plain-text-mode.bg-pink { 
          background: #ffe6f0 !important; 
          color: #330022 !important; 
        }
      `;
    }
  }

  applySettings() {
    // Apply dark mode
    this.applyDarkMode();
    
    // Apply background color (works independently of plain text mode)
    this.applyBackgroundColor();
    
    // Sync keyboard helpers (critical CSS may have already applied this)
    if (this.settings.keyboardHelpers) {
      document.body.classList.add('accessibility-keyboard-helpers');
    } else {
      document.body.classList.remove('accessibility-keyboard-helpers');
    }
    
    // Sync screen reader helpers (critical CSS may have already applied this)
    if (this.settings.screenReaderHelpers) {
      document.body.classList.add('accessibility-screen-reader-helpers');
    } else {
      document.body.classList.remove('accessibility-screen-reader-helpers');
    }
    
    // Sync plain text mode (critical CSS may have already applied this)
    if (this.settings.plainTextMode) {
      document.body.classList.add('accessibility-plain-text-mode');
      this.applyPlainTextSettings();
    } else {
      document.body.classList.remove('accessibility-plain-text-mode');
      this.removePlainTextSettings();
    }
  }

  resetAllSettings() {
    // Confirm with user
    if (!confirm('Are you sure you want to reset all accessibility settings to default?')) {
      return;
    }
    
    // Clear localStorage
    Object.keys(this.settings).forEach(key => {
      localStorage.removeItem(`accessibility-${key}`);
    });
    
    // Reset settings object
    this.settings = {
      keyboardHelpers: false,
      screenReaderHelpers: false,
      plainTextMode: false,
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches, // Reset to system preference
      fontSize: 100,
      lineSpacing: 160,
      fontFamily: 'default',
      backgroundColor: 'white'
    };
    
    // Sync UI and apply
    this.syncUIWithSettings();
    this.applySettings();
    
    this.announceToScreenReader('All accessibility settings have been reset to default');
  }

  applyPreset(presetName) {
    let presetSettings = {};
    
    switch (presetName) {
      case 'default':
        presetSettings = {
          keyboardHelpers: false,
          screenReaderHelpers: false,
          plainTextMode: false,
          darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
          fontSize: 100,
          lineSpacing: 160,
          fontFamily: 'default',
          backgroundColor: 'white'
        };
        break;
        
      case 'vision':
        presetSettings = {
          keyboardHelpers: true,
          screenReaderHelpers: true,
          plainTextMode: true,
          darkMode: true,
          fontSize: 150,
          lineSpacing: 200,
          fontFamily: 'atkinson',
          backgroundColor: 'dark'
        };
        break;
        
      case 'motor':
        presetSettings = {
          keyboardHelpers: true,
          screenReaderHelpers: false,
          plainTextMode: false,
          darkMode: this.settings.darkMode, // Keep current
          fontSize: 125,
          lineSpacing: 180,
          fontFamily: 'default',
          backgroundColor: this.settings.backgroundColor // Keep current
        };
        break;
        
      case 'cognitive':
        presetSettings = {
          keyboardHelpers: true,
          screenReaderHelpers: true,
          plainTextMode: true,
          darkMode: this.settings.darkMode, // Keep current
          fontSize: 125,
          lineSpacing: 200,
          fontFamily: 'default',
          backgroundColor: 'cream'
        };
        break;
        
      default:
        return;
    }
    
    // Apply preset settings
    Object.keys(presetSettings).forEach(key => {
      this.settings[key] = presetSettings[key];
      localStorage.setItem(`accessibility-${key}`, presetSettings[key].toString());
    });
    
    // Update UI and apply settings
    this.syncUIWithSettings();
    this.applySettings();
    
    this.announceToScreenReader(`Applied ${presetName} accessibility preset`);
  }

  shareAccessibilityTips() {
    const tips = `Accessibility Tips for Better Web Browsing:

🔍 Use browser zoom: Ctrl/Cmd + Plus/Minus
⌨️ Navigate with Tab key and arrow keys
🎧 Try screen readers like NVDA (free) or VoiceOver (Mac)
🎨 Adjust system display settings for high contrast
📖 Use reader mode in your browser for cleaner text
🌙 Toggle dark mode: Press 'D' or use system settings
💬 Look for accessibility options in website settings

Visit our accessibility statement for more information!`;

    if (navigator.share) {
      navigator.share({
        title: 'Web Accessibility Tips',
        text: tips
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(tips).then(() => {
        alert('Accessibility tips copied to clipboard!');
      }).catch(() => {
        alert('Unable to share tips. Please check our accessibility statement for more information.');
      });
    }
  }

  // Remaining methods from original class...

  handleRangeChange(control) {
    const setting = control.dataset.setting;
    if (setting === 'fontSize' || setting === 'lineSpacing') {
      const value = parseInt(control.value);
      this.settings[setting] = value;
      localStorage.setItem(`accessibility-${setting}`, value.toString());
      
      // Update display value
      const displayElement = document.getElementById(`${setting}Value`);
      if (displayElement) {
        displayElement.textContent = `${value}%`;
      }
      
      this.applyPlainTextSettings();
    }
  }

  handleRadioChange(control) {
    const setting = control.dataset.setting;
    if (setting === 'backgroundColor' && control.checked) {
      this.settings[setting] = control.value;
      localStorage.setItem(`accessibility-${setting}`, control.value);
      
      // Apply background color immediately (works with or without plain text mode)
      this.applyBackgroundColor();
      
      // Also update plain text settings if plain text mode is active
      if (this.settings.plainTextMode) {
        this.applyPlainTextSettings();
      }
      
      this.announceToScreenReader(`Background color changed to ${control.value}`);
    }
  }

  handleSelectChange(control) {
    const setting = control.dataset.setting;
    if (setting === 'fontFamily') {
      this.settings[setting] = control.value;
      localStorage.setItem(`accessibility-${setting}`, control.value);
      this.applyPlainTextSettings();
      this.announceToScreenReader(`Font changed to ${control.value === 'default' ? 'default' : control.value}`);
    }
  }

  handleButtonClick(control) {
    const setting = control.dataset.setting;
    if (setting === 'plainTextMode') {
      this.togglePlainTextMode();
    } else if (setting === 'darkMode') {
      this.toggleDarkMode();
    }
  }

  togglePlainTextMode() {
    this.settings.plainTextMode = !this.settings.plainTextMode;
    localStorage.setItem('accessibility-plainTextMode', this.settings.plainTextMode.toString());
    
    // Update button state
    if (this.plainTextToggle) {
      this.plainTextToggle.setAttribute('aria-pressed', this.settings.plainTextMode.toString());
    }
    
    // Show/hide customization options
    if (this.plainTextCustomization) {
      this.plainTextCustomization.style.display = this.settings.plainTextMode ? 'block' : 'none';
    }
    
    this.applySettings();
    this.announceToScreenReader(`Plain text mode ${this.settings.plainTextMode ? 'enabled' : 'disabled'}`);
  }

  removePlainTextSettings() {
    const style = document.getElementById('accessibility-plain-text-styles');
    if (style) {
      style.remove();
    }
    
    // Remove classes
    document.body.classList.remove('font-default', 'font-atkinson', 'font-opendyslexic');
    document.body.classList.remove('bg-white', 'bg-cream', 'bg-blue', 'bg-pink', 'bg-dark', 'bg-gray');
  }

  announceToScreenReader(message) {
    if (this.settings.screenReaderHelpers && this.liveRegion) {
      this.liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        if (this.liveRegion) this.liveRegion.textContent = '';
      }, 1000);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityPanel();
});

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AccessibilityPanel;
}