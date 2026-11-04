// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
const template = `
<style>
  @keyframes velvetSweep { 0% { transform: translateY(0); opacity: 0; } 12% { opacity: .9; } 88% { opacity: .9; } 100% { transform: translateY(176px); opacity: 0; } }
  @keyframes velvetRise { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
  @keyframes velvetPulse { 0%, 100% { opacity: .3; } 50% { opacity: 1; } }
  .velvet-sweep { animation: velvetSweep 2.8s cubic-bezier(.4,0,.2,1) infinite; }
  .velvet-rise { animation: velvetRise .3s ease-out both; }
  .velvet-pulse { animation: velvetPulse 1.2s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .velvet-sweep, .velvet-rise, .velvet-pulse { animation: none !important; }
  }
</style>

<div class="w-full" [style.background-color]="brand.backgroundColor" [style.color]="brand.primaryColor" [style.font-family]="brand.fontBody">
  <div class="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 lg:py-12">

    <header class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div class="max-w-[58ch]">
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em]" [style.color]="brand.accentColor">Gate 2 &middot; Door team</p>
        <h1 class="mt-3 text-[32px] leading-[1.12] sm:text-[40px]" [style.font-family]="brand.fontHeading">Door Check-In</h1>
        <p class="mt-4 text-[15px] leading-[1.6]" [style.color]="brand.neutralColor">Scan every QR ticket as the holder reaches the door. A valid ticket admits once &mdash; reused, cancelled and wrong-night tickets stop here.</p>
      </div>

      <div class="w-full shrink-0 lg:w-[336px]">
        <label uiLabel for="door-event" class="block text-[11px] font-semibold uppercase tracking-[0.2em]" [style.color]="brand.neutralColor">Door</label>
        <select uiSelect id="door-event" class="mt-2 w-full" [ngModel]="eventId()" (ngModelChange)="changeEvent($event)" name="doorEvent">
          @for (e of events; track e.id) {
            <option [value]="e.id">{{ e.title }}</option>
          }
        </select>
        <p class="mt-2 text-[13px] leading-relaxed" [style.color]="brand.neutralColor">{{ currentEvent().when }} &middot; {{ currentEvent().venue }}</p>

        <div class="mt-4 flex items-center justify-between gap-3 rounded-[6px] border px-3 py-2" [style.border-color]="lineSoft" [style.background-color]="panel">
          @switch (sync().state) {
            @case ('live') {
              <span class="flex items-center gap-2 text-[12px]" [style.color]="brand.neutralColor">
                <span class="h-1.5 w-1.5 rounded-full" [style.background-color]="brand.accentColor" aria-hidden="true"></span>
                Synced {{ sync().at }} &middot; nothing held
              </span>
            }
            @case ('syncing') {
              <span class="flex items-center gap-2 text-[12px]" [style.color]="brand.neutralColor">
                <span class="velvet-pulse h-1.5 w-1.5 rounded-full" [style.background-color]="brand.accentColor" aria-hidden="true"></span>
                Sending held scans&hellip;
              </span>
            }
            @default {
              <span class="flex items-center gap-2 text-[12px]" [style.color]="warn">
                <ui-icon name="Clock" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
                Last sync {{ sync().at }} &middot; {{ sync().queued }} held here
              </span>
            }
          }
          <button uiButton variant="ghost" size="sm" type="button" (click)="syncNow()" [disabled]="sync().state !== 'stale'">Sync now</button>
        </div>
      </div>
    </header>

    <hr uiSeparator class="my-8" [style.border-color]="line" />

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">

      <!-- Scanner: the focal point -->
      <section class="lg:col-span-7" aria-labelledby="scanner-heading">
        <div uiCard [style.background-color]="panel" [style.border-color]="line">
          <div uiCardHeader class="flex flex-row items-start justify-between gap-4">
            <div>
              <h2 uiCardTitle id="scanner-heading" class="text-[22px]" [style.font-family]="brand.fontHeading">Ticket scanner</h2>
              <p uiCardDescription class="mt-1 text-[13px]">{{ currentEvent().title }} &middot; {{ currentEvent().doors }}</p>
            </div>
            <div class="flex items-center gap-3">
              <span id="camera-label" class="text-[11px] font-semibold uppercase tracking-[0.18em]" [style.color]="brand.neutralColor">Camera</span>
              <ui-switch [(checked)]="cameraOn" aria-labelledby="camera-label"></ui-switch>
            </div>
          </div>

          <div uiCardContent>
            <div class="relative w-full overflow-hidden rounded-[6px] border" [style.border-color]="line" [style.background-color]="deep" style="aspect-ratio: 16 / 10">
              @switch (viewState()) {
                @case ('live') {
                  <div class="absolute inset-0">
                    <div class="absolute inset-0 opacity-[0.06]" style="background-image: repeating-linear-gradient(0deg, transparent 0 7px, rgba(255,255,255,0.7) 7px 8px)" aria-hidden="true"></div>
                    <div class="absolute left-1/2 top-1/2 h-[176px] w-[176px] -translate-x-1/2 -translate-y-1/2 overflow-hidden" aria-hidden="true">
                      <div class="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2" [style.border-color]="brand.accentColor"></div>
                      <div class="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2" [style.border-color]="brand.accentColor"></div>
                      <div class="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2" [style.border-color]="brand.accentColor"></div>
                      <div class="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2" [style.border-color]="brand.accentColor"></div>
                      <div class="velvet-sweep absolute left-1 right-1 top-0 h-px" [style.background-color]="brand.accentColor"></div>
                    </div>
                    <p class="absolute inset-x-0 bottom-4 text-center text-[12px] tracking-[0.04em]" [style.color]="brand.neutralColor">Rear camera live &middot; hold the QR inside the brackets</p>
                  </div>
                }
                @case ('off') {
                  <div class="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                    <ui-icon name="Search" class="h-6 w-6" aria-hidden="true"></ui-icon>
                    <p class="mt-4 text-[16px]" [style.font-family]="brand.fontHeading">Camera paused</p>
                    <p class="mt-2 max-w-[42ch] text-[13px] leading-relaxed" [style.color]="brand.neutralColor">Switch the camera back on to read tickets, or type the code from the ticket email below. Both admit the same way.</p>
                    <button uiButton variant="secondary" size="sm" type="button" class="mt-5" (click)="turnCameraOn()">Turn camera on</button>
                  </div>
                }
                @case ('help') {
                  <div class="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                    <ui-icon name="AlertCircle" class="h-6 w-6" aria-hidden="true" [style.color]="warn"></ui-icon>
                    <p class="mt-4 text-[16px]" [style.font-family]="brand.fontHeading">Camera access is blocked</p>
                    <p class="mt-2 max-w-[48ch] text-[13px] leading-relaxed" [style.color]="brand.neutralColor">This browser has not been given the camera. Open the padlock in the address bar and allow camera for this site, then come back. Only the venue lead &mdash; Priya Nambiar, on the door line &mdash; can re-issue door access if that fails.</p>
                    <div class="mt-5 flex flex-wrap items-center justify-center gap-3">
                      <button uiButton variant="secondary" size="sm" type="button" (click)="closeHelp()">I have allowed it &mdash; retry</button>
                      <button uiButton variant="ghost" size="sm" type="button" (click)="closeHelp()">Keep typing codes</button>
                    </div>
                  </div>
                }
              }

              @if (scanning()) {
                <div class="velvet-rise absolute inset-0 flex flex-col items-center justify-center" style="background-color: rgba(0,0,0,0.62)">
                  <div class="flex items-center gap-2" aria-hidden="true">
                    <span class="velvet-pulse h-1.5 w-1.5 rounded-full" [style.background-color]="brand.accentColor"></span>
                    <span class="velvet-pulse h-1.5 w-1.5 rounded-full" [style.background-color]="brand.accentColor" style="animation-delay: .15s"></span>
                    <span class="velvet-pulse h-1.5 w-1.5 rounded-full" [style.background-color]="brand.accentColor" style="animation-delay: .3s"></span>
                  </div>
                  <p class="mt-4 text-[13px] tabular-nums tracking-[0.08em]" [style.color]="brand.primaryColor">Checking {{ pending() }}&hellip;</p>
                </div>
              }
            </div>

            <div class="mt-5 flex flex-wrap items-center gap-3">
              <button uiButton size="lg" type="button" class="min-h-[48px] gap-2 px-6" [style.background-color]="brand.accentColor" [style.color]="brand.backgroundColor" [style.opacity]="canRead() ? 1 : 0.45" [disabled]="!canRead()" (click)="readFrame()">
                <ui-icon name="Search" class="h-4 w-4" aria-hidden="true"></ui-icon>
                Read QR in frame
              </button>
              <button uiButton variant="ghost" size="sm" type="button" (click)="openHelp()">Camera not reading?</button>
            </div>
            @if (!canRead() && !scanning()) {
              <p class="mt-3 text-[13px]" [style.color]="brand.neutralColor">Scanning is paused. Turn the camera on, or check the ticket by code.</p>
            }

            <hr uiSeparator class="my-6" [style.border-color]="lineSoft" />

            <form (ngSubmit)="submitCode()" novalidate>
              <label uiLabel for="ticket-code" class="block text-[11px] font-semibold uppercase tracking-[0.18em]" [style.color]="brand.neutralColor">Check by ticket code</label>
              <div class="mt-2 flex flex-col gap-3 sm:flex-row">
                <input uiInput id="ticket-code" name="ticketCode" class="min-h-[44px] flex-1 tabular-nums tracking-[0.08em]" placeholder="QRQ-4RT9XB" autocomplete="off" spellcheck="false" [(ngModel)]="code" [attr.aria-invalid]="formError() ? 'true' : null" [attr.aria-describedby]="formError() ? 'code-error' : 'code-hint'" />
                <button uiButton variant="secondary" type="submit" class="min-h-[44px]" [disabled]="scanning()">Check code</button>
              </div>
              @if (formError()) {
                <p id="code-error" class="velvet-rise mt-2 flex items-start gap-2 text-[13px] leading-relaxed" [style.color]="danger">
                  <ui-icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
                  <span>{{ formError() }}</span>
                </p>
              } @else {
                <p id="code-hint" class="mt-2 text-[13px]" [style.color]="brand.neutralColor">The line printed under the QR in the confirmation email, e.g. QRQ-4RT9XB.</p>
              }
            </form>

            <div class="mt-6" role="status" aria-live="polite">
              @if (scanning()) {
                <div class="rounded-[6px] border p-5" [style.border-color]="lineSoft" [style.background-color]="panelAlt">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.2em]" [style.color]="brand.neutralColor">Validating</p>
                  <p class="mt-2 text-[15px] tabular-nums">Matching {{ pending() }} against tonight&rsquo;s bookings</p>
                  <div class="mt-4 h-px w-full overflow-hidden" [style.background-color]="lineSoft">
                    <div class="velvet-pulse h-px w-1/2" [style.background-color]="brand.accentColor"></div>
                  </div>
                </div>
              } @else {
                @if (result(); as r) {
                  <div class="velvet-rise rounded-[6px] border p-5" [style.border-color]="verdictLine(r.kind)" [style.background-color]="verdictTint(r.kind)">
                    <div class="flex items-start gap-4">
                      <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border" [style.border-color]="verdictLine(r.kind)" [style.color]="verdictColor(r.kind)">
                        <ui-icon [name]="verdictIcon(r.kind)" class="h-5 w-5" aria-hidden="true"></ui-icon>
                      </span>
                      <div class="min-w-0 flex-1">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.2em]" [style.color]="verdictColor(r.kind)">Scan result &middot; <span class="tabular-nums">{{ r.time }}</span></p>
                        <h3 class="mt-1 text-[26px] leading-tight" [style.font-family]="brand.fontHeading">{{ r.title }}</h3>
                        @if (r.name) {
                          <p class="mt-1 text-[15px]">{{ r.name }} <span [style.color]="brand.neutralColor">&middot; {{ r.seats }}</span></p>
                        }
                        <p class="mt-3 max-w-[62ch] text-[13px] leading-[1.6]" [style.color]="brand.neutralColor">{{ r.detail }}</p>
                        @if (r.code) {
                          <dl class="mt-4 grid grid-cols-2 gap-4 border-t pt-4" [style.border-color]="lineSoft">
                            <div>
                              <dt class="text-[11px] font-semibold uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Reference</dt>
                              <dd class="mt-1 text-[14px] tabular-nums tracking-[0.06em]" [style.color]="brand.accentColor">{{ r.code }}</dd>
                            </div>
                            <div>
                              <dt class="text-[11px] font-semibold uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Door status</dt>
                              <dd class="mt-1 text-[14px]">{{ r.status }}</dd>
                            </div>
                          </dl>
                        }
                      </div>
                    </div>
                  </div>
                } @else {
                  <div class="rounded-[6px] border border-dashed p-5" [style.border-color]="lineSoft">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.2em]" [style.color]="brand.neutralColor">Ready</p>
                    <p class="mt-2 text-[15px] leading-relaxed">Waiting for the first ticket of this shift.</p>
                    <p class="mt-1 max-w-[58ch] text-[13px] leading-relaxed" [style.color]="brand.neutralColor">Every verdict shows here in large type so you can read it at arm&rsquo;s length, with the attendee&rsquo;s seats beside it.</p>
                  </div>
                }
              }
            </div>
          </div>

          <div uiCardFooter class="border-t" [style.border-color]="lineSoft">
            <p class="text-[12px] leading-relaxed" [style.color]="brand.neutralColor">Runs in this browser on any phone or tablet &mdash; nothing to install. Keep the page open; scans taken while the signal drops are held here and sent when it returns.</p>
          </div>
        </div>
      </section>

      <!-- Door log -->
      <div class="lg:col-span-5">
        <section aria-labelledby="door-count-heading">
          <h2 id="door-count-heading" class="sr-only">Door counts</h2>
          <div class="grid grid-cols-1 rounded-[6px] border sm:grid-cols-3" [style.border-color]="line" [style.background-color]="panel">
            <div class="px-5 py-4">
              <ui-stat label="Admitted" [value]="admittedTotal()" [hint]="'of ' + currentEvent().booked + ' booked'"></ui-stat>
            </div>
            <div class="border-t px-5 py-4 sm:border-l sm:border-t-0" [style.border-color]="lineSoft">
              <ui-stat label="Turned away" [value]="rejectedTotal()" hint="Reused or invalid"></ui-stat>
            </div>
            <div class="border-t px-5 py-4 sm:border-l sm:border-t-0" [style.border-color]="lineSoft">
              <ui-stat label="Last scan" [value]="lastScanTime()" hint="Gate 2"></ui-stat>
            </div>
          </div>
        </section>

        <section class="mt-8" aria-labelledby="log-heading">
          <div class="flex items-end justify-between gap-4">
            <h2 id="log-heading" class="text-[22px]" [style.font-family]="brand.fontHeading">Scans at this door</h2>
            <span class="text-[12px] tabular-nums" [style.color]="brand.neutralColor">{{ filteredLog().length }} shown</span>
          </div>

          <div class="mt-4">
            <ui-tabs [tabs]="tabs()" [(value)]="tab"></ui-tabs>
          </div>

          <div class="mt-4">
            <label uiLabel for="scan-search" class="block text-[11px] font-semibold uppercase tracking-[0.18em]" [style.color]="brand.neutralColor">Find a scan</label>
            <input uiInput id="scan-search" name="scanSearch" class="mt-2 min-h-[44px] w-full" placeholder="Attendee name or reference" [(ngModel)]="query" autocomplete="off" />
          </div>

          <div class="mt-5 rounded-[6px] border" [style.border-color]="line" [style.background-color]="panel">
            @if (filteredLog().length > 0) {
              <div class="overflow-x-auto">
                <table uiTable class="w-full tabular-nums">
                  <thead uiTHead>
                    <tr uiTR>
                      <th uiTH scope="col">Time</th>
                      <th uiTH scope="col">Attendee</th>
                      <th uiTH scope="col">Seats</th>
                      <th uiTH scope="col">Result</th>
                    </tr>
                  </thead>
                  <tbody uiTBody>
                    @for (s of filteredLog(); track s.id) {
                      <tr uiTR [class.velvet-rise]="s.isNew">
                        <td uiTD class="whitespace-nowrap align-top text-[13px]">{{ s.time }}</td>
                        <td uiTD class="align-top">
                          <div class="text-[14px]">{{ s.name }}</div>
                          <div class="mt-0.5 text-[12px] tabular-nums tracking-[0.06em]" [style.color]="brand.accentColor">{{ s.code }}</div>
                        </td>
                        <td uiTD class="align-top text-[13px]" [style.color]="brand.neutralColor">{{ s.seats }}</td>
                        <td uiTD class="align-top">
                          <span uiBadge [variant]="badgeVariant(s.outcome)" class="whitespace-nowrap">
                            <ui-icon [name]="verdictIcon(s.outcome)" class="mr-1 h-3.5 w-3.5" aria-hidden="true"></ui-icon>
                            {{ outcomeLabel(s.outcome) }}
                          </span>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            } @else {
              <div class="px-4 py-8">
                @if (eventLog().length === 0) {
                  <ui-empty title="Nothing scanned at this door yet" [description]="emptyDoorCopy()">
                    <button uiButton variant="secondary" size="sm" type="button" (click)="navigate('organiser-events')">See the event&rsquo;s bookings</button>
                  </ui-empty>
                } @else {
                  <ui-empty title="No scan matches that" [description]="noResultsCopy()">
                    <button uiButton variant="secondary" size="sm" type="button" (click)="clearFilters()">Clear search and filter</button>
                  </ui-empty>
                }
              </div>
            }
          </div>

          <p class="mt-4 text-[12px] leading-relaxed" [style.color]="brand.neutralColor">This log covers the current shift on this device only. The full booking list for {{ currentEvent().title }} sits in Organiser Events.</p>
        </section>
      </div>
    </div>
  </div>
</div>
`;

