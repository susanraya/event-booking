// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.

import { Component, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";
const template = `
<div class="min-h-screen w-full"
     [style.background-color]="brand.backgroundColor"
     [style.color]="brand.primaryColor"
     [style.font-family]="brand.fontBody">

  <div class="mx-auto w-full max-w-6xl px-6 py-10 lg:py-16">

    <!-- Top bar -->
    <div class="mb-10 flex flex-wrap items-center justify-between gap-4">
      <p class="flex items-baseline gap-3">
        <span class="text-[11px] uppercase tracking-[0.42em]" [style.color]="brand.accentColor">Quorq</span>
        <span class="text-lg" [style.font-family]="brand.fontHeading">Box Office</span>
      </p>
      <button uiButton variant="ghost" size="sm"
              class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              [style.outline-color]="brand.accentColor"
              [style.color]="brand.neutralColor"
              (click)="navigate('events')">
        <ui-icon name="ArrowLeft" class="mr-2 h-4 w-4" aria-hidden="true"></ui-icon>
        Back to public events
      </button>
    </div>

    <!-- Ticket -->
    <div class="relative grid overflow-hidden lg:grid-cols-12"
         [style.border-radius]="brand.radius"
         [style.border]="'1px solid rgba(255,255,255,0.11)'"
         [style.background-color]="'rgba(255,255,255,0.035)'">

      <!-- perforation between stub and form (signature motif) -->
      <div class="pointer-events-none absolute inset-y-6 hidden w-px lg:block"
           aria-hidden="true"
           [style.left]="'41.6667%'"
           [style.background-image]="'repeating-linear-gradient(to bottom, rgba(255,255,255,0.28) 0 5px, rgba(255,255,255,0) 5px 13px)'"></div>
      <div class="pointer-events-none absolute hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
           aria-hidden="true"
           [style.left]="'41.6667%'" [style.top]="'0px'"
           [style.background-color]="brand.backgroundColor"
           [style.border]="'1px solid rgba(255,255,255,0.11)'"></div>
      <div class="pointer-events-none absolute hidden h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full lg:block"
           aria-hidden="true"
           [style.left]="'41.6667%'" [style.bottom]="'0px'"
           [style.background-color]="brand.backgroundColor"
           [style.border]="'1px solid rgba(255,255,255,0.11)'"></div>

      <!-- Stub -->
      <div class="flex flex-col justify-between gap-10 p-8 lg:col-span-5 lg:p-12">
        <div>
          <p class="text-[11px] uppercase tracking-[0.34em]" [style.color]="brand.accentColor">Organiser entrance</p>
          <h2 class="mt-5 text-[26px] leading-[1.25]" [style.font-family]="brand.fontHeading">
            The door list, the seating chart and the draft you left open on Sunday.
          </h2>
          <p class="mt-4 max-w-[46ch] text-sm leading-relaxed" [style.color]="brand.neutralColor">
            Everything behind this stub belongs to the people who run the shows. Attendees book as guests
            and never need an account.
          </p>
        </div>

        <ul class="space-y-4">
          <li class="flex items-start gap-3">
            <ui-icon name="Calendar" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" [style.color]="brand.accentColor"></ui-icon>
            <span class="text-sm" [style.color]="brand.neutralColor">Draft, price, publish and unpublish events</span>
          </li>
          <li class="flex items-start gap-3">
            <ui-icon name="Users" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" [style.color]="brand.accentColor"></ui-icon>
            <span class="text-sm" [style.color]="brand.neutralColor">Seating charts down to Row C, Seat 12</span>
          </li>
          <li class="flex items-start gap-3">
            <ui-icon name="CheckCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" [style.color]="brand.accentColor"></ui-icon>
            <span class="text-sm" [style.color]="brand.neutralColor">Door scans and booking lookups, live</span>
          </li>
        </ul>

        <div>
          <hr uiSeparator class="mb-6" [style.border-color]="'rgba(255,255,255,0.11)'" />
          <p class="text-[10px] uppercase tracking-[0.34em]" [style.color]="brand.accentColor">
            Admit one &middot; Organiser access
          </p>
          <p class="mt-2 text-xs tabular" style="font-variant-numeric: tabular-nums;" [style.color]="brand.neutralColor">
            Serial no. 0042-QBO &middot; Release 2.4.1
          </p>

          <ul class="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <button type="button"
                      class="rounded text-xs underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      [style.outline-color]="brand.accentColor"
                      [style.color]="brand.neutralColor"
                      (click)="navigate('my-booking')">Find a booking</button>
            </li>
            <li>
              <button type="button"
                      class="rounded text-xs underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      [style.outline-color]="brand.accentColor"
                      [style.color]="brand.neutralColor"
                      (click)="navigate('check-in')">Door check-in</button>
            </li>
            <li>
              <button type="button"
                      class="rounded text-xs underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      [style.outline-color]="brand.accentColor"
                      [style.color]="brand.neutralColor"
                      (click)="navigate('events')">What's on</button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Form side -->
      <div class="border-t p-8 lg:col-span-7 lg:border-t-0 lg:p-12"
           [style.border-color]="'rgba(255,255,255,0.11)'"
           [style.background-color]="'rgba(255,255,255,0.025)'">

        <!-- Redirected-here notice (AC-033) -->
        @if (notice() && status() !== 'success') {
          <div class="velvet-rise mb-8 flex items-start gap-3 p-4"
               [style.border-radius]="brand.radius"
               [style.border]="'1px solid rgba(255,255,255,0.11)'"
               [style.background-color]="'rgba(255,255,255,0.03)'">
            <ui-icon name="Clock" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" [style.color]="brand.accentColor"></ui-icon>
            <div class="min-w-0 flex-1">
              <p class="text-sm leading-relaxed">
                You were sent here from <span [style.color]="brand.accentColor">Organiser events</span>.
                Your session closed after 30 minutes idle &mdash; sign in and we'll take you straight back.
              </p>
            </div>
            <button type="button" aria-label="Dismiss session notice"
                    class="rounded p-1 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    [style.outline-color]="brand.accentColor"
                    [style.color]="brand.neutralColor"
                    (click)="notice.set(false)">
              <ui-icon name="X" class="h-4 w-4" aria-hidden="true"></ui-icon>
            </button>
          </div>
        }

        <h1 class="text-[32px] leading-tight lg:text-[38px]" [style.font-family]="brand.fontHeading">
          Organiser sign in
        </h1>
        <p class="mt-3 max-w-[58ch] text-sm leading-relaxed" [style.color]="brand.neutralColor">
          Use the email and password on your organiser account at Quorq Box Office.
        </p>

        <div class="mt-6 h-px w-16" [style.background-color]="brand.accentColor" aria-hidden="true"></div>

        @switch (status()) {

          @case ('success') {
            <div class="velvet-rise mt-8 p-6"
                 [style.border-radius]="brand.radius"
                 [style.border]="'1px solid rgba(143,174,139,0.45)'"
                 [style.background-color]="'rgba(143,174,139,0.08)'">
              <p class="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em]" [style.color]="brand.accentColor">
                <ui-icon name="CheckCircle" class="h-4 w-4" aria-hidden="true"></ui-icon>
                Signed in
              </p>
              <div class="mt-5 flex items-center gap-4">
                <ui-avatar [name]="organiser().name"></ui-avatar>
                <div class="min-w-0">
                  <p class="truncate text-lg" [style.font-family]="brand.fontHeading">{{ organiser().name }}</p>
                  <p class="truncate text-sm" [style.color]="brand.neutralColor">{{ organiser().email }}</p>
                </div>
              </div>
              <div class="mt-7 flex flex-wrap items-center gap-3">
                <button uiButton size="lg"
                        class="transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        [style.outline-color]="brand.accentColor"
                        [style.background-color]="brand.accentColor"
                        [style.color]="brand.backgroundColor"
                        (click)="navigate('organiser-events')">
                  Open organiser dashboard
                  <ui-icon name="ChevronRight" class="ml-2 h-4 w-4" aria-hidden="true"></ui-icon>
                </button>
                <button uiButton variant="ghost" size="lg"
                        class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        [style.outline-color]="brand.accentColor"
                        [style.color]="brand.neutralColor"
                        (click)="signOut()">
                  Not you? Sign out
                </button>
              </div>
            </div>
          }

          @default {
            <form class="mt-8" (ngSubmit)="submit()" novalidate>

              @if (status() === 'error') {
                <div role="alert"
                     class="velvet-rise mb-7 flex items-start gap-3 p-4"
                     [style.border-radius]="brand.radius"
                     [style.border]="'1px solid rgba(255,255,255,0.18)'"
                     [style.background-color]="'rgba(255,255,255,0.05)'">
                  <ui-icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" [style.color]="brand.accentColor"></ui-icon>
                  <div>
                    <p class="text-sm font-medium">{{ errorMessage() }}</p>
                    <p class="mt-1 text-sm" [style.color]="brand.neutralColor">
                      Nothing has been cleared &mdash; edit and send it again.
                    </p>
                  </div>
                </div>
              }

              <div class="space-y-6">
                <div>
                  <label uiLabel for="organiser-email"
                         class="mb-2 block text-[11px] uppercase tracking-[0.22em]"
                         [style.color]="brand.neutralColor">Email address</label>
                  <input uiInput id="organiser-email" type="email" name="organiser-email"
                         autocomplete="email" spellcheck="false"
                         class="w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                         placeholder="you&#64;quorq.ai"
                         [style.outline-color]="brand.accentColor"
                         [style.background-color]="'rgba(255,255,255,0.04)'"
                         [style.border]="emailError() ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.14)'"
                         [style.color]="brand.primaryColor"
                         [disabled]="status() === 'loading'"
                         [attr.aria-invalid]="emailError() ? 'true' : null"
                         [attr.aria-describedby]="emailError() ? 'organiser-email-error' : null"
                         [ngModelOptions]="{standalone: true}"
                         [(ngModel)]="email" />
                  @if (emailError()) {
                    <p id="organiser-email-error" class="velvet-rise mt-2 flex items-center gap-2 text-sm">
                      <ui-icon name="AlertCircle" class="h-3.5 w-3.5 shrink-0" aria-hidden="true" [style.color]="brand.accentColor"></ui-icon>
                      {{ emailError() }}
                    </p>
                  }
                </div>

                <div>
                  <label uiLabel for="organiser-password"
                         class="mb-2 block text-[11px] uppercase tracking-[0.22em]"
                         [style.color]="brand.neutralColor">Password</label>
                  <div class="relative">
                    <input uiInput id="organiser-password" name="organiser-password"
                           autocomplete="current-password"
                           class="w-full pr-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                           [type]="showPassword() ? 'text' : 'password'"
                           [style.outline-color]="brand.accentColor"
                           [style.background-color]="'rgba(255,255,255,0.04)'"
                           [style.border]="passwordError() ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.14)'"
                           [style.color]="brand.primaryColor"
                           [disabled]="status() === 'loading'"
                           [attr.aria-invalid]="passwordError() ? 'true' : null"
                           [attr.aria-describedby]="passwordError() ? 'organiser-password-error' : null"
                           [ngModelOptions]="{standalone: true}"
                           [(ngModel)]="password" />
                    <button type="button"
                            class="absolute right-2 top-1/2 h-9 -translate-y-1/2 rounded px-2 text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            [style.outline-color]="brand.accentColor"
                            [style.color]="brand.accentColor"
                            [attr.aria-pressed]="showPassword()"
                            [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
                            [disabled]="status() === 'loading'"
                            (click)="showPassword.set(!showPassword())">
                      {{ showPassword() ? 'Hide' : 'Show' }}
                    </button>
                  </div>
                  @if (passwordError()) {
                    <p id="organiser-password-error" class="velvet-rise mt-2 flex items-center gap-2 text-sm">
                      <ui-icon name="AlertCircle" class="h-3.5 w-3.5 shrink-0" aria-hidden="true" [style.color]="brand.accentColor"></ui-icon>
                      {{ passwordError() }}
                    </p>
                  }
                </div>

                <div class="flex items-center gap-3">
                  <input type="checkbox" uiCheckbox id="keep-signed-in"
                         class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                         [style.outline-color]="brand.accentColor"
                         [disabled]="status() === 'loading'"
                         [ngModelOptions]="{standalone: true}"
                         [(ngModel)]="remember" />
                  <label uiLabel for="keep-signed-in" class="text-sm" [style.color]="brand.neutralColor">
                    Keep me signed in on this device for 14 days
                  </label>
                </div>
              </div>

              <button uiButton type="submit" size="lg"
                      class="mt-8 w-full transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      [style.outline-color]="brand.accentColor"
                      [style.background-color]="brand.accentColor"
                      [style.color]="brand.backgroundColor"
                      [disabled]="status() === 'loading'">
                @if (status() === 'loading') {
                  <span class="flex items-center justify-center gap-2">
                    <span class="flex gap-1" aria-hidden="true">
                      <span class="h-1.5 w-1.5 animate-pulse rounded-full"
                            [style.background-color]="brand.backgroundColor" [style.animation-delay]="'0ms'"></span>
                      <span class="h-1.5 w-1.5 animate-pulse rounded-full"
                            [style.background-color]="brand.backgroundColor" [style.animation-delay]="'160ms'"></span>
                      <span class="h-1.5 w-1.5 animate-pulse rounded-full"
                            [style.background-color]="brand.backgroundColor" [style.animation-delay]="'320ms'"></span>
                    </span>
                    Checking your credentials&hellip;
                  </span>
                } @else {
                  <span class="flex items-center justify-center gap-2">
                    Sign in to the dashboard
                    <ui-icon name="ChevronRight" class="h-4 w-4" aria-hidden="true"></ui-icon>
                  </span>
                }
              </button>

              <p class="mt-5 text-sm leading-relaxed" [style.color]="brand.neutralColor">
                Forgotten your password? Priya Menon (priya.menon&#64;quorq.ai) owns this box office and can send a
                reset link. Door staff don't sign in &mdash; they open
                <button type="button"
                        class="rounded underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        [style.outline-color]="brand.accentColor"
                        [style.color]="brand.accentColor"
                        (click)="navigate('check-in')">the check-in page</button>.
              </p>
            </form>
          }
        }
      </div>
    </div>

    <p class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" [style.color]="brand.neutralColor">
      <span class="inline-block h-1.5 w-1.5 rounded-full" aria-hidden="true" [style.background-color]="brand.accentColor"></span>
      <span>Box office services operating normally</span>
      <span aria-hidden="true">&middot;</span>
      <span style="font-variant-numeric: tabular-nums;">Hosted in Mumbai, ap-south-1 &middot; {{ checkedAt }}</span>
    </p>
  </div>

  <style>
    .velvet-rise { animation: velvet-rise 280ms cubic-bezier(0.22, 0.61, 0.36, 1) both; }
    @keyframes velvet-rise {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .velvet-rise { animation: none; }
    }
  </style>
</div>
`;

@Component({
  selector: "app-organiser-sign-in-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase {
  organiser = signal({ name: "", email: "" });

  checkedAt = "checked 4 Nov 2026, 09:12 IST";

  email = signal("");
  password = signal("");
  remember = signal(false);
  showPassword = signal(false);
  submitted = signal(false);
  notice = signal(true);
  errorMessage = signal("");
  // idle | invalid | loading | error | success
  status = signal("idle");

  emailError = computed(() => {
    if (!this.submitted()) return "";
    const value = this.email().trim();
    if (!value) return "Enter the email address on your organiser account.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "That does not look like an email address — check for a typo.";
    return "";
  });

  passwordError = computed(() => {
    if (!this.submitted()) return "";
    if (!this.password()) return "Enter your password to continue.";
    return "";
  });

  async submit() {
    if (this.status() === "loading") return;
    this.submitted.set(true);

    if (this.emailError() || this.passwordError()) {
      this.status.set("invalid");
      return;
    }

    this.status.set("loading");
    try {
      const result = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: this.email().trim(), password: this.password() }),
      });
      setToken(result.token);
      this.organiser.set(result.organiser ?? { name: "", email: this.email().trim() });
      this.notice.set(false);
      this.status.set("success");
      this.navigate("organiser-events");
    } catch (e) {
      // AC-032: one generic message, taken from the server, that never says which field
      // was wrong or whether the email exists.
      this.errorMessage.set(
        e instanceof Error && e.message
          ? e.message
          : "That email and password don't match an organiser account.",
      );
      this.status.set("error");
    }
  }

  signOut() {
    this.password.set("");
    this.submitted.set(false);
    this.showPassword.set(false);
    this.status.set("idle");
  }
}
