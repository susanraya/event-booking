/**
 * Organiser session: the JWT returned by POST /api/auth/login, held in memory and
 * mirrored to localStorage so a refresh does not sign the organiser out. `apiFetch`
 * reads `getToken()` to attach `Authorization: Bearer <token>` to every call; the
 * route guard reads `isAuthenticated()` to decide whether an organiser route may render.
 */
const STORAGE_KEY = "quorq_organiser_token";

function readStoredToken(): string | null {
  try {
    return typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  } catch {
    return null;
  }
}

let token: string | null = readStoredToken();

export function getToken(): string | null {
  return token;
}

export function setToken(next: string | null): void {
  token = next;
  try {
    if (typeof localStorage === "undefined") return;
    if (next) localStorage.setItem(STORAGE_KEY, next);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable (e.g. private mode) -- the in-memory token still works.
  }
}

export function clearToken(): void {
  setToken(null);
}

export function isAuthenticated(): boolean {
  return !!token;
}
