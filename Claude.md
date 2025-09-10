# Claude.md - Brand Astro Website Accessibility Implementation

## Project Overview
Implement a thoughtful, non-intrusive accessibility system for the Brand Astro website that respects user autonomy and assistive technologies while providing helpful optional aids for users without their own accessibility tools.

## Philosophy
- **Respect user choice**: Never override system assistive technologies
- **Minimal interference**: Avoid excessive overlays or aggressive features
- **User-controlled**: Put users in control of what accessibility aids they want
- **Always-accessible baseline**: Ensure the site works well for everyone by default

---

## Core Implementation Structure

### 1. Always-On Passive Features (No User Toggle Required)

#### Semantic HTML Foundation
```html
<!-- Every page must use proper landmarks -->
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <!-- Navigation with proper ARIA -->
    <ul role="menubar">
      <li role="none">
        <a href="/" role="menuitem">Home</a>
      </li>
      <li role="none">
        <button 
          role="menuitem" 
          aria-expanded="false" 
          aria-controls="submenu-1"
          aria-haspopup="true">
          Services
        </button>
        <ul role="menu" id="submenu-1" aria-hidden="true">
          <!-- Submenu items -->
        </ul>
      </li>
    </ul>
  </nav>
</header>

<main role="main" id="main-content">
  <!-- Page content -->
</main>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>
```

#### Skip Link Implementation
```html
<!-- First element in <body> on every page -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 9999;
  border-radius: 0 0 4px 4px;
}

.skip-link:focus {
  top: 0;
}
```

#### WCAG Contrast Requirements
```css
/* Ensure all text meets WCAG AA standards */
:root {
  --text-primary: #1a1a1a; /* Contrast ratio > 4.5:1 on white */
  --text-secondary: #4a4a4a; /* Contrast ratio > 4.5:1 on light backgrounds */
  --link-color: #0066cc; /* Contrast ratio > 4.5:1 */
  --focus-outline: #005fcc; /* High contrast focus indicator */
}
```

#### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

#### Responsive Typography
```css
:root {
  --base-font-size: 1rem;
  --line-height-base: 1.6;
  --font-family-base: system-ui, -apple-system, sans-serif;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--base-font-size);
  line-height: var(--line-height-base);
}

/* Ensure text scales properly */
@media (max-width: 768px) {
  :root {
    --base-font-size: 0.875rem;
  }
}
```

### 2. Accessibility Panel Implementation

#### Panel Structure
```html
<!-- Fixed accessibility panel trigger -->
<button 
  id="accessibility-trigger" 
  class="accessibility-trigger"
  aria-label="Open accessibility options"
  aria-expanded="false"
  aria-controls="accessibility-panel">
  ♿
</button>

<!-- Accessibility panel (hidden by default) -->
<div 
  id="accessibility-panel" 
  class="accessibility-panel" 
  role="dialog" 
  aria-labelledby="accessibility-panel-title"
  aria-hidden="true">
  
  <div class="accessibility-panel__header">
    <h2 id="accessibility-panel-title">Accessibility Options</h2>
    <button 
      class="accessibility-panel__close"
      aria-label="Close accessibility options">
      ×
    </button>
  </div>
  
  <div class="accessibility-panel__content">
    <!-- Site Assists Section -->
    <fieldset class="accessibility-section">
      <legend>Site Assists</legend>
      
      <label class="accessibility-toggle">
        <input 
          type="checkbox" 
          id="keyboard-helpers"
          data-setting="keyboardHelpers">
        <span>Keyboard Helpers</span>
        <small>Enhanced focus indicators and arrow-key navigation</small>
      </label>
      
      <label class="accessibility-toggle">
        <input 
          type="checkbox" 
          id="screen-reader-helpers"
          data-setting="screenReaderHelpers">
        <span>Screen-Reader Helpers</span>
        <small>Additional announcements and ARIA hints</small>
      </label>
    </fieldset>
    
    <!-- Plain Text Mode Section -->
    <fieldset class="accessibility-section">
      <legend>Reading Mode</legend>
      
      <button 
        id="plain-text-toggle"
        class="accessibility-button"
        data-setting="plainTextMode">
        Toggle Plain Text Mode
      </button>
      <small>Simplified layout with customizable reading options (Press T)</small>
    </fieldset>
    
    <!-- Feedback Section -->
    <div class="accessibility-section">
      <a href="mailto:accessibility@yoursite.com" class="accessibility-link">
        Request an Accessibility Feature
      </a>
    </div>
  </div>
</div>
```

