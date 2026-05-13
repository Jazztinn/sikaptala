/**
 * Main Application Entry Point
 */

import { initButtons } from './components/buttons/button.js';
import { initCards } from './components/cards/card.js';
import { initOfflineSupport } from './utilities/offline.js';
import { registerNetworkListeners } from './utilities/offline.js';
import { APP_NAME, APP_VERSION } from './config/constants.js';

/**
 * Initialize application
 */
async function initApp() {
  console.log(`${APP_NAME} v${APP_VERSION} initializing...`);

  // Initialize PWA features
  await initOfflineSupport();
  registerNetworkListeners();

  // Initialize components
  initButtons();
  initCards();

  // Listen for custom events
  setupEventListeners();

  // Setup theme
  setupTheme();

  console.log(`${APP_NAME} ready!`);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Listen for online/offline events
  window.addEventListener('app:online', () => {
    console.log('App is online');
  });

  window.addEventListener('app:offline', () => {
    console.log('App is offline');
  });

  // Listen for button clicks
  document.addEventListener('btn:click', (e) => {
    console.log('Button clicked:', e.detail);
  });
}

/**
 * Setup theme based on user preference
 */
function setupTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Listen for theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const theme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Handle app visibility
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('App hidden');
  } else {
    console.log('App visible');
  }
});

// Export for testing
export { initApp };
