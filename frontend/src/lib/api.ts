/// <reference types="vite/client" />
// Without the reference above, `import.meta.env` is not typed and `tsc --noEmit` fails --
// which `vite build` does not catch, because it tree-shakes this module out when no screen
// imports it yet.
//
// Where the generated API lives.
//
// Set at build time: the platform bakes the deployed API URL into the frontend build. The
// fallback is the local backend so a bare `npm run dev` still points somewhere real.
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

import { getToken } from "@/lib/auth";

// The shared bearer the deployed API expects (its SECRET_KEY). The platform bakes the
// same value into both sides at deploy time, so authenticated calls work out of the box.
export const API_SECRET_KEY: string = import.meta.env.VITE_API_SECRET_KEY ?? "";

// Carries the HTTP status and parsed body alongside the message, so a caller that needs
// more than the generic message (e.g. a field-level validation error, or a 401 to act on)
// can read it without a second request.
export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  // A signed-in organiser's own JWT takes priority over the shared deploy-time secret,
  // so organiser calls carry the identity the backend needs to authorise them.
  const bearer = getToken() ?? (API_SECRET_KEY || null);
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    let message = `${init?.method ?? "GET"} ${path} failed: ${response.status}`;
    let body: unknown = null;
    try {
      body = await response.clone().json();
      if (body && typeof (body as { message?: unknown }).message === "string") {
        const text = (body as { message: string }).message;
        if (text) message = text;
      }
    } catch {
      // Not JSON, or no body -- keep the generic message.
    }
    throw new ApiError(message, response.status, body);
  }
  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}