#### Panel Styling
```css
.accessibility-trigger {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #0066cc;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.accessibility-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 2px solid #0066cc;
  border-radius: 8px;
  max-width: 400px;
  width: 90vw;
  z-index: 1001;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}

.accessibility-panel[aria-hidden="true"] {
  display: none;
}

.accessibility-toggle {
  display: block;
  margin: 1rem 0;
  cursor: pointer;
}

.accessibility-toggle small {
  display: block;
  color: #666;
  margin-top: 0.25rem;
}
```

### 3. User-Controlled Features Implementation

#### Keyboard Helpers System
```javascript
class KeyboardHelpers {
  constructor() {
    this.isEnabled = localStorage.getItem('keyboardHelpers') === 'true';
    this.init();
  }
  
  init() {
    if (this.isEnabled) {
      this.enable();
    }
  }
  
  enable() {
    document.body.classList.add('keyboard-helpers-enabled');
    this.addArrowKeyNavigation();
    this.enhanceFocusIndicators();
    localStorage.setItem('keyboardHelpers', 'true');
  }
  
  disable() {
    document.body.classList.remove('keyboard-helpers-enabled');
    this.removeArrowKeyNavigation();
    localStorage.setItem('keyboardHelpers', 'false');
  }
  
  enhanceFocusIndicators() {
    // Enhanced focus styles when enabled
  }
  
  addArrowKeyNavigation() {
    // Arrow key navigation for menus
    document.addEventListener('keydown', this.handleArrowKeys.bind(this));
  }
  
  handleArrowKeys(event) {
    // Arrow key navigation logic
  }
}
```

#### Screen Reader Helpers System
```javascript
class ScreenReaderHelpers {
  constructor() {
    this.isEnabled = localStorage.getItem('screenReaderHelpers') === 'true';
    this.liveRegion = null;
    this.init();
  }
  
  init() {
    this.createLiveRegion();
    if (this.isEnabled) {
      this.enable();
    }
  }
  
  createLiveRegion() {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.style.position = 'absolute';
    this.liveRegion.style.left = '-10000px';
    this.liveRegion.style.width = '1px';
    this.liveRegion.style.height = '1px';
    this.liveRegion.style.overflow = 'hidden';
    document.body.appendChild(this.liveRegion);
  }
  
  enable() {
    document.body.classList.add('screen-reader-helpers-enabled');
    localStorage.setItem('screenReaderHelpers', 'true');
  }
  
  disable() {
    document.body.classList.remove('screen-reader-helpers-enabled');
    localStorage.setItem('screenReaderHelpers', 'false');
  }
  
  announce(message) {
    if (this.isEnabled && this.liveRegion) {
      this.liveRegion.textContent = message;
    }
  }
}
```

### 4. Plain Text Mode Implementation

