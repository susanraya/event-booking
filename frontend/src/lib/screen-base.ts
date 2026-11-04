import { inject } from "@angular/core";
import { Router } from "@angular/router";

import { brand } from "@/lib/brand";
import { toPath } from "@/lib/navigate";

/**
 * What every screen extends: `navigate(route)` to move to another screen by its route
 * slug, and the approved `brand`, both usable in the screen's template and its class.
 */
export class ScreenBase {
  private readonly router = inject(Router);
  protected readonly brand = brand;

  protected navigate(route: string): void {
    void this.router.navigateByUrl(toPath(route));
  }
}
