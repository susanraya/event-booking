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
  (global.fetch as unknown as Mock) = vi
    .fn()
    .mockResolvedValue(jsonResponse(true, 200, initialFetch));
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

    const call = (global.fetch as unknown as Mock).mock.calls.find(
      (c) => String(c[0]).includes("/api/organiser/events") && c[1]?.method === "POST",
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

    const call = (global.fetch as unknown as Mock).mock.calls.find((c) => c[1]?.method === "PUT");
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

    const call = (global.fetch as unknown as Mock).mock.calls.find((c) => c[1]?.method === "PUT");
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

describe("Organiser events screen — seating layout editor (US-014-2)", () => {
  beforeEach(() => {
    clearToken();
    vi.restoreAllMocks();
  });

  it("[AC-037] adding and removing rows updates the live seat-count summary", async () => {
    const fixture = await setup([EVENT_A]);
    const comp = fixture.componentInstance;

    comp.selectEvent("evt_a");
    comp.tab.set("seating");
    await fixture.whenStable();
    fixture.detectChanges();
    expect(comp.totalSeats()).toBe(0);

    comp.newRowLabel.set("A");
    comp.newRowSeats.set(10);
    comp.addRow({ preventDefault: () => {} });
    fixture.detectChanges();
    expect(comp.totalSeats()).toBe(10);
    expect(fixture.nativeElement.textContent).toContain("10");

    comp.newRowLabel.set("B");
    comp.newRowSeats.set(12);
    comp.addRow({ preventDefault: () => {} });
    fixture.detectChanges();
    expect(comp.totalSeats()).toBe(22);

    const rowA = comp.layoutRows().find((r) => r.row_label === "A");
    comp.removeRow(rowA);
    fixture.detectChanges();
    expect(comp.totalSeats()).toBe(12);
    expect(fixture.nativeElement.textContent).toContain("12");
  });

  it("[AC-037] each seat shows its row label and seat number", async () => {
    const fixture = await setup([EVENT_A]);
    const comp = fixture.componentInstance;
    comp.selectEvent("evt_a");
    comp.tab.set("seating");
    await fixture.whenStable();
    fixture.detectChanges();

    comp.newRowLabel.set("C");
    comp.newRowSeats.set(3);
    comp.addRow({ preventDefault: () => {} });
    fixture.detectChanges();

    const row = comp.layoutRows().find((r) => r.row_label === "C");
    expect(row.seats).toBe(3);
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("C");
  });

  it("[AC-037] saving posts the layout via PUT, and the saved layout reloads from GET seats", async () => {
    const fixture = await setup([EVENT_A]);
    const comp = fixture.componentInstance;

    comp.selectEvent("evt_a");
    await fixture.whenStable();
    fixture.detectChanges();

    comp.newRowLabel.set("A");
    comp.newRowSeats.set(2);
    comp.addRow({ preventDefault: () => {} });
    comp.newRowLabel.set("B");
    comp.newRowSeats.set(1);
    comp.addRow({ preventDefault: () => {} });
    fixture.detectChanges();

    const seatsAfterSave = [
      { id: "s1", row_label: "A", seat_number: 1, status: "available", price_minor: 0 },
      { id: "s2", row_label: "A", seat_number: 2, status: "available", price_minor: 0 },
      { id: "s3", row_label: "B", seat_number: 1, status: "booked", price_minor: 0 },
    ];
    (global.fetch as unknown as Mock).mockResolvedValueOnce(jsonResponse(true, 200, { rows: [] }));
    (global.fetch as unknown as Mock).mockResolvedValueOnce(
      jsonResponse(true, 200, seatsAfterSave),
    );

    await comp.saveLayout();
    await fixture.whenStable();
    fixture.detectChanges();

    const putCall = (global.fetch as unknown as Mock).mock.calls.find(
      (c) => c[1]?.method === "PUT" && String(c[0]).includes("/layout"),
    );
    expect(putCall[0]).toContain("/api/organiser/events/evt_a/layout");
    expect(JSON.parse(putCall[1].body)).toMatchObject({
      rows: [
        { label: "A", seatCount: 2 },
        { label: "B", seatCount: 1 },
      ],
    });

    const seatsCall = (global.fetch as unknown as Mock).mock.calls.find((c) =>
      String(c[0]).includes("/api/events/evt_a/seats"),
    );
    expect(seatsCall).toBeTruthy();
    expect(comp.layoutRows().map((r) => r.row_label)).toEqual(["A", "B"]);
    expect(comp.totalSeats()).toBe(3);
  });

  it("[AC-038, NFR-002] a layout of several hundred seats renders without error", async () => {
    const fixture = await setup([EVENT_A]);
    const comp = fixture.componentInstance;
    comp.selectEvent("evt_a");
    comp.tab.set("seating");
    await fixture.whenStable();
    fixture.detectChanges();

    for (let i = 0; i < 10; i++) {
      comp.newRowLabel.set(String.fromCharCode(65 + i));
      comp.newRowSeats.set(30);
      comp.addRow({ preventDefault: () => {} });
    }
    fixture.detectChanges();

    expect(comp.totalSeats()).toBe(300);
    expect(fixture.nativeElement.textContent).toContain("300");
  });

  it("blocks saving a layout with zero rows", async () => {
    const fixture = await setup([EVENT_A]);
    const comp = fixture.componentInstance;
    comp.selectEvent("evt_a");
    await fixture.whenStable();
    fixture.detectChanges();

    const callsBefore = (global.fetch as unknown as Mock).mock.calls.length;
    await comp.saveLayout();
    fixture.detectChanges();

    expect(comp.layoutError()).toContain("at least one row");
    // No PUT was issued.
    expect((global.fetch as unknown as Mock).mock.calls.length).toBe(callsBefore);
  });

  it("blocks adding a row with zero seats", async () => {
    const fixture = await setup([EVENT_A]);
    const comp = fixture.componentInstance;
    comp.selectEvent("evt_a");
    await fixture.whenStable();
    fixture.detectChanges();

    comp.newRowLabel.set("A");
    comp.newRowSeats.set(0);
    comp.addRow({ preventDefault: () => {} });
    fixture.detectChanges();

    expect(comp.layoutRows().length).toBe(0);
    expect(comp.addRowError()).toBeTruthy();
  });

  it("blocks adding a row with a duplicate row label", async () => {
    const fixture = await setup([EVENT_A]);
    const comp = fixture.componentInstance;
    comp.selectEvent("evt_a");
    await fixture.whenStable();
    fixture.detectChanges();

    comp.newRowLabel.set("A");
    comp.newRowSeats.set(10);
    comp.addRow({ preventDefault: () => {} });
    fixture.detectChanges();

    comp.newRowLabel.set("A");
    comp.newRowSeats.set(5);
    comp.addRow({ preventDefault: () => {} });
    fixture.detectChanges();

    expect(comp.layoutRows().length).toBe(1);
    expect(comp.addRowError()).toContain("already exists");
  });

  it("shows the server's validation message when saving the layout is rejected", async () => {
    const fixture = await setup([EVENT_A]);
    const comp = fixture.componentInstance;
    comp.selectEvent("evt_a");
    comp.tab.set("seating");
    await fixture.whenStable();
    fixture.detectChanges();

    comp.newRowLabel.set("A");
    comp.newRowSeats.set(10);
    comp.addRow({ preventDefault: () => {} });
    fixture.detectChanges();

    (global.fetch as unknown as Mock).mockResolvedValueOnce(
      jsonResponse(false, 400, {
        message: "Validation failed",
        field: "rows",
        errors: { rows: "Row A conflicts with an existing booking." },
      }),
    );

    await comp.saveLayout();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(comp.layoutError()).toBe("Row A conflicts with an existing booking.");
    expect(fixture.nativeElement.textContent).toContain(
      "Row A conflicts with an existing booking.",
    );
  });
});