#### Plain Text Mode Structure
```javascript
class PlainTextMode {
  constructor() {
    this.isEnabled = localStorage.getItem('plainTextMode') === 'true';
    this.settings = {
      fontSize: localStorage.getItem('plainText-fontSize') || '100',
      lineSpacing: localStorage.getItem('plainText-lineSpacing') || '160',
      font: localStorage.getItem('plainText-font') || 'default',
      background: localStorage.getItem('plainText-background') || 'white'
    };
    this.init();
  }
  
  init() {
    this.addKeyboardShortcut();
    if (this.isEnabled) {
      this.enable();
    }
  }
  
  addKeyboardShortcut() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 't' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        // Only trigger if not in an input field
        if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
          event.preventDefault();
          this.toggle();
        }
      }
    });
  }
  
  enable() {
    document.body.classList.add('plain-text-mode');
    this.createPlainTextControls();
    this.applySettings();
    localStorage.setItem('plainTextMode', 'true');
  }
  
  disable() {
    document.body.classList.remove('plain-text-mode');
    this.removePlainTextControls();
    localStorage.setItem('plainTextMode', 'false');
  }
  
  toggle() {
    if (this.isEnabled) {
      this.disable();
      this.isEnabled = false;
    } else {
      this.enable();
      this.isEnabled = true;
    }
  }
  
  createPlainTextControls() {
    // Create plain text customization panel
    const controls = document.createElement('div');
    controls.className = 'plain-text-controls';
    controls.innerHTML = `
      <div class="plain-text-controls__header">
        <h3>Reading Options</h3>
        <button class="plain-text-exit">Exit Plain Text Mode</button>
      </div>
      <div class="plain-text-controls__options">
        <label>
          Font Size: <span id="font-size-display">${this.settings.fontSize}%</span>
          <input type="range" min="75" max="200" value="${this.settings.fontSize}" 
                 data-setting="fontSize" step="25">
        </label>
        
        <label>
          Line Spacing: <span id="line-spacing-display">${this.settings.lineSpacing}%</span>
          <input type="range" min="120" max="300" value="${this.settings.lineSpacing}" 
                 data-setting="lineSpacing" step="20">
        </label>
        
        <label>
          Font:
          <select data-setting="font">
            <option value="default">Default</option>
            <option value="atkinson">Atkinson Hyperlegible</option>
            <option value="opendyslexic">OpenDyslexic</option>
          </select>
        </label>
        
        <fieldset>
          <legend>Background Color</legend>
          <label><input type="radio" name="background" value="white"> White</label>
          <label><input type="radio" name="background" value="cream"> Cream</label>
          <label><input type="radio" name="background" value="blue"> Blue</label>
          <label><input type="radio" name="background" value="pink"> Pink</label>
        </fieldset>
      </div>
    `;
    
    document.body.appendChild(controls);
    this.bindControlEvents(controls);
  }
}
```

#### Plain Text Mode CSS
```css
/* Plain Text Mode Styles */
.plain-text-mode {
  /* Hide decorative content */
}

.plain-text-mode img:not([alt]),
.plain-text-mode svg:not([role="img"]),
.plain-text-mode video,
.plain-text-mode iframe,
.plain-text-mode canvas,
.plain-text-mode .decorative {
  display: none !important;
}

.plain-text-mode * {
  max-width: none !important;
  float: none !important;
  text-align: left !important;
}

.plain-text-mode main {
  max-width: 65ch;
  margin: 0 auto;
  padding: 2rem;
}

/* Convert buttons to text links */
.plain-text-mode button {
  background: none !important;
  border: none !important;
  color: #0066cc !important;
  text-decoration: underline !important;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
}

/* Background color options */
.plain-text-mode.bg-white { background: #ffffff; color: #000000; }
.plain-text-mode.bg-cream { background: #f5f5dc; color: #000000; }
.plain-text-mode.bg-blue { background: #e6f3ff; color: #000033; }
.plain-text-mode.bg-pink { background: #ffe6f0; color: #330022; }

/* Font options */
.plain-text-mode.font-atkinson { font-family: 'Atkinson Hyperlegible', sans-serif; }
.plain-text-mode.font-opendyslexic { font-family: 'OpenDyslexic', sans-serif; }
```

### 5. Accessibility Panel JavaScript Integration

