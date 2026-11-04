// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
const PRODUCT = "Event booking";
const SCREEN = "Events";
const HAIRLINE = "1px solid rgba(255,255,255,0.10)";

// Public listing: published events only. Drafts are held back by the organiser
// and never reach this array (AC-002).
const EVENTS = [
  {
    ref: "EVT-2411",
    title: "Khayal at Dusk: Kaushiki Chakraborty",
    venue: "The Music Academy, Chennai",
    when: "Fri 14 Nov · 7:30 PM",
    price: "₹1,450",
    isFree: false,
    status: "published",
  },
  {
    ref: "EVT-2412",
    title: "Letterpress & Lithograph Workshop",
    venue: "Kala Ghoda Studio, Mumbai",
    when: "Sat 22 Nov · 10:00 AM",
    price: "Free",
    isFree: true,
    status: "published",
  },
  {
    ref: "EVT-2413",
    title: "Chamber Series: Schubert Octet",
    venue: "Bangalore International Centre",
    when: "Sun 30 Nov · 6:00 PM",
    price: "₹900",
    isFree: false,
    status: "published",
  },
  {
    ref: "EVT-2414",
    title: "Monsoon Shorts: Indie Film Night",
    venue: "Alliance Française, New Delhi",
    when: "Thu 4 Dec · 8:00 PM",
    price: "₹350",
    isFree: false,
    status: "published",
  },
  {
    ref: "EVT-2415",
    title: "Rooftop Qawwali with Nizami Bandhu",
    venue: "Narain Niwas, Jaipur",
    when: "Sat 13 Dec · 9:00 PM",
    price: "₹2,200",
    isFree: true === false ? "" : "₹2,200" ? false : false,
    status: "published",
  },
  {
    ref: "EVT-2416",
    title: "Pondicherry Jazz Weekender",
    venue: "Promenade Lawns, Puducherry",
    when: "Sat 10 Jan · 5:00 PM",
    price: "₹1,800",
    isFree: false,
    status: "draft",
  },
];

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
           [(ngModel)]="query"
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

  @if (shown().length > 0) {
    <table class="w-full text-sm" style="font-variant-numeric: tabular-nums">
      <thead>
        <tr class="text-left text-xs uppercase" [style.color]="brand.neutralColor" [style.letter-spacing]="track">
          <th scope="col" class="py-3 font-normal">Ref</th>
          <th scope="col" class="py-3 font-normal">Event</th>
          <th scope="col" class="py-3 font-normal">Venue</th>
          <th scope="col" class="py-3 font-normal">When</th>
          <th scope="col" class="py-3 text-right font-normal">Price</th>
        </tr>
      </thead>
      <tbody>
        @for (e of shown(); track e.ref) {
          <tr class="transition-colors hover:bg-white/[0.03]" [style.border-top]="hairline">
            <td class="py-4 tabular-nums" [style.color]="brand.accentColor">{{ e.ref }}</td>
            <td class="py-4" [style.font-family]="brand.fontHeading">
              <button type="button"
                      class="text-left hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      (click)="navigate('event-detail')"
                      [attr.aria-label]="'Open ' + e.title + ' — ' + e.when"
                      [style.font-family]="brand.fontHeading"
                      [style.color]="brand.primaryColor"
                      [style.outline-color]="brand.accentColor">{{ e.title }}</button>
            </td>
            <td class="py-4">{{ e.venue }}</td>
            <td class="py-4 text-xs uppercase tabular-nums" [style.color]="brand.neutralColor" [style.letter-spacing]="track">{{ e.when }}</td>
            <td class="py-4 text-right tabular-nums">{{ e.price }}</td>
          </tr>
        }
      </tbody>
    </table>
  } @else if (published.length === 0) {
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
        We checked all {{ published.length }} published events for {{ describeSearch() }} and found no match. Try a city, a venue, or part of the title.
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

  published = EVENTS.filter((e) => e.status === "published");

  filters = [
    { id: "all", label: "All" },
    { id: "free", label: "Free" },
    { id: "paid", label: "Paid" },
  ];

  query = signal("");
  filter = signal("all");

  shown = computed(() => {
    const q = this.query().trim().toLowerCase();
    const f = this.filter();
    return this.published.filter((e) => {
      const matches =
        q === "" ||
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q);
      const priced =
        f === "all" || (f === "free" && e.isFree) || (f === "paid" && !e.isFree);
      return matches && priced;
    });
  });

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
    this.query.set("");
    this.filter.set("all");
  }
}
