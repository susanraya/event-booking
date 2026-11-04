import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";

import { isAuthenticated } from "@/lib/auth";
import { toPath } from "@/lib/navigate";

/**
 * Guards every organiser management route: an unauthenticated visitor is redirected to
 * sign-in and the guarded screen never renders (AC-033).
 */
export const organiserAuthGuard: CanActivateFn = () => {
  if (isAuthenticated()) return true;
  const router = inject(Router);
  return router.parseUrl(toPath("organiser-sign-in"));
};
