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
