import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { Router, provideRouter } from "@angular/router";

import { organiserAuthGuard } from "./organiser-auth.guard";
import { clearToken, setToken } from "./auth";

@Component({ selector: "app-stub", template: `<p>Organiser dashboard</p>` })
class StubOrganiserScreen {}

@Component({ selector: "app-sign-in-stub", template: `<p>Organiser sign in</p>` })
class StubSignInScreen {}

describe("organiserAuthGuard", () => {
  beforeEach(() => {
    clearToken();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: "organiser-events", component: StubOrganiserScreen, canActivate: [organiserAuthGuard] },
          { path: "organiser-sign-in", component: StubSignInScreen },
        ]),
      ],
    });
  });

  it("[AC-033] redirects an unauthenticated visitor to sign-in and never renders the guarded screen", async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl("/organiser-events");
    expect(router.url).toBe("/organiser-sign-in");
  });

  it("[AC-033] lets an authenticated organiser reach the guarded route", async () => {
    setToken("jwt-abc");
    const router = TestBed.inject(Router);
    await router.navigateByUrl("/organiser-events");
    expect(router.url).toBe("/organiser-events");
  });
});
