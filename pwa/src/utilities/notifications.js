/**
 * Notifications Utilities
 * Handles push notifications and in-app notifications
 */

/**
 * Request notification permission
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

/**
 * Send push notification
 */
export function sendNotification(title, options = {}) {
  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted');
    return;
  }

  const notification = new Notification(title, {
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-192x192.png',
    ...options
  });

  return notification;
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPushNotifications() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.VAPID_PUBLIC_KEY
    });

    console.log('Push notification subscription:', subscription);
    return subscription;
  } catch (error) {
    console.error('Push notification subscription failed:', error);
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPushNotifications() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      console.log('Unsubscribed from push notifications');
    }
  } catch (error) {
    console.error('Push notification unsubscription failed:', error);
  }
}

/**
 * Check if user is subscribed
 */
export async function isPushSubscribed() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return !!subscription;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
}

/**
 * Toast notification styles
 */
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  .toast {
    position: fixed;
    bottom: var(--spacing-lg);
    right: var(--spacing-lg);
    background-color: var(--color-gray-900);
    color: white;
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-tooltip);
    animation: slideIn 0.3s ease-in-out;
    max-width: 400px;
  }

  .toast.toast-success {
    background-color: var(--color-success);
  }

  .toast.toast-error {
    background-color: var(--color-error);
  }

  .toast.toast-warning {
    background-color: var(--color-warning);
  }

  .toast.toast-info {
    background-color: var(--color-info);
  }

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  .toast.toast-exit {
    animation: slideOut 0.3s ease-in-out forwards;
  }

  @media (max-width: 576px) {
    .toast {
      bottom: var(--spacing-md);
      right: var(--spacing-md);
      left: var(--spacing-md);
      max-width: none;
    }
  }
`;

document.head.appendChild(toastStyles);

/**
 * Show toast notification
 */
export function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, duration);

  return toast;
}

/**
 * Show success toast
 */
export function showSuccess(message, duration = 3000) {
  return showToast(message, 'success', duration);
}

/**
 * Show error toast
 */
export function showError(message, duration = 3000) {
  return showToast(message, 'error', duration);
}

/**
 * Show warning toast
 */
export function showWarning(message, duration = 3000) {
  return showToast(message, 'warning', duration);
}

/**
 * Show info toast
 */
export function showInfo(message, duration = 3000) {
  return showToast(message, 'info', duration);
}
