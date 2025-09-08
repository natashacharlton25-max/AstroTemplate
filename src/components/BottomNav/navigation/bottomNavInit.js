// Main Bottom Navigation Initializer
import { initSettingsNavigation } from './settingsNavigation.js';
import { initOverlayManager } from '../overlays/overlayManager.js';

export function initBottomNav() {
  // Initialize all bottom navigation functionality
  initSettingsNavigation();
  initOverlayManager();
  // Contact popup is now initialized via ContactPopup.js import
}