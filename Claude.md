# Claude Code Prompt: Accessibility Panel & Dark Mode Enhancement

## Objective
Improve the existing accessibility panel and implement a comprehensive dark mode system that follows WCAG 2.1 AA guidelines and modern web accessibility best practices.

## Current Issues to Address
1. Dark mode implementation looks terrible and lacks proper styling
2. Accessibility panel needs better visual design and UX
3. Missing proper color contrast ratios for dark mode
4. Need better keyboard navigation and focus management
5. Screen reader support could be enhanced
6. Missing proper ARIA labels and semantic markup

## Requirements

### 🌙 Dark Mode Implementation
- **System Integration**: Respect `prefers-color-scheme: dark` media query
- **Manual Override**: Provide toggle button with persistent localStorage settings
- **Color Palette**: Create a cohesive dark theme with proper contrast ratios (4.5:1 minimum)
- **Component Coverage**: Ensure ALL UI elements adapt to dark mode
- **Smooth Transitions**: Implement elegant theme switching animations
- **High Contrast Support**: Support `prefers-contrast: high` for enhanced accessibility

### ♿ Accessibility Panel Enhancements
- **Modern Design**: Clean, intuitive interface that feels integrated with the site
- **Comprehensive Features**:
  - Keyboard navigation helpers
  - Screen reader enhancements
  - Font size/family controls
  - Line spacing adjustments
  - Background color options
  - Plain text reading mode
  - Dark mode toggle
- **Keyboard Navigation**: Full keyboard accessibility with proper focus management
- **ARIA Support**: Complete ARIA labeling and live regions for screen readers
- **Mobile Responsive**: Works perfectly on all screen sizes

### 🎨 Design Requirements
- **Visual Hierarchy**: Clear sections with proper headings and groupings
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Highly visible focus states for keyboard navigation
- **Loading States**: Smooth animations and transitions
- **Error Handling**: User-friendly error messages and fallbacks

### 🔧 Technical Specifications
- **Framework**: Astro components with vanilla JavaScript
- **CSS Approach**: CSS custom properties for theme switching
- **Performance**: Minimal bundle size impact (<20KB total)
- **Browser Support**: Modern browsers (Chrome 88+, Firefox 85+, Safari 14+)
- **Progressive Enhancement**: Core functionality works without JavaScript

## File Structure to Work With
```
src/components/Accessability/
├── AccessabilityPanel.astro
├── SkipLink.astro
├── accessabilityPanel.css
└── accessibilityPanel.js
```

## Specific Tasks

### 1. Fix Dark Mode CSS
- Review the current CSS in `accessabilityPanel.css`
- Create a comprehensive dark theme that covers:
  - Background colors
  - Text colors
  - Border colors
  - Shadow effects
  - Form controls
  - Interactive elements
- Ensure proper contrast ratios throughout
- Add smooth transitions between themes

### 2. Enhance Accessibility Panel
- Improve the visual design to be more modern and intuitive
- Add better spacing, typography, and visual hierarchy
- Implement proper focus management for keyboard users
- Add comprehensive ARIA labels and descriptions
- Create smooth animations for panel opening/closing

### 3. JavaScript Improvements
- Enhance the `accessibilityPanel.js` with:
  - Better error handling
  - Improved state management
  - Keyboard event handling
  - Screen reader announcements
  - Performance optimizations

### 4. Add Missing Features
- Implement a floating dark mode toggle button
- Add keyboard shortcuts (T for text mode, D for dark mode)
- Create a settings persistence system
- Add user preference detection and auto-configuration

### 5. Testing & Validation
- Ensure WCAG 2.1 AA compliance
- Test with screen readers (simulate announcements)
- Verify keyboard navigation works perfectly
- Check color contrast ratios
- Test on mobile devices

## Code Quality Standards
- **Clean Code**: Well-commented, maintainable code
- **Performance**: Efficient DOM manipulation and CSS
- **Accessibility**: Follow WAI-ARIA best practices
- **Modern CSS**: Use CSS Grid, Flexbox, and custom properties
- **Error Handling**: Graceful degradation and error recovery

## Expected Deliverables
1. **Updated CSS**: Comprehensive dark mode implementation
2. **Enhanced JavaScript**: Improved functionality and accessibility
3. **Refined Astro Components**: Better markup and structure
4. **Documentation**: Comments explaining accessibility features
5. **Testing Notes**: Brief summary of accessibility compliance

## Success Criteria
- ✅ Dark mode looks professional and maintains readability
- ✅ All interactive elements are keyboard accessible
- ✅ Screen reader users can navigate and use all features
- ✅ Color contrast meets WCAG AA standards
- ✅ Panel is responsive and works on all device sizes
- ✅ Settings persist across browser sessions
- ✅ Smooth animations and professional appearance

## Additional Context
This is for a production website that needs to be fully accessible to users with disabilities. The current implementation has basic functionality but needs significant improvement in visual design and accessibility compliance. Focus on creating an inclusive experience that enhances usability for everyone while providing essential accessibility features for users who need them.

Please review the existing code, identify issues, and implement comprehensive improvements that make this a best-in-class accessibility implementation.
