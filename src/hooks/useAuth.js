import { useCallback } from 'react';
import {
  getToken,
  setToken,
  clearToken as clearStoredToken,
} from '../services/tokenStore';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * useAuth – manages the access token purely in memory via tokenStore.
 *
 * The token lives in a module-level variable (tokenStore) so that:
 *  - It is never persisted to localStorage / sessionStorage.
 *  - apiFetch (a plain module) can read the same token without React.
 *  - Multiple component mounts always share the same token reference.
 */
const useAuth = () => {
  /**
   * POST /auth/login
   * Stores the returned accessToken in the shared tokenStore.
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<void>}
   * @throws {Error} with a user-friendly message on failure
   */
  const login = useCallback(async (username, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // credentials: 'include' ensures the HTTP-only refresh-token
      // cookie is sent/received for future /auth/refresh calls.
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      let message = 'Invalid credentials. Please try again.';
      try {
        const data = await response.json();
        if (data?.message) message = data.message;
      } catch {
        // ignore parse errors
      }
      throw new Error(message);
    }

    const { accessToken } = await response.json();
    setToken(accessToken); // store in shared module-level store
  }, []);

  /**
   * POST /auth/refresh
   * Exchanges the HTTP-only refresh-token cookie for a new accessToken.
   * Called automatically by apiFetch on 401; exposed here for manual use.
   *
   * @returns {Promise<void>}
   * @throws {Error} when the session has expired and re-login is required
   */
  const refreshToken = useCallback(async () => {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      clearStoredToken();
      throw new Error('Session expired. Please log in again.');
    }

    const { accessToken } = await response.json();
    setToken(accessToken);
  }, []);

  /**
   * Clears the in-memory token (e.g. on logout).
   */
  const clearToken = useCallback(() => {
    clearStoredToken();
  }, []);

  return { login, refreshToken, getToken, clearToken };
};

export default useAuth;
