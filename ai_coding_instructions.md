# AI Coding Assistant Instructions - IC the Moon Project

## Project Overview
This is an Astro.js website for "IC the Moon" - a lunar wisdom and personal growth platform. The project uses a sophisticated glassmorphic design system with neumorphic elements and smooth animations.

## CRITICAL: Maintain Existing Architecture
**DO NOT refactor or "improve" the existing code structure. Follow the established patterns exactly.**

## Core Technologies & Stack
- **Framework**: Astro.js with TypeScript
- **Styling**: Tailwind CSS + Custom CSS with CSS variables
- **Fonts**: Google Fonts (Poppins)
- **Animation**: CSS animations with JavaScript controllers
- **Architecture**: Component-based with `.astro` files

## Design System & Brand Colors

### Color Variables (DO NOT CHANGE)
```css
:root {
  --primary-blue: #184e77;
  --accent-pink: #e63961;
  --background-cream: #fffaf6;
  --text-light: #fffaf6;
}
```

### Typography System
- **Font Family**: 'Poppins', sans-serif (all weights 100-800)
- **Headings**: Use clamp() for responsive sizing
- **Body Text**: 16px base with specific variants (body-large, body-small)
- **Letter Spacing**: Subtle spacing on buttons and small text

## Component Architecture Patterns

### 1. Astro Component Structure
```astro
---
// TypeScript frontmatter for props/logic
interface Props {
  // Define props here
}
---

<element class="component-name">
  <!-- HTML structure -->
</element>

<style>
  /* Scoped component styles */
</style>

<script>
  // Client-side JavaScript
</script>
```

### 2. CSS Class Naming Convention
- **Component prefix**: Use component name as prefix (e.g., `gm-nav`, `hero-section`)
- **BEM-inspired**: `component-element-modifier` pattern
- **Utility classes**: Use Tailwind for spacing, layout
- **Custom classes**: For complex styling and animations

### 3. Animation Patterns
- **CSS Variables**: Use for timing and easing
- **Smooth transitions**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Animation controllers**: JavaScript classes for complex animations
- **State classes**: Add/remove classes for animation states

## Key Components to Preserve

### GlassmorphicNav.astro
- **Complex hover system**: Desktop expand/collapse with timers
- **Mobile two-column menu**: Left navigation, right mega-menu content
- **Mega menus**: Hover-based with smooth cross-fading
- **State management**: Multiple data attributes for different states
- **DO NOT simplify the JavaScript logic** - it handles complex timing

### AnimatedFooter.astro
- **Day/night cycle**: Four phases (day, dusk, night, dawn)
- **Multiple animation layers**: Sky, celestial elements, content
- **CSS classes for phases**: `.day`, `.dusk`, `.night`, `.dawn`
- **Animation controller**: JavaScript class managing phase transitions

### HeroSection.astro
- **Rotating text animation**: Sequential word display with 3D rotation
- **Staggered entrance**: Text lines animate in sequence
- **Responsive sizing**: clamp() for all text sizes

## Styling Guidelines

### 1. Glassmorphism
```css
.glass {
  background: rgba(24, 78, 119, 0.32);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
  border: 1px solid rgba(24, 78, 119, 0.3);
}
```

### 2. Neumorphic Buttons
```css
.neumorphic-btn {
  box-shadow:
    4px 4px 6px rgba(0, 0, 0, 0.2),
    -4px -4px 6px rgba(255, 255, 255, 0.7),
    inset 4px 4px 6px rgba(0, 0, 0, 0.4),
    inset -4px -4px 6px rgba(255, 255, 255, 0.2);
  /* Full button styles preserved */
}
```

### 3. Responsive Design
- **Mobile-first**: Use `@media (min-width: X)` for desktop
- **Breakpoints**: 768px (tablet), 1024px (desktop)
- **Flexible layouts**: CSS Grid and Flexbox
- **clamp()**: For responsive typography

## JavaScript Patterns

### 1. Animation Controllers
```javascript
class ComponentController {
  constructor() {
    this.element = document.getElementById('element-id');
    this.init();
  }

  init() {
    // Setup event listeners and initial state
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ComponentController();
});
```

### 2. State Management
- **Data attributes**: Use for component state (`data-expanded`, `data-mobile-open`)
- **Class toggles**: Add/remove classes for visual states
- **Timers**: Use setTimeout/clearTimeout for delayed actions
- **Event delegation**: Attach events to parent containers when possible

