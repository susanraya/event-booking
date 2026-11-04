// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.

import { Component, signal, computed, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
import { apiFetch } from "@/lib/api";

const PRODUCT = "Event booking";
const SCREEN = "Events";
const HAIRLINE = "1px solid rgba(255,255,255,0.10)";
const SEARCH_DEBOUNCE_MS = 300;

const template = `
<div class="space-y-6" [style.color]="brand.primaryColor" [style.font-family]="brand.fontBody">
  <header class="flex items-end justify-between">
    <h1 class="text-4xl" [style.font-family]="brand.fontHeading">
      {{ screen }}
      <span class="text-2xl tabular-nums" [style.color]="brand.accentColor">· {{ shown().length }}</span>
    </h1>
    <p class="text-xs uppercase" [style.color]="brand.neutralColor" [style.letter-spacing]="track">{{ product }}</p>
  </header>

  <div class="flex items-center gap-6 px-5 py-3"
       [style.background-color]="'rgba(255,255,255,0.04)'"
       [style.border]="hairline"
       [style.border-radius]="brand.radius">
    <label uiLabel for="event-search" class="sr-only">Search published events by title or venue</label>
    <input id="event-search"
           type="search"
           [ngModel]="query()"
           (ngModelChange)="onQueryChange($event)"
           placeholder="Search by title, venue or city"
           class="h-9 flex-1 bg-transparent text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
           [style.border-bottom]="hairline"
           [style.color]="brand.primaryColor"
           [style.outline-color]="brand.accentColor" />
    @for (f of filters; track f.id) {
      <button type="button"
              class="text-xs uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              (click)="setFilter(f.id)"
              [attr.aria-pressed]="filter() === f.id"
              [style.color]="filter() === f.id ? brand.accentColor : brand.neutralColor"
              [style.letter-spacing]="track"
              [style.outline-color]="brand.accentColor">{{ f.label }}</button>
    }
  </div>

  @if (status() === 'loading') {
    <div role="status" aria-live="polite" class="px-5 py-10 text-center" [style.border-top]="hairline">
      <p class="text-sm" [style.color]="brand.neutralColor">Loading events…</p>
    </div>
  } @else if (status() === 'error') {
    <div role="alert" class="px-5 py-10 text-center" [style.border-top]="hairline">
      <h2 class="text-2xl" [style.font-family]="brand.fontHeading">We couldn't load events</h2>
      <p class="mx-auto mt-2 max-w-md text-sm" [style.color]="brand.neutralColor">
        Something went wrong reaching the ticket office. Please check your connection and try again.
      </p>
      <button type="button"
              class="mt-6 text-xs uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              (click)="fetchEvents()"
              [style.color]="brand.accentColor"
              [style.letter-spacing]="track"
              [style.outline-color]="brand.accentColor">Try again</button>
    </div>
  } @else if (shown().length > 0) {
    <table class="w-full text-sm" style="font-variant-numeric: tabular-nums">
      <thead>
        <tr class="text-left text-xs uppercase" [style.color]="brand.neutralColor" [style.letter-spacing]="track">
          <th scope="col" class="py-3 font-normal">Event</th>
          <th scope="col" class="py-3 font-normal">Venue</th>
          <th scope="col" class="py-3 font-normal">When</th>
          <th scope="col" class="py-3 text-right font-normal">Price</th>
        </tr>
      </thead>
      <tbody>
        @for (e of shown(); track e.id) {
          <tr class="transition-colors hover:bg-white/[0.03]" [style.border-top]="hairline">
            <td class="py-4" [style.font-family]="brand.fontHeading">
              <button type="button"
                      class="text-left hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      (click)="openEvent(e.id)"
                      [attr.aria-label]="'Open ' + e.title + ' — ' + formatWhen(e.start_datetime)"
                      [style.font-family]="brand.fontHeading"
                      [style.color]="brand.primaryColor"
                      [style.outline-color]="brand.accentColor">{{ e.title }}</button>
            </td>
            <td class="py-4">{{ e.venue }}</td>
            <td class="py-4 text-xs uppercase tabular-nums" [style.color]="brand.neutralColor" [style.letter-spacing]="track">{{ formatWhen(e.start_datetime) }}</td>
            <td class="py-4 text-right tabular-nums">{{ priceLabel(e) }}</td>
          </tr>
        }
      </tbody>
    </table>
  } @else if (events().length === 0 && query().trim() === '') {
    <div class="px-5 py-10 text-center" [style.border-top]="hairline">
      <h2 class="text-2xl" [style.font-family]="brand.fontHeading">Nothing on sale just yet</h2>
      <p class="mx-auto mt-2 max-w-md text-sm" [style.color]="brand.neutralColor">
        No events are published right now. Seats go on sale here the moment an organiser publishes a date.
      </p>
      <button type="button"
              class="mt-6 text-xs uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              (click)="navigate('organiser-sign-in')"
              [style.color]="brand.accentColor"
              [style.letter-spacing]="track"
              [style.outline-color]="brand.accentColor">Organiser sign in</button>
    </div>
  } @else {
    <div class="px-5 py-10 text-center" [style.border-top]="hairline">
      <h2 class="text-2xl" [style.font-family]="brand.fontHeading">No events found</h2>
      <p class="mx-auto mt-2 max-w-md text-sm" [style.color]="brand.neutralColor">
        We looked for {{ describeSearch() }} and found no match. Try a city, a venue, or part of the title.
      </p>
      <button type="button"
              class="mt-6 text-xs uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              (click)="resetSearch()"
              [style.color]="brand.accentColor"
              [style.letter-spacing]="track"
              [style.outline-color]="brand.accentColor">Clear search and filters</button>
    </div>
  }
</div>
`;

@Component({
  selector: "app-events-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase {
  product = PRODUCT;
  screen = SCREEN;
  hairline = HAIRLINE;
  track = "0.18em";

  filters = [
    { id: "all", label: "All" },
    { id: "free", label: "Free" },
    { id: "paid", label: "Paid" },
  ];

  // Published events from the live API only (AC-001, AC-002): no sample array,
  // and the API never returns unpublished events.
  events = signal([]);
  status = signal("loading");
  query = signal("");
  filter = signal("all");

  private searchTimer = null;
  // Event ids come from the API verbatim (e.g. UUIDs with hyphens, or ids with
  // underscores) and must reach the route untouched -- `navigate()`'s slug rules
  // would mangle them, so this link goes through the router directly.
  private readonly router = inject(Router);

  constructor() {
    super();
    this.fetchEvents();
  }

  shown = computed(() => {
    const f = this.filter();
    return this.events().filter((e) => {
      return f === "all" || (f === "free" && e.is_free) || (f === "paid" && !e.is_free);
    });
  });

  fetchEvents() {
    this.status.set("loading");
    const q = this.query().trim();
    const path = q ? `/api/events?q=${encodeURIComponent(q)}` : "/api/events";
    apiFetch(path)
      .then((data) => {
        this.events.set(Array.isArray(data) ? data : []);
        this.status.set("ready");
      })
      .catch(() => {
        this.status.set("error");
      });
  }

  onQueryChange(value) {
    this.query.set(value);
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.fetchEvents(), SEARCH_DEBOUNCE_MS);
  }

  describeSearch() {
    const q = this.query().trim();
    const f = this.filters.find((x) => x.id === this.filter());
    if (q && this.filter() !== "all") return "“" + q + "” in " + f.label.toLowerCase() + " events";
    if (q) return "“" + q + "”";
    return f.label.toLowerCase() + " events";
  }

  setFilter(id) {
    this.filter.set(id);
  }

  resetSearch() {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.query.set("");
    this.filter.set("all");
    this.fetchEvents();
  }

  openEvent(id) {
    void this.router.navigateByUrl(`/event-detail/${id}`);
  }

  formatWhen(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const datePart = d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const timePart = d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
    return `${datePart} · ${timePart}`;
  }

  priceLabel(e) {
    if (e.is_free) return "Free";
    const v = (e.price_minor || 0) / 100;
    return "₹" + v.toLocaleString("en-IN");
  }
}
