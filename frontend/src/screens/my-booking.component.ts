// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
const template = `
<style>
  @keyframes velvetRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  @keyframes velvetFade { from { opacity: 0; } to { opacity: 1; } }
  .velvet-rise { animation: velvetRise 340ms cubic-bezier(.22,.61,.36,1) both; }
  .velvet-fade { animation: velvetFade 260ms ease-out both; }
  @media (prefers-reduced-motion: reduce) {
    .velvet-rise, .velvet-fade { animation: none !important; }
  }
</style>

<section class="min-h-full px-6 py-10 sm:px-10" [style.font-family]="brand.fontBody" [style.color]="brand.primaryColor">
  <div class="mx-auto w-full max-w-5xl">

    <header class="flex flex-wrap items-end justify-between gap-6">
      <div class="max-w-xl">
        <p class="text-[11px] font-semibold uppercase tracking-[0.2em]" [style.color]="brand.accentColor">Ticket office</p>
        <h1 class="mt-3 text-[34px] font-normal leading-tight sm:text-[38px]" [style.font-family]="brand.fontHeading">My booking</h1>
        <p class="mt-3 max-w-prose text-sm leading-relaxed" [style.color]="brand.neutralColor">
          Enter the reference from your confirmation email together with the address you booked with.
          No account, no password — your ticket opens straight on this page.
        </p>
      </div>
      <button uiButton variant="ghost" size="sm" (click)="navigate('events')">
        <ui-icon name="ArrowLeft" class="mr-2 h-4 w-4" aria-hidden="true"></ui-icon>
        Browse events
      </button>
    </header>

    <hr uiSeparator class="my-8" [style.border-color]="hairline" />

    @if (state() === 'deleted') {
      <div uiCard class="velvet-rise mx-auto max-w-2xl" [style.background-color]="surface" [style.border-color]="hairline">
        <div uiCardHeader>
          <div class="flex items-center gap-3">
            <ui-icon name="CheckCircle" class="h-5 w-5" aria-hidden="true" [style.color]="brand.accentColor"></ui-icon>
            <h2 uiCardTitle class="text-2xl font-normal" [style.font-family]="brand.fontHeading">Your data has been deleted</h2>
          </div>
          <p uiCardDescription class="mt-2 text-sm leading-relaxed" [style.color]="brand.neutralColor">
            Consent withdrawn for booking
            <span class="tabular-nums tracking-[0.12em]" [style.color]="brand.accentColor">{{ deletedInfo().reference }}</span>.
            We have emailed a final confirmation to {{ deletedInfo().email }} and will keep no copy of that address.
          </p>
        </div>
        <div uiCardContent>
          <h3 class="text-[11px] font-semibold uppercase tracking-[0.2em]" [style.color]="brand.neutralColor">What we removed</h3>
          <ul class="mt-4 space-y-3 text-sm">
            @for (item of deletionItems; track item) {
              <li class="flex items-start gap-3">
                <ui-icon name="Check" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" [style.color]="brand.accentColor"></ui-icon>
                <span [style.color]="brand.primaryColor">{{ item }}</span>
              </li>
            }
          </ul>
          <hr uiSeparator class="my-6" [style.border-color]="hairline" />
          <p class="text-sm leading-relaxed" [style.color]="brand.neutralColor">
            The booking is cancelled and the seats are back on sale. The organiser keeps only an anonymised
            attendance count, which cannot be traced back to you.
          </p>
        </div>
        <div uiCardFooter class="flex flex-wrap gap-3">
          <button uiButton (click)="reset()" [style.background-color]="brand.accentColor" [style.border-color]="brand.accentColor" [style.color]="brand.backgroundColor">
            Look up another booking
          </button>
          <button uiButton variant="outline" (click)="navigate('events')">Browse events</button>
        </div>
      </div>
    } @else if (state() === 'found' && booking()) {

      <div class="velvet-rise">
        <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-3">
            @if (booking().status === 'confirmed' && !booking().checked_in) {
              <span uiBadge variant="success" class="tracking-wide">
                <ui-icon name="CheckCircle" class="mr-1.5 h-3.5 w-3.5" aria-hidden="true"></ui-icon>Confirmed
              </span>
            }
            @if (booking().status === 'confirmed' && booking().checked_in) {
              <span uiBadge variant="secondary" class="tracking-wide">
                <ui-icon name="Check" class="mr-1.5 h-3.5 w-3.5" aria-hidden="true"></ui-icon>Checked in
              </span>
            }
            @if (booking().status === 'cancelled') {
              <span uiBadge variant="destructive" class="tracking-wide">
                <ui-icon name="X" class="mr-1.5 h-3.5 w-3.5" aria-hidden="true"></ui-icon>Cancelled
              </span>
            }
            <span class="text-[11px] uppercase tracking-[0.2em]" [style.color]="brand.neutralColor">
              Booked {{ fmtDate(booking().created_at) }}
            </span>
          </div>
          <button uiButton variant="ghost" size="sm" (click)="reset()">
            <ui-icon name="Search" class="mr-2 h-4 w-4" aria-hidden="true"></ui-icon>
            Look up another booking
          </button>
        </div>

        @if (notice()) {
          <div class="velvet-fade mb-6 flex items-start gap-3 rounded-md border p-4"
               role="status"
               [style.border-color]="brand.accentColor"
               [style.background-color]="accentWash">
            <ui-icon name="CheckCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" [style.color]="brand.accentColor"></ui-icon>
            <p class="text-sm leading-relaxed" [style.color]="brand.primaryColor">{{ notice() }}</p>
            <button uiButton variant="ghost" size="sm" class="ml-auto -mt-1" aria-label="Dismiss this message" (click)="notice.set(null)">
              <ui-icon name="X" class="h-4 w-4" aria-hidden="true"></ui-icon>
            </button>
          </div>
        }

        <div class="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">

          <!-- TICKET STUB -->
          <div uiCard class="relative overflow-hidden p-6" [style.background-color]="surfaceRaised" [style.border-color]="hairline">
            <h2 class="text-[11px] font-semibold uppercase tracking-[0.2em]" [style.color]="brand.accentColor">Entry pass</h2>
            <p class="mt-3 text-xl leading-snug" [style.font-family]="brand.fontHeading">{{ booking().event.title }}</p>
            <p class="mt-2 text-sm tabular-nums" [style.color]="brand.primaryColor">{{ fmtDateTime(booking().event.start_datetime) }}</p>
            <p class="mt-1 text-sm leading-relaxed" [style.color]="brand.neutralColor">{{ booking().event.venue }}</p>

            <div class="my-6 flex items-center">
              <span aria-hidden="true" class="-ml-8 h-5 w-5 rounded-full" [style.background-color]="brand.backgroundColor"></span>
              <span aria-hidden="true" class="mx-2 h-px flex-1 border-t border-dashed" [style.border-color]="hairline"></span>
              <span aria-hidden="true" class="-mr-8 h-5 w-5 rounded-full" [style.background-color]="brand.backgroundColor"></span>
            </div>

            <div class="flex flex-col items-center">
              <div class="relative rounded-md p-3" [style.background-color]="brand.primaryColor">
                <div class="grid w-60 gap-0"
                     role="img"
                     [attr.aria-label]="'QR ticket for booking ' + booking().reference"
                     [class.opacity-20]="booking().status === 'cancelled'"
                     [style.grid-template-columns]="'repeat(25, minmax(0, 1fr))'"
                     [style.aspect-ratio]="'1 / 1'">
                  @for (cell of qrCells(); track cell.i) {
                    <span aria-hidden="true" class="block h-full w-full"
                          [style.background-color]="cell.on ? brand.backgroundColor : 'transparent'"></span>
                  }
                </div>
                @if (booking().status === 'cancelled') {
                  <span class="absolute inset-0 flex items-center justify-center text-sm font-semibold uppercase tracking-[0.3em]"
                        [style.color]="brand.backgroundColor">Void</span>
                }
              </div>

              <p class="mt-5 text-[11px] uppercase tracking-[0.2em]" [style.color]="brand.neutralColor">Booking reference</p>
              <p class="mt-1 text-lg tabular-nums tracking-[0.22em]" [style.color]="brand.accentColor">{{ booking().reference }}</p>

              @if (booking().status === 'cancelled') {
                <p class="mt-4 text-center text-sm leading-relaxed" [style.color]="brand.neutralColor">
                  This ticket was cancelled and will not scan at the door.
                </p>
              } @else if (booking().checked_in) {
                <p class="mt-4 text-center text-sm leading-relaxed tabular-nums" [style.color]="brand.neutralColor">
                  Scanned at the door {{ fmtDateTime(booking().checked_in_at) }}.
                </p>
              } @else {
                <p class="mt-4 text-center text-sm leading-relaxed" [style.color]="brand.neutralColor">
                  Show this screen at the door. Brightness up helps the scanner.
                </p>
              }
            </div>
          </div>

          <!-- DETAILS -->
          <div class="space-y-8">
            <div class="grid gap-4 sm:grid-cols-3">
              <ui-stat label="Seats held" [value]="booking().seats.length + ''" [hint]="seatSummary()"></ui-stat>
              <ui-stat label="Order total" [value]="totalLabel()" [hint]="booking().event.is_free ? 'Free event' : 'Settled with the organiser'"></ui-stat>
              <ui-stat label="Doors open" [value]="booking().event.doors" [hint]="'Gate ' + booking().event.gate"></ui-stat>
            </div>

            <div uiCard [style.background-color]="surface" [style.border-color]="hairline">
              <div uiCardHeader>
                <h2 uiCardTitle class="text-xl font-normal" [style.font-family]="brand.fontHeading">Your seats</h2>
                <p uiCardDescription class="text-sm" [style.color]="brand.neutralColor">
                  Each seat is identified by row and number on the venue layout.
                </p>
              </div>
              <div uiCardContent>
                <table uiTable class="w-full tabular-nums">
                  <thead uiTHead>
                    <tr uiTR>
                      <th uiTH scope="col">Seat</th>
                      <th uiTH scope="col">Status</th>
                      <th uiTH scope="col" class="text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody uiTBody>
                    @for (seat of booking().seats; track seat.id) {
                      <tr uiTR>
                        <td uiTD class="font-medium">Row {{ seat.row_label }} · Seat {{ seat.seat_number }}</td>
                        <td uiTD>
                          @if (seat.status === 'booked') {
                            <span [style.color]="brand.primaryColor">Reserved for you</span>
                          } @else {
                            <span [style.color]="brand.neutralColor">Released</span>
                          }
                        </td>
                        <td uiTD class="text-right">{{ booking().event.is_free ? 'Free' : money(seat.price_minor) }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
              <div uiCardFooter class="flex flex-wrap items-center justify-between gap-3">
                <dl class="grid grid-cols-1 gap-x-10 gap-y-2 text-sm sm:grid-cols-2">
                  <div class="flex gap-2">
                    <dt [style.color]="brand.neutralColor">Booked by</dt>
                    <dd>{{ booking().guest_name }}</dd>
                  </div>
                  <div class="flex gap-2">
                    <dt [style.color]="brand.neutralColor">Email</dt>
                    <dd>{{ booking().guest_email }}</dd>
                  </div>
                  <div class="flex gap-2">
                    <dt [style.color]="brand.neutralColor">Phone</dt>
                    <dd class="tabular-nums">{{ booking().guest_phone }}</dd>
                  </div>
                  <div class="flex gap-2">
                    <dt [style.color]="brand.neutralColor">Reference</dt>
                    <dd class="tabular-nums tracking-[0.12em]">{{ booking().reference }}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div uiCard [style.background-color]="surface" [style.border-color]="hairline">
              <div uiCardHeader>
                <h2 uiCardTitle class="text-xl font-normal" [style.font-family]="brand.fontHeading">Manage this booking</h2>
                <p uiCardDescription class="text-sm leading-relaxed" [style.color]="brand.neutralColor">
                  {{ booking().event.cancellation_policy }}
                </p>
              </div>
              <div uiCardContent>
                @switch (confirmAction()) {
                  @case ('cancel') {
                    <div class="velvet-fade rounded-md border p-5" role="group" aria-label="Confirm cancellation"
                         (keydown.escape)="confirmAction.set(null)"
                         [style.border-color]="hairline" [style.background-color]="surfaceRaised">
                      <h3 class="text-base font-semibold">Cancel {{ booking().seats.length }} seat{{ booking().seats.length === 1 ? '' : 's' }} for {{ booking().event.title }}?</h3>
                      <p class="mt-2 max-w-prose text-sm leading-relaxed" [style.color]="brand.neutralColor">
                        The seats go back on sale straight away and this ticket stops scanning at the door.
                        We will email the cancellation to {{ booking().guest_email }}.
                        @if (!booking().event.is_free) {
                          Any refund of {{ totalLabel() }} follows the organiser's policy and is settled outside the app.
                        }
                      </p>
                      <div class="mt-5 flex flex-wrap gap-3">
                        <button uiButton variant="destructive" (click)="cancelBooking()">Yes, cancel the booking</button>
                        <button uiButton variant="ghost" (click)="confirmAction.set(null)">Keep my seats</button>
                      </div>
                    </div>
                  }
                  @case ('withdraw') {
                    <div class="velvet-fade rounded-md border p-5" role="group" aria-label="Confirm consent withdrawal"
                         (keydown.escape)="confirmAction.set(null)"
                         [style.border-color]="hairline" [style.background-color]="surfaceRaised">
                      <h3 class="text-base font-semibold">Withdraw consent and delete your details?</h3>
                      <p class="mt-2 max-w-prose text-sm leading-relaxed" [style.color]="brand.neutralColor">
                        Your name, email and phone are erased and the booking is anonymised. That also cancels it —
                        we cannot hold a seat without a way to identify you at the door. This cannot be undone.
                      </p>
                      <div class="mt-5 flex flex-wrap gap-3">
                        <button uiButton variant="destructive" (click)="withdrawConsent()">Withdraw consent and delete</button>
                        <button uiButton variant="ghost" (click)="confirmAction.set(null)">Keep my data</button>
                      </div>
                    </div>
                  }
                  @default {
                    <div class="flex flex-wrap items-center gap-3">
                      <button uiButton
                              [disabled]="booking().status === 'cancelled'"
                              (click)="resendTicket()"
                              [style.background-color]="booking().status === 'cancelled' ? 'transparent' : brand.accentColor"
                              [style.border-color]="brand.accentColor"
                              [style.color]="booking().status === 'cancelled' ? brand.neutralColor : brand.backgroundColor">
                        <ui-icon name="Download" class="mr-2 h-4 w-4" aria-hidden="true"></ui-icon>
                        Email my ticket again
                      </button>

                      @if (booking().status === 'cancelled') {
                        <span class="inline-flex items-center gap-2 text-sm" [style.color]="brand.neutralColor">
                          <ui-icon name="AlertCircle" class="h-4 w-4" aria-hidden="true"></ui-icon>
                          Already cancelled on {{ fmtDate(booking().cancelled_at) }}
                        </span>
                      } @else if (booking().can_cancel) {
                        <button uiButton variant="outline" (click)="confirmAction.set('cancel')">
                          <ui-icon name="X" class="mr-2 h-4 w-4" aria-hidden="true"></ui-icon>
                          Cancel booking
                        </button>
                      } @else {
                        <span class="inline-flex max-w-sm items-start gap-2 text-sm leading-relaxed" [style.color]="brand.neutralColor">
                          <ui-icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
                          {{ booking().cancel_block_reason }}
                        </span>
                      }
                    </div>
                  }
                }
              </div>
              <div uiCardFooter class="flex flex-col items-start gap-3">
                <hr uiSeparator class="w-full" [style.border-color]="hairline" />
                <h3 class="text-[11px] font-semibold uppercase tracking-[0.2em]" [style.color]="brand.neutralColor">Your consent</h3>
                <p class="max-w-prose text-sm leading-relaxed tabular-nums" [style.color]="brand.neutralColor">
                  @if (booking().consent_given) {
                    Given {{ fmtDateTime(booking().consent_at) }} against notice {{ booking().consent_notice_version }}.
                    You confirmed you are 18 or older. We hold your name, email and phone only to issue this ticket and
                    contact you about this event.
                  } @else {
                    Consent withdrawn. We no longer hold contact details for this booking.
                  }
                </p>
                @if (booking().consent_given && confirmAction() !== 'withdraw') {
                  <button uiButton variant="ghost" size="sm" (click)="confirmAction.set('withdraw')">
                    <ui-icon name="Trash" class="mr-2 h-4 w-4" aria-hidden="true"></ui-icon>
                    Withdraw consent and delete my data
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    } @else {

      <div class="grid gap-8 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-start">
        <div uiCard class="velvet-rise" [style.background-color]="surfaceRaised" [style.border-color]="hairline">
          <div uiCardHeader>
            <h2 uiCardTitle class="text-2xl font-normal" [style.font-family]="brand.fontHeading">Find your ticket</h2>
            <p uiCardDescription class="text-sm leading-relaxed" [style.color]="brand.neutralColor">
              Both details have to match the booking, so nobody else can open your ticket.
            </p>
          </div>
          <div uiCardContent>
            <form (ngSubmit)="submitLookup()" novalidate class="space-y-6">
              <div class="space-y-2">
                <label uiLabel for="reference" class="text-[11px] font-semibold uppercase tracking-[0.2em]" [style.color]="brand.neutralColor">Booking reference</label>
                <input uiInput id="reference" name="reference" class="tabular-nums tracking-[0.12em]"
                       [(ngModel)]="refInput" autocomplete="off" spellcheck="false"
                       placeholder="QRQ-7F2K9D"
                       [attr.aria-invalid]="fieldErrors().reference ? 'true' : null"
                       aria-describedby="reference-help" />
                <p id="reference-help" class="text-xs leading-relaxed" [style.color]="brand.neutralColor">
                  Six characters after QRQ — it is at the top of your confirmation email.
                </p>
                @if (fieldErrors().reference) {
                  <p role="alert" class="flex items-start gap-2 text-xs leading-relaxed" [style.color]="dangerColor">
                    <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                    {{ fieldErrors().reference }}
                  </p>
                }
              </div>

              <div class="space-y-2">
                <label uiLabel for="email" class="text-[11px] font-semibold uppercase tracking-[0.2em]" [style.color]="brand.neutralColor">Email used to book</label>
                <input uiInput id="email" name="email" type="email" autocomplete="email"
                       [(ngModel)]="emailInput"
                       placeholder="you@example.com"
                       [attr.aria-invalid]="fieldErrors().email ? 'true' : null" />
                @if (fieldErrors().email) {
                  <p role="alert" class="flex items-start gap-2 text-xs leading-relaxed" [style.color]="dangerColor">
                    <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                    {{ fieldErrors().email }}
                  </p>
                }
              </div>

              <button uiButton type="submit" class="w-full justify-center"
                      [disabled]="state() === 'loading' || state() === 'locked'"
                      [style.background-color]="state() === 'locked' ? 'transparent' : brand.accentColor"
                      [style.border-color]="brand.accentColor"
                      [style.color]="state() === 'locked' ? brand.neutralColor : brand.backgroundColor">
                @if (state() === 'loading') {
                  <span class="animate-pulse">Checking the ticket office…</span>
                } @else {
                  <span>Find my booking</span>
                }
              </button>
            </form>
          </div>
        </div>

        <div class="lg:pt-2">
          @switch (state()) {
            @case ('loading') {
              <div uiCard class="velvet-fade p-8" [style.background-color]="surface" [style.border-color]="hairline" aria-live="polite">
                <p class="text-[11px] font-semibold uppercase tracking-[0.2em]" [style.color]="brand.accentColor">Checking</p>
                <h2 class="mt-3 text-xl font-normal" [style.font-family]="brand.fontHeading">Matching your reference</h2>
                <div class="mt-6 animate-pulse space-y-4" aria-hidden="true">
                  <div class="h-3 w-2/3 rounded" [style.background-color]="hairline"></div>
                  <div class="h-3 w-1/2 rounded" [style.background-color]="hairline"></div>
                  <div class="h-40 w-40 rounded" [style.background-color]="hairline"></div>
                  <div class="h-3 w-1/3 rounded" [style.background-color]="hairline"></div>
                </div>
              </div>
            }
            @case ('notfound') {
              <div uiCard class="velvet-fade p-8" role="alert" [style.background-color]="surface" [style.border-color]="hairline">
                <div class="flex items-start gap-3">
                  <ui-icon name="AlertCircle" class="mt-1 h-5 w-5 shrink-0" aria-hidden="true" [style.color]="dangerColor"></ui-icon>
                  <div>
                    <h2 class="text-xl font-normal" [style.font-family]="brand.fontHeading">No booking matches those details</h2>
                    <p class="mt-3 max-w-prose text-sm leading-relaxed" [style.color]="brand.neutralColor">
                      We could not find <span class="tabular-nums tracking-[0.12em]" [style.color]="brand.primaryColor">{{ lastTriedRef() }}</span>
                      held against that email address. References look like QRQ-7F2K9D, and the email has to be the one you
                      typed when booking — not a forwarded address.
                    </p>
                    <p class="mt-3 max-w-prose text-sm leading-relaxed" [style.color]="brand.neutralColor">
                      Your details are still in the form, so you can correct one character and try again.
                      Attempt {{ attempts() }} of 3.
                    </p>
                  </div>
                </div>
              </div>
            }
            @case ('locked') {
              <div uiCard class="velvet-fade p-8" role="alert" [style.background-color]="surface" [style.border-color]="hairline">
                <h2 class="text-xl font-normal" [style.font-family]="brand.fontHeading">Lookup paused for 10 minutes</h2>
                <p class="mt-3 max-w-prose text-sm leading-relaxed" [style.color]="brand.neutralColor">
                  Three attempts did not match, so we have paused this lookup to protect other people's bookings.
                  Your entries are kept below.
                </p>
                <p class="mt-3 max-w-prose text-sm leading-relaxed" [style.color]="brand.neutralColor">
                  Lost the email? Forward anything you have to
                  <span [style.color]="brand.accentColor">boxoffice&#64;quorq.ai</span> and the organiser will resend your ticket.
                </p>
                <div class="mt-6 flex flex-wrap gap-3">
                  <button uiButton variant="outline" (click)="reset()">Start over</button>
                  <button uiButton variant="ghost" (click)="navigate('events')">Browse events</button>
                </div>
              </div>
            }
            @default {
              <ui-empty title="Your ticket appears here"
                        description="Once we match your reference and email you will see the event, your exact seats and a QR pass you can scan at the door.">
                <button uiButton variant="outline" (click)="navigate('events')">
                  <ui-icon name="Calendar" class="mr-2 h-4 w-4" aria-hidden="true"></ui-icon>
                  See what's on
                </button>
              </ui-empty>
            }
          }
        </div>
      </div>
    }
  </div>
</section>
`;

