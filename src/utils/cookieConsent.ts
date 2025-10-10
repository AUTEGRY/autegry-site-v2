/**
 * Cookie consent utility functions
 *
 * This system remembers user cookie consent choices using localStorage.
 * Once a choice is made, the cookie banner will not appear again.
 *
 * Usage:
 * - 'accepted': User accepted all cookies
 * - 'necessary': User accepted only necessary cookies
 * - null: No choice made yet
 *
 * To reset for testing: localStorage.removeItem('autegry_cookie_consent')
 */

export type CookieConsentStatus = 'accepted' | 'necessary' | null;

const COOKIE_CONSENT_KEY = 'autegry_cookie_consent';

/**
 * Get the current cookie consent status from localStorage
 */
export const getCookieConsent = (): CookieConsentStatus => {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    return stored as CookieConsentStatus;
  } catch (error) {
    console.warn('Failed to read cookie consent from localStorage:', error);
    return null;
  }
};

/**
 * Set the cookie consent status in localStorage
 */
export const setCookieConsent = (status: CookieConsentStatus): void => {
  try {
    if (status === null) {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
    } else {
      localStorage.setItem(COOKIE_CONSENT_KEY, status);
    }
  } catch (error) {
    console.warn('Failed to save cookie consent to localStorage:', error);
  }
};

/**
 * Check if the user has already made a cookie consent choice
 */
export const hasGivenCookieConsent = (): boolean => {
  const consent = getCookieConsent();
  return consent === 'accepted' || consent === 'necessary';
};

/**
 * Check if user has accepted all cookies
 */
export const hasAcceptedAllCookies = (): boolean => {
  return getCookieConsent() === 'accepted';
};

/**
 * Check if user has accepted only necessary cookies
 */
export const hasAcceptedOnlyNecessary = (): boolean => {
  return getCookieConsent() === 'necessary';
};

/**
 * Clear the cookie consent choice (useful for testing or user wanting to change their mind)
 */
export const clearCookieConsent = (): void => {
  setCookieConsent(null);
};