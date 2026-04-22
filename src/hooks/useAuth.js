import { useRef, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * useAuth – manages the access token purely in memory (useRef).
 *
 * The token is intentionally stored in a ref (not state) so that it
 * never triggers unnecessary re-renders and is never persisted to
 * localStorage / sessionStorage.
 *
 * The refresh token is stored server-side in an HTTP-only cookie and
 * is sent automatically by the browser on every request to /auth/refresh.
 */
const useAuth = () => {
  /** @type {React.MutableRefObject<string|null>} */
  const accessTokenRef = useRef(null);

  /**
   * Reads the current in-memory token.
   * @returns {string|null}
   */
  const getToken = useCallback(() => accessTokenRef.current, []);

  /**
   * POST /auth/login
   * Stores the returned accessToken in memory.
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
      // Attempt to read an error message from the response body.
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
    accessTokenRef.current = accessToken;
  }, []);

  /**
   * POST /auth/refresh
   * Exchanges the HTTP-only refresh-token cookie for a new accessToken
   * and stores it in memory.
   *
   * @returns {Promise<void>}
   * @throws {Error} when the session has expired and re-login is required
   */
  const refreshToken = useCallback(async () => {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // sends the HTTP-only cookie automatically
    });

    if (!response.ok) {
      accessTokenRef.current = null;
      throw new Error('Session expired. Please log in again.');
    }

    const { accessToken } = await response.json();
    accessTokenRef.current = accessToken;
  }, []);

  /**
   * Clears the in-memory token (e.g. on logout).
   */
  const clearToken = useCallback(() => {
    accessTokenRef.current = null;
  }, []);

  return { login, refreshToken, getToken, clearToken };
};

export default useAuth;
