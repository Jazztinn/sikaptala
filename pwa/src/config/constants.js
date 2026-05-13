/**
 * Application Constants
 * Global constants used throughout the app
 */

export const APP_NAME = 'Sikaptala';
export const APP_VERSION = '1.0.0';
export const APP_ENVIRONMENT = process.env.NODE_ENV || 'development';

// API Configuration
export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 10000;

// Storage Keys
export const STORAGE_KEYS = {
  USER: 'sikaptala:user',
  THEME: 'sikaptala:theme',
  PREFERENCES: 'sikaptala:preferences',
  CACHE: 'sikaptala:cache'
};

// Theme Configuration
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

export const DEFAULT_THEME = 'system';

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 576,
  TABLET: 768,
  DESKTOP: 992,
  LARGE: 1200,
  XLARGE: 1400
};

// Toast Notification Duration
export const TOAST_DURATION = 3000;

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  NOT_FOUND: '/404'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  SERVER: 'Server error. Please try again later.',
  NOT_FOUND: 'Page not found.',
  UNAUTHORIZED: 'Unauthorized. Please log in.',
  FORBIDDEN: 'You do not have permission to access this resource.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully!',
  DELETED: 'Item deleted successfully!',
  CREATED: 'Item created successfully!',
  UPDATED: 'Item updated successfully!'
};

// Features
export const FEATURES = {
  PWA: true,
  SERVICE_WORKER: true,
  PUSH_NOTIFICATIONS: true,
  OFFLINE_MODE: true,
  DARK_MODE: true
};
