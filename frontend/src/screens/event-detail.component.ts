// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.

import { Component, signal, computed, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
import { apiFetch, ApiError } from "@/lib/api";
const template = `
<style>
  .vt-focus:focus-visible{outline:2px solid var(--vt-accent, #8fae8b);outline-offset:2px;border-radius:4px}
  .vt-seat-free:hover{background-color:rgba(143,174,139,.20)!important;border-color:rgba(143,174,139,.55)!important}
  .vt-primary:hover{filter:brightness(1.07)}
  .vt-rise{animation:vtRise .45s cubic-bezier(.2,.7,.3,1) both}
  @keyframes vtRise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
  .vt-fade{animation:vtFade .3s ease-out both}
  @keyframes vtFade{from{opacity:0}to{opacity:1}}
  .vt-chip{animation:vtChip .22s ease-out both}
  @keyframes vtChip{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){.vt-rise,.vt-fade,.vt-chip{animation:none}}
</style>

<div class="min-h-screen pb-20"
     [style.--vt-accent]="brand.accentColor"
     [style.background-color]="brand.backgroundColor"
     [style.color]="brand.primaryColor"
     [style.font-family]="brand.fontBody">
  <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">

    <nav aria-label="Breadcrumb" class="mb-6">
      <button uiButton variant="ghost" size="sm" class="vt-focus -ml-2 gap-2"
              [style.color]="brand.neutralColor" (click)="navigate('events')">
        <ui-icon name="ArrowLeft" class="h-4 w-4" aria-hidden="true"></ui-icon>
        All events
      </button>
    </nav>

    @if (status() === 'loading') {
      <section class="mx-auto max-w-xl py-16 text-center vt-fade" role="status" aria-live="polite">
        <p class="text-sm leading-relaxed" [style.color]="brand.neutralColor">Loading this event…</p>
      </section>
    } @else if (status() === 'notfound') {
      <section class="mx-auto max-w-xl py-16 text-center vt-fade">
        <span class="inline-flex h-11 w-11 items-center justify-center rounded-full border"
              [style.border-color]="hairline" [style.background-color]="surface">
          <ui-icon name="AlertCircle" class="h-5 w-5" aria-hidden="true" [style.color]="warn"></ui-icon>
        </span>
        <h1 class="mt-6 text-3xl sm:text-4xl" [style.font-family]="brand.fontHeading">This event isn't available</h1>
        <p class="mt-4 text-sm leading-relaxed" [style.color]="brand.neutralColor">
          This event can't be viewed or booked right now.
          Any booking you already hold stays valid — look it up with your reference and email.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <button uiButton class="vt-focus vt-primary" [style.background-color]="brand.accentColor"
                  [style.color]="brand.backgroundColor" (click)="navigate('events')">Browse published events</button>
          <button uiButton variant="secondary" class="vt-focus" [style.background-color]="'transparent'"
                  [style.border-color]="hairline" [style.color]="brand.primaryColor"
                  (click)="navigate('my-booking')">Find my booking</button>
        </div>
      </section>
    } @else if (status() === 'error') {
      <section class="mx-auto max-w-xl py-16 text-center vt-fade" role="alert">
        <h1 class="mt-6 text-3xl sm:text-4xl" [style.font-family]="brand.fontHeading">We couldn't load this event</h1>
        <p class="mt-4 text-sm leading-relaxed" [style.color]="brand.neutralColor">
          Something went wrong reaching the ticket office. Please check your connection and try again.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <button uiButton class="vt-focus vt-primary" [style.background-color]="brand.accentColor"
                  [style.color]="brand.backgroundColor" (click)="loadEvent()">Try again</button>
          <button uiButton variant="secondary" class="vt-focus" [style.background-color]="'transparent'"
                  [style.border-color]="hairline" [style.color]="brand.primaryColor"
                  (click)="navigate('events')">Browse events</button>
        </div>
      </section>
    } @else {

      <header class="mb-8">
        <p class="text-[11px] uppercase tracking-[0.24em]" [style.color]="brand.accentColor">
          {{ event().organiser }} · one night only
        </p>
        <h1 class="mt-3 text-4xl sm:text-5xl leading-[1.1] max-w-3xl" [style.font-family]="brand.fontHeading">
          {{ event().title }}
        </h1>
        <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm" [style.color]="brand.neutralColor">
          <span class="inline-flex items-center gap-2">
            <ui-icon name="Calendar" class="h-4 w-4" aria-hidden="true"></ui-icon>{{ event().start_datetime }}
          </span>
          <span class="inline-flex items-center gap-2">
            <ui-icon name="Clock" class="h-4 w-4" aria-hidden="true"></ui-icon>Doors {{ event().doors }}
          </span>
          <span class="inline-flex items-center gap-2">
            <ui-icon name="Home" class="h-4 w-4" aria-hidden="true"></ui-icon>{{ event().venue }}
          </span>
          <span uiBadge variant="success">Published</span>
        </div>
      </header>

      <div class="mb-10 grid grid-cols-1 sm:grid-cols-3 rounded-[6px] border divide-y sm:divide-y-0 sm:divide-x"
           [style.border-color]="hairline" [style.background-color]="surface"
           [style.borderColor]="hairline">
        <div class="px-6 py-5" [style.font-variant-numeric]="'tabular-nums'">
          <ui-stat label="Tickets from" [value]="priceLabel()" hint="Rear stalls, rows G–H"></ui-stat>
        </div>
        <div class="px-6 py-5" [style.border-color]="hairlineSoft" [style.font-variant-numeric]="'tabular-nums'">
          <ui-stat label="Seats available" [value]="seatsAvailable() + ''" hint="Updated {{ lastSync() }}"></ui-stat>
        </div>
        <div class="px-6 py-5" [style.border-color]="hairlineSoft" [style.font-variant-numeric]="'tabular-nums'">
          <ui-stat label="Hold window" value="7 min" hint="Seats are locked while you check out"></ui-stat>
        </div>
      </div>

      <div class="mb-10">
        @if (seatsAvailable() > 0) {
          <button uiButton class="vt-focus vt-primary" [style.background-color]="brand.accentColor"
                  [style.color]="brand.backgroundColor" (click)="selectSeats()">Select seats</button>
        } @else {
          <button uiButton class="vt-focus" disabled [style.background-color]="'rgba(255,255,255,0.08)'"
                  [style.color]="brand.neutralColor" aria-disabled="true">Select seats</button>
          <p class="mt-3 text-sm leading-relaxed" [style.color]="brand.neutralColor">
            This event is sold out — there are no seats left to book right now.
          </p>
        }
      </div>

      <ol class="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.18em]">
        @for (s of steps; track s.key) {
          <li class="flex items-center gap-3" [attr.aria-current]="stepIndex() === s.index ? 'step' : null">
            <span class="flex items-center gap-2"
                  [style.color]="stepIndex() >= s.index ? brand.primaryColor : brand.neutralColor">
              <span class="inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px]"
                    [style.border-color]="stepIndex() >= s.index ? brand.accentColor : hairline"
                    [style.background-color]="stepIndex() > s.index ? brand.accentColor : 'transparent'"
                    [style.color]="stepIndex() > s.index ? brand.backgroundColor : brand.primaryColor"
                    [style.font-variant-numeric]="'tabular-nums'">
                @if (stepIndex() > s.index) {
                  <ui-icon name="Check" class="h-3 w-3" aria-hidden="true"></ui-icon>
                } @else { {{ s.index + 1 }} }
              </span>
              {{ s.label }}
            </span>
            @if (!s.last) {
              <ui-icon name="ChevronRight" class="h-3.5 w-3.5" aria-hidden="true" [style.color]="hairline"></ui-icon>
            }
          </li>
        }
      </ol>

      @if (step() === 'ticket') {
        <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8 lg:gap-12 vt-rise">
          <section aria-labelledby="confirmed-h">
            <span class="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
                  [style.color]="brand.accentColor">
              <ui-icon name="CheckCircle" class="h-4 w-4" aria-hidden="true"></ui-icon>
              Booking confirmed
            </span>
            <h2 id="confirmed-h" class="mt-4 text-3xl sm:text-4xl leading-tight" [style.font-family]="brand.fontHeading">
              You're in, {{ booking().guest_name }}.
            </h2>
            <p class="mt-4 max-w-prose text-sm leading-relaxed" [style.color]="brand.neutralColor">
              Your seats are booked and no longer available to anyone else. We've emailed the reference,
              seat details and the QR ticket to <span [style.color]="brand.primaryColor">{{ booking().guest_email }}</span>.
              Notifications for this booking go by email only — we don't send SMS.
            </p>

            <dl class="mt-8 rounded-[6px] border divide-y" [style.border-color]="hairline"
                [style.background-color]="surface" [style.font-variant-numeric]="'tabular-nums'">
              <div class="flex items-baseline justify-between gap-6 px-5 py-4" [style.border-color]="hairlineSoft">
                <dt class="text-[11px] uppercase tracking-[0.18em]" [style.color]="brand.neutralColor">Booking reference</dt>
                <dd class="text-lg tracking-[0.18em]" [style.color]="brand.accentColor">{{ booking().reference }}</dd>
              </div>
              <div class="flex items-baseline justify-between gap-6 px-5 py-4" [style.border-color]="hairlineSoft">
                <dt class="text-[11px] uppercase tracking-[0.18em]" [style.color]="brand.neutralColor">Seats</dt>
                <dd class="text-sm text-right">{{ bookedSeatSummary() }}</dd>
              </div>
              <div class="flex items-baseline justify-between gap-6 px-5 py-4" [style.border-color]="hairlineSoft">
                <dt class="text-[11px] uppercase tracking-[0.18em]" [style.color]="brand.neutralColor">Amount due</dt>
                <dd class="text-sm">{{ money(booking().total_minor) }} · payable to Mehfil Live at the door</dd>
              </div>
              <div class="flex items-baseline justify-between gap-6 px-5 py-4" [style.border-color]="hairlineSoft">
                <dt class="text-[11px] uppercase tracking-[0.18em]" [style.color]="brand.neutralColor">Booked</dt>
                <dd class="text-sm">{{ booking().created_at }}</dd>
              </div>
            </dl>

            <p class="mt-5 text-xs leading-relaxed" [style.color]="brand.neutralColor">
              Consent recorded against notice {{ booking().consent_notice_version }} at {{ booking().consent_at }}.
              Adult confirmation on file.
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <button uiButton class="vt-focus vt-primary" [style.background-color]="brand.accentColor"
                      [style.color]="brand.backgroundColor" (click)="navigate('my-booking')">
                Open my booking
              </button>
              <button uiButton variant="secondary" class="vt-focus" [style.background-color]="'transparent'"
                      [style.border-color]="hairline" [style.color]="brand.primaryColor"
                      (click)="navigate('events')">Browse more events</button>
            </div>
          </section>

          <section aria-labelledby="ticket-h" class="lg:pt-2">
            <h3 id="ticket-h" class="sr-only">Your scannable ticket</h3>
            <div class="relative rounded-[6px] overflow-visible"
                 [style.background-color]="brand.primaryColor" [style.color]="brand.backgroundColor">
              <div class="px-6 pt-6 pb-5">
                <p class="text-[10px] uppercase tracking-[0.26em]" [style.color]="stubMuted">Mehfil Live · admit {{ booking().seats.length }}</p>
                <p class="mt-2 text-xl leading-snug" [style.font-family]="brand.fontHeading">{{ event().title }}</p>
                <p class="mt-1 text-xs" [style.color]="stubMuted">{{ event().start_datetime }} · {{ event().venue }}</p>
                <ul class="mt-4 flex flex-wrap gap-1.5">
                  @for (s of booking().seats; track s.id) {
                    <li class="rounded-[4px] border px-2 py-1 text-[11px]"
                        [style.border-color]="stubRule" [style.font-variant-numeric]="'tabular-nums'">
                      Row {{ s.row_label }}, Seat {{ s.seat_number }}
                    </li>
                  }
                </ul>
              </div>

              <div class="relative">
                <span class="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full"
                      [style.background-color]="brand.backgroundColor" aria-hidden="true"></span>
                <span class="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full"
                      [style.background-color]="brand.backgroundColor" aria-hidden="true"></span>
                <hr class="mx-5 border-0 border-t border-dashed" [style.border-color]="stubRule">
              </div>

              <div class="px-6 pt-6 pb-7">
                <div class="mx-auto w-full max-w-[220px] grid gap-0"
                     role="img"
                     [attr.aria-label]="'QR ticket for booking ' + booking().reference + '. Show this at the door.'"
                     [style.grid-template-columns]="'repeat(25, minmax(0,1fr))'">
                  @for (qrow of qrMatrix(); track $index) {
                    @for (cell of qrow; track $index) {
                      <span class="block aspect-square"
                            [style.background-color]="cell ? brand.backgroundColor : 'transparent'"></span>
                    }
                  }
                </div>
                <p class="mt-5 text-center text-lg tracking-[0.3em]" [style.font-variant-numeric]="'tabular-nums'">
                  {{ booking().reference }}
                </p>
                <p class="mt-1 text-center text-[11px]" [style.color]="stubMuted">
                  Show this screen or your email at the door
                </p>
              </div>
            </div>
          </section>
        </div>
      } @else {

        <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-8 lg:gap-12">
          <div class="min-w-0">

            @if (step() === 'seats') {
              <section uiCard class="mb-8" [style.background-color]="surface" [style.border-color]="hairline">
                <div uiCardHeader class="pb-2">
                  <h2 uiCardTitle class="text-2xl" [style.font-family]="brand.fontHeading">About this evening</h2>
                  <p uiCardDescription [style.color]="brand.neutralColor">
                    {{ event().is_free ? 'Free entry' : 'Tickets from ' + priceLabel() }} · 96 seats · rows A–H
                  </p>
                </div>
                <div uiCardContent class="pt-4">
                  <ui-tabs [tabs]="infoTabs" [(value)]="infoTab"></ui-tabs>
                  <div class="pt-6 text-sm leading-relaxed vt-fade" [style.color]="brand.neutralColor">
                    @switch (infoTab()) {
                      @case ('about') {
                        <p class="max-w-prose">{{ event().description }}</p>
                      }
                      @case ('venue') {
                        <address class="not-italic max-w-prose">{{ event().venue }}</address>
                      }
                      @case ('tickets') {
                        <table uiTable class="w-full" [style.font-variant-numeric]="'tabular-nums'">
                          <caption class="sr-only">Ticket prices by seating tier</caption>
                          <thead uiTHead>
                            <tr uiTR>
                              <th uiTH scope="col">Tier</th>
                              <th uiTH scope="col">Rows</th>
                              <th uiTH scope="col" class="text-right">Price per seat</th>
                            </tr>
                          </thead>
                          <tbody uiTBody>
                            @for (t of tiers; track t.name) {
                              <tr uiTR [style.border-color]="hairlineSoft">
                                <td uiTD [style.color]="brand.primaryColor">{{ t.name }}</td>
                                <td uiTD>{{ t.rows }}</td>
                                <td uiTD class="text-right">{{ money(t.price_minor) }}</td>
                              </tr>
                            }
                          </tbody>
                        </table>
                        <p class="mt-5 max-w-prose">
                          Payment is settled with Mehfil Live at the venue or by UPI after booking — this app never takes
                          a card payment, so your seats are confirmed the moment you submit the form.
                        </p>
                        <p class="mt-3 max-w-prose">{{ event().cancellation_policy }}</p>
                      }
                    }
                  </div>
                </div>
              </section>

              <section uiCard [style.background-color]="surface" [style.border-color]="hairline">
                <div uiCardHeader class="pb-2">
                  <h2 uiCardTitle class="text-2xl" [style.font-family]="brand.fontHeading">Choose your seats</h2>
                  <p uiCardDescription [style.color]="brand.neutralColor">
                    Stalls, rows A to H, twelve seats a row. Up to {{ maxSeats }} seats in one booking.
                  </p>
                </div>

                <div uiCardContent class="pt-5">
                  <div class="mx-auto max-w-xl">
                    <div class="h-10 rounded-t-full border-t border-x flex items-end justify-center pb-1.5"
                         [style.border-color]="brand.accentColor"
                         [style.background-color]="'rgba(143,174,139,0.07)'">
                      <span class="text-[10px] uppercase tracking-[0.4em]" [style.color]="brand.accentColor">Stage</span>
                    </div>
                  </div>

                  <div class="mt-8 transition-opacity duration-200"
                       [class.opacity-40]="syncing()"
                       [attr.aria-busy]="syncing() ? 'true' : 'false'">
                    <div class="space-y-2 overflow-x-auto pb-1">
                      @for (row of rowsView(); track row.label) {
                        <div class="flex items-center gap-3 min-w-[460px]">
                          <span class="w-5 shrink-0 text-center text-xs" [style.color]="brand.neutralColor" aria-hidden="true">{{ row.label }}</span>
                          <div class="flex gap-1.5">
                            @for (s of row.seats; track s.id) {
                              <button type="button"
                                      class="vt-focus h-8 w-8 shrink-0 rounded-[4px] border text-[10px] transition-colors duration-150"
                                      [class.vt-seat-free]="s.state === 'available'"
                                      [class.cursor-not-allowed]="s.state === 'booked' || s.state === 'held'"
                                      [style.background-color]="seatBg(s.state)"
                                      [style.border-color]="seatBorder(s.state)"
                                      [style.border-style]="s.state === 'held' ? 'dashed' : 'solid'"
                                      [style.color]="seatFg(s.state)"
                                      [style.font-variant-numeric]="'tabular-nums'"
                                      [attr.aria-pressed]="s.state === 'selected' ? 'true' : (s.state === 'available' ? 'false' : null)"
                                      [attr.aria-disabled]="s.state === 'booked' || s.state === 'held' ? 'true' : null"
                                      [attr.aria-label]="seatAria(s)"
                                      (click)="toggleSeat(s)">
                                @if (s.state === 'booked') { <span aria-hidden="true">&#215;</span> }
                                @else { <span aria-hidden="true">{{ s.seat_number }}</span> }
                              </button>
                            }
                          </div>
                          <span class="ml-auto hidden sm:block text-[11px] pl-4" [style.color]="brand.neutralColor"
                                [style.font-variant-numeric]="'tabular-nums'">{{ money(row.price_minor) }}</span>
                        </div>
                      }
                    </div>
                  </div>

                  <ul class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px]" [style.color]="brand.neutralColor">
                    @for (l of legend; track l.key) {
                      <li class="flex items-center gap-2">
                        <span class="h-4 w-4 rounded-[3px] border inline-flex items-center justify-center text-[9px]"
                              [style.background-color]="seatBg(l.key)"
                              [style.border-color]="seatBorder(l.key)"
                              [style.border-style]="l.key === 'held' ? 'dashed' : 'solid'"
                              [style.color]="seatFg(l.key)"
                              aria-hidden="true">{{ l.glyph }}</span>
                        {{ l.label }}
                      </li>
                    }
                  </ul>

                  <p class="mt-5 min-h-[20px] text-xs" aria-live="polite"
                     [style.color]="noticeTone() === 'warn' ? warn : brand.accentColor">
                    @if (seatNotice()) {
                      <span class="inline-flex items-start gap-2">
                        <ui-icon [name]="noticeTone() === 'warn' ? 'AlertCircle' : 'CheckCircle'" class="h-4 w-4 shrink-0 mt-px" aria-hidden="true"></ui-icon>
                        {{ seatNotice() }}
                      </span>
                    }
                  </p>
                </div>

                <div uiCardFooter class="flex flex-wrap items-center justify-between gap-4 border-t pt-5" [style.border-color]="hairlineSoft">
                  <p class="text-xs" [style.color]="brand.neutralColor">
                    @if (syncing()) {
                      <span class="animate-pulse">Checking the latest availability…</span>
                    } @else {
                      Seat map updated {{ lastSync() }} · holds release automatically after 7 minutes
                    }
                  </p>
                  <button uiButton variant="ghost" size="sm" class="vt-focus gap-2"
                          [style.color]="brand.primaryColor" [disabled]="syncing()" (click)="refreshSeats()">
                    <ui-icon name="Upload" class="h-4 w-4 rotate-180" aria-hidden="true"></ui-icon>
                    Refresh availability
                  </button>
                </div>
              </section>
            }

            @if (step() === 'details') {
              @if (holdExpired()) {
                <section uiCard class="vt-fade" [style.background-color]="surface" [style.border-color]="hairline">
                  <div uiCardContent class="py-12 text-center">
                    <span class="inline-flex h-11 w-11 items-center justify-center rounded-full border"
                          [style.border-color]="hairline" [style.background-color]="surfaceRaised">
                      <ui-icon name="Clock" class="h-5 w-5" aria-hidden="true" [style.color]="warn"></ui-icon>
                    </span>
                    <h2 class="mt-5 text-2xl" [style.font-family]="brand.fontHeading">Your seat hold ran out</h2>
                    <p class="mt-3 mx-auto max-w-sm text-sm leading-relaxed" [style.color]="brand.neutralColor">
                      We held {{ expiredSeatsLabel() }} for seven minutes and have now put them back in the pool so
                      others can book them. Nothing was charged. Pick again — they may still be free.
                    </p>
                    <button uiButton class="vt-focus vt-primary mt-7" [style.background-color]="brand.accentColor"
                            [style.color]="brand.backgroundColor" (click)="restartSelection()">
                      Choose seats again
                    </button>
                  </div>
                </section>
              } @else {
                <section uiCard class="vt-fade" [style.background-color]="surface" [style.border-color]="hairline">
                  <div uiCardHeader class="pb-2">
                    <h2 uiCardTitle class="text-2xl" [style.font-family]="brand.fontHeading">Your details</h2>
                    <p uiCardDescription [style.color]="brand.neutralColor">
                      No account needed. We use these three fields to issue and deliver your ticket.
                    </p>
                  </div>

                  <div uiCardContent class="pt-5">
                    @if (errorList().length) {
                      <div role="alert" class="mb-7 rounded-[6px] border px-5 py-4 vt-fade"
                           [style.border-color]="danger" [style.background-color]="'rgba(201,139,116,0.09)'">
                        <p class="flex items-center gap-2 text-sm" [style.color]="brand.primaryColor">
                          <ui-icon name="AlertCircle" class="h-4 w-4" aria-hidden="true" [style.color]="danger"></ui-icon>
                          We couldn't confirm this booking yet
                        </p>
                        <ul class="mt-2 ml-6 list-disc space-y-1 text-xs" [style.color]="brand.neutralColor">
                          @for (e of errorList(); track e) { <li>{{ e }}</li> }
                        </ul>
                        <p class="mt-2 ml-6 text-xs" [style.color]="brand.neutralColor">
                          Everything you typed is still here — fix the lines above and submit again.
                        </p>
                      </div>
                    }

                    <form novalidate (ngSubmit)="submitBooking()">
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label uiLabel for="guest_name" class="text-[11px] uppercase tracking-[0.18em]"
                                 [style.color]="brand.neutralColor">Full name</label>
                          <input uiInput id="guest_name" name="guest_name" class="vt-focus mt-2 w-full"
                                 type="text" autocomplete="name" placeholder="As it should read on the ticket"
                                 [(ngModel)]="guestName"
                                 [attr.aria-invalid]="errors().guest_name ? 'true' : null"
                                 [attr.aria-describedby]="errors().guest_name ? 'err-name' : null"
                                 [style.background-color]="inputBg" [style.border-color]="errors().guest_name ? danger : hairline"
                                 [style.color]="brand.primaryColor">
                          @if (errors().guest_name) {
                            <p id="err-name" class="mt-2 text-xs" [style.color]="danger">{{ errors().guest_name }}</p>
                          }
                        </div>
                        <div>
                          <label uiLabel for="guest_phone" class="text-[11px] uppercase tracking-[0.18em]"
                                 [style.color]="brand.neutralColor">Mobile number</label>
                          <input uiInput id="guest_phone" name="guest_phone" class="vt-focus mt-2 w-full"
                                 type="tel" autocomplete="tel" placeholder="10 digits, e.g. 98200 41133"
                                 [(ngModel)]="guestPhone"
                                 [attr.aria-invalid]="errors().guest_phone ? 'true' : null"
                                 [attr.aria-describedby]="errors().guest_phone ? 'err-phone' : 'hint-phone'"
                                 [style.background-color]="inputBg" [style.border-color]="errors().guest_phone ? danger : hairline"
                                 [style.color]="brand.primaryColor" [style.font-variant-numeric]="'tabular-nums'">
                          @if (errors().guest_phone) {
                            <p id="err-phone" class="mt-2 text-xs" [style.color]="danger">{{ errors().guest_phone }}</p>
                          } @else {
                            <p id="hint-phone" class="mt-2 text-xs" [style.color]="brand.neutralColor">Used only if the venue needs to reach you on the night.</p>
                          }
                        </div>
                        <div class="sm:col-span-2">
                          <label uiLabel for="guest_email" class="text-[11px] uppercase tracking-[0.18em]"
                                 [style.color]="brand.neutralColor">Email for your ticket</label>
                          <input uiInput id="guest_email" name="guest_email" class="vt-focus mt-2 w-full"
                                 type="email" autocomplete="email" placeholder="you@example.com"
                                 [(ngModel)]="guestEmail"
                                 [attr.aria-invalid]="errors().guest_email ? 'true' : null"
                                 [attr.aria-describedby]="errors().guest_email ? 'err-email' : 'hint-email'"
                                 [style.background-color]="inputBg" [style.border-color]="errors().guest_email ? danger : hairline"
                                 [style.color]="brand.primaryColor">
                          @if (errors().guest_email) {
                            <p id="err-email" class="mt-2 text-xs" [style.color]="danger">{{ errors().guest_email }}</p>
                          } @else {
                            <p id="hint-email" class="mt-2 text-xs" [style.color]="brand.neutralColor">
                              Your reference and QR ticket arrive here. You'll need this email to look the booking up later.
                            </p>
                          }
                        </div>
                      </div>

                      <div class="mt-8 rounded-[6px] border p-5" [style.border-color]="hairline" [style.background-color]="surfaceRaised">
                        <h3 class="text-[11px] uppercase tracking-[0.2em]" [style.color]="brand.accentColor">
                          Data processing notice · {{ consentVersion }}
                        </h3>
                        <ul class="mt-4 space-y-2 text-xs leading-relaxed" [style.color]="brand.neutralColor">
                          <li><span [style.color]="brand.primaryColor">Name</span> — printed on your ticket and checked at the door.</li>
                          <li><span [style.color]="brand.primaryColor">Email</span> — to send your booking reference, QR ticket and any cancellation notice.</li>
                          <li><span [style.color]="brand.primaryColor">Phone</span> — venue contact on the day of the event only.</li>
                        </ul>
                        <p class="mt-4 text-xs leading-relaxed" [style.color]="brand.neutralColor">
                          Mehfil Live stores this in India and deletes or anonymises it 90 days after the event.
                          You can withdraw consent and ask for deletion any time from My Booking — it takes the same two clicks it took to give it.
                        </p>

                        <hr uiSeparator class="my-5" [style.border-color]="hairlineSoft">

                        <div class="space-y-4">
                          <div class="flex items-start gap-3">
                            <input type="checkbox" uiCheckbox id="consent_given" name="consent_given"
                                   class="vt-focus mt-0.5" [(ngModel)]="consentGiven"
                                   [attr.aria-describedby]="errors().consent_given ? 'err-consent' : null">
                            <label uiLabel for="consent_given" class="text-xs leading-relaxed" [style.color]="brand.primaryColor">
                              I consent to Mehfil Live processing my name, email and phone for this booking, as described above.
                            </label>
                          </div>
                          @if (errors().consent_given) {
                            <p id="err-consent" class="ml-7 text-xs" [style.color]="danger">{{ errors().consent_given }}</p>
                          }
                          <div class="flex items-start gap-3">
                            <input type="checkbox" uiCheckbox id="adult_confirmed" name="adult_confirmed"
                                   class="vt-focus mt-0.5" [(ngModel)]="adultConfirmed"
                                   [attr.aria-describedby]="errors().adult_confirmed ? 'err-adult' : null">
                            <label uiLabel for="adult_confirmed" class="text-xs leading-relaxed" [style.color]="brand.primaryColor">
                              I confirm I am 18 or older. Bookings at this venue are for adults only.
                            </label>
                          </div>
                          @if (errors().adult_confirmed) {
                            <p id="err-adult" class="ml-7 text-xs" [style.color]="danger">{{ errors().adult_confirmed }}</p>
                          }
                        </div>
                      </div>

                      <div class="mt-8 flex flex-wrap items-center gap-3">
                        <button type="submit" uiButton class="vt-focus vt-primary"
                                [disabled]="submitting()" [attr.aria-busy]="submitting() ? 'true' : 'false'"
                                [style.background-color]="brand.accentColor" [style.color]="brand.backgroundColor"
                                [style.opacity]="submitting() ? '0.7' : '1'">
                          @if (submitting()) {
                            <span class="inline-flex items-center gap-2">
                              <span class="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true"></span>
                              Confirming your seats…
                            </span>
                          } @else {
                            Confirm booking · {{ money(total()) }}
                          }
                        </button>
                        <button type="button" uiButton variant="ghost" size="sm" class="vt-focus gap-2"
                                [style.color]="brand.neutralColor" [disabled]="submitting()" (click)="backToSeats()">
                          <ui-icon name="ArrowLeft" class="h-4 w-4" aria-hidden="true"></ui-icon>
                          Back to the seat map
                        </button>
                      </div>
                      <p class="mt-4 text-xs" [style.color]="brand.neutralColor">
                        No payment is taken here. {{ money(total()) }} is settled with Mehfil Live at the door.
                      </p>
                    </form>
                  </div>
                </section>
              }
            }
          </div>

          <aside class="lg:sticky lg:top-8 lg:self-start" aria-labelledby="summary-h">
            <div uiCard [style.background-color]="surfaceRaised" [style.border-color]="hairline">
              <div uiCardHeader class="pb-3">
                <h2 id="summary-h" uiCardTitle class="text-lg" [style.font-family]="brand.fontHeading">Your selection</h2>
                <p uiCardDescription [style.color]="brand.neutralColor">{{ event().start_datetime }}</p>
              </div>

              <div uiCardContent class="pt-2">
                @if (step() === 'details' && !holdExpired()) {
                  <div class="mb-5 rounded-[6px] border px-4 py-3" [style.border-color]="holdSeconds() <= 60 ? warn : brand.accentColor"
                       [style.background-color]="'rgba(143,174,139,0.08)'">
                    <p class="flex items-center justify-between gap-3 text-xs" [style.color]="brand.primaryColor">
                      <span class="inline-flex items-center gap-2">
                        <ui-icon name="Clock" class="h-4 w-4" aria-hidden="true"></ui-icon>
                        Seats held for you
                      </span>
                      <span class="text-base" aria-live="off" [style.font-variant-numeric]="'tabular-nums'"
                            [style.color]="holdSeconds() <= 60 ? warn : brand.accentColor">{{ mmss() }}</span>
                    </p>
                    <p class="mt-2 text-[11px]" [style.color]="brand.neutralColor">
                      @if (holdSeconds() <= 60) {
                        Under a minute left — finish up or these seats go back to the public map.
                      } @else {
                        Hold {{ holdToken() }} · expires {{ holdExpiryLabel() }}. Nobody else can pick these seats until then.
                      }
                    </p>
                  </div>
                }

                @if (selected().length === 0) {
                  <ui-empty title="No seats chosen yet"
                            description="Tap any outlined seat on the layout. Rows A–C are closest to the stage.">
                    <button uiButton variant="secondary" size="sm" class="vt-focus"
                            [style.background-color]="'transparent'" [style.border-color]="hairline"
                            [style.color]="brand.primaryColor" (click)="suggestBest()">Suggest two together</button>
                  </ui-empty>
                } @else {
                  <ul class="space-y-2">
                    @for (s of selected(); track s.id) {
                      <li class="vt-chip flex items-center justify-between gap-3 rounded-[6px] border px-3 py-2.5"
                          [style.border-color]="hairline" [style.background-color]="surface">
                        <span class="text-sm" [style.font-variant-numeric]="'tabular-nums'">
                          Row {{ s.row_label }}, Seat {{ s.seat_number }}
                          <span class="block text-[11px]" [style.color]="brand.neutralColor">{{ tierFor(s.row_label) }}</span>
                        </span>
                        <span class="flex items-center gap-2">
                          <span class="text-sm" [style.font-variant-numeric]="'tabular-nums'">{{ money(s.price_minor) }}</span>
                          @if (step() === 'seats') {
                            <button type="button" class="vt-focus rounded-[4px] p-1.5 transition-colors duration-150"
                                    [style.color]="brand.neutralColor"
                                    [attr.aria-label]="'Remove Row ' + s.row_label + ', Seat ' + s.seat_number"
                                    (click)="removeSeat(s.id)">
                              <ui-icon name="X" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
                            </button>
                          }
                        </span>
                      </li>
                    }
                  </ul>

                  <hr uiSeparator class="my-5" [style.border-color]="hairlineSoft">

                  <dl class="space-y-2 text-sm" [style.font-variant-numeric]="'tabular-nums'">
                    <div class="flex justify-between gap-4">
                      <dt [style.color]="brand.neutralColor">{{ selected().length }} {{ selected().length === 1 ? 'seat' : 'seats' }}</dt>
                      <dd>{{ money(total()) }}</dd>
                    </div>
                    <div class="flex justify-between gap-4">
                      <dt [style.color]="brand.neutralColor">Booking fee</dt>
                      <dd [style.color]="brand.neutralColor">None</dd>
                    </div>
                    <div class="flex justify-between gap-4 pt-2 border-t" [style.border-color]="hairlineSoft">
                      <dt class="text-base">Due at the door</dt>
                      <dd class="text-base" [style.color]="brand.accentColor">{{ money(total()) }}</dd>
                    </div>
                  </dl>
                }
              </div>

              @if (step() === 'seats') {
                <div uiCardFooter class="flex flex-col items-stretch gap-3 border-t pt-5" [style.border-color]="hairlineSoft">
                  <button uiButton class="vt-focus vt-primary w-full"
                          [disabled]="selected().length === 0"
                          [style.background-color]="selected().length ? brand.accentColor : 'rgba(255,255,255,0.08)'"
                          [style.color]="selected().length ? brand.backgroundColor : brand.neutralColor"
                          (click)="continueToDetails()">
                    Hold seats &amp; continue
                  </button>
                  <p class="text-[11px] leading-relaxed" [style.color]="brand.neutralColor">
                    We lock your seats for 7 minutes while you fill in your details. No payment is taken in the app.
                  </p>
                </div>
              }
            </div>

            <p class="mt-5 px-1 text-xs leading-relaxed" [style.color]="brand.neutralColor">
              Already booked? <button uiButton variant="ghost" size="sm" class="vt-focus px-1"
                [style.color]="brand.accentColor" (click)="navigate('my-booking')">Look it up with your reference</button>
            </p>
          </aside>
        </div>
      }
    }
  </div>
</div>
`;

@Component({
  selector: "app-event-detail-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase {
  /* ---- surface + semantic tokens (derived from the Velvet brand roles) ---- */
  surface = "rgba(255,255,255,0.035)";
  surfaceRaised = "rgba(255,255,255,0.055)";
  hairline = "rgba(255,255,255,0.11)";
  hairlineSoft = "rgba(255,255,255,0.07)";
  inputBg = "rgba(255,255,255,0.04)";
  danger = "#c98b74";
  warn = "#d9b26a";
  stubRule = "rgba(22,33,28,0.30)";
  stubMuted = "rgba(22,33,28,0.62)";

  consentVersion = "v2.1 (14 Oct 2026)";
  maxSeats = 6;

  private readonly route = inject(ActivatedRoute);

  // Event id comes from the route, never from component state (AC-006 to AC-008).
  private readonly eventId = this.route.snapshot.paramMap.get("id");

  // No seeded sample event: starts empty, filled only from GET /api/events/{id}.
  event = signal(null);
  status = signal("loading"); // loading | ready | notfound | error

  // Price or Free, read from the API (AC-039, AC-040). Shown in the detail stat and the
  // "about this evening" summary -- the two booking-flow headings that quote a price.
  priceLabel = computed(() => {
    const e = this.event();
    if (!e) return "";
    return e.is_free ? "Free" : this.money(e.price_minor);
  });

  // Seats left to book, read straight from the API (AC-007) -- not derived from the
  // local seat-map mock below, which stands in for a future seat-selection screen.
  seatsAvailable = computed(() => this.event()?.seats_available ?? 0);

  constructor() {
    super();
    this.loadEvent();
  }

  loadEvent() {
    this.status.set("loading");
    apiFetch(`/api/events/${this.eventId}`)
      .then((fetched) => {
        this.event.set(fetched);
        this.status.set("ready");
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 404) {
          this.status.set("notfound");
        } else {
          this.status.set("error");
        }
      });
  }

  // Routes into seat selection for this event id (AC-007). Seat selection lives in this
  // same screen, scoped to the id carried by the route.
  selectSeats() {
    this.step.set("seats");
  }

  lineup = [
    { name: "Neeraj Arya", role: "Vocals, guitar" },
    { name: "Mukund Ramaswamy", role: "Violin" },
    { name: "Raman Iyer", role: "Mandolin" },
    { name: "Viren Solanki", role: "Percussion" },
    { name: "Maati Baani", role: "Support, 7:30 pm" },
  ];

  tiers = [
    { name: "Front stalls", rows: "A–C", price_minor: 195000 },
    { name: "Stalls", rows: "D–F", price_minor: 145000 },
    { name: "Rear stalls", rows: "G–H", price_minor: 95000 },
  ];

  steps = [
    { key: "seats", label: "Seats", index: 0, last: false },
    { key: "details", label: "Your details", index: 1, last: false },
    { key: "ticket", label: "Ticket", index: 2, last: true },
  ];

  legend = [
    { key: "available", label: "Available", glyph: "" },
    { key: "selected", label: "Your pick", glyph: "✓" },
    { key: "held", label: "On hold by someone else", glyph: "" },
    { key: "booked", label: "Booked", glyph: "×" },
  ];

  infoTabs = [
    { value: "about", label: "About" },
    { value: "venue", label: "Venue & access" },
    { value: "tickets", label: "Tickets & policy" },
  ];
  infoTab = signal("about");

  rowDefs = [
    { label: "A", tier: "Front stalls", price_minor: 195000, count: 12 },
    { label: "B", tier: "Front stalls", price_minor: 195000, count: 12 },
    { label: "C", tier: "Front stalls", price_minor: 195000, count: 12 },
    { label: "D", tier: "Stalls", price_minor: 145000, count: 12 },
    { label: "E", tier: "Stalls", price_minor: 145000, count: 12 },
    { label: "F", tier: "Stalls", price_minor: 145000, count: 12 },
    { label: "G", tier: "Rear stalls", price_minor: 95000, count: 12 },
    { label: "H", tier: "Rear stalls", price_minor: 95000, count: 12 },
  ];

  bookedIds = [
    "A3",
    "A4",
    "A5",
    "B7",
    "B8",
    "B12",
    "C1",
    "C2",
    "C9",
    "D5",
    "D12",
    "E3",
    "E8",
    "E9",
    "F2",
    "F3",
    "F11",
    "G6",
    "G7",
    "H1",
    "H2",
    "H12",
  ];
  heldIds = ["C6", "D7", "D8", "G3"];

  seats = signal(this.buildSeats());
  selectedIds = signal([]);
  step = signal("seats");

  seatNotice = signal("");
  noticeTone = signal("info");
  lastSync = signal("2 minutes ago");
  syncing = signal(false);
  releasedOnce = false;

  holdSeconds = signal(420);
  holdExpired = signal(false);
  holdToken = signal("DQ7F-2B91");
  holdExpiryLabel = signal("");
  expiredSeatsLabel = signal("your seats");

  guestName = signal("");
  guestEmail = signal("");
  guestPhone = signal("");
  consentGiven = signal(false);
  adultConfirmed = signal(false);
  errors = signal({});
  submitting = signal(false);

  booking = signal(null);
  usedReferences = ["MEH-7PQ2K4", "MEH-2JD9WX", "MEH-5RT8MN"];

  timers = [];
  intervalId = null;

  /* ------------------------------ derived ------------------------------- */

  isPublished = computed(() => this.status() === "ready");

  stepIndex = computed(() => {
    const s = this.step();
    return s === "seats" ? 0 : s === "details" ? 1 : 2;
  });

  rowsView = computed(() => {
    const sel = this.selectedIds();
    const all = this.seats();
    return this.rowDefs.map((rd) => ({
      label: rd.label,
      tier: rd.tier,
      price_minor: rd.price_minor,
      seats: all
        .filter((s) => s.row_label === rd.label)
        .map((s) => ({
          id: s.id,
          row_label: s.row_label,
          seat_number: s.seat_number,
          price_minor: s.price_minor,
          state: sel.indexOf(s.id) >= 0 ? "selected" : s.status,
        })),
    }));
  });

  selected = computed(() => {
    const ids = this.selectedIds();
    return this.seats().filter((s) => ids.indexOf(s.id) >= 0);
  });

  total = computed(() => this.selected().reduce((a, s) => a + s.price_minor, 0));

  seatsLeft = computed(() => this.seats().filter((s) => s.status === "available").length);

  errorList = computed(() => {
    const e = this.errors();
    const order = ["guest_name", "guest_email", "guest_phone", "consent_given", "adult_confirmed"];
    const out = [];
    for (const k of order) {
      if (e[k]) out.push(e[k]);
    }
    return out;
  });

  mmss = computed(() => {
    const s = this.holdSeconds();
    const m = Math.floor(s / 60);
    const r = s % 60;
    return m + ":" + (r < 10 ? "0" : "") + r;
  });

  bookedSeatSummary = computed(() => {
    const b = this.booking();
    if (!b) return "";
    return b.seats.map((s) => "Row " + s.row_label + ", Seat " + s.seat_number).join(" · ");
  });

  qrMatrix = computed(() => {
    const b = this.booking();
    if (!b) return [];
    const size = 25;
    let h = 2166136261;
    const t = b.qr_token;
    for (let i = 0; i < t.length; i++) {
      h = (h ^ t.charCodeAt(i)) >>> 0;
      h = (h * 16777619) >>> 0;
    }
    const rnd = () => {
      h ^= h << 13;
      h = h >>> 0;
      h ^= h >>> 17;
      h ^= h << 5;
      h = h >>> 0;
      return h / 4294967296;
    };
    const m = [];
    for (let r = 0; r < size; r++) {
      const row = [];
      for (let c = 0; c < size; c++) {
        row.push(rnd() > 0.48);
      }
      m.push(row);
    }
    const finder = (r0, c0) => {
      for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
          const rr = r0 + r,
            cc = c0 + c;
          if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
          if (r === -1 || r === 7 || c === -1 || c === 7) {
            m[rr][cc] = false;
            continue;
          }
          const edge = r === 0 || r === 6 || c === 0 || c === 6;
          const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          m[rr][cc] = edge || core;
        }
      }
    };
    finder(0, 0);
    finder(0, size - 7);
    finder(size - 7, 0);
    for (let i = 8; i < size - 8; i++) {
      m[6][i] = i % 2 === 0;
      m[i][6] = i % 2 === 0;
    }
    return m;
  });

  /* ------------------------------ helpers ------------------------------- */

  buildSeats() {
    const out = [];
    for (const r of this.rowDefs) {
      for (let n = 1; n <= r.count; n++) {
        const id = r.label + n;
        const status =
          this.bookedIds.indexOf(id) >= 0
            ? "booked"
            : this.heldIds.indexOf(id) >= 0
              ? "held"
              : "available";
        out.push({
          id: id,
          row_label: r.label,
          seat_number: n,
          price_minor: r.price_minor,
          status: status,
        });
      }
    }
    return out;
  }

  money(minor) {
    const v = (minor || 0) / 100;
    return "₹" + v.toLocaleString("en-IN");
  }

  tierFor(rowLabel) {
    const rd = this.rowDefs.filter((r) => r.label === rowLabel)[0];
    return rd ? rd.tier : "";
  }

  seatBg(state) {
    if (state === "selected") return this.brand.accentColor;
    if (state === "booked") return "rgba(255,255,255,0.06)";
    if (state === "held") return "transparent";
    return "rgba(255,255,255,0.02)";
  }

  seatBorder(state) {
    if (state === "selected") return this.brand.accentColor;
    if (state === "booked") return "rgba(255,255,255,0.07)";
    if (state === "held") return "rgba(255,255,255,0.30)";
    return "rgba(255,255,255,0.18)";
  }

  seatFg(state) {
    if (state === "selected") return this.brand.backgroundColor;
    if (state === "booked") return "rgba(255,255,255,0.28)";
    if (state === "held") return this.brand.neutralColor;
    return this.brand.primaryColor;
  }

  seatAria(s) {
    const base =
      "Row " + s.row_label + ", seat " + s.seat_number + ", " + this.money(s.price_minor) + ", ";
    if (s.state === "selected") return base + "selected. Press to remove.";
    if (s.state === "booked") return base + "already booked, not available.";
    if (s.state === "held") return base + "on hold by another guest, not available.";
    return base + "available. Press to select.";
  }

  notify(msg, tone) {
    this.seatNotice.set(msg);
    this.noticeTone.set(tone || "info");
  }

  /* ---------------------------- interactions ---------------------------- */

  toggleSeat(s) {
    if (s.state === "booked") {
      this.notify(
        "Row " + s.row_label + ", Seat " + s.seat_number + " is already booked for this show.",
        "warn",
      );
      return;
    }
    if (s.state === "held") {
      this.notify(
        "Row " +
          s.row_label +
          ", Seat " +
          s.seat_number +
          " is held by another guest right now. It reopens if they don’t finish checking out.",
        "warn",
      );
      return;
    }
    const ids = this.selectedIds().slice();
    const i = ids.indexOf(s.id);
    if (i >= 0) {
      ids.splice(i, 1);
      this.selectedIds.set(ids);
      this.notify("Released Row " + s.row_label + ", Seat " + s.seat_number + ".", "info");
      return;
    }
    if (ids.length >= this.maxSeats) {
      this.notify(
        "You can book up to " + this.maxSeats + " seats in one booking. Remove one to swap it.",
        "warn",
      );
      return;
    }
    ids.push(s.id);
    ids.sort();
    this.selectedIds.set(ids);
    this.notify(
      "Added Row " +
        s.row_label +
        ", Seat " +
        s.seat_number +
        " · " +
        this.money(s.price_minor) +
        ".",
      "info",
    );
  }

  removeSeat(id) {
    const ids = this.selectedIds().filter((x) => x !== id);
    this.selectedIds.set(ids);
    this.notify("Removed Row " + id.charAt(0) + ", Seat " + id.slice(1) + ".", "info");
  }

  suggestBest() {
    const all = this.seats();
    for (const rd of this.rowDefs) {
      const row = all.filter((s) => s.row_label === rd.label && s.status === "available");
      for (let i = 0; i < row.length - 1; i++) {
        if (row[i + 1].seat_number === row[i].seat_number + 1) {
          this.selectedIds.set([row[i].id, row[i + 1].id]);
          this.notify(
            "Picked Row " +
              rd.label +
              ", Seats " +
              row[i].seat_number +
              " and " +
              row[i + 1].seat_number +
              " — the best pair still free.",
            "info",
          );
          return;
        }
      }
    }
    this.notify("No two adjacent seats are free. Try singles in rows F and G.", "warn");
  }

  refreshSeats() {
    this.syncing.set(true);
    const id = setTimeout(() => {
      this.syncing.set(false);
      this.lastSync.set("just now");
      if (!this.releasedOnce) {
        this.releasedOnce = true;
        this.seats.update((list) =>
          list.map((s) =>
            s.id === "D7"
              ? {
                  id: s.id,
                  row_label: s.row_label,
                  seat_number: s.seat_number,
                  price_minor: s.price_minor,
                  status: "available",
                }
              : s,
          ),
        );
        this.notify("Row D, Seat 7 just came back — another guest’s hold expired.", "info");
      } else {
        this.notify("Seat map is current. Nothing changed in the last minute.", "info");
      }
    }, 650);
    this.timers.push(id);
  }

  continueToDetails() {
    if (this.selectedIds().length === 0) {
      this.notify("Pick at least one seat to continue.", "warn");
      return;
    }
    this.step.set("details");
    this.startHold();
  }

  backToSeats() {
    this.stopHold();
    this.holdExpired.set(false);
    this.step.set("seats");
    this.notify("Hold released. Your seats are still selected.", "info");
  }

  restartSelection() {
    this.selectedIds.set([]);
    this.holdExpired.set(false);
    this.step.set("seats");
    this.notify("Those seats are back in the pool. Pick again from the map.", "warn");
  }

  startHold() {
    this.stopHold();
    this.holdExpired.set(false);
    this.holdSeconds.set(420);
    this.holdToken.set(this.randomChunk(4) + "-" + this.randomChunk(4));
    const until = new Date(Date.now() + 420000);
    this.holdExpiryLabel.set(
      until.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
    );
    this.intervalId = setInterval(() => {
      const next = this.holdSeconds() - 1;
      if (next <= 0) {
        this.holdSeconds.set(0);
        this.stopHold();
        this.expiredSeatsLabel.set(
          this.selected()
            .map((s) => "Row " + s.row_label + ", Seat " + s.seat_number)
            .join(" and ") || "your seats",
        );
        this.selectedIds.set([]);
        this.holdExpired.set(true);
      } else {
        this.holdSeconds.set(next);
      }
    }, 1000);
  }

  stopHold() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  randomChunk(n) {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let out = "";
    for (let i = 0; i < n; i++) {
      out += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return out;
  }

  makeReference() {
    let ref = "";
    do {
      ref = "MEH-" + this.randomChunk(6);
    } while (this.usedReferences.indexOf(ref) >= 0);
    this.usedReferences.push(ref);
    return ref;
  }

  submitBooking() {
    const errs = {};
    const name = (this.guestName() || "").trim();
    const email = (this.guestEmail() || "").trim();
    const phone = (this.guestPhone() || "").trim();
    const digits = phone.replace(/[^0-9]/g, "");

    if (!name) errs.guest_name = "Enter the name that should appear on the ticket.";
    if (!email) errs.guest_email = "We need an email to send your reference and QR ticket.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      errs.guest_email = "That email doesn’t look right — check for a missing @ or domain.";
    if (!phone) errs.guest_phone = "Enter a mobile number the venue can reach on the night.";
    else if (digits.length < 10 || digits.length > 13)
      errs.guest_phone = "That number isn’t 10 digits — check it and try again.";
    if (!this.consentGiven())
      errs.consent_given = "Consent is required: we can’t create a booking without it.";
    if (!this.adultConfirmed())
      errs.adult_confirmed = "Bookings are for adults only — confirm you are 18 or older.";

    if (Object.keys(errs).length) {
      this.errors.set(errs);
      return;
    }

    this.errors.set({});
    this.submitting.set(true);
    const picked = this.selected().slice();
    const amount = this.total();
    const id = setTimeout(() => {
      const ref = this.makeReference();
      const ids = this.selectedIds();
      this.seats.update((list) =>
        list.map((s) =>
          ids.indexOf(s.id) >= 0
            ? {
                id: s.id,
                row_label: s.row_label,
                seat_number: s.seat_number,
                price_minor: s.price_minor,
                status: "booked",
              }
            : s,
        ),
      );
      const now = new Date();
      const stamp =
        now.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) +
        ", " +
        now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
      this.booking.set({
        reference: ref,
        qr_token: "qr_" + ref + "_" + this.randomChunk(8),
        guest_name: this.guestName().trim(),
        guest_email: this.guestEmail().trim(),
        guest_phone: this.guestPhone().trim(),
        seats: picked,
        total_minor: amount,
        status: "confirmed",
        consent_notice_version: this.consentVersion,
        consent_at: stamp,
        created_at: stamp,
      });
      this.submitting.set(false);
      this.stopHold();
      this.step.set("ticket");
    }, 950);
    this.timers.push(id);
  }

  ngOnDestroy() {
    this.stopHold();
    for (const t of this.timers) {
      clearTimeout(t);
    }
    this.timers = [];
  }
}
