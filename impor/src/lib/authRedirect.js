function normalizeRedirectUrl(url) {
  if (typeof url !== 'string') return '';
  return url.trim().replace(/\/$/, '');
}

export function getAuthRedirectUrl() {
  const configured = normalizeRedirectUrl(import.meta.env.VITE_AUTH_REDIRECT_URL);
  if (configured) {
    return configured;
  }

  if (typeof window === 'undefined') {
    return '';
  }

  const basePath = normalizeRedirectUrl(import.meta.env.BASE_URL || '/');
  return normalizeRedirectUrl(`${window.location.origin}${basePath}`);
}
