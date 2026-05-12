function normalizeRedirectUrl(url: string | undefined | null) {
  if (typeof url !== "string") {
    return "";
  }

  return url.trim().replace(/\/$/, "");
}

export function getAuthRedirectUrl() {
  const configured = normalizeRedirectUrl(
    process.env.NEXT_PUBLIC_APP_URL ||
      (typeof window !== "undefined" ? window.location.origin : "")
  );

  if (!configured) {
    return "";
  }

  return `${configured}/auth/callback?next=/app`;
}
