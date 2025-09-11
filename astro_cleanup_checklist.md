# Astro Website Cleanup Checklist

## 🎨 CSS Organization & Brand Consistency

### 1. Consolidate CSS Variables
- [ ] **Audit all CSS files** for hardcoded colors and replace with brand variables
- [ ] **Create a master variables file** (`src/styles/variables.css`) with all brand colors, spacing, typography
- [ ] **Remove duplicate color definitions** across multiple files
- [ ] **Standardize variable naming** (some use `--brand-primary`, others use direct hex codes)

### 2. Files with Hardcoded Colors to Fix
- [ ] `src/components/Accessability/accessabilityPanel.css` - Multiple hardcoded colors (#184e77, #e63961, #fffaf6)
- [ ] `src/components/BottomNav/contact-form/Contact-Popup.css` - Hardcoded colors and gradients
- [ ] `src/components/BottomNav/contact-form/contactpopup.astro` - Inline styles with hardcoded colors
- [ ] `src/components/Footer/links/footerStyles.css` - Many hardcoded colors
- [ ] `src/components/Search/search-popup.css` - Hardcoded brand colors
- [ ] `src/pages/search-results.astro` - Inline styles with hardcoded colors

### 3. Create Unified Design System
- [ ] **Establish consistent spacing scale** (use CSS custom properties like `--space-xs`, `--space-sm`, etc.)
- [ ] **Standardize border radius values** (currently inconsistent: 24px, 28px, 16px, 12px)
- [ ] **Create consistent shadow system** (different components use different shadow values)
- [ ] **Unify typography scale** (font sizes are inconsistent across components)

## 📁 File Structure & Organization

### 4. Typo Fixes
- [ ] **Rename `src/components/Accessability/` to `src/components/Accessibility/`** (fix typo)
- [ ] **Update all imports** that reference the misspelled folder
- [ ] **Rename `accessabilityPanel.css` to `accessibilityPanel.css`**

### 5. CSS Architecture
- [ ] **Create a structured CSS organization:**
  ```
  src/styles/
  ├── base/
  │   ├── reset.css
  │   ├── typography.css
  │   └── variables.css
  ├── components/
  │   ├── buttons.css
  │   ├── forms.css
  │   └── navigation.css
  ├── utilities/
  │   ├── spacing.css
  │   ├── colors.css
  │   └── layout.css
  └── themes/
      ├── light.css
      └── dark.css
  ```

### 6. Component CSS Cleanup
- [ ] **Move inline styles to external CSS files** (especially in `contactpopup.astro`)
- [ ] **Consolidate duplicate styles** across components
- [ ] **Remove unused CSS rules** and dead code
- [ ] **Use CSS modules or scoped styles** for component-specific styles

## 🔧 Technical Debt & Code Quality

### 7. Accessibility Improvements
- [ ] **Fix accessibility panel functionality** - ensure all settings persist correctly
- [ ] **Test keyboard navigation** across all components
- [ ] **Verify ARIA labels** and screen reader compatibility
- [ ] **Check color contrast ratios** in both light and dark modes

### 8. Component Consistency
- [ ] **Standardize component props** - some components use different naming conventions
- [ ] **Create consistent loading states** across components
- [ ] **Unify error handling** patterns
- [ ] **Standardize popup/modal implementations** (contact, search, accessibility panels)

### 9. Performance Optimizations
- [ ] **Audit for unused CSS** and remove it
- [ ] **Optimize CSS loading** - critical CSS inline, non-critical CSS async
- [ ] **Review JavaScript loading** strategies
- [ ] **Compress and optimize images**

## 🎯 Brand System Implementation

### 10. Create Comprehensive Brand Variables
```css
:root {
  /* Colors */
  --color-primary: #e63961;
  --color-secondary: #184e77;
  --color-background: #fffaf6;
  --color-text-primary: #5c5b5b;
  --color-text-light: #ebdddd;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 3rem;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 20px 25px rgba(0, 0, 0, 0.15);
  
  /* Typography */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
}
```

### 11. Replace All Hardcoded Values
- [ ] **Search and replace** all instances of `#e63961` with `var(--color-primary)`
- [ ] **Search and replace** all instances of `#184e77` with `var(--color-secondary)`
- [ ] **Search and replace** all instances of `#fffaf6` with `var(--color-background)`
- [ ] **Replace hardcoded spacing** with spacing variables
- [ ] **Replace hardcoded font sizes** with typography scale

## 🔍 Specific File Priorities

### High Priority (Fix First)
1. [ ] **`accessibilityPanel.css`** - Largest file with most hardcoded values
2. [ ] **`contactpopup.astro`** - Has both inline styles and CSS, needs consolidation
3. [ ] **`footerStyles.css`** - Complex styles with many hardcoded colors
4. [ ] **`search-popup.css`** - Recent component that should follow new standards

### Medium Priority
5. [ ] **`bottomNavInit.js` and related files** - JavaScript organization
6. [ ] **Navigation components** - Standardize across TabNav and BottomNav
7. [ ] **Layout.astro`** - Clean up critical CSS injection

### Low Priority
8. [ ] **Footer scroll effects** - Polish animation consistency
9. [ ] **Hero component** - Minor brand alignment
10. [ ] **Search results page** - Style refinement

## 🧪 Testing Checklist

### 12. Cross-Component Testing
- [ ] **Test all popups/modals** (contact, search, accessibility) for consistency
- [ ] **Verify dark mode** works across all components
- [ ] **Test responsive design** on all major breakpoints
- [ ] **Check keyboard navigation** flow
- [ ] **Validate accessibility features** with screen readers

### 13. Brand Consistency Audit
- [ ] **Visual consistency check** - all components use same colors, fonts, spacing
- [ ] **Interactive states** - hover, focus, active states are consistent
- [ ] **Loading states** - spinners and loading indicators match brand
- [ ] **Error states** - error messages and states are branded consistently

## 📋 Implementation Strategy

### Phase 1: Foundation (Week 1)
- Set up new CSS architecture
- Create comprehensive variables file
- Fix folder naming typo

### Phase 2: Components (Week 2-3)
- Update accessibility panel
- Fix contact popup
- Standardize navigation components

### Phase 3: Polish (Week 4)
- Footer and search components
- Testing and refinement
- Performance optimization

### Phase 4: Documentation
- Create component documentation
- Style guide creation
- Maintenance guidelines

## 🚀 Quick Wins (Do These First)

1. [ ] **Rename the Accessability folder** to fix the typo
2. [ ] **Create a central variables.css file** with all brand colors
3. [ ] **Replace the top 10 most common hardcoded colors** with variables
4. [ ] **Consolidate duplicate CSS rules** in accessibility panel
5. [ ] **Move inline styles** from contactpopup.astro to external CSS

---

**Estimated Total Time:** 3-4 weeks of focused work
**Priority:** Start with CSS organization and brand variables for maximum impact