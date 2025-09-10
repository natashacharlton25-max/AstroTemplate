// src/components/Accessibility/accessibilityPanel.js

class AccessibilityPanel {
  constructor() {
    console.log('AccessibilityPanel initializing...');
    
    this.panel = document.getElementById('accessibilityPanel');
    this.closeBtn = document.getElementById('closeAccessibilityPanel');
    this.plainTextToggle = document.getElementById('plainTextToggle');
    this.plainTextCustomization = document.getElementById('plainTextCustomization');
    this.liveRegion = document.getElementById('accessibilityLiveRegion');
    
    console.log('AccessibilityPanel elements:', { 
      panel: this.panel, 
      closeBtn: this.closeBtn, 
      plainTextToggle: this.plainTextToggle 
    });
    
    // Load settings from localStorage
    this.settings = {
      keyboardHelpers: localStorage.getItem('accessibility-keyboardHelpers') === 'true',
      screenReaderHelpers: localStorage.getItem('accessibility-screenReaderHelpers') === 'true',
      plainTextMode: localStorage.getItem('accessibility-plainTextMode') === 'true',
      fontSize: parseInt(localStorage.getItem('accessibility-fontSize') || '100'),
      lineSpacing: parseInt(localStorage.getItem('accessibility-lineSpacing') || '160'),
      fontFamily: localStorage.getItem('accessibility-fontFamily') || 'default',
      backgroundColor: localStorage.getItem('accessibility-backgroundColor') || 'white'
    };
    
    this.init();
  }

  init() {
    // Initialize UI based on current settings
    this.syncUIWithSettings();
    this.applySettings();
    
    // Close button event
    this.closeBtn?.addEventListener('click', () => this.closePanel());
    
    // Backdrop click to close
    this.panel?.addEventListener('click', (e) => {
      if (e.target === this.panel) {
        this.closePanel();
      }
    });
    
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
    
    // Expose global function to open panel
    window.openAccessibilityPanel = () => this.openPanel();
    
    console.log('AccessibilityPanel initialized with settings:', this.settings);
  }

  openPanel() {
    console.log('Opening accessibility panel...', this.panel);
    this.panel?.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus the close button for keyboard navigation
    setTimeout(() => {
      this.closeBtn?.focus();
    }, 100);
    
    this.announceToScreenReader('Accessibility options panel opened');
  }

  closePanel() {
    this.panel?.classList.remove('show');
    document.body.style.overflow = '';
    this.announceToScreenReader('Accessibility options panel closed');
  }

  isOpen() {
    return this.panel?.classList.contains('show') ?? false;
  }

  handleCheckboxChange(control) {
    const setting = control.dataset.setting;
    if (setting === 'keyboardHelpers' || setting === 'screenReaderHelpers') {
      this.settings[setting] = control.checked;
      localStorage.setItem(`accessibility-${setting}`, control.checked.toString());
      this.applySettings();
      
      const featureName = setting === 'keyboardHelpers' ? 'Keyboard helpers' : 'Screen reader helpers';
      this.announceToScreenReader(`${featureName} ${control.checked ? 'enabled' : 'disabled'}`);
    }
  }

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
      this.applyPlainTextSettings();
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
    }
  }

  handleKeyDown(e) {
    // Escape key to close panel
    if (e.key === 'Escape' && this.isOpen()) {
      this.closePanel();
      return;
    }
    
    // T key to toggle plain text mode (only if not in input field)
    if (e.key === 't' || e.key === 'T') {
      const target = e.target;
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        e.preventDefault();
        this.togglePlainTextMode();
      }
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

  syncUIWithSettings() {
    // Sync checkboxes
    const keyboardCheckbox = document.getElementById('keyboardHelpers');
    if (keyboardCheckbox) keyboardCheckbox.checked = this.settings.keyboardHelpers;
    
    const screenReaderCheckbox = document.getElementById('screenReaderHelpers');
    if (screenReaderCheckbox) screenReaderCheckbox.checked = this.settings.screenReaderHelpers;
    
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
    
    // Sync font family select
    const fontFamilySelect = document.getElementById('fontFamily');
    if (fontFamilySelect) fontFamilySelect.value = this.settings.fontFamily;
    
    // Sync background color radio buttons
    const backgroundRadios = document.querySelectorAll('input[name="backgroundColor"]');
    backgroundRadios.forEach(radio => {
      radio.checked = radio.value === this.settings.backgroundColor;
    });
  }

  applySettings() {
    // Apply keyboard helpers
    if (this.settings.keyboardHelpers) {
      document.body.classList.add('accessibility-keyboard-helpers');
    } else {
      document.body.classList.remove('accessibility-keyboard-helpers');
    }
    
    // Apply screen reader helpers
    if (this.settings.screenReaderHelpers) {
      document.body.classList.add('accessibility-screen-reader-helpers');
    } else {
      document.body.classList.remove('accessibility-screen-reader-helpers');
    }
    
    // Apply plain text mode
    if (this.settings.plainTextMode) {
      document.body.classList.add('accessibility-plain-text-mode');
      this.applyPlainTextSettings();
    } else {
      document.body.classList.remove('accessibility-plain-text-mode');
      this.removePlainTextSettings();
    }
  }

  applyPlainTextSettings() {
    if (!this.settings.plainTextMode) return;
    
    let style = document.getElementById('accessibility-plain-text-styles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'accessibility-plain-text-styles';
      document.head.appendChild(style);
    }
    
    style.textContent = `
      .accessibility-plain-text-mode {
        font-size: ${this.settings.fontSize}% !important;
        line-height: ${this.settings.lineSpacing / 100} !important;
      }
      
      .accessibility-plain-text-mode * {
        font-size: inherit !important;
        line-height: inherit !important;
      }
    `;
    
    // Apply font class
    document.body.classList.remove('font-default', 'font-atkinson', 'font-opendyslexic');
    document.body.classList.add(`font-${this.settings.fontFamily}`);
    
    // Apply background class
    document.body.classList.remove('bg-white', 'bg-cream', 'bg-blue', 'bg-pink');
    document.body.classList.add(`bg-${this.settings.backgroundColor}`);
  }

  removePlainTextSettings() {
    const style = document.getElementById('accessibility-plain-text-styles');
    if (style) {
      style.remove();
    }
    
    // Remove classes
    document.body.classList.remove('font-default', 'font-atkinson', 'font-opendyslexic');
    document.body.classList.remove('bg-white', 'bg-cream', 'bg-blue', 'bg-pink');
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

  shareAccessibilityTips() {
    const tips = `Accessibility Tips for Better Web Browsing:

🔍 Use browser zoom: Ctrl/Cmd + Plus/Minus
⌨️ Navigate with Tab key and arrow keys
🎧 Try screen readers like NVDA (free) or VoiceOver (Mac)
🎨 Adjust system display settings for high contrast
📖 Use reader mode in your browser for cleaner text
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityPanel();
});

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AccessibilityPanel;
}