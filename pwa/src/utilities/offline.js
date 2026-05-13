/**
 * Offline Utilities
 * Handles offline detection and offline-first strategies
 */

/**
 * Check if user is online
 */
export function isOnline() {
  return navigator.onLine;
}

/**
 * Register online/offline listeners
 */
export function registerNetworkListeners() {
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
}

/**
 * Unregister online/offline listeners
 */
export function unregisterNetworkListeners() {
  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);
}

function handleOnline() {
  console.log('Application is online');
  document.body.classList.remove('offline');
  document.body.classList.add('online');

  // Dispatch custom event
  const event = new CustomEvent('app:online');
  window.dispatchEvent(event);

  // Sync queued requests
  syncQueuedRequests();
}

function handleOffline() {
  console.log('Application is offline');
  document.body.classList.remove('online');
  document.body.classList.add('offline');

  // Dispatch custom event
  const event = new CustomEvent('app:offline');
  window.dispatchEvent(event);
}

/**
 * Queue requests while offline
 */
const requestQueue = [];

export function queueRequest(request) {
  requestQueue.push({
    ...request,
    timestamp: Date.now()
  });
  console.log(`Request queued. Queue size: ${requestQueue.length}`);
}

export function getQueue() {
  return [...requestQueue];
}

export function clearQueue() {
  requestQueue.length = 0;
}

/**
 * Sync queued requests when back online
 */
async function syncQueuedRequests() {
  if (requestQueue.length === 0) return;

  console.log(`Syncing ${requestQueue.length} queued requests...`);

  const { apiCall } = await import('./api.js');

  for (const request of requestQueue) {
    try {
      await apiCall(request.url, {
        method: request.method,
        body: request.body,
        headers: request.headers
      });

      // Remove from queue after successful sync
      requestQueue.shift();
    } catch (error) {
      console.error('Failed to sync queued request:', error);
      break; // Stop if sync fails
    }
  }
}

/**
 * Service Worker registration
 */
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    console.log('Service Worker registered:', registration);

    // Check for updates periodically
    setInterval(() => {
      registration.update();
    }, 60000); // Check every minute

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
}

/**
 * Unregister Service Worker
 */
export async function unregisterServiceWorker() {
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
  }
}

/**
 * Initialize offline support
 */
export async function initOfflineSupport() {
  registerNetworkListeners();
  await registerServiceWorker();

  // Set initial state
  if (isOnline()) {
    document.body.classList.add('online');
  } else {
    document.body.classList.add('offline');
  }
}