@Component({
  selector: "app-check-in-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase {
  // surface tokens
  panel = 'rgba(255,255,255,0.035)';
  panelAlt = 'rgba(255,255,255,0.06)';
  line = 'rgba(255,255,255,0.11)';
  lineSoft = 'rgba(255,255,255,0.07)';
  deep = 'rgba(0,0,0,0.3)';
  warn = '#d8b26a';
  danger = '#d08674';

  events = [
    { id: 'ev-carnatic', title: 'Carnatic Nights: Sanjay Subrahmanyan', venue: 'Chowdiah Memorial Hall, Bengaluru', when: 'Tonight, Wed 4 Nov, 7:30 PM', date: 'Wed 4 Nov', doors: 'Doors 6:45 PM', booked: 268, baseAdmitted: 142, baseRejected: 3 },
    { id: 'ev-dastangoi', title: 'The Dastangoi Revival', venue: 'Alliance Française, New Delhi', when: 'Fri 6 Nov, 8:00 PM', date: 'Fri 6 Nov', doors: 'Doors 7:15 PM', booked: 120, baseAdmitted: 0, baseRejected: 0 },
    { id: 'ev-jazz', title: 'Monsoon Jazz Quartet', venue: 'Royal Opera House, Mumbai', when: 'Thu 12 Nov, 9:00 PM', date: 'Thu 12 Nov', doors: 'Doors 8:30 PM', booked: 96, baseAdmitted: 0, baseRejected: 0 }
  ];

  queues = {
    'ev-carnatic': ['QRQ-4RT9XB', 'QRQ-7F3K2M', 'QRQ-1ZX5QW', 'QRQ-2WD8LP', 'QRQ-9KM3ZT', 'QRQ-X4L9DM', 'QRQ-5BN7YE', 'QRQ-8JC4AD'],
    'ev-dastangoi': ['QRQ-7TB2MF', 'QRQ-7F3K2M'],
    'ev-jazz': []
  };

  eventId = signal('ev-carnatic');
  queue = signal(['QRQ-4RT9XB', 'QRQ-7F3K2M', 'QRQ-1ZX5QW', 'QRQ-2WD8LP', 'QRQ-9KM3ZT', 'QRQ-X4L9DM', 'QRQ-5BN7YE', 'QRQ-8JC4AD']);

  tickets = signal([
    { reference: 'QRQ-7F3K2M', qr_token: 'qr_8a41c7', event_id: 'ev-carnatic', guest_name: 'Meera Krishnan', seats: 'Row C · 12, 13', status: 'confirmed', checked_in: true, checked_in_at: '7:02 PM', cancelled_on: '' },
    { reference: 'QRQ-0QD2HN', qr_token: 'qr_0f52b9', event_id: 'ev-carnatic', guest_name: 'Vikram Shenoy', seats: 'Row E · 5', status: 'confirmed', checked_in: true, checked_in_at: '7:05 PM', cancelled_on: '' },
    { reference: 'QRQ-6TY8RC', qr_token: 'qr_3d77e1', event_id: 'ev-carnatic', guest_name: 'Aparna Ghosh', seats: 'Row B · 9, 10', status: 'confirmed', checked_in: true, checked_in_at: '7:11 PM', cancelled_on: '' },
    { reference: 'QRQ-6HV1QS', qr_token: 'qr_91ba04', event_id: 'ev-carnatic', guest_name: 'Lakshmi Iyer', seats: 'Row D · 2', status: 'confirmed', checked_in: true, checked_in_at: '7:14 PM', cancelled_on: '' },
    { reference: 'QRQ-9KM3ZT', qr_token: 'qr_5c20af', event_id: 'ev-carnatic', guest_name: 'Faisal Rahman', seats: 'Row B · 7', status: 'cancelled', checked_in: false, checked_in_at: '', cancelled_on: '29 Oct 2026' },
    { reference: 'QRQ-4RT9XB', qr_token: 'qr_6e13dd', event_id: 'ev-carnatic', guest_name: 'Arjun Pillai', seats: 'Row A · 4', status: 'confirmed', checked_in: false, checked_in_at: '', cancelled_on: '' },
    { reference: 'QRQ-2WD8LP', qr_token: 'qr_7f8820', event_id: 'ev-carnatic', guest_name: 'Nandini Rao', seats: 'Row F · 18, 19, 20', status: 'confirmed', checked_in: false, checked_in_at: '', cancelled_on: '' },
    { reference: 'QRQ-5BN7YE', qr_token: 'qr_2bb94c', event_id: 'ev-carnatic', guest_name: 'Rohit Deshpande', seats: 'Row G · 11', status: 'confirmed', checked_in: false, checked_in_at: '', cancelled_on: '' },
    { reference: 'QRQ-8JC4AD', qr_token: 'qr_44ac6f', event_id: 'ev-carnatic', guest_name: 'Tanvi Mehta', seats: 'Row C · 1, 2', status: 'confirmed', checked_in: false, checked_in_at: '', cancelled_on: '' },
    { reference: 'QRQ-3PL6KV', qr_token: 'qr_bd3190', event_id: 'ev-carnatic', guest_name: 'Sandeep Varma', seats: 'Row H · 14', status: 'confirmed', checked_in: false, checked_in_at: '', cancelled_on: '' },
    { reference: 'QRQ-1ZX5QW', qr_token: 'qr_c71e28', event_id: 'ev-dastangoi', guest_name: 'Imran Qureshi', seats: 'Row D · 6', status: 'confirmed', checked_in: false, checked_in_at: '', cancelled_on: '' },
    { reference: 'QRQ-7TB2MF', qr_token: 'qr_9ad550', event_id: 'ev-dastangoi', guest_name: 'Shalini Bakshi', seats: 'Row A · 1, 2', status: 'confirmed', checked_in: false, checked_in_at: '', cancelled_on: '' }
  ]);

  log = signal([
    { id: 7, eventId: 'ev-carnatic', time: '7:16 PM', code: 'QRQ-9KM3ZT', name: 'Faisal Rahman', seats: 'Row B · 7', outcome: 'invalid', isNew: false },
    { id: 6, eventId: 'ev-carnatic', time: '7:14 PM', code: 'QRQ-6HV1QS', name: 'Lakshmi Iyer', seats: 'Row D · 2', outcome: 'admitted', isNew: false },
    { id: 5, eventId: 'ev-carnatic', time: '7:12 PM', code: 'QRQ-ZZ14PQ', name: 'Unknown ticket', seats: '—', outcome: 'invalid', isNew: false },
    { id: 4, eventId: 'ev-carnatic', time: '7:11 PM', code: 'QRQ-6TY8RC', name: 'Aparna Ghosh', seats: 'Row B · 9, 10', outcome: 'admitted', isNew: false },
    { id: 3, eventId: 'ev-carnatic', time: '7:09 PM', code: 'QRQ-7F3K2M', name: 'Meera Krishnan', seats: 'Row C · 12, 13', outcome: 'duplicate', isNew: false },
    { id: 2, eventId: 'ev-carnatic', time: '7:05 PM', code: 'QRQ-0QD2HN', name: 'Vikram Shenoy', seats: 'Row E · 5', outcome: 'admitted', isNew: false },
    { id: 1, eventId: 'ev-carnatic', time: '7:02 PM', code: 'QRQ-7F3K2M', name: 'Meera Krishnan', seats: 'Row C · 12, 13', outcome: 'admitted', isNew: false }
  ]);

  nextId = signal(8);
  clock = signal(19 * 60 + 17);
  tab = signal('all');
  query = signal('');
  code = signal('');
  formError = signal('');
  cameraOn = signal(true);
  cameraHelp = signal(false);
  scanning = signal(false);
  pending = signal('');
  result = signal(null);
  sync = signal({ state: 'stale', at: '7:09 PM', queued: 2 });

  scanTimer = null;
  syncTimer = null;

  currentEvent = computed(() => {
    const id = this.eventId();
    return this.events.find((e) => e.id === id) || this.events[0];
  });

  viewState = computed(() => {
    if (this.cameraHelp()) return 'help';
    if (!this.cameraOn()) return 'off';
    return 'live';
  });

  canRead = computed(() => this.cameraOn() && !this.cameraHelp() && !this.scanning());

  eventLog = computed(() => this.log().filter((s) => s.eventId === this.eventId()));

  filteredLog = computed(() => {
    const t = this.tab();
    const q = this.query().trim().toLowerCase();
    return this.eventLog().filter((s) => {
      const tabOk = t === 'all' || (t === 'admitted' ? s.outcome === 'admitted' : s.outcome !== 'admitted');
      if (!tabOk) return false;
      if (!q) return true;
      return (s.name + ' ' + s.code + ' ' + s.seats).toLowerCase().indexOf(q) !== -1;
    });
  });

  tabs = computed(() => {
    const rows = this.eventLog();
    const admitted = rows.filter((s) => s.outcome === 'admitted').length;
    const flagged = rows.length - admitted;
    return [
      { value: 'all', label: 'All · ' + rows.length },
      { value: 'admitted', label: 'Admitted · ' + admitted },
      { value: 'flagged', label: 'Needs attention · ' + flagged }
    ];
  });

  admittedTotal = computed(() => {
    const base = this.currentEvent().baseAdmitted;
    return String(base + this.eventLog().filter((s) => s.outcome === 'admitted').length);
  });

  rejectedTotal = computed(() => {
    const base = this.currentEvent().baseRejected;
    return String(base + this.eventLog().filter((s) => s.outcome !== 'admitted').length);
  });

  lastScanTime = computed(() => {
    const rows = this.eventLog();
    return rows.length ? rows[0].time : '—';
  });

  emptyDoorCopy = computed(() => {
    const e = this.currentEvent();
    return 'Nobody has been scanned for ' + e.title + ' on this device. ' + e.doors + ' on ' + e.date + ' — tickets will land here as the queue moves.';
  });

  noResultsCopy = computed(() => {
    const q = this.query().trim();
    return q ? 'Nothing in this shift matches “' + q + '”. Try the last four characters of the reference.' : 'No scans in this filter yet for ' + this.currentEvent().title + '.';
  });

  fmtTime(total) {
    const h24 = Math.floor(total / 60) % 24;
    const m = total % 60;
    const suffix = h24 >= 12 ? 'PM' : 'AM';
    const h = h24 % 12 === 0 ? 12 : h24 % 12;
    return h + ':' + (m < 10 ? '0' + m : m) + ' ' + suffix;
  }

  changeEvent(id) {
    this.eventId.set(id);
    this.result.set(null);
    this.code.set('');
    this.formError.set('');
    this.tab.set('all');
    this.query.set('');
    this.queue.set((this.queues[id] || []).slice());
  }

  turnCameraOn() {
    this.cameraHelp.set(false);
    this.cameraOn.set(true);
  }

  openHelp() {
    this.cameraHelp.set(true);
  }

  closeHelp() {
    this.cameraHelp.set(false);
    this.cameraOn.set(true);
  }

  clearFilters() {
    this.query.set('');
    this.tab.set('all');
  }

  syncNow() {
    if (this.sync().state !== 'stale') return;
    this.sync.set({ state: 'syncing', at: this.sync().at, queued: this.sync().queued });
    if (this.syncTimer) clearTimeout(this.syncTimer);
    this.syncTimer = setTimeout(() => {
      this.syncTimer = null;
      this.sync.set({ state: 'live', at: this.fmtTime(this.clock()), queued: 0 });
    }, 750);
  }

  readFrame() {
    if (!this.canRead()) return;
    const q = this.queue();
    if (!q.length) {
      this.result.set({
        kind: 'noframe',
        title: 'Nothing in frame',
        name: '',
        seats: '',
        code: '',
        status: '',
        detail: 'No QR was readable in that frame. Ask the holder to raise screen brightness and hold the ticket flat inside the brackets, or type the code underneath it.',
        time: this.fmtTime(this.clock())
      });
      return;
    }
    this.queue.set(q.slice(1));
    this.beginScan(q[0]);
  }

  submitCode() {
    const raw = (this.code() || '').trim();
    if (!raw) {
      this.formError.set('Enter a ticket code first — it is the line printed under the QR, like QRQ-4RT9XB.');
      return;
    }
    if (raw.length < 6) {
      this.formError.set('“' + raw + '” is too short for a ticket code. Full codes are QRQ- followed by six characters.');
      return;
    }
    this.formError.set('');
    this.beginScan(raw.toUpperCase());
  }

  beginScan(codeValue) {
    this.pending.set(codeValue.toUpperCase());
    this.scanning.set(true);
    if (this.scanTimer) clearTimeout(this.scanTimer);
    this.scanTimer = setTimeout(() => {
      this.scanTimer = null;
      this.scanning.set(false);
      this.resolveScan(codeValue.toUpperCase());
    }, 650);
  }

  resolveScan(codeValue) {
    const ticket = this.tickets().find((t) => t.reference === codeValue || t.qr_token.toUpperCase() === codeValue);
    const mins = this.clock() + 1;
    this.clock.set(mins);
    const time = this.fmtTime(mins);
    const ev = this.currentEvent();
    let res;

    if (!ticket) {
      res = {
        kind: 'invalid',
        title: 'Not a valid ticket',
        name: 'Unknown ticket',
        seats: '—',
        code: codeValue,
        status: 'Not admitted',
        detail: 'No booking matches this code for ' + ev.title + '. Check the reference under the QR, or send the holder to the box office to look it up by email.',
        time: time
      };
    } else if (ticket.event_id !== this.eventId()) {
      const other = this.events.find((e) => e.id === ticket.event_id);
      res = {
        kind: 'invalid',
        title: 'Wrong event',
        name: ticket.guest_name,
        seats: ticket.seats,
        code: ticket.reference,
        status: 'Not admitted',
        detail: 'This ticket is for ' + (other ? other.title + ' on ' + other.date : 'another event') + '. It is not valid at this door tonight.',
        time: time
      };
    } else if (ticket.status === 'cancelled') {
      res = {
        kind: 'invalid',
        title: 'Booking cancelled',
        name: ticket.guest_name,
        seats: ticket.seats,
        code: ticket.reference,
        status: 'Not admitted',
        detail: 'Cancelled on ' + ticket.cancelled_on + ' and the seats released to other attendees. Do not admit — the box office can confirm.',
        time: time
      };
    } else if (ticket.checked_in) {
      res = {
        kind: 'duplicate',
        title: 'Already used',
        name: ticket.guest_name,
        seats: ticket.seats,
        code: ticket.reference,
        status: 'Checked in ' + ticket.checked_in_at,
        detail: 'This ticket was admitted at ' + ticket.checked_in_at + ' on this door, so it has not been checked in again. If the holder disputes it, call Priya Nambiar on the venue line.',
        time: time
      };
    } else {
      this.tickets.update((list) => list.map((t) => (t.reference === ticket.reference ? Object.assign({}, t, { checked_in: true, checked_in_at: time }) : t)));
      res = {
        kind: 'admitted',
        title: 'Admitted',
        name: ticket.guest_name,
        seats: ticket.seats,
        code: ticket.reference,
        status: 'Checked in ' + time,
        detail: 'Send them through to ' + ticket.seats + '. The booking is now marked checked in and cannot be used a second time.',
        time: time
      };
    }

    this.result.set(res);
    this.code.set('');
    this.formError.set('');

    const entry = {
      id: this.nextId(),
      eventId: this.eventId(),
      time: time,
      code: res.code || codeValue,
      name: res.name || 'Unknown ticket',
      seats: res.seats || '—',
      outcome: res.kind,
      isNew: true
    };
    this.nextId.set(this.nextId() + 1);
    this.log.update((rows) => [entry].concat(rows.map((r) => (r.isNew ? Object.assign({}, r, { isNew: false }) : r))));

    const s = this.sync();
    if (s.state === 'stale') this.sync.set({ state: 'stale', at: s.at, queued: s.queued + 1 });
  }

  verdictColor(kind) {
    if (kind === 'admitted') return this.brand.accentColor;
    if (kind === 'duplicate') return this.warn;
    if (kind === 'invalid') return this.danger;
    return this.brand.neutralColor;
  }

  verdictLine(kind) {
    if (kind === 'admitted') return 'rgba(143,174,139,0.45)';
    if (kind === 'duplicate') return 'rgba(216,178,106,0.45)';
    if (kind === 'invalid') return 'rgba(208,134,116,0.45)';
    return this.lineSoft;
  }

  verdictTint(kind) {
    if (kind === 'admitted') return 'rgba(143,174,139,0.10)';
    if (kind === 'duplicate') return 'rgba(216,178,106,0.10)';
    if (kind === 'invalid') return 'rgba(208,134,116,0.10)';
    return this.panelAlt;
  }

  verdictIcon(kind) {
    if (kind === 'admitted') return 'CheckCircle';
    if (kind === 'duplicate') return 'AlertCircle';
    if (kind === 'invalid') return 'X';
    return 'Search';
  }

  badgeVariant(outcome) {
    if (outcome === 'admitted') return 'success';
    if (outcome === 'duplicate') return 'warning';
    return 'destructive';
  }

  outcomeLabel(outcome) {
    if (outcome === 'admitted') return 'Admitted';
    if (outcome === 'duplicate') return 'Already used';
    return 'Not valid';
  }

  ngOnDestroy() {
    if (this.scanTimer) clearTimeout(this.scanTimer);
    if (this.syncTimer) clearTimeout(this.syncTimer);
  }
}
