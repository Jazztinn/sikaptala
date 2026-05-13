/**
 * API Utilities
 * Handles API requests with error handling and offline support
 */

import { localStorage_ } from './storage.js';

const API_TIMEOUT = 10000; // 10 seconds

/**
 * Generic fetch wrapper with error handling
 */
export async function apiCall(url, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body = null,
    timeout = API_TIMEOUT,
    cache = false,
    cacheKey = url
  } = options;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (body) {
    config.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  // Check cache first
  if (cache && method === 'GET') {
    const cachedData = localStorage_.get(cacheKey);
    if (cachedData) {
      return { success: true, data: cachedData, cached: true };
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Cache successful GET requests
    if (cache && method === 'GET') {
      localStorage_.set(cacheKey, data);
    }

    return { success: true, data, status: response.status };
  } catch (error) {
    console.error('API Error:', error);

    // Try to return cached data on error
    if (cache) {
      const cachedData = localStorage_.get(cacheKey);
      if (cachedData) {
        return { success: true, data: cachedData, cached: true, error: error.message };
      }
    }

    return {
      success: false,
      error: error.message,
      data: null
    };
  }
}

/**
 * GET request
 */
export async function apiGet(url, options = {}) {
  return apiCall(url, { ...options, method: 'GET' });
}

/**
 * POST request
 */
export async function apiPost(url, body, options = {}) {
  return apiCall(url, { ...options, method: 'POST', body });
}

/**
 * PUT request
 */
export async function apiPut(url, body, options = {}) {
  return apiCall(url, { ...options, method: 'PUT', body });
}

/**
 * PATCH request
 */
export async function apiPatch(url, body, options = {}) {
  return apiCall(url, { ...options, method: 'PATCH', body });
}

/**
 * DELETE request
 */
export async function apiDelete(url, options = {}) {
  return apiCall(url, { ...options, method: 'DELETE' });
}

/**
 * Check if API is online
 */
export async function isApiOnline(testUrl = '/') {
  try {
    const response = await fetch(testUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Batch API requests
 */
export async function apiBatch(requests) {
  return Promise.allSettled(requests);
}

/**
 * Retry API call with exponential backoff
 */
export async function apiRetry(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
}
