/**
 * Tracks visitor engagement via a cookie so returning visitors
 * get the full explorer experience instead of the minimal landing.
 *
 * Cookie: bdn_engaged=1 — set on any deliberate interaction
 * (link click, direct /explore visit). Expires in 1 year.
 */

const COOKIE_NAME = 'bdn_engaged';
const COOKIE_DAYS = 365;

/** Returns true if the visitor has previously engaged. */
export function hasEngaged(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
}

/**
 * Writes the engagement cookie.
 * @param source — optional label for debugging (e.g. 'whatsapp', 'explore_link')
 */
export function recordEngagement(source = 'click'): void {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);
  document.cookie = [
    `${COOKIE_NAME}=1`,
    `path=/`,
    `expires=${expires.toUTCString()}`,
    `SameSite=Lax`,
  ].join('; ');
  if (process.env.NODE_ENV === 'development') {
    console.log(`[visitTracking] engagement recorded — source: ${source}`);
  }
}

/** Returns the current URL pathname (safe for SSR). */
export function getCurrentPath(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname;
}
