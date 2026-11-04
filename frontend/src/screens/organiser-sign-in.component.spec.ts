import { TestBed } from "@angular/core/testing";
import { Router, provideRouter } from "@angular/router";
import { vi, type Mock } from "vitest";

import Screen from "./organiser-sign-in.component";
import { clearToken, getToken } from "@/lib/auth";

function jsonResponse(ok: boolean, status: number, body: unknown) {
  return {
    ok,
    status,
    json: async () => body,
    clone() {
      return this;
    },
  };
}

async function setup() {
  TestBed.configureTestingModule({
    imports: [Screen],
    providers: [
      provideRouter([
        { path: "organiser-events", component: Screen },
        { path: "organiser-sign-in", component: Screen },
      ]),
    ],
  });
  const fixture = TestBed.createComponent(Screen);
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

function fillAndSubmit(fixture: ReturnType<typeof TestBed.createComponent>, email: string, password: string) {
  const emailInput: HTMLInputElement = fixture.nativeElement.querySelector("#organiser-email");
  const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector("#organiser-password");
  emailInput.value = email;
  emailInput.dispatchEvent(new Event("input"));
  passwordInput.value = password;
  passwordInput.dispatchEvent(new Event("input"));
  fixture.detectChanges();
  const form: HTMLFormElement = fixture.nativeElement.querySelector("form");
  form.dispatchEvent(new Event("submit", { cancelable: true }));
}

describe("Organiser sign-in", () => {
  beforeEach(() => {
    clearToken();
    vi.restoreAllMocks();
  });

  it("[AC-031] submits email and password to POST /api/auth/login, stores the JWT and navigates to the dashboard", async () => {
    (global.fetch as unknown as Mock) = vi
      .fn()
      .mockResolvedValue(
        jsonResponse(true, 200, { token: "jwt-abc", organiser: { name: "Priya", email: "priya@quorq.ai" } }),
      );

    const fixture = await setup();
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, "navigateByUrl");

    fillAndSubmit(fixture, "priya@quorq.ai", "correct-horse-battery");
    await fixture.whenStable();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/login"),
      expect.objectContaining({ method: "POST" }),
    );
    const call = (global.fetch as unknown as Mock).mock.calls[0];
    expect(JSON.parse((call[1] as RequestInit).body as string)).toEqual({
      email: "priya@quorq.ai",
      password: "correct-horse-battery",
    });
    expect(getToken()).toBe("jwt-abc");
    expect(navSpy).toHaveBeenCalledWith("/organiser-events");
  });

  it("[AC-032] a failed sign-in shows only the server's single generic error message", async () => {
    (global.fetch as unknown as Mock) = vi
      .fn()
      .mockResolvedValue(jsonResponse(false, 401, { message: "Invalid email or password." }));

    const fixture = await setup();
    fillAndSubmit(fixture, "nobody@quorq.ai", "wrong-password");
    await fixture.whenStable();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain("Invalid email or password.");
    expect(text).not.toContain("no such email");
    expect(text).not.toContain("wrong password");
    expect(getToken()).toBeNull();
  });

  it("no seeded or sample credential data remains in the sign-in screen", async () => {
    (global.fetch as unknown as Mock) = vi.fn();
    const fixture = await setup();
    const text: string = fixture.nativeElement.textContent;
    expect(text).not.toContain("velvet-2026");
    expect(text.toLowerCase()).not.toContain("preview account");
    expect(text).not.toContain("susan.raya@quorq.ai");
  });
});
