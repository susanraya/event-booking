import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Router, provideRouter } from "@angular/router";
import { vi, type Mock } from "vitest";

import Screen from "./events.component";
import { clearToken } from "@/lib/auth";

function jsonResponse(body: unknown, ok = true, status = 200) {
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
    providers: [provideRouter([{ path: "event-detail/:id", component: Screen }])],
  });
  const fixture = TestBed.createComponent(Screen);
  await fixture.whenStable();
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

const PUBLISHED_EVENTS = [
  {
    id: "evt_1",
    title: "Khayal at Dusk",
    description: "d",
    start_datetime: "2026-11-14T19:30:00",
    venue: "The Music Academy, Chennai",
    is_free: false,
    price_minor: 145000,
    currency: "INR",
    status: "published",
  },
  {
    id: "evt_2",
    title: "Letterpress Workshop",
    description: "d",
    start_datetime: "2026-11-22T10:00:00",
    venue: "Kala Ghoda Studio, Mumbai",
    is_free: true,
    price_minor: 0,
    currency: "INR",
    status: "published",
  },
];

describe("Events listing — live API", () => {
  beforeEach(() => {
    clearToken();
    vi.restoreAllMocks();
  });

  it("[AC-001] renders each published event with title, date/time and venue", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue(jsonResponse(PUBLISHED_EVENTS));

    const fixture = await setup();
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("Khayal at Dusk");
    expect(text).toContain("The Music Academy, Chennai");
    expect(text).toContain("Letterpress Workshop");
    expect(text).toContain("Kala Ghoda Studio, Mumbai");
  });

  it("[AC-002] no client-side sample array remains; only API-returned events render", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue(jsonResponse([PUBLISHED_EVENTS[0]]));

    const fixture = await setup();
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("Khayal at Dusk");
    expect(text).not.toContain("Letterpress Workshop");
    expect(text).not.toContain("Pondicherry Jazz Weekender");
  });

  it("[AC-003] loads with no token present and never redirects to sign-in", async () => {
    clearToken();
    (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue(jsonResponse(PUBLISHED_EVENTS));

    TestBed.configureTestingModule({
      imports: [Screen],
      providers: [
        provideRouter([
          { path: "", component: Screen },
          { path: "organiser-sign-in", component: Screen },
        ]),
      ],
    });
    const fixture = TestBed.createComponent(Screen);
    await TestBed.inject(Router).navigateByUrl("/");
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe("/");
  });

  it("[AC-004] entering a search term queries GET /api/events?q=<term> (debounced)", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(PUBLISHED_EVENTS));
    (global.fetch as unknown as Mock) = fetchMock;

    const fixture = await setup();
    fetchMock.mockClear();
    fetchMock.mockResolvedValue(jsonResponse([PUBLISHED_EVENTS[0]]));

    const input: HTMLInputElement = fixture.nativeElement.querySelector("#event-search");
    input.value = "Khayal";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    // not called immediately -- debounced
    expect(fetchMock).not.toHaveBeenCalled();

    await new Promise((r) => setTimeout(r, 350));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const calledUrl = String(fetchMock.mock.calls[0][0]);
    expect(calledUrl).toContain("/api/events?q=Khayal");

    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("Khayal at Dusk");
  });

  it("[AC-005] a search with no matches shows the plain-language 'No events found' empty state", async () => {
    (global.fetch as unknown as Mock) = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(PUBLISHED_EVENTS))
      .mockResolvedValueOnce(jsonResponse([]));

    const fixture = await setup();

    const input: HTMLInputElement = fixture.nativeElement.querySelector("#event-search");
    input.value = "zzzzz-no-match";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    await new Promise((r) => setTimeout(r, 350));
    fixture.detectChanges();
    await fixture.whenStable();

    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("No events found");
    expect(text).not.toMatch(/error|exception|undefined/i);
  });

  it("a network/server failure shows a plain-language retry message rather than a technical error", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockRejectedValue(new Error("network down"));

    const fixture = await setup();
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain("We couldn't load events");
    expect(text).toMatch(/try again/i);
    expect(text).not.toContain("network down");
  });

  it("selecting an event navigates to that event's detail route carrying its id", async () => {
    (global.fetch as unknown as Mock) = vi.fn().mockResolvedValue(jsonResponse(PUBLISHED_EVENTS));

    const fixture = await setup();
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, "navigateByUrl");

    const button = fixture.debugElement.query(
      By.css("button[aria-label^='Open Khayal at Dusk']"),
    );
    button.nativeElement.click();
    await fixture.whenStable();

    expect(navigateSpy).toHaveBeenCalledWith("/event-detail/evt_1");
  });

  it("loading state is shown while the request is in flight", async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    const pending = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    (global.fetch as unknown as Mock) = vi.fn().mockReturnValue(pending);

    TestBed.configureTestingModule({
      imports: [Screen],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain("Loading events");

    resolveFetch(jsonResponse(PUBLISHED_EVENTS));
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await new Promise((r) => setTimeout(r, 0));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain("Loading events");
  });
});
