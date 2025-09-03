// Navbar Transition Manager
// Handles smooth transitions via CSS classes

export class TransitionManager {
  constructor(navElement) {
    this.nav = navElement;
    this.currentTransition = null;
    this.transitionClasses = ['transition-scroll', 'transition-smooth', 'transition-hover'];
  }
  
  // Remove all transition classes
  clearTransitions() {
    if (!this.nav) return;
    this.nav.classList.remove(...this.transitionClasses);
  }
  
  // Apply specific transition type via CSS class
  setTransition(type) {
    if (!this.nav) return;
    
    // Clear existing transition classes
    this.clearTransitions();
    
    // Add the new transition class
    const className = `transition-${type}`;
    if (this.transitionClasses.includes(className)) {
      this.nav.classList.add(className);
      this.currentTransition = type;
      
      // Debug logging
      console.log(`🔄 Applied CSS class: ${className} for ${type} transition`);
      
      // Auto-clear transition class after transition duration to prevent interference
      const duration = type === 'smooth' ? 1000 : type === 'hover' ? 500 : 300;
      setTimeout(() => {
        this.clearTransitions();
        console.log(`🔄 Auto-cleared transition class: ${className}`);
      }, duration + 100); // Add 100ms buffer
    }
  }
  
  // Get current transition type
  getCurrentTransition() {
    return this.currentTransition;
  }
  
  // Convenience methods
  useScrollTransition() { this.setTransition('scroll'); }
  useSmoothTransition() { this.setTransition('smooth'); }
  useHoverTransition() { this.setTransition('hover'); }
  
  // Clear all transitions
  clearAllTransitions() { 
    this.clearTransitions(); 
    this.currentTransition = null;
    console.log('🔄 All transition classes cleared');
  }
}