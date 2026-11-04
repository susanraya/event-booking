import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, provideRouter } from "@angular/router";
import { vi, type Mock } from "vitest";

import Screen from "./event-detail.component";

function jsonResponse(body: unknown) {
  return {
    ok: true,
    status: 200,
    json: async () => body,
    clone() {
      return this;
    },
  };
}

async function setup(paramMap: Record<string, string> = {}) {
  TestBed.configureTestingModule({
    imports: [Screen],
    providers: [
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: { snapshot: { paramMap: { get: (key: string) => paramMap[key] ?? null } } },
      },
    ],
  });
  const fixture = TestBed.createComponent(Screen);
  await fixture.whenStable();
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

describe("Event detail — price and free display", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("[AC-039] renders the ticket price from the API in the detail heading", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue(
      jsonResponse({
        id: "evt_1",
        title: "Priced Night",
        venue: "A Hall",
        start_datetime: "2026-12-01T19:00:00Z",
        is_free: false,
        price_minor: 50000,
        currency: "INR",
        status: "published",
        description: "d",
        cancellation_policy: "p",
      }),
    );

    const fixture = await setup({ id: "evt_1" });
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("₹500");
  });

  it("[AC-040] renders Free when the API marks the event isFree", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue(
      jsonResponse({
        id: "evt_2",
        title: "Free Night",
        venue: "A Hall",
        start_datetime: "2026-12-01T19:00:00Z",
        is_free: true,
        price_minor: 0,
        currency: "INR",
        status: "published",
        description: "d",
        cancellation_policy: "p",
      }),
    );

    const fixture = await setup({ id: "evt_2" });
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("Free");
  });
});

describe("Event detail — live wiring (US-003-1)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("[AC-006] renders title, description, date/time and venue from GET /api/events/{id}", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue(
      jsonResponse({
        id: "evt_3",
        title: "Khayal at Dusk",
        description: "An evening of khayal.",
        venue: "The Music Academy, Chennai",
        start_datetime: "2026-11-14T19:30:00",
        is_free: false,
        price_minor: 145000,
        currency: "INR",
        status: "published",
        seats_available: 40,
      }),
    );

    const fixture = await setup({ id: "evt_3" });
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("Khayal at Dusk");
    expect(text).toContain("An evening of khayal.");
    expect(text).toContain("The Music Academy, Chennai");
    expect(text).toContain("2026-11-14T19:30:00");
  });

  it("[AC-007] enables 'Select seats' when seats are available", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue(
      jsonResponse({
        id: "evt_4",
        title: "Has Seats",
        description: "d",
        venue: "A Hall",
        start_datetime: "2026-12-01T19:00:00",
        is_free: false,
        price_minor: 50000,
        currency: "INR",
        status: "published",
        seats_available: 12,
      }),
    );

    const fixture = await setup({ id: "evt_4" });
    const button: HTMLButtonElement = Array.from(
      fixture.nativeElement.querySelectorAll("button"),
    ).find((b: HTMLButtonElement) => b.textContent?.trim() === "Select seats");
    expect(button).toBeTruthy();
    expect(button.disabled).toBe(false);
  });

  it("[AC-007] disables 'Select seats' with a plain-language sold-out message when no seats remain", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue(
      jsonResponse({
        id: "evt_5",
        title: "Sold Out Night",
        description: "d",
        venue: "A Hall",
        start_datetime: "2026-12-01T19:00:00",
        is_free: false,
        price_minor: 50000,
        currency: "INR",
        status: "published",
        seats_available: 0,
      }),
    );

    const fixture = await setup({ id: "evt_5" });
    const button: HTMLButtonElement = Array.from(
      fixture.nativeElement.querySelectorAll("button"),
    ).find((b: HTMLButtonElement) => b.textContent?.trim() === "Select seats");
    expect(button).toBeTruthy();
    expect(button.disabled).toBe(true);
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("sold out");
  });

  it("[AC-008] a 404 renders a plain-language not-available message with no booking action", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ message: "Not found" }),
      clone() {
        return this;
      },
    });

    const fixture = await setup({ id: "evt_missing" });
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("isn't available");
    const selectSeatsButton = Array.from(fixture.nativeElement.querySelectorAll("button")).find(
      (b: HTMLButtonElement) => b.textContent?.trim() === "Select seats",
    );
    expect(selectSeatsButton).toBeFalsy();
  });

  it("renders a plain-language loading state before the API responds", async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    const pending = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    (global.fetch as unknown as Mock) = vi.fn().mockReturnValue(pending);

    TestBed.configureTestingModule({
      imports: [Screen],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => "evt_6" } } },
        },
      ],
    });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain("Loading this event");

    resolveFetch(
      jsonResponse({
        id: "evt_6",
        title: "T",
        description: "d",
        venue: "V",
        start_datetime: "2026-12-01T19:00:00",
        is_free: true,
        price_minor: 0,
        currency: "INR",
        status: "published",
        seats_available: 5,
      }),
    );
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await new Promise((r) => setTimeout(r, 0));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain("Loading this event");
  });

  it("a network failure shows a plain-language retry message rather than a technical error", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockRejectedValue(new Error("network down"));

    const fixture = await setup({ id: "evt_7" });
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("We couldn't load this event");
    expect(text).toMatch(/try again/i);
    expect(text).not.toContain("network down");
  });

  it("no seeded sample event data (e.g. Kabir Café) renders when the API returns a different event", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue(
      jsonResponse({
        id: "evt_8",
        title: "Letterpress Workshop",
        description: "Hands-on printing.",
        venue: "Kala Ghoda Studio, Mumbai",
        start_datetime: "2026-11-22T10:00:00",
        is_free: true,
        price_minor: 0,
        currency: "INR",
        status: "published",
        seats_available: 8,
      }),
    );

    const fixture = await setup({ id: "evt_8" });
    const text: string = fixture.nativeElement.textContent;
    expect(text).not.toContain("Kabir Café");
    expect(text).not.toContain("Royal Opera House");
    expect(text).not.toContain("evt_8821");
  });
});
