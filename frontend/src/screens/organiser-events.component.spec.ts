import { TestBed } from "@angular/core/testing";
import { Router, provideRouter } from "@angular/router";
import { vi, type Mock } from "vitest";

import Screen from "./organiser-events.component";
import { clearToken, setToken, getToken } from "@/lib/auth";

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

const EVENT_A = {
  id: "evt_a",
  organiser_id: "org_1",
  title: "Thumri Evening",
  description: "An evening of thumri.",
  start_datetime: "2026-12-01T19:30",
  venue: "Prithvi Theatre",
  is_free: false,
  price_minor: 50000,
  currency: "INR",
  status: "draft",
  cancellation_policy: "",
  created_at: "2026-10-01T00:00:00Z",
};

async function setup(initialFetch: unknown) {
  (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue(jsonResponse(true, 200, initialFetch));
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
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

describe("Organiser events screen", () => {
  beforeEach(() => {
    clearToken();
    vi.restoreAllMocks();
  });

  it("[AC-034] loads from GET /api/organiser/events and renders title, status and date/time with no sample data", async () => {
    const fixture = await setup([EVENT_A]);
    const text: string = fixture.nativeElement.textContent;
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/organiser/events"),
      expect.anything(),
    );
    expect(text).toContain("Thumri Evening");
    expect(text).toContain("Draft");
    expect(text).not.toContain("Mehfil: Begum Akhtar Centenary");
    expect(text).not.toContain("Priya Nalwade");
  });

  it("[AC-034] create form posts to POST /api/organiser/events and the new event appears as a draft", async () => {
    const fixture = await setup([]);
    const comp = fixture.componentInstance;

    (global.fetch as unknown as Mock).mockResolvedValueOnce(
      jsonResponse(true, 201, {
        id: "evt_new",
        title: "New Recital",
        description: "",
        start_datetime: "2026-12-10T18:00",
        venue: "Hall 2",
        is_free: false,
        price_minor: 0,
        currency: "INR",
        status: "draft",
        cancellation_policy: "",
      }),
    );

    comp.startCreate();
    fixture.detectChanges();
    comp.fTitle.set("New Recital");
    comp.fStart.set("2026-12-10T18:00");
    comp.fVenue.set("Hall 2");
    await comp.createEvent({ preventDefault: () => {} });
    await fixture.whenStable();
    fixture.detectChanges();

    const call = (global.fetch as unknown as Mock).mock.calls.find((c) =>
      String(c[0]).includes("/api/organiser/events") && c[1]?.method === "POST",
    );
    expect(call).toBeTruthy();
    expect(JSON.parse(call[1].body)).toMatchObject({ title: "New Recital", venue: "Hall 2" });

    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("New Recital");
    expect(comp.events().find((e) => e.id === "evt_new").status).toBe("draft");
  });

  it("[AC-035] edit form loads an existing event and saves via PUT, updating the list", async () => {
    const fixture = await setup([EVENT_A]);
    const comp = fixture.componentInstance;

    comp.selectEvent("evt_a");
    fixture.detectChanges();
    expect(comp.fTitle()).toBe("Thumri Evening");

    (global.fetch as unknown as Mock).mockResolvedValueOnce(
      jsonResponse(true, 200, {
        id: "evt_a",
        title: "Thumri Evening — Updated",
        description: "An evening of thumri.",
        start_datetime: "2026-12-01T19:30",
        venue: "Prithvi Theatre",
        is_free: false,
        price_minor: 50000,
        currency: "INR",
        status: "draft",
        cancellation_policy: "",
      }),
    );

    comp.fTitle.set("Thumri Evening — Updated");
    await comp.saveDetails({ preventDefault: () => {} });
    await fixture.whenStable();
    fixture.detectChanges();

    const call = (global.fetch as unknown as Mock).mock.calls.find(
      (c) => c[1]?.method === "PUT",
    );
    expect(call[0]).toContain("/api/organiser/events/evt_a");
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("Thumri Evening — Updated");
  });

  it("[AC-036] submitting with an empty title blocks the save and shows the server's message beside the field", async () => {
    const fixture = await setup([EVENT_A]);
    const comp = fixture.componentInstance;
    comp.selectEvent("evt_a");
    fixture.detectChanges();

    (global.fetch as unknown as Mock).mockResolvedValueOnce(
      jsonResponse(false, 400, {
        message: "Validation failed",
        field: "title",
        errors: { title: "Give the event a title." },
      }),
    );

    comp.fTitle.set("");
    await comp.saveDetails({ preventDefault: () => {} });
    await fixture.whenStable();
    fixture.detectChanges();

    expect(comp.errors().title).toBe("Give the event a title.");
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("Give the event a title.");
    // Nothing was saved -- the list still shows the original title.
    expect(comp.events().find((e) => e.id === "evt_a").title).toBe("Thumri Evening");
  });

  it("[AC-039, AC-040] the free toggle clears the price and saves isFree", async () => {
    const fixture = await setup([EVENT_A]);
    const comp = fixture.componentInstance;
    comp.selectEvent("evt_a");
    comp.tab.set("pricing");
    fixture.detectChanges();

    comp.pIsFree.set(true);
    fixture.detectChanges();
    expect(comp.pPrice()).toBe(0);

    (global.fetch as unknown as Mock).mockResolvedValueOnce(
      jsonResponse(true, 200, {
        id: "evt_a",
        title: "Thumri Evening",
        description: "An evening of thumri.",
        start_datetime: "2026-12-01T19:30",
        venue: "Prithvi Theatre",
        is_free: true,
        price_minor: 0,
        currency: "INR",
        status: "draft",
        cancellation_policy: "",
      }),
    );

    await comp.savePricing({ preventDefault: () => {} });
    await fixture.whenStable();
    fixture.detectChanges();

    const call = (global.fetch as unknown as Mock).mock.calls.find(
      (c) => c[1]?.method === "PUT",
    );
    expect(JSON.parse(call[1].body)).toMatchObject({ is_free: true, price_minor: 0 });
    expect(comp.events().find((e) => e.id === "evt_a").is_free).toBe(true);
  });

  it("a 401 on load returns the organiser to sign-in and clears the token", async () => {
    setToken("jwt-expired");
    (global.fetch as unknown as Mock) = vi
      .fn()
      .mockResolvedValue(jsonResponse(false, 401, { message: "Session expired." }));

    TestBed.configureTestingModule({
      imports: [Screen],
      providers: [
        provideRouter([
          { path: "organiser-events", component: Screen },
          { path: "organiser-sign-in", component: Screen },
        ]),
      ],
    });
    const router = TestBed.inject(Router);
    await router.navigateByUrl("/organiser-events");
    const fixture = TestBed.createComponent(Screen);
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe("/organiser-sign-in");
    expect(getToken()).toBeNull();
  });
});
