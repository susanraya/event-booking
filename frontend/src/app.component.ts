import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet, type Routes } from "@angular/router";

import EventsScreen from "@/screens/events.component";
import EventDetailScreen from "@/screens/event-detail.component";
import MyBookingScreen from "@/screens/my-booking.component";
import OrganiserSignInScreen from "@/screens/organiser-sign-in.component";
import OrganiserEventsScreen from "@/screens/organiser-events.component";
import CheckInScreen from "@/screens/check-in.component";

/** The app's menu, drawn around every screen except the ones routed outside it. */
@Component({
  selector: "app-shell",
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="flex min-h-screen">
      <aside
        class="w-56 shrink-0 border-r p-4"
        style="background-color: var(--brand-surface); border-color: var(--brand-border)"
      >
        <p class="mb-4 px-3 text-sm font-semibold" style="font-family: var(--brand-font-heading)">
          Event booking
        </p>
        <nav aria-label="App menu" class="flex flex-col gap-1">
          <a
            routerLink="/events"
            routerLinkActive
            #link0="routerLinkActive"
            [class]="linkClass(link0.isActive)"
          >
            Events
          </a>
          <a
            routerLink="/event-detail"
            routerLinkActive
            #link1="routerLinkActive"
            [class]="linkClass(link1.isActive)"
          >
            Event &amp; Booking
          </a>
          <a
            routerLink="/my-booking"
            routerLinkActive
            #link2="routerLinkActive"
            [class]="linkClass(link2.isActive)"
          >
            My Booking
          </a>
          <a
            routerLink="/organiser-sign-in"
            routerLinkActive
            #link3="routerLinkActive"
            [class]="linkClass(link3.isActive)"
          >
            Organiser Sign In
          </a>
          <a
            routerLink="/organiser-events"
            routerLinkActive
            #link4="routerLinkActive"
            [class]="linkClass(link4.isActive)"
          >
            Organiser Events
          </a>
          <a
            routerLink="/check-in"
            routerLinkActive
            #link5="routerLinkActive"
            [class]="linkClass(link5.isActive)"
          >
            Door Check-In
          </a>
        </nav>
      </aside>
      <main class="flex-1 overflow-auto">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppShellComponent {
  protected linkClass(active: boolean): string {
    return [
      "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
      active ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
    ].join(" ");
  }
}

// Screens shown before sign-in, or hidden from the menu, are routed outside it.
export const routes: Routes = [
  {
    path: "",
    component: AppShellComponent,
    children: [
      { path: "events", component: EventsScreen },
      { path: "event-detail", component: EventDetailScreen },
      { path: "my-booking", component: MyBookingScreen },
      { path: "organiser-sign-in", component: OrganiserSignInScreen },
      { path: "organiser-events", component: OrganiserEventsScreen },
      { path: "check-in", component: CheckInScreen },
    ],
  },
  { path: "**", redirectTo: "/events" },
];

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {}