#### Main Accessibility Controller
```javascript
class AccessibilityController {
  constructor() {
    this.keyboardHelpers = new KeyboardHelpers();
    this.screenReaderHelpers = new ScreenReaderHelpers();
    this.plainTextMode = new PlainTextMode();
    this.panel = null;
    this.init();
  }
  
  init() {
    this.createPanel();
    this.bindEvents();
    this.syncPanelWithSettings();
  }
  
  bindEvents() {
    // Panel toggle
    document.getElementById('accessibility-trigger').addEventListener('click', () => {
      this.togglePanel();
    });
    
    // Setting toggles
    document.querySelectorAll('[data-setting]').forEach(control => {
      control.addEventListener('change', (event) => {
        this.handleSettingChange(event.target);
      });
    });
    
    // Escape key to close panel
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isPanelOpen()) {
        this.closePanel();
      }
    });
  }
  
  handleSettingChange(control) {
    const setting = control.dataset.setting;
    
    switch (setting) {
      case 'keyboardHelpers':
        if (control.checked) {
          this.keyboardHelpers.enable();
        } else {
          this.keyboardHelpers.disable();
        }
        break;
        
      case 'screenReaderHelpers':
        if (control.checked) {
          this.screenReaderHelpers.enable();
        } else {
          this.screenReaderHelpers.disable();
        }
        break;
        
      case 'plainTextMode':
        this.plainTextMode.toggle();
        break;
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityController();
});
```

### 6. File Structure

```
/src/accessibility/
├── accessibility-controller.js    // Main controller
├── keyboard-helpers.js           // Keyboard enhancement class
├── screen-reader-helpers.js      // Screen reader aids class
├── plain-text-mode.js           // Plain text mode class
├── accessibility-panel.js        // Panel UI logic
├── accessibility.css             // All accessibility styles
└── accessibility-panel.html      // Panel template

/src/components/
├── SkipLink.astro               // Skip link component
├── AccessibilityTrigger.astro   // Panel trigger component
└── AccessibilityPanel.astro     // Panel component

/src/layouts/
└── Layout.astro                 // Include accessibility components
```

### 7. Astro Integration

#### Layout.astro Integration
```astro
---
// src/layouts/Layout.astro
import SkipLink from '../components/SkipLink.astro';
import AccessibilityTrigger from '../components/AccessibilityTrigger.astro';
import AccessibilityPanel from '../components/AccessibilityPanel.astro';
---

<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{title}</title>
  <link rel="stylesheet" href="/css/accessibility.css" />
</head>
<body>
  <SkipLink />
  
  <header role="banner">
    <!-- Header content -->
  </header>
  
  <main role="main" id="main-content">
    <slot />
  </main>
  
  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
  
  <AccessibilityTrigger />
  <AccessibilityPanel />
  
  <script src="/js/accessibility-controller.js"></script>
</body>
</html>
```

### 8. Testing Requirements

#### Manual Testing Checklist
- [ ] Skip link appears and functions on first Tab press
- [ ] All interactive elements accessible via keyboard
- [ ] Panel opens and closes properly
- [ ] Plain text mode hides decorative content
- [ ] Settings persist across page reloads
- [ ] Keyboard shortcut (T) works for plain text mode
- [ ] ARIA announcements work when screen reader helpers enabled
- [ ] Color contrast meets WCAG AA standards
- [ ] Responsive design works at all zoom levels up to 200%

#### Screen Reader Testing
- Test with NVDA (Windows)
- Test with VoiceOver (macOS)
- Test with TalkBack (Android)
- Verify live regions announce properly
- Check landmark navigation works

#### Automated Testing
```javascript
// Add to your test suite
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('accessibility compliance', async ({ page }) => {
  await page.goto('/');
  
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

---

## Implementation Priority

### Phase 1: Foundation (Week 1)
1. Semantic HTML landmarks on all pages
2. Skip link implementation
3. Basic WCAG contrast compliance
4. Accessibility panel structure

### Phase 2: Interactive Features (Week 2)
1. Panel functionality
2. Keyboard helpers system
3. Screen reader helpers system
4. Settings persistence

### Phase 3: Plain Text Mode (Week 3)
1. Plain text mode core functionality
2. Customization controls
3. Keyboard shortcut
4. Settings persistence

### Phase 4: Polish & Testing (Week 4)
1. Cross-browser testing
2. Screen reader testing
3. Performance optimization
4. Documentation completion

---

This implementation provides a respectful, user-controlled accessibility system that enhances the site without being intrusive or overriding user preferences.
