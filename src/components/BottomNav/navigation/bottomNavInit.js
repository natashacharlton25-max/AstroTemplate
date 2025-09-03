// Main Bottom Navigation Initializer
import { initSettingsNavigation } from './settingsNavigation.js';
import { initOverlayManager } from '../overlays/overlayManager.js';
import { initContactForm } from '../contact-form/contactForm.js';

export function initBottomNav() {
  // Initialize all bottom navigation functionality
  initSettingsNavigation();
  initOverlayManager();
  initContactForm();
}