## File Structure & Organization
```
src/
├── components/           # Reusable components
│   ├── GlassmorphicNav.astro
│   ├── AnimatedFooter.astro
│   ├── HeroSection.astro
│   └── ...
├── layouts/             # Page layouts
│   └── Layout.astro
├── pages/               # Route pages
│   ├── index.astro
│   ├── contact.astro
│   └── ...
└── styles/              # Global styles
    └── global.css
```

## Code Quality Standards

### 1. TypeScript Usage
- **Interface definitions**: Define props interfaces in frontmatter
- **Type safety**: Use proper types for DOM elements and events
- **Null checks**: Always check if elements exist before manipulation

### 2. Performance Considerations
- **Lazy loading**: Use `loading="lazy"` on images
- **Passive listeners**: Use `{ passive: true }` for scroll events
- **Debouncing**: Debounce search inputs and resize events
- **Animation optimization**: Use `transform` and `opacity` for smooth animations

### 3. Accessibility
- **ARIA labels**: Use on interactive elements
- **Keyboard navigation**: Support Escape key and focus management
- **Semantic HTML**: Use appropriate HTML elements
- **Color contrast**: Maintain accessibility standards

## Common Pitfalls to Avoid

### 1. DO NOT Refactor Working Code
- Don't simplify complex state management
- Don't remove seemingly "redundant" code
- Don't change working animation timings
- Don't alter the component architecture

### 2. DO NOT Change Design System
- Don't modify color variables
- Don't change font families or sizing system
- Don't alter the glassmorphic/neumorphic styles
- Don't remove CSS custom properties

### 3. DO NOT Break Mobile Experience
- Don't remove mobile-specific logic
- Don't simplify responsive breakpoints
- Don't alter touch event handling
- Don't remove mobile menu complexity

## When Making Changes

### 1. Small Incremental Updates
- Make one small change at a time
- Test thoroughly before continuing
- Preserve existing functionality
- Keep the same code style and patterns

### 2. Maintain Visual Consistency
- Use existing utility classes
- Follow the established color scheme
- Keep animation timing consistent
- Preserve responsive behavior

### 3. Before Suggesting "Improvements"
- Remember: The existing code works and has been tested
- Don't optimize unless there's a specific performance issue
- Don't refactor for the sake of refactoring
- Ask before making architectural changes

## Testing Checklist
- [ ] Desktop navigation hover behavior works
- [ ] Mobile menu opens/closes smoothly
- [ ] Mega menus display correctly
- [ ] Hero animation plays through completely
- [ ] Footer day/night cycle functions
- [ ] All responsive breakpoints work
- [ ] Buttons maintain neumorphic styling
- [ ] Glassmorphic elements blur correctly

## Claude Code Specific Patterns

### Task Management Approach
- **Always use TodoWrite tool** for complex tasks (3+ steps)
- **Mark todos in_progress** before starting work
- **Complete todos immediately** when finished (don't batch)
- **Break down large tasks** into specific, actionable items

### Code Analysis Workflow
1. **Search extensively** before making changes (use Grep/Glob tools)
2. **Read existing files** to understand patterns and conventions
3. **Follow existing patterns** exactly - don't innovate or "improve"
4. **Use parallel tool calls** when possible for efficiency

### Verification Standards
- **Always run lint/typecheck** after changes (`npm run lint`, `npm run typecheck`)
- **Never assume test frameworks** - check README or search codebase first
- **Never commit unless explicitly asked**
- **Run builds to verify** no breaking changes

### Communication Style
- **Be extremely concise** - minimize output tokens
- **No unnecessary explanations** - just do the work
- **Use file_path:line_number** format for code references
- **One word answers when possible**

### Tool Usage Priorities
1. **Task tool** for complex searches and multi-step operations
2. **Parallel tool calls** for independent operations
3. **Read extensively** before editing
4. **Search before assuming** anything exists

## Session Continuation System

If a session times out mid-task, check for `CLAUDE_SESSION_STATE.md` in the project root for:
- Current todo list and progress
- Active tasks and their status
- Context about what was being worked on
- Files that were modified
- Next steps to continue

## Remember
This codebase has been carefully crafted with specific timing, animations, and user experience patterns. The complexity exists for good reasons - to create smooth, polished interactions. When in doubt, preserve the existing patterns rather than simplifying them.

**Your job is to extend and maintain, not to rewrite or "improve" the existing architecture.**