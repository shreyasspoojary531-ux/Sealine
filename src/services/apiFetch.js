import { getToken, setToken, clearToken } from './tokenStore';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

/** Whether a token refresh is already in flight (prevents parallel refresh storms). */
let _refreshPromise = null;

/**
 * Silently refreshes the access token using the HTTP-only refresh-token cookie.
 * Multiple concurrent callers share a single in-flight request.
 *
 * @returns {Promise<string>} the new access token
 * @throws {Error} if the refresh fails (session expired)
 */
const silentRefresh = () => {
  if (_refreshPromise) return _refreshPromise;

  _refreshPromise = fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    credentials: 'include', // sends the HTTP-only refresh-token cookie
  })
    .then(async (res) => {
      if (!res.ok) {
        clearToken();
        throw new Error('Session expired. Please log in again.');
      }
      const { accessToken } = await res.json();
      setToken(accessToken);
      return accessToken;
    })
    .finally(() => {
      _refreshPromise = null;
    });

  return _refreshPromise;
};

/**
 * apiFetch – a drop-in replacement for `fetch` that:
 *  1. Automatically attaches `Authorization: Bearer <token>` to every request.
 *  2. On a 401 response, silently refreshes the access token and retries once.
 *  3. Throws on any non-OK response after the retry.
 *
 * Usage (identical to fetch):
 *   const data = await apiFetch('/api/shipments').then(r => r.json());
 *   const res  = await apiFetch('/api/orders', { method: 'POST', body: JSON.stringify(payload) });
 *
 * @param {string} url        – path relative to API_BASE, or an absolute URL
 * @param {RequestInit} [options] – standard fetch options
 * @returns {Promise<Response>}
 */
const apiFetch = async (url, options = {}) => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;

  /**
   * Build headers, injecting the current Bearer token.
   * Merges with any headers the caller already passed.
   */
  const buildHeaders = (token) => ({
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });

  // ── First attempt ──────────────────────────────────────────────────────────
  let response = await fetch(fullUrl, {
    credentials: 'include', // keeps the refresh-token cookie alive
    ...options,
    headers: buildHeaders(getToken()),
  });

  // ── 401 → silent refresh → retry once ─────────────────────────────────────
  if (response.status === 401) {
    try {
      const newToken = await silentRefresh();
      response = await fetch(fullUrl, {
        credentials: 'include',
        ...options,
        headers: buildHeaders(newToken),
      });
    } catch {
      // Refresh failed – bubble up as a typed error so callers can redirect.
      throw new Error('Session expired. Please log in again.');
    }
  }

  return response;
};

export default apiFetch;