@Component({
  selector: "app-my-booking-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase {
  surface = '#1b2a23';
  surfaceRaised = '#1f3028';
  hairline = 'rgba(233, 237, 233, 0.12)';
  accentWash = 'rgba(143, 174, 139, 0.10)';
  dangerColor = '#d98b7a';

  refInput = signal('');
  emailInput = signal('');
  fieldErrors = signal({});
  state = signal('idle');
  attempts = signal(0);
  lastTriedRef = signal('');
  activeRef = signal(null);
  confirmAction = signal(null);
  notice = signal(null);
  deletedInfo = signal({ reference: '', email: '' });

  deletionItems = [
    'Name, email address and phone number removed from the booking record',
    'The confirmation email thread closed and the address dropped from our sending list',
    'QR token revoked, so the ticket can no longer be scanned',
    'Audit entry kept without personal data, as the law requires'
  ];

  records = signal([
    {
      reference: 'QRQ-7F2K9D',
      qr_token: 'qr_8c31f09a4b7e2d55',
      guest_name: 'Priya Nambiar',
      guest_email: 'priya.nambiar@gmail.com',
      guest_phone: '+91 98201 44317',
      status: 'confirmed',
      checked_in: false,
      checked_in_at: null,
      consent_given: true,
      consent_at: '2026-10-28T20:14:00+05:30',
      consent_notice_version: 'v1.3',
      adult_confirmed: true,
      anonymised: false,
      created_at: '2026-10-28T20:14:00+05:30',
      cancelled_at: null,
      can_cancel: true,
      cancel_block_reason: null,
      event: {
        title: 'Mehfil-e-Ghazal — Ustad Rashid Khan Live',
        start_datetime: '2026-11-14T19:30:00+05:30',
        doors: '6:45 PM',
        gate: '2 (South)',
        venue: 'Shanmukhananda Hall, Matunga, Mumbai',
        is_free: false,
        price_minor: 180000,
        currency: 'INR',
        cancellation_policy: 'Free cancellation until 48 hours before doors. Refunds are settled by the organiser outside the app.'
      },
      seats: [
        { id: 's-c11', row_label: 'C', seat_number: 11, price_minor: 180000, status: 'booked' },
        { id: 's-c12', row_label: 'C', seat_number: 12, price_minor: 180000, status: 'booked' }
      ]
    },
    {
      reference: 'QRQ-3M8XQ1',
      qr_token: 'qr_41d7bb90ce23a187',
      guest_name: 'Arjun Rao',
      guest_email: 'arjun.rao@outlook.com',
      guest_phone: '+91 99456 20118',
      status: 'cancelled',
      checked_in: false,
      checked_in_at: null,
      consent_given: true,
      consent_at: '2026-10-19T11:02:00+05:30',
      consent_notice_version: 'v1.3',
      adult_confirmed: true,
      anonymised: false,
      created_at: '2026-10-19T11:02:00+05:30',
      cancelled_at: '2026-11-01T09:38:00+05:30',
      can_cancel: false,
      cancel_block_reason: 'This booking is already cancelled.',
      event: {
        title: 'Bengaluru Poetry Collective — Open Mic',
        start_datetime: '2026-11-09T18:00:00+05:30',
        doors: '5:30 PM',
        gate: 'Street door',
        venue: 'Atta Galatta, Koramangala, Bengaluru',
        is_free: true,
        price_minor: 0,
        currency: 'INR',
        cancellation_policy: 'Free event. Cancel any time before doors so the seat can go to someone on the waiting list.'
      },
      seats: [
        { id: 's-a04', row_label: 'A', seat_number: 4, price_minor: 0, status: 'available' }
      ]
    },
    {
      reference: 'QRQ-5T4VB7',
      qr_token: 'qr_6f2ad8c5190be374',
      guest_name: 'Lakshmi Iyer',
      guest_email: 'lakshmi.iyer@zoho.com',
      guest_phone: '+91 94440 71256',
      status: 'confirmed',
      checked_in: true,
      checked_in_at: '2026-11-02T06:12:00+05:30',
      consent_given: true,
      consent_at: '2026-10-06T17:45:00+05:30',
      consent_notice_version: 'v1.2',
      adult_confirmed: true,
      anonymised: false,
      created_at: '2026-10-06T17:45:00+05:30',
      cancelled_at: null,
      can_cancel: false,
      cancel_block_reason: 'This concert has already taken place, so it can no longer be cancelled.',
      event: {
        title: 'Carnatic Sunrise — Sudha Ragunathan',
        start_datetime: '2026-11-02T06:30:00+05:30',
        doors: '5:45 AM',
        gate: '1 (Main)',
        venue: 'The Music Academy, Royapettah, Chennai',
        is_free: false,
        price_minor: 95000,
        currency: 'INR',
        cancellation_policy: 'Cancellation closes 24 hours before the recital. After that the seat is held for you whether or not you attend.'
      },
      seats: [
        { id: 's-g07', row_label: 'G', seat_number: 7, price_minor: 95000, status: 'booked' }
      ]
    }
  ]);

  booking = computed(() => {
    const ref = this.activeRef();
    if (!ref) return null;
    return this.records().find((b) => b.reference === ref) || null;
  });

  seatSummary = computed(() => {
    const b = this.booking();
    if (!b) return '';
    return b.seats.map((s) => 'Row ' + s.row_label + ' ' + s.seat_number).join(' · ');
  });

  totalLabel = computed(() => {
    const b = this.booking();
    if (!b) return '';
    if (b.event.is_free) return 'Free';
    const total = b.seats.reduce((sum, s) => sum + s.price_minor, 0);
    return this.money(total);
  });

  qrCells = computed(() => {
    const b = this.booking();
    const token = b ? b.qr_token : 'qr_placeholder';
    const size = 25;
    const grid = [];
    for (let r = 0; r < size; r++) {
      grid.push(new Array(size).fill(0));
    }
    const finder = (top, left) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          const edge = i === 0 || i === 6 || j === 0 || j === 6;
          const core = i >= 2 && i <= 4 && j >= 2 && j <= 4;
          grid[top + i][left + j] = edge || core ? 1 : 0;
        }
      }
    };
    finder(0, 0);
    finder(0, size - 7);
    finder(size - 7, 0);

    let h = 2166136261;
    for (let i = 0; i < token.length; i++) {
      h ^= token.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const next = () => {
      h ^= h << 13;
      h ^= h >>> 17;
      h ^= h << 5;
      return (h >>> 0) / 4294967296;
    };

    const reserved = (r, c) =>
      (r < 8 && c < 8) || (r < 8 && c >= size - 8) || (r >= size - 8 && c < 8);

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (reserved(r, c)) continue;
        if (r === 6 || c === 6) {
          grid[r][c] = (r + c) % 2 === 0 ? 1 : 0;
          continue;
        }
        grid[r][c] = next() > 0.52 ? 1 : 0;
      }
    }
    grid[size - 8][size - 8] = 1;

    const cells = [];
    let i = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        cells.push({ i: i++, on: grid[r][c] === 1 });
      }
    }
    return cells;
  });

  money(minor) {
    const rupees = minor / 100;
    return '₹' + rupees.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  fmtDate(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  fmtDateTime(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let hours = d.getHours();
    const mins = String(d.getMinutes()).padStart(2, '0');
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return days[d.getDay()] + ', ' + this.fmtDate(iso) + ' · ' + hours + ':' + mins + ' ' + suffix;
  }

  normaliseRef(value) {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  submitLookup() {
    if (this.state() === 'locked' || this.state() === 'loading') return;

    const ref = this.refInput().trim();
    const email = this.emailInput().trim();
    const errors = {};

    if (!ref) {
      errors.reference = 'Enter the booking reference from your confirmation email, like QRQ-7F2K9D.';
    } else if (this.normaliseRef(ref).length < 6) {
      errors.reference = 'That reference looks too short. It has six characters after QRQ.';
    }

    if (!email) {
      errors.email = 'Enter the email address you booked with.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'That does not look like an email address. Check for a missing @ or a typo.';
    }

    this.fieldErrors.set(errors);
    if (Object.keys(errors).length > 0) {
      this.state.set('idle');
      return;
    }

    this.notice.set(null);
    this.state.set('loading');

    setTimeout(() => {
      const match = this.records().find(
        (b) =>
          this.normaliseRef(b.reference) === this.normaliseRef(ref) &&
          !b.anonymised &&
          b.guest_email.toLowerCase() === email.toLowerCase()
      );

      if (match) {
        this.attempts.set(0);
        this.activeRef.set(match.reference);
        this.confirmAction.set(null);
        this.state.set('found');
      } else {
        this.lastTriedRef.set(ref.toUpperCase());
        const tries = this.attempts() + 1;
        this.attempts.set(tries);
        this.state.set(tries >= 3 ? 'locked' : 'notfound');
      }
    }, 650);
  }

  reset() {
    this.state.set('idle');
    this.activeRef.set(null);
    this.confirmAction.set(null);
    this.notice.set(null);
    this.fieldErrors.set({});
    this.attempts.set(0);
    this.refInput.set('');
    this.emailInput.set('');
  }

  resendTicket() {
    const b = this.booking();
    if (!b) return;
    this.notice.set(
      'Ticket re-sent to ' + b.guest_email + ' just now, with reference ' + b.reference +
      ' and the same QR pass. It can take a minute to arrive — check promotions or spam.'
    );
  }

  cancelBooking() {
    const b = this.booking();
    if (!b) return;
    const paid = !b.event.is_free;
    const total = this.totalLabel();

    this.records.update((list) =>
      list.map((rec) =>
        rec.reference === b.reference
          ? Object.assign({}, rec, {
              status: 'cancelled',
              can_cancel: false,
              cancel_block_reason: 'This booking is already cancelled.',
              cancelled_at: '2026-11-04T00:00:00+05:30',
              seats: rec.seats.map((s) => Object.assign({}, s, { status: 'available' }))
            })
          : rec
      )
    );
    this.confirmAction.set(null);
    this.notice.set(
      'Booking cancelled. A confirmation is on its way to ' + b.guest_email +
      ' and your seats are back on sale.' +
      (paid ? ' Any refund of ' + total + ' follows the organiser’s policy and is settled outside the app.' : '')
    );
  }

  withdrawConsent() {
    const b = this.booking();
    if (!b) return;
    this.deletedInfo.set({ reference: b.reference, email: b.guest_email });

    this.records.update((list) =>
      list.map((rec) =>
        rec.reference === b.reference
          ? Object.assign({}, rec, {
              status: 'cancelled',
              anonymised: true,
              consent_given: false,
              guest_name: 'Removed at the attendee’s request',
              guest_email: 'deleted',
              guest_phone: 'deleted',
              qr_token: 'revoked',
              can_cancel: false,
              cancelled_at: '2026-11-04T00:00:00+05:30',
              seats: rec.seats.map((s) => Object.assign({}, s, { status: 'available' }))
            })
          : rec
      )
    );

    this.confirmAction.set(null);
    this.activeRef.set(null);
    this.notice.set(null);
    this.refInput.set('');
    this.emailInput.set('');
    this.state.set('deleted');
  }
}
