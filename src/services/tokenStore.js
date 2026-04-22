/**
 * tokenStore – module-level singleton for the in-memory access token.
 *
 * Storing the token here (instead of React state or localStorage) means:
 *  - It survives across component re-mounts without triggering re-renders.
 *  - It is never persisted to disk / browser storage.
 *  - Both React hooks (useAuth) and plain modules (apiFetch) can read/write it.
 */

let _accessToken = null;

/** @returns {string|null} */
export const getToken = () => _accessToken;

/** @param {string|null} token */
export const setToken = (token) => { _accessToken = token; };

/** Clears the stored token (e.g. on logout or session expiry). */
export const clearToken = () => { _accessToken = null; };
