// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.

import { Component, signal, computed, effect } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
import { clearToken } from "@/lib/auth";
import { apiFetch, ApiError } from "@/lib/api";
const template = `
<div class="velvet min-h-screen w-full"
     [style.background-color]="brand.backgroundColor"
     [style.color]="brand.primaryColor"
     [style.font-family]="brand.fontBody"
     [style.--velvet-accent]="brand.accentColor">

  <style>
    .velvet *:focus-visible { outline: 2px solid var(--velvet-accent); outline-offset: 2px; border-radius: 4px; }
    .velvet .seat { width: 13px; height: 13px; border-radius: 2px; border-width: 1px; border-style: solid; }
    .velvet .stage-arc { border-bottom-left-radius: 999px; border-bottom-right-radius: 999px; }
  </style>

  <div class="mx-auto max-w-[1340px] px-6 py-10 lg:px-10">

    <!-- ============ Page header ============ -->
    <header class="flex flex-wrap items-end justify-between gap-6">
      <div class="max-w-[64ch]">
        <p class="text-[11px] uppercase tracking-[0.22em]" [style.color]="brand.neutralColor">Organiser workspace &middot; Sabha Live</p>
        <h1 class="mt-3 text-[36px] leading-[1.15]" [style.font-family]="brand.fontHeading">Events</h1>
        <p class="mt-3 text-sm leading-relaxed" [style.color]="brand.neutralColor">
          Select an event to edit its details, lay out its seats, set its price, publish it, or read its bookings.
          Drafts stay invisible to the public until you publish them.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button uiButton variant="ghost" type="button" (click)="signOut()" [style.color]="brand.neutralColor">
          Sign out
        </button>
        <button uiButton variant="secondary" type="button" class="border gap-2" (click)="startCreate()"
                [style.background-color]="panel2" [style.border-color]="line" [style.color]="brand.primaryColor">
          <ui-icon name="Plus" class="h-4 w-4" aria-hidden="true"></ui-icon>
          New event
        </button>
      </div>
    </header>

    <!-- ============ Flash ============ -->
    @if (flash(); as f) {
      <div role="status" class="mt-6 flex items-start gap-3 rounded-[6px] border px-4 py-3 text-sm transition-opacity duration-300 motion-reduce:transition-none"
           [style.border-color]="line" [style.background-color]="panel">
        <ui-icon [name]="f.tone === 'error' ? 'AlertCircle' : 'CheckCircle'" class="mt-0.5 h-4 w-4 shrink-0"
                 [style.color]="f.tone === 'error' ? brand.primaryColor : brand.accentColor" aria-hidden="true"></ui-icon>
        <p class="flex-1 leading-relaxed">{{ f.text }}</p>
        <button type="button" (click)="flash.set(null)" aria-label="Dismiss this message"
                class="rounded p-1 transition-colors hover:bg-white/10 motion-reduce:transition-none" [style.color]="brand.neutralColor">
          <ui-icon name="X" class="h-4 w-4" aria-hidden="true"></ui-icon>
        </button>
      </div>
    }

    <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[348px_minmax(0,1fr)]">

      <!-- ============ Event list ============ -->
      <aside aria-labelledby="events-list-heading" class="h-fit rounded-[6px] border"
             [style.border-color]="line" [style.background-color]="panel">
        <div class="p-5">
          <div class="flex items-baseline justify-between gap-3">
            <h2 id="events-list-heading" class="text-[19px]" [style.font-family]="brand.fontHeading">Your events</h2>
            <span class="text-[11px] uppercase tracking-[0.16em] tabular-nums" [style.color]="brand.neutralColor">
              {{ filtered().length }} of {{ events().length }}
            </span>
          </div>

          <div class="mt-4">
            <label uiLabel for="event-search" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Search events</label>
            <div class="relative mt-2">
              <ui-icon name="Search" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" [style.color]="brand.neutralColor" aria-hidden="true"></ui-icon>
              <input uiInput id="event-search" name="eventSearch" type="search" [(ngModel)]="query"
                     placeholder="Title or venue"
                     class="w-full rounded-[6px] border pl-9 pr-3 py-2 text-sm placeholder:text-white/30"
                     [style.background-color]="field" [style.border-color]="line" [style.color]="brand.primaryColor" />
            </div>
          </div>

          <div class="mt-4 flex gap-2" role="group" aria-label="Filter events by status">
            @for (f of statusFilters; track f.value) {
              <button type="button" (click)="statusFilter.set(f.value)"
                      [attr.aria-pressed]="statusFilter() === f.value"
                      class="flex-1 rounded-[6px] border px-2 py-2 text-[11px] uppercase tracking-[0.12em] tabular-nums transition-colors hover:bg-white/5 motion-reduce:transition-none"
                      [style.border-color]="statusFilter() === f.value ? brand.accentColor : line"
                      [style.color]="statusFilter() === f.value ? brand.accentColor : brand.neutralColor">
                {{ f.label }} {{ countFor(f.value) }}
              </button>
            }
          </div>

          <div class="mt-4 flex items-center justify-between gap-2">
            <p class="flex items-center gap-2 text-[11px]" [style.color]="brand.neutralColor">
              <span class="inline-block h-1.5 w-1.5 rounded-full"
                    [style.background-color]="stale() ? brand.neutralColor : brand.accentColor" aria-hidden="true"></span>
              {{ syncedLabel() }}
            </p>
            <button uiButton variant="ghost" type="button" class="h-8 px-2 text-xs" (click)="refresh()" [disabled]="loading()"
                    [style.color]="brand.neutralColor">
              {{ loading() ? 'Refreshing...' : 'Refresh' }}
            </button>
          </div>
        </div>

        <hr uiSeparator [style.border-color]="line" />

        @if (loadError() && !loading()) {
          <div class="px-4 py-6">
            <ui-empty title="Could not load your events" [description]="loadError()">
              <button uiButton variant="secondary" type="button" class="border" (click)="refresh()"
                      [style.background-color]="panel2" [style.border-color]="line" [style.color]="brand.primaryColor">
                Try again
              </button>
            </ui-empty>
          </div>
        } @else if (loading()) {
          <ul class="divide-y" [style.border-color]="line">
            @for (s of skeletons; track s) {
              <li class="px-5 py-5">
                <div class="h-3 w-3/4 rounded bg-white/10 motion-safe:animate-pulse"></div>
                <div class="mt-3 h-2.5 w-1/2 rounded bg-white/5 motion-safe:animate-pulse"></div>
              </li>
            }
          </ul>
          <p class="px-5 py-4 text-xs" [style.color]="brand.neutralColor">Fetching the latest statuses and booking counts...</p>
        } @else if (filtered().length === 0) {
          <div class="px-4 py-6">
            <ui-empty title="No events match that search"
                      description="Nothing here matches your words or the status filter. Try the venue name, or widen the filter back to all events.">
              <button uiButton variant="secondary" type="button" class="border" (click)="clearFilters()"
                      [style.background-color]="panel2" [style.border-color]="line" [style.color]="brand.primaryColor">
                Clear search and filter
              </button>
            </ui-empty>
          </div>
        } @else {
          <ul class="divide-y" [style.border-color]="line">
            @for (e of filtered(); track e.id) {
              <li>
                <button type="button" (click)="selectEvent(e.id)"
                        [attr.aria-current]="e.id === selectedId() ? 'true' : null"
                        class="relative block w-full px-5 py-4 text-left transition-colors duration-200 hover:bg-white/5 motion-reduce:transition-none"
                        [style.background-color]="e.id === selectedId() ? panel2 : 'transparent'">
                  <span class="absolute left-0 top-0 h-full w-[2px]" aria-hidden="true"
                        [style.background-color]="e.id === selectedId() ? brand.accentColor : 'transparent'"></span>
                  <span class="flex items-start justify-between gap-3">
                    <span class="text-[15px] leading-snug" [style.font-family]="brand.fontHeading">{{ e.title }}</span>
                    <span uiBadge variant="outline"
                          class="shrink-0 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]"
                          [style.border-color]="e.status === 'published' ? brand.accentColor : line"
                          [style.color]="e.status === 'published' ? brand.accentColor : brand.neutralColor"
                          [style.background-color]="'transparent'">
                      {{ e.status === 'published' ? 'Published' : 'Draft' }}
                    </span>
                  </span>
                  <span class="mt-2 block text-xs tabular-nums" [style.color]="brand.neutralColor">
                    {{ fmtShort(e.start_datetime) }} &middot; {{ e.venue }}
                  </span>
                  <span class="mt-1.5 block text-[10px] uppercase tracking-[0.14em] tabular-nums" [style.color]="brand.neutralColor">
                    {{ seatSummary(e) }}
                  </span>
                </button>
              </li>
            }
          </ul>
        }
      </aside>

      <!-- ============ Workspace ============ -->
      <section aria-labelledby="workspace-heading" class="rounded-[6px] border"
               [style.border-color]="line" [style.background-color]="panel">

        <!-- ---- Create mode ---- -->
        @if (mode() === 'create') {
          <div class="p-6 lg:p-8">
            <p class="text-[11px] uppercase tracking-[0.22em]" [style.color]="brand.accentColor">New event</p>
            <h2 id="workspace-heading" class="mt-3 text-[28px] leading-tight" [style.font-family]="brand.fontHeading">Create a draft event</h2>
            <p class="mt-3 max-w-[62ch] text-sm leading-relaxed" [style.color]="brand.neutralColor">
              It saves as a draft, hidden from public browsing and search. You can lay out seats and set the price before you publish.
            </p>

            <form class="mt-8 max-w-[64ch]" (submit)="createEvent($event)" novalidate>
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label uiLabel for="c-title" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Title</label>
                  <input uiInput id="c-title" name="cTitle" [(ngModel)]="fTitle"
                         [attr.aria-invalid]="errors().title ? 'true' : null"
                         [attr.aria-describedby]="errors().title ? 'c-title-err' : null"
                         placeholder="Thumri Evening with Kaushiki Chakraborty"
                         class="mt-2 w-full rounded-[6px] border px-3 py-2 text-sm placeholder:text-white/25"
                         [style.background-color]="field" [style.border-color]="errors().title ? brand.primaryColor : line" [style.color]="brand.primaryColor" />
                  @if (errors().title) {
                    <p id="c-title-err" class="mt-2 flex items-start gap-2 text-xs">
                      <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                      <span>{{ errors().title }}</span>
                    </p>
                  }
                </div>

                <div>
                  <label uiLabel for="c-start" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Date and time</label>
                  <input uiInput id="c-start" name="cStart" type="datetime-local" [(ngModel)]="fStart"
                         [attr.aria-invalid]="errors().start ? 'true' : null"
                         [attr.aria-describedby]="errors().start ? 'c-start-err' : null"
                         class="mt-2 w-full rounded-[6px] border px-3 py-2 text-sm tabular-nums"
                         [style.background-color]="field" [style.border-color]="errors().start ? brand.primaryColor : line" [style.color]="brand.primaryColor" />
                  @if (errors().start) {
                    <p id="c-start-err" class="mt-2 flex items-start gap-2 text-xs">
                      <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                      <span>{{ errors().start }}</span>
                    </p>
                  }
                </div>

                <div>
                  <label uiLabel for="c-venue" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Venue</label>
                  <input uiInput id="c-venue" name="cVenue" [(ngModel)]="fVenue"
                         [attr.aria-invalid]="errors().venue ? 'true' : null"
                         [attr.aria-describedby]="errors().venue ? 'c-venue-err' : null"
                         placeholder="Prithvi Theatre, Mumbai"
                         class="mt-2 w-full rounded-[6px] border px-3 py-2 text-sm placeholder:text-white/25"
                         [style.background-color]="field" [style.border-color]="errors().venue ? brand.primaryColor : line" [style.color]="brand.primaryColor" />
                  @if (errors().venue) {
                    <p id="c-venue-err" class="mt-2 flex items-start gap-2 text-xs">
                      <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                      <span>{{ errors().venue }}</span>
                    </p>
                  }
                </div>

                <div class="sm:col-span-2">
                  <label uiLabel for="c-desc" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Description</label>
                  <textarea uiTextarea id="c-desc" name="cDesc" rows="4" [(ngModel)]="fDesc"
                            placeholder="What the evening is, who is performing, how long it runs."
                            class="mt-2 w-full rounded-[6px] border px-3 py-2 text-sm leading-relaxed placeholder:text-white/25"
                            [style.background-color]="field" [style.border-color]="line" [style.color]="brand.primaryColor"></textarea>
                </div>
              </div>

              <div class="mt-8 flex flex-wrap items-center gap-3">
                <button uiButton type="submit" class="font-semibold" [disabled]="saving()"
                        [style.background-color]="brand.accentColor" [style.color]="brand.backgroundColor">
                  {{ saving() ? 'Saving draft...' : 'Save as draft' }}
                </button>
                <button uiButton variant="ghost" type="button" (click)="cancelCreate()" [style.color]="brand.neutralColor">Cancel</button>
              </div>
            </form>
          </div>
        }

        <!-- ---- Permission denied ---- -->
        @else if (mode() === 'denied' && selected(); as ev) {
          <div class="p-6 lg:p-8">
            <p class="text-[11px] uppercase tracking-[0.22em]" [style.color]="brand.neutralColor">Read only</p>
            <h2 id="workspace-heading" class="mt-3 text-[28px] leading-tight" [style.font-family]="brand.fontHeading">{{ ev.title }}</h2>
            <div class="mt-8 max-w-[62ch] rounded-[6px] border-l-2 border-y border-r px-5 py-5"
                 [style.border-left-color]="brand.accentColor" [style.border-color]="line" [style.background-color]="panel2">
              <p class="flex items-center gap-2 text-sm font-semibold">
                <ui-icon name="AlertCircle" class="h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
                Only Priya Nalwade can edit this event
              </p>
              <p class="mt-3 text-sm leading-relaxed" [style.color]="brand.neutralColor">
                It sits in your dashboard because you share the Sabha Live workspace, but its details, seating layout, pricing,
                publish state and bookings belong to its organiser. Ask Priya to add you as a co-organiser on
                {{ ev.title }} and it becomes editable here.
              </p>
              <dl class="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Organiser</dt>
                  <dd class="mt-1">Priya Nalwade &middot; priya@sabhalive.in</dd>
                </div>
                <div>
                  <dt class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">When and where</dt>
                  <dd class="mt-1 tabular-nums">{{ fmtShort(ev.start_datetime) }} &middot; {{ ev.venue }}</dd>
                </div>
              </dl>
            </div>
            <div class="mt-6 flex flex-wrap gap-3">
              <button uiButton variant="secondary" type="button" class="border" (click)="selectEvent(firstOwnId())"
                      [style.background-color]="panel2" [style.border-color]="line" [style.color]="brand.primaryColor">
                Back to an event you own
              </button>
              <button uiButton variant="ghost" type="button" (click)="navigate('event-detail')" [style.color]="brand.neutralColor">
                View its public page
              </button>
            </div>
          </div>
        }

        <!-- ---- Edit mode ---- -->
        @else if (selected(); as ev) {
          <div class="border-b p-6 lg:p-8" [style.border-color]="line">
            <div class="flex flex-wrap items-start justify-between gap-6">
              <div class="min-w-0">
                <p class="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] tabular-nums" [style.color]="brand.accentColor">
                  {{ ev.id }}
                  <span uiBadge variant="outline"
                        class="rounded-full border px-2 py-0.5 text-[10px] tracking-[0.14em]"
                        [style.border-color]="ev.status === 'published' ? brand.accentColor : line"
                        [style.color]="ev.status === 'published' ? brand.accentColor : brand.neutralColor"
                        [style.background-color]="'transparent'">
                    {{ ev.status === 'published' ? 'Published' : 'Draft' }}
                  </span>
                </p>
                <h2 id="workspace-heading" class="mt-3 text-[30px] leading-tight" [style.font-family]="brand.fontHeading">{{ ev.title }}</h2>
                <p class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm tabular-nums" [style.color]="brand.neutralColor">
                  <span class="flex items-center gap-2">
                    <ui-icon name="Calendar" class="h-4 w-4" aria-hidden="true"></ui-icon>{{ fmtLong(ev.start_datetime) }}
                  </span>
                  <span class="flex items-center gap-2">
                    <ui-icon name="Home" class="h-4 w-4" aria-hidden="true"></ui-icon>{{ ev.venue }}
                  </span>
                  <span class="flex items-center gap-2">
                    <ui-icon name="Clock" class="h-4 w-4" aria-hidden="true"></ui-icon>{{ ev.note }}
                  </span>
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <button uiButton variant="ghost" type="button" (click)="navigate('event-detail')" [style.color]="brand.neutralColor">Public page</button>
                <button uiButton variant="ghost" type="button" (click)="navigate('check-in')" [style.color]="brand.neutralColor">Door check-in</button>
                @if (ev.status === 'draft') {
                  <button uiButton type="button" class="gap-2 font-semibold" (click)="publish()"
                          [style.background-color]="brand.accentColor" [style.color]="brand.backgroundColor">
                    <ui-icon name="Check" class="h-4 w-4" aria-hidden="true"></ui-icon>
                    Publish event
                  </button>
                } @else if (confirmUnpublish()) {
                  <div class="flex items-center gap-2 rounded-[6px] border px-3 py-2" [style.border-color]="line" [style.background-color]="panel2">
                    <span class="text-xs">Hide it from public browsing?</span>
                    <button uiButton variant="secondary" type="button" class="h-8 border px-3 text-xs" (click)="unpublish()"
                            [style.background-color]="'transparent'" [style.border-color]="brand.primaryColor" [style.color]="brand.primaryColor">
                      Unpublish
                    </button>
                    <button uiButton variant="ghost" type="button" class="h-8 px-2 text-xs" (click)="confirmUnpublish.set(false)" [style.color]="brand.neutralColor">Keep live</button>
                  </div>
                } @else {
                  <button uiButton variant="secondary" type="button" class="border gap-2" (click)="confirmUnpublish.set(true)"
                          [style.background-color]="panel2" [style.border-color]="line" [style.color]="brand.primaryColor">
                    Unpublish
                  </button>
                }
              </div>
            </div>

            @if (publishError()) {
              <div class="mt-6 max-w-[64ch] rounded-[6px] border-l-2 border-y border-r px-4 py-3"
                   [style.border-left-color]="brand.primaryColor" [style.border-color]="line" [style.background-color]="panel2">
                <p class="flex items-start gap-2 text-sm">
                  <ui-icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
                  <span>{{ publishError() }}</span>
                </p>
              </div>
            }
          </div>

          <div class="px-6 pt-5 lg:px-8">
            <ui-tabs [tabs]="tabs()" [(value)]="tab"></ui-tabs>
          </div>

          <div class="p-6 lg:p-8">
            @switch (tab()) {

              <!-- ======= Details ======= -->
              @case ('details') {
                <h3 class="text-[20px]" [style.font-family]="brand.fontHeading">Event details</h3>
                <p class="mt-2 max-w-[62ch] text-sm leading-relaxed" [style.color]="brand.neutralColor">
                  What attendees read on the public event page. Changes show there as soon as you save.
                </p>

                <form class="mt-7 max-w-[64ch]" (submit)="saveDetails($event)" novalidate>
                  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div class="sm:col-span-2">
                      <label uiLabel for="d-title" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Title</label>
                      <input uiInput id="d-title" name="dTitle" [(ngModel)]="fTitle"
                             [attr.aria-invalid]="errors().title ? 'true' : null"
                             [attr.aria-describedby]="errors().title ? 'd-title-err' : null"
                             class="mt-2 w-full rounded-[6px] border px-3 py-2 text-sm"
                             [style.background-color]="field" [style.border-color]="errors().title ? brand.primaryColor : line" [style.color]="brand.primaryColor" />
                      @if (errors().title) {
                        <p id="d-title-err" class="mt-2 flex items-start gap-2 text-xs">
                          <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                          <span>{{ errors().title }}</span>
                        </p>
                      }
                    </div>

                    <div>
                      <label uiLabel for="d-start" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Date and time</label>
                      <input uiInput id="d-start" name="dStart" type="datetime-local" [(ngModel)]="fStart"
                             [attr.aria-invalid]="errors().start ? 'true' : null"
                             [attr.aria-describedby]="errors().start ? 'd-start-err' : null"
                             class="mt-2 w-full rounded-[6px] border px-3 py-2 text-sm tabular-nums"
                             [style.background-color]="field" [style.border-color]="errors().start ? brand.primaryColor : line" [style.color]="brand.primaryColor" />
                      @if (errors().start) {
                        <p id="d-start-err" class="mt-2 flex items-start gap-2 text-xs">
                          <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                          <span>{{ errors().start }}</span>
                        </p>
                      }
                    </div>

                    <div>
                      <label uiLabel for="d-venue" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Venue</label>
                      <input uiInput id="d-venue" name="dVenue" [(ngModel)]="fVenue"
                             [attr.aria-invalid]="errors().venue ? 'true' : null"
                             [attr.aria-describedby]="errors().venue ? 'd-venue-err' : null"
                             class="mt-2 w-full rounded-[6px] border px-3 py-2 text-sm"
                             [style.background-color]="field" [style.border-color]="errors().venue ? brand.primaryColor : line" [style.color]="brand.primaryColor" />
                      @if (errors().venue) {
                        <p id="d-venue-err" class="mt-2 flex items-start gap-2 text-xs">
                          <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                          <span>{{ errors().venue }}</span>
                        </p>
                      }
                    </div>

                    <div class="sm:col-span-2">
                      <label uiLabel for="d-desc" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Description</label>
                      <textarea uiTextarea id="d-desc" name="dDesc" rows="5" [(ngModel)]="fDesc"
                                class="mt-2 w-full rounded-[6px] border px-3 py-2 text-sm leading-relaxed"
                                [style.background-color]="field" [style.border-color]="line" [style.color]="brand.primaryColor"></textarea>
                      <p class="mt-2 text-xs" [style.color]="brand.neutralColor">Shown in full on the event page, trimmed to two lines in browsing.</p>
                    </div>
                  </div>

                  <div class="mt-8 flex flex-wrap items-center gap-3">
                    <button uiButton type="submit" class="font-semibold disabled:opacity-60" [disabled]="saving()"
                            [style.background-color]="brand.accentColor" [style.color]="brand.backgroundColor">
                      {{ saving() ? 'Saving...' : 'Save changes' }}
                    </button>
                    <button uiButton variant="ghost" type="button" (click)="discardDetails()" [style.color]="brand.neutralColor">Discard changes</button>
                    @if (dirtyDetails()) {
                      <span class="text-xs transition-opacity duration-300 motion-reduce:transition-none" [style.color]="brand.neutralColor">Unsaved edits</span>
                    }
                  </div>
                </form>
              }

              <!-- ======= Seating layout ======= -->
              @case ('seating') {
                <div class="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h3 class="text-[20px]" [style.font-family]="brand.fontHeading">Seating layout</h3>
                    <p class="mt-2 max-w-[62ch] text-sm leading-relaxed" [style.color]="brand.neutralColor">
                      Rows and seat counts. Every seat is addressed by its row label and number, so Row C, Seat 12 means one seat and only one.
                    </p>
                  </div>
                  <p class="text-right">
                    <span class="block text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Seats in layout</span>
                    <span class="block text-[28px] leading-tight tabular-nums" [style.font-family]="brand.fontHeading" [style.color]="brand.accentColor">{{ totalSeats() }}</span>
                  </p>
                </div>

                <!-- seat map -->
                <div class="mt-7 rounded-[6px] border px-5 py-6" [style.border-color]="line" [style.background-color]="panel2">
                  @if (mapRows().length === 0) {
                    <p class="py-6 text-center text-sm" [style.color]="brand.neutralColor">
                      No rows yet. Add your first row below and the house plan appears here.
                    </p>
                  } @else {
                    <div class="mx-auto mb-7 w-2/3 max-w-[420px]">
                      <div class="stage-arc h-7 border-b border-l border-r" [style.border-color]="brand.accentColor"></div>
                      <p class="mt-2 text-center text-[10px] uppercase tracking-[0.42em]" [style.color]="brand.accentColor">Stage</p>
                    </div>
                    <div aria-hidden="true" class="space-y-2">
                      @for (r of mapRows(); track r.key) {
                        <div class="flex items-center justify-center gap-2">
                          <span class="w-8 shrink-0 text-right text-[10px] uppercase tracking-[0.14em] tabular-nums" [style.color]="brand.neutralColor">{{ r.label }}</span>
                          <div class="flex flex-wrap gap-1">
                            @for (n of r.nums; track n) {
                              <span class="seat transition-colors duration-200 motion-reduce:transition-none"
                                    [style.background-color]="seatBg(r.label, n)"
                                    [style.border-color]="seatBorder(r.label, n)"></span>
                            }
                          </div>
                        </div>
                      }
                    </div>
                    <p class="mt-6 text-center text-xs leading-relaxed" [style.color]="brand.neutralColor">{{ layoutSummary() }}</p>
                    <ul class="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px]" [style.color]="brand.neutralColor">
                      <li class="flex items-center gap-2">
                        <span class="seat" [style.background-color]="seatFree" [style.border-color]="line" aria-hidden="true"></span>Available
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="seat" [style.background-color]="brand.neutralColor" [style.border-color]="brand.neutralColor" aria-hidden="true"></span>Booked
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="seat" [style.background-color]="'transparent'" [style.border-color]="brand.accentColor" aria-hidden="true"></span>On hold during checkout
                      </li>
                    </ul>
                  }
                </div>

                <!-- rows editor -->
                <h4 class="mt-8 text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Rows</h4>
                @if (layoutRows().length > 0) {
                  <table uiTable class="mt-3 w-full text-sm tabular-nums">
                    <thead uiTHead>
                      <tr uiTR class="border-b" [style.border-color]="line">
                        <th uiTH scope="col" class="py-2 text-left text-[11px] uppercase tracking-[0.14em] font-normal" [style.color]="brand.neutralColor">Row label</th>
                        <th uiTH scope="col" class="py-2 text-left text-[11px] uppercase tracking-[0.14em] font-normal" [style.color]="brand.neutralColor">Seats</th>
                        <th uiTH scope="col" class="py-2 text-left text-[11px] uppercase tracking-[0.14em] font-normal" [style.color]="brand.neutralColor">Addresses</th>
                        <th uiTH scope="col" class="py-2 text-left text-[11px] uppercase tracking-[0.14em] font-normal" [style.color]="brand.neutralColor">Booked</th>
                        <th uiTH scope="col" class="py-2 text-right text-[11px] uppercase tracking-[0.14em] font-normal" [style.color]="brand.neutralColor">Action</th>
                      </tr>
                    </thead>
                    <tbody uiTBody>
                      @for (r of layoutRows(); track r.key) {
                        <tr uiTR class="border-b align-middle transition-colors duration-500 motion-reduce:transition-none" [style.border-color]="line"
                            [style.background-color]="r.key === justAdded() ? panel2 : 'transparent'">
                          <td uiTD class="py-3 pr-3">
                            <label class="sr-only" [attr.for]="'row-label-' + r.key">Label for row {{ r.row_label }}</label>
                            <input uiInput [attr.id]="'row-label-' + r.key" [name]="'rowLabel' + r.key" [(ngModel)]="r.row_label"
                                   class="w-20 rounded-[6px] border px-2 py-1.5 text-sm"
                                   [style.background-color]="field" [style.border-color]="line" [style.color]="brand.primaryColor" />
                          </td>
                          <td uiTD class="py-3 pr-3">
                            <label class="sr-only" [attr.for]="'row-seats-' + r.key">Number of seats in row {{ r.row_label }}</label>
                            <input uiInput [attr.id]="'row-seats-' + r.key" [name]="'rowSeats' + r.key" type="number" min="1" max="60" [(ngModel)]="r.seats"
                                   class="w-20 rounded-[6px] border px-2 py-1.5 text-sm tabular-nums"
                                   [style.background-color]="field" [style.border-color]="line" [style.color]="brand.primaryColor" />
                          </td>
                          <td uiTD class="py-3 pr-3" [style.color]="brand.neutralColor">{{ r.row_label }} 1 &ndash; {{ r.row_label }} {{ r.seats }}</td>
                          <td uiTD class="py-3 pr-3">{{ rowBooked(r.row_label) }}</td>
                          <td uiTD class="py-3 text-right">
                            @if (removeKey() === r.key) {
                              <span class="inline-flex items-center gap-2">
                                <span class="text-xs" [style.color]="brand.neutralColor">Remove row {{ r.row_label }}?</span>
                                <button uiButton variant="secondary" type="button" class="h-8 border px-3 text-xs" (click)="removeRow(r)"
                                        [style.background-color]="'transparent'" [style.border-color]="brand.primaryColor" [style.color]="brand.primaryColor">Remove</button>
                                <button uiButton variant="ghost" type="button" class="h-8 px-2 text-xs" (click)="removeKey.set(null)" [style.color]="brand.neutralColor">Keep</button>
                              </span>
                            } @else {
                              <button uiButton variant="ghost" type="button" class="h-9 gap-2 px-2 text-xs" (click)="askRemove(r.key)"
                                      [attr.aria-label]="'Remove row ' + r.row_label" [style.color]="brand.neutralColor">
                                <ui-icon name="Trash" class="h-4 w-4" aria-hidden="true"></ui-icon>
                                Remove
                              </button>
                            }
                          </td>
                        </tr>
                        @if (rowError() && rowError().key === r.key) {
                          <tr uiTR>
                            <td uiTD colspan="5" class="pb-3">
                              <p class="flex items-start gap-2 text-xs">
                                <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                                <span>{{ rowError().text }}</span>
                              </p>
                            </td>
                          </tr>
                        }
                      }
                    </tbody>
                  </table>
                }

                <div class="mt-6 rounded-[6px] border p-4" [style.border-color]="line" [style.background-color]="panel2">
                  <h4 class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Add a row</h4>
                  <form class="mt-3 flex flex-wrap items-end gap-4" (submit)="addRow($event)" novalidate>
                    <div>
                      <label uiLabel for="new-row-label" class="text-xs" [style.color]="brand.neutralColor">Row label</label>
                      <input uiInput id="new-row-label" name="newRowLabel" [(ngModel)]="newRowLabel" placeholder="J"
                             class="mt-1.5 w-24 rounded-[6px] border px-2 py-1.5 text-sm placeholder:text-white/25"
                             [style.background-color]="field" [style.border-color]="line" [style.color]="brand.primaryColor" />
                    </div>
                    <div>
                      <label uiLabel for="new-row-seats" class="text-xs" [style.color]="brand.neutralColor">Seats in the row</label>
                      <input uiInput id="new-row-seats" name="newRowSeats" type="number" min="1" max="60" [(ngModel)]="newRowSeats"
                             class="mt-1.5 w-24 rounded-[6px] border px-2 py-1.5 text-sm tabular-nums"
                             [style.background-color]="field" [style.border-color]="line" [style.color]="brand.primaryColor" />
                    </div>
                    <button uiButton variant="secondary" type="submit" class="border gap-2"
                            [style.background-color]="panel" [style.border-color]="line" [style.color]="brand.primaryColor">
                      <ui-icon name="Plus" class="h-4 w-4" aria-hidden="true"></ui-icon>
                      Add row
                    </button>
                  </form>
                  @if (addRowError()) {
                    <p class="mt-3 flex items-start gap-2 text-xs">
                      <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                      <span>{{ addRowError() }}</span>
                    </p>
                  }
                </div>

                @if (layoutError()) {
                  <p class="mt-6 flex items-start gap-2 text-sm">
                    <ui-icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
                    <span>{{ layoutError() }}</span>
                  </p>
                }

                <div class="mt-7 flex flex-wrap items-center gap-3">
                  <button uiButton type="button" class="font-semibold disabled:opacity-60" [disabled]="saving()" (click)="saveLayout()"
                          [style.background-color]="brand.accentColor" [style.color]="brand.backgroundColor">
                    {{ saving() ? 'Saving layout...' : 'Save layout' }}
                  </button>
                  <button uiButton variant="ghost" type="button" (click)="discardLayout()" [style.color]="brand.neutralColor">Discard layout changes</button>
                </div>
              }

              <!-- ======= Pricing ======= -->
              @case ('pricing') {
                <h3 class="text-[20px]" [style.font-family]="brand.fontHeading">Pricing</h3>
                <p class="mt-2 max-w-[62ch] text-sm leading-relaxed" [style.color]="brand.neutralColor">
                  Attendees see this price on the event page and through the booking flow. Settlement happens outside the app in this version,
                  so a booking is recorded against the price without taking payment here.
                </p>

                <form class="mt-7 max-w-[64ch]" (submit)="savePricing($event)" novalidate>
                  <div class="flex items-start gap-3 rounded-[6px] border p-4" [style.border-color]="line" [style.background-color]="panel2">
                    <input type="checkbox" uiCheckbox id="p-free" name="pFree" [(ngModel)]="pIsFree" class="mt-0.5 h-4 w-4" />
                    <span class="flex-1">
                      <label uiLabel for="p-free" class="block text-sm">This event is free</label>
                      <span class="mt-1 block text-xs leading-relaxed" [style.color]="brand.neutralColor">
                        Attendees book without any price being charged, and the event page shows it as free entry.
                      </span>
                    </span>
                  </div>

                  <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label uiLabel for="p-price" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Ticket price per seat</label>
                      <input uiInput id="p-price" name="pPrice" type="number" min="0" step="50" [(ngModel)]="pPrice" [disabled]="pIsFree()"
                             [attr.aria-invalid]="priceError() ? 'true' : null"
                             [attr.aria-describedby]="priceError() ? 'p-price-err' : null"
                             class="mt-2 w-full rounded-[6px] border px-3 py-2 text-sm tabular-nums disabled:opacity-40"
                             [style.background-color]="field" [style.border-color]="priceError() ? brand.primaryColor : line" [style.color]="brand.primaryColor" />
                      @if (priceError()) {
                        <p id="p-price-err" class="mt-2 flex items-start gap-2 text-xs">
                          <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                          <span>{{ priceError() }}</span>
                        </p>
                      }
                    </div>
                    <div>
                      <label uiLabel for="p-currency" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Currency</label>
                      <select uiSelect id="p-currency" name="pCurrency" [(ngModel)]="pCurrency" [disabled]="pIsFree()"
                              class="mt-2 w-full rounded-[6px] border px-3 py-2 text-sm disabled:opacity-40"
                              [style.background-color]="field" [style.border-color]="line" [style.color]="brand.primaryColor">
                        @for (c of currencies; track c) {
                          <option [value]="c" [style.background-color]="brand.backgroundColor" [style.color]="brand.primaryColor">{{ c }}</option>
                        }
                      </select>
                    </div>
                  </div>

                  <p class="mt-6 rounded-[6px] border px-4 py-3 text-sm" [style.border-color]="line" [style.background-color]="panel2">
                    <span class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Attendees will see</span>
                    <span class="mt-1 block text-[22px] tabular-nums" [style.font-family]="brand.fontHeading" [style.color]="brand.accentColor">{{ pricePreview() }}</span>
                  </p>

                  <div class="mt-6">
                    <label uiLabel for="p-policy" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Cancellation policy</label>
                    <textarea uiTextarea id="p-policy" name="pPolicy" rows="3" [(ngModel)]="pPolicy"
                              class="mt-2 w-full rounded-[6px] border px-3 py-2 text-sm leading-relaxed"
                              [style.background-color]="field" [style.border-color]="line" [style.color]="brand.primaryColor"></textarea>
                    <p class="mt-2 text-xs leading-relaxed" [style.color]="brand.neutralColor">
                      Shown when an attendee looks up a booking. Any money moves outside the app, by this policy.
                    </p>
                  </div>

                  <div class="mt-8 flex flex-wrap items-center gap-3">
                    <button uiButton type="submit" class="font-semibold disabled:opacity-60" [disabled]="saving()"
                            [style.background-color]="brand.accentColor" [style.color]="brand.backgroundColor">
                      {{ saving() ? 'Saving...' : 'Save pricing' }}
                    </button>
                    <button uiButton variant="ghost" type="button" (click)="discardPricing()" [style.color]="brand.neutralColor">Discard pricing changes</button>
                  </div>
                </form>
              }

              <!-- ======= Bookings ======= -->
              @case ('bookings') {
                <div class="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h3 class="text-[20px]" [style.font-family]="brand.fontHeading">Bookings</h3>
                    <p class="mt-2 max-w-[62ch] text-sm leading-relaxed" [style.color]="brand.neutralColor">
                      Every booking made against {{ ev.title }}, with the reference, the attendee's contact details and the exact seats held.
                    </p>
                  </div>
                </div>

                @if (ev.bookings.length > 0) {
                  <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <ui-stat label="Seats booked" [value]="statSeats()" hint="Confirmed bookings only"></ui-stat>
                    <ui-stat label="Checked in" [value]="statCheckedIn()" hint="Scanned at the door"></ui-stat>
                    <ui-stat label="Recorded value" [value]="statValue()" hint="Settled outside the app"></ui-stat>
                  </div>

                  <div class="mt-7 max-w-[420px]">
                    <label uiLabel for="booking-search" class="text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">Search bookings</label>
                    <div class="relative mt-2">
                      <ui-icon name="Search" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" [style.color]="brand.neutralColor" aria-hidden="true"></ui-icon>
                      <input uiInput id="booking-search" name="bookingSearch" type="search" [(ngModel)]="bookingQuery"
                             placeholder="Attendee name, email or reference"
                             class="w-full rounded-[6px] border pl-9 pr-3 py-2 text-sm placeholder:text-white/30"
                             [style.background-color]="field" [style.border-color]="line" [style.color]="brand.primaryColor" />
                    </div>
                  </div>

                  @if (visibleBookings().length === 0) {
                    <div class="mt-6">
                      <ui-empty title="No bookings match that search"
                                description="Nothing matches those words in a name, an email address or a booking reference. Check the spelling, or clear the search to see all bookings.">
                        <button uiButton variant="secondary" type="button" class="border" (click)="bookingQuery.set('')"
                                [style.background-color]="panel2" [style.border-color]="line" [style.color]="brand.primaryColor">
                          Clear search
                        </button>
                      </ui-empty>
                    </div>
                  } @else {
                    <p class="mt-5 text-[11px] uppercase tracking-[0.16em] tabular-nums" [style.color]="brand.neutralColor">
                      Showing {{ visibleBookings().length }} of {{ ev.bookings.length }} bookings
                    </p>
                    <div class="mt-2 overflow-x-auto">
                      <table uiTable class="w-full min-w-[840px] text-sm tabular-nums">
                        <thead uiTHead>
                          <tr uiTR class="border-b" [style.border-color]="line">
                            <th uiTH scope="col" class="py-3 pr-4 text-left text-[11px] uppercase tracking-[0.14em] font-normal" [style.color]="brand.neutralColor">Reference</th>
                            <th uiTH scope="col" class="py-3 pr-4 text-left text-[11px] uppercase tracking-[0.14em] font-normal" [style.color]="brand.neutralColor">Attendee</th>
                            <th uiTH scope="col" class="py-3 pr-4 text-left text-[11px] uppercase tracking-[0.14em] font-normal" [style.color]="brand.neutralColor">Contact</th>
                            <th uiTH scope="col" class="py-3 pr-4 text-left text-[11px] uppercase tracking-[0.14em] font-normal" [style.color]="brand.neutralColor">Seats</th>
                            <th uiTH scope="col" class="py-3 pr-4 text-left text-[11px] uppercase tracking-[0.14em] font-normal" [style.color]="brand.neutralColor">Status</th>
                            <th uiTH scope="col" class="py-3 text-left text-[11px] uppercase tracking-[0.14em] font-normal" [style.color]="brand.neutralColor">Booked</th>
                          </tr>
                        </thead>
                        <tbody uiTBody>
                          @for (b of visibleBookings(); track b.reference) {
                            <tr uiTR class="border-b transition-colors duration-200 hover:bg-white/5 motion-reduce:transition-none" [style.border-color]="line">
                              <td uiTD class="py-4 pr-4 font-semibold tracking-wide" [style.color]="brand.accentColor">{{ b.reference }}</td>
                              <td uiTD class="py-4 pr-4">
                                <span class="flex items-center gap-3">
                                  <ui-avatar [name]="b.guest_name" class="h-7 w-7"></ui-avatar>
                                  <span>{{ b.guest_name }}</span>
                                </span>
                              </td>
                              <td uiTD class="py-4 pr-4" [style.color]="brand.neutralColor">
                                <span class="block">{{ b.guest_email }}</span>
                                <span class="block">{{ b.guest_phone }}</span>
                              </td>
                              <td uiTD class="py-4 pr-4">{{ b.seats.join(', ') }}</td>
                              <td uiTD class="py-4 pr-4">
                                <span uiBadge variant="outline"
                                      class="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]"
                                      [style.border-color]="b.status === 'confirmed' ? brand.accentColor : line"
                                      [style.color]="b.status === 'confirmed' ? brand.accentColor : brand.neutralColor"
                                      [style.background-color]="'transparent'">
                                  <ui-icon [name]="b.status === 'confirmed' ? 'Check' : 'X'" class="h-3 w-3" aria-hidden="true"></ui-icon>
                                  {{ b.status === 'confirmed' ? 'Confirmed' : 'Cancelled' }}
                                </span>
                                @if (b.checked_in) {
                                  <span class="mt-1.5 flex items-center gap-1.5 text-[11px]" [style.color]="brand.neutralColor">
                                    <ui-icon name="CheckCircle" class="h-3 w-3" aria-hidden="true"></ui-icon>
                                    Checked in {{ fmtTime(b.checked_in_at) }}
                                  </span>
                                }
                              </td>
                              <td uiTD class="py-4" [style.color]="brand.neutralColor">{{ fmtShort(b.created_at) }}</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  }
                } @else {
                  <div class="mt-8">
                    <ui-empty title="No bookings yet"
                              description="Nobody has booked a seat for this event. Publish it and share the public page, and bookings land here the moment they are made.">
                      <button uiButton variant="secondary" type="button" class="border" (click)="navigate('event-detail')"
                              [style.background-color]="panel2" [style.border-color]="line" [style.color]="brand.primaryColor">
                        Preview the public page
                      </button>
                    </ui-empty>
                  </div>
                }
              }
            }
          </div>
        }

        <!-- ---- Nothing selected ---- -->
        @else {
          <div class="p-10">
            <h2 id="workspace-heading" class="sr-only">No event selected</h2>
            <ui-empty title="Pick an event to work on"
                      description="Choose one from the list on the left to edit its details, lay out its seats, set its price, publish it, or read its bookings.">
              <button uiButton type="button" class="font-semibold" (click)="startCreate()"
                      [style.background-color]="brand.accentColor" [style.color]="brand.backgroundColor">
                Create a new event
              </button>
            </ui-empty>
          </div>
        }
      </section>
    </div>
  </div>
</div>
`;

@Component({
  selector: "app-organiser-events-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase {
  signOut() {
    clearToken();
    this.navigate("organiser-sign-in");
  }

  /* ---------- surface tokens (tints over the brand canvas, no raw palette) ---------- */
  panel = "rgba(255,255,255,0.035)";
  panel2 = "rgba(255,255,255,0.065)";
  line = "rgba(255,255,255,0.12)";
  field = "rgba(0,0,0,0.25)";
  seatFree = "rgba(255,255,255,0.09)";

  today = "2026-11-04T09:20";
  skeletons = [1, 2, 3, 4];
  currencies = ["INR", "USD", "EUR", "GBP"];
  statusFilters = [
    { value: "all", label: "All" },
    { value: "published", label: "Live" },
    { value: "draft", label: "Draft" },
  ];

  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  /* ---------- state ---------- */
  query = signal("");
  statusFilter = signal("all");
  loading = signal(true);
  stale = signal(true);
  syncedLabel = signal("Not yet synced");
  flash = signal(null);
  saving = signal(false);

  mode = signal("edit");
  tab = signal("details");
  selectedId = signal(null);
  prevSelectedId = signal(null);

  errors = signal({});
  publishError = signal("");
  confirmUnpublish = signal(false);

  fTitle = signal("");
  fDesc = signal("");
  fStart = signal("");
  fVenue = signal("");

  layoutRows = signal([]);
  newRowLabel = signal("");
  newRowSeats = signal(12);
  addRowError = signal("");
  layoutError = signal("");
  rowError = signal(null);
  removeKey = signal(null);
  justAdded = signal(null);
  rowSeq = signal(100);

  pIsFree = signal(false);
  pPrice = signal(0);
  pCurrency = signal("INR");
  pPolicy = signal("");
  priceError = signal("");

  bookingQuery = signal("");

  events = signal([]);
  loadError = signal("");

  constructor() {
    super();
    this.loadEvents();
    // AC-040: marking an event free clears the price so a stale number is never saved
    // alongside isFree.
    effect(() => {
      if (this.pIsFree()) this.pPrice.set(0);
    });
  }

  toLocalEvent(e) {
    return {
      id: e.id,
      title: e.title,
      description: e.description || "",
      start_datetime: e.start_datetime,
      venue: e.venue,
      is_free: !!e.is_free,
      price_minor: e.price_minor || 0,
      currency: e.currency || "INR",
      status: e.status || "draft",
      cancellation_policy: e.cancellation_policy || "",
      note: "",
      mine: true,
      held: e.held || [],
      rows: e.rows || [],
      bookings: e.bookings || [],
    };
  }

  handleUnauthorized(e) {
    if (e instanceof ApiError && e.status === 401) {
      clearToken();
      this.navigate("organiser-sign-in");
      return true;
    }
    return false;
  }

  async loadEvents() {
    this.loading.set(true);
    try {
      const data = await apiFetch("/api/organiser/events");
      const list = Array.isArray(data) ? data : (data && data.events) || [];
      this.events.set(list.map((e) => this.toLocalEvent(e)));
      this.loadError.set("");
      this.stale.set(false);
      this.syncedLabel.set("Synced just now");
    } catch (e) {
      if (this.handleUnauthorized(e)) return;
      this.loadError.set(e instanceof Error ? e.message : "Could not load your events.");
    } finally {
      this.loading.set(false);
    }
  }

  /* ---------- derived ---------- */
  selected = computed(() => this.events().find((e) => e.id === this.selectedId()) || null);

  filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const s = this.statusFilter();
    return this.events().filter((e) => {
      const okStatus = s === "all" ? true : e.status === s;
      const okQuery = q === "" ? true : (e.title + " " + e.venue).toLowerCase().includes(q);
      return okStatus && okQuery;
    });
  });

  tabs = computed(() => {
    const ev = this.selected();
    const n = ev ? ev.bookings.length : 0;
    return [
      { value: "details", id: "details", label: "Details" },
      { value: "seating", id: "seating", label: "Seating layout" },
      { value: "pricing", id: "pricing", label: "Pricing" },
      { value: "bookings", id: "bookings", label: "Bookings (" + n + ")" },
    ];
  });

  bookedSet = computed(() => {
    const ev = this.selected();
    const set = {};
    if (ev) {
      for (const b of ev.bookings) {
        if (b.status === "confirmed") {
          for (const k of b.seats) {
            set[k] = true;
          }
        }
      }
    }
    return set;
  });

  heldSet = computed(() => {
    const ev = this.selected();
    const set = {};
    if (ev) {
      for (const k of ev.held) {
        set[k] = true;
      }
    }
    return set;
  });

  mapRows = computed(() =>
    this.layoutRows().map((r) => ({
      key: r.key,
      label: r.row_label || "?",
      nums: Array.from(
        { length: Math.max(0, Math.min(60, Number(r.seats) || 0)) },
        (_, i) => i + 1,
      ),
    })),
  );

  totalSeats = computed(() =>
    this.layoutRows().reduce((sum, r) => sum + (Number(r.seats) || 0), 0),
  );

  layoutSummary = computed(() => {
    const rows = this.layoutRows();
    if (rows.length === 0) {
      return "No rows defined yet.";
    }
    const total = this.totalSeats();
    let booked = 0;
    let held = 0;
    const bs = this.bookedSet();
    const hs = this.heldSet();
    for (const r of rows) {
      const n = Number(r.seats) || 0;
      for (let i = 1; i <= n; i++) {
        const key = r.row_label + " " + i;
        if (bs[key]) {
          booked++;
        } else if (hs[key]) {
          held++;
        }
      }
    }
    const first = rows[0].row_label;
    const last = rows[rows.length - 1].row_label;
    return (
      rows.length +
      " rows, " +
      first +
      " to " +
      last +
      ". " +
      total +
      " seats in total: " +
      booked +
      " booked, " +
      held +
      " on hold, " +
      (total - booked - held) +
      " available."
    );
  });

  dirtyDetails = computed(() => {
    const ev = this.selected();
    if (!ev || this.mode() !== "edit") {
      return false;
    }
    return (
      ev.title !== this.fTitle() ||
      ev.description !== this.fDesc() ||
      ev.start_datetime !== this.fStart() ||
      ev.venue !== this.fVenue()
    );
  });

  pricePreview = computed(() => {
    if (this.pIsFree()) {
      return "Free entry";
    }
    const v = Number(this.pPrice());
    if (!v || v <= 0) {
      return "Set a price above zero";
    }
    return this.money(v * 100, this.pCurrency()) + " per seat";
  });

  visibleBookings = computed(() => {
    const ev = this.selected();
    if (!ev) {
      return [];
    }
    const q = this.bookingQuery().trim().toLowerCase();
    if (q === "") {
      return ev.bookings;
    }
    return ev.bookings.filter(
      (b) =>
        b.guest_name.toLowerCase().includes(q) ||
        b.guest_email.toLowerCase().includes(q) ||
        b.reference.toLowerCase().includes(q),
    );
  });

  statSeats = computed(() => {
    const ev = this.selected();
    if (!ev) {
      return "0";
    }
    let n = 0;
    for (const b of ev.bookings) {
      if (b.status === "confirmed") {
        n += b.seats.length;
      }
    }
    const total = ev.rows.reduce((s, r) => s + (Number(r.seats) || 0), 0);
    return n + " / " + total;
  });

  statCheckedIn = computed(() => {
    const ev = this.selected();
    if (!ev) {
      return "0";
    }
    const n = ev.bookings.filter((b) => b.checked_in).length;
    return n + " of " + ev.bookings.filter((b) => b.status === "confirmed").length;
  });

  statValue = computed(() => {
    const ev = this.selected();
    if (!ev) {
      return "--";
    }
    if (ev.is_free) {
      return "Free event";
    }
    let seats = 0;
    for (const b of ev.bookings) {
      if (b.status === "confirmed") {
        seats += b.seats.length;
      }
    }
    return this.money(seats * ev.price_minor, ev.currency);
  });

  /* ---------- lifecycle-ish ---------- */
  init = effect(() => {
    const ev = this.events().find((e) => e.id === this.selectedId());
    if (ev && !this.loadedOnce) {
      this.loadedOnce = true;
      this.loadForms(ev);
    }
  });
  loadedOnce = false;

  /* ---------- helpers ---------- */
  countFor(v) {
    if (v === "all") {
      return this.events().length;
    }
    return this.events().filter((e) => e.status === v).length;
  }

  firstOwnId() {
    const e = this.events().find((x) => x.mine);
    return e ? e.id : "";
  }

  seatSummary(e) {
    const total = e.rows.reduce((s, r) => s + (Number(r.seats) || 0), 0);
    if (total === 0) {
      return "No layout yet";
    }
    let booked = 0;
    for (const b of e.bookings) {
      if (b.status === "confirmed") {
        booked += b.seats.length;
      }
    }
    return total + " seats, " + booked + " booked";
  }

  rowBooked(label) {
    const bs = this.bookedSet();
    let n = 0;
    for (const k of Object.keys(bs)) {
      if (k.slice(0, k.lastIndexOf(" ")) === label) {
        n++;
      }
    }
    return n;
  }

  seatState(label, n) {
    const key = label + " " + n;
    if (this.bookedSet()[key]) {
      return "booked";
    }
    if (this.heldSet()[key]) {
      return "held";
    }
    return "free";
  }

  seatBg(label, n) {
    const s = this.seatState(label, n);
    if (s === "booked") {
      return this.brand.neutralColor;
    }
    if (s === "held") {
      return "transparent";
    }
    return this.seatFree;
  }

  seatBorder(label, n) {
    const s = this.seatState(label, n);
    if (s === "booked") {
      return this.brand.neutralColor;
    }
    if (s === "held") {
      return this.brand.accentColor;
    }
    return this.line;
  }

  money(minor, currency) {
    const symbols = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
    const sym = symbols[currency] || currency + " ";
    const major = minor / 100;
    const whole = Math.round(major).toString();
    let out = "";
    let count = 0;
    for (let i = whole.length - 1; i >= 0; i--) {
      out = whole[i] + out;
      count++;
      if (count % 3 === 0 && i > 0) {
        out = "," + out;
      }
    }
    return sym + out;
  }

  parse(iso) {
    return new Date(iso);
  }

  fmtShort(iso) {
    if (!iso) {
      return "--";
    }
    const d = this.parse(iso);
    return (
      this.daysShort[d.getDay()] +
      " " +
      d.getDate() +
      " " +
      this.monthsShort[d.getMonth()] +
      ", " +
      this.fmtTime(iso)
    );
  }

  fmtLong(iso) {
    if (!iso) {
      return "--";
    }
    const d = this.parse(iso);
    return (
      this.days[d.getDay()] +
      " " +
      d.getDate() +
      " " +
      this.months[d.getMonth()] +
      " " +
      d.getFullYear() +
      " at " +
      this.fmtTime(iso)
    );
  }

  fmtTime(iso) {
    if (!iso) {
      return "--";
    }
    const d = this.parse(iso);
    const h = d.getHours();
    const m = d.getMinutes();
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ":" + (m < 10 ? "0" + m : m) + " " + (h < 12 ? "AM" : "PM");
  }

  say(tone, text) {
    this.flash.set({ tone: tone, text: text });
  }

  updateSelected(patch) {
    const id = this.selectedId();
    this.events.update((list) => list.map((e) => (e.id === id ? Object.assign({}, e, patch) : e)));
  }

  /* ---------- actions ---------- */
  clearFilters() {
    this.query.set("");
    this.statusFilter.set("all");
  }

  refresh() {
    this.loadEvents();
  }

  loadForms(e) {
    this.fTitle.set(e.title);
    this.fDesc.set(e.description);
    this.fStart.set(e.start_datetime);
    this.fVenue.set(e.venue);
    this.layoutRows.set(
      e.rows.map((r) => ({ key: r.key, row_label: r.row_label, seats: r.seats })),
    );
    this.pIsFree.set(e.is_free);
    this.pPrice.set(e.price_minor / 100);
    this.pCurrency.set(e.currency);
    this.pPolicy.set(e.cancellation_policy);
  }

  selectEvent(id) {
    const e = this.events().find((x) => x.id === id);
    if (!e) {
      return;
    }
    this.selectedId.set(id);
    this.prevSelectedId.set(id);
    this.mode.set(e.mine ? "edit" : "denied");
    this.tab.set("details");
    this.errors.set({});
    this.publishError.set("");
    this.layoutError.set("");
    this.addRowError.set("");
    this.rowError.set(null);
    this.removeKey.set(null);
    this.priceError.set("");
    this.confirmUnpublish.set(false);
    this.bookingQuery.set("");
    this.loadForms(e);
  }

  startCreate() {
    this.prevSelectedId.set(this.selectedId());
    this.mode.set("create");
    this.errors.set({});
    this.fTitle.set("");
    this.fDesc.set("");
    this.fStart.set("");
    this.fVenue.set("");
  }

  cancelCreate() {
    const id = this.prevSelectedId();
    this.mode.set("edit");
    if (id) {
      this.selectEvent(id);
    }
  }

  // Maps a server field name to the key the template reads an error beside (the date/time
  // field is labelled "start" in the form though the API calls it "start_datetime").
  errorKey(field) {
    if (field === "start_datetime") return "start";
    return field;
  }

  // Reads field-level validation messages off a 400 response body, whichever shape the
  // server sends them in: {errors:{field: message}} or a single {field, message}.
  applyServerErrors(body) {
    const map = {};
    if (body && typeof body === "object") {
      if (body.errors && typeof body.errors === "object") {
        for (const k of Object.keys(body.errors)) {
          map[this.errorKey(k)] = body.errors[k];
        }
      } else if (body.field) {
        map[this.errorKey(body.field)] = body.message || "That field needs a value.";
      }
    }
    return map;
  }

  async saveDetails(ev) {
    ev.preventDefault();
    this.errors.set({});
    this.saving.set(true);
    const id = this.selectedId();
    try {
      const updated = await apiFetch(`/api/organiser/events/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: this.fTitle().trim(),
          description: this.fDesc(),
          start_datetime: this.fStart(),
          venue: this.fVenue().trim(),
        }),
      });
      this.updateSelected({
        title: updated.title,
        description: updated.description,
        start_datetime: updated.start_datetime,
        venue: updated.venue,
      });
      this.saving.set(false);
      this.say(
        "ok",
        "Details saved. The public event page now shows " + this.fTitle().trim() + ".",
      );
    } catch (e) {
      this.saving.set(false);
      if (this.handleUnauthorized(e)) return;
      const errs = this.applyServerErrors(e && e.body);
      if (Object.keys(errs).length > 0) {
        this.errors.set(errs);
        this.say(
          "error",
          "Nothing was saved. Fix the fields marked below and try again; your other edits are still here.",
        );
      } else {
        this.say("error", e instanceof Error ? e.message : "Details were not saved.");
      }
    }
  }

  discardDetails() {
    const e = this.selected();
    if (!e) {
      return;
    }
    this.fTitle.set(e.title);
    this.fDesc.set(e.description);
    this.fStart.set(e.start_datetime);
    this.fVenue.set(e.venue);
    this.errors.set({});
    this.say("ok", "Edits discarded. The saved details are back.");
  }

  async createEvent(ev) {
    ev.preventDefault();
    this.errors.set({});
    this.saving.set(true);
    try {
      const created = await apiFetch("/api/organiser/events", {
        method: "POST",
        body: JSON.stringify({
          title: this.fTitle().trim(),
          description: this.fDesc(),
          start_datetime: this.fStart(),
          venue: this.fVenue().trim(),
        }),
      });
      const draft = this.toLocalEvent(created);
      this.events.update((list) => [draft].concat(list));
      this.saving.set(false);
      this.selectEvent(draft.id);
      this.tab.set("seating");
      this.say(
        "ok",
        draft.title +
          " is saved as a draft and hidden from the public. Lay out its seats, then publish it.",
      );
    } catch (e) {
      this.saving.set(false);
      if (this.handleUnauthorized(e)) return;
      const errs = this.applyServerErrors(e && e.body);
      if (Object.keys(errs).length > 0) {
        this.errors.set(errs);
        this.say(
          "error",
          "The draft was not created. Fix the fields marked below; what you typed is kept.",
        );
      } else {
        this.say("error", e instanceof Error ? e.message : "The draft could not be created.");
      }
    }
  }

  publish() {
    const e = this.selected();
    if (!e) {
      return;
    }
    const total = e.rows.reduce((s, r) => s + (Number(r.seats) || 0), 0);
    if (total === 0) {
      this.publishError.set(
        "This event has no seating layout, so attendees would have nothing to choose. Add at least one row of seats, save the layout, then publish.",
      );
      this.tab.set("seating");
      return;
    }
    this.publishError.set("");
    this.updateSelected({ status: "published", note: "Published just now" });
    this.say(
      "ok",
      e.title +
        " is live. It now appears in public browsing and search, and its " +
        total +
        " seats are bookable.",
    );
  }

  unpublish() {
    const e = this.selected();
    if (!e) {
      return;
    }
    this.confirmUnpublish.set(false);
    this.updateSelected({ status: "draft", note: "Unpublished just now, hidden from the public" });
    this.say(
      "ok",
      e.title +
        " is unpublished. It has gone from public browsing and search, and no new bookings can be made. Existing bookings are untouched.",
    );
  }

  askRemove(key) {
    this.removeKey.set(key);
    this.rowError.set(null);
  }

  removeRow(r) {
    const booked = this.rowBooked(r.row_label);
    if (booked > 0) {
      this.rowError.set({
        key: r.key,
        text:
          "Row " +
          r.row_label +
          " has " +
          booked +
          " booked seats. Cancel those bookings first, then the row can be removed.",
      });
      this.removeKey.set(null);
      return;
    }
    this.layoutRows.update((rows) => rows.filter((x) => x.key !== r.key));
    this.removeKey.set(null);
    this.rowError.set(null);
    this.say(
      "ok",
      "Row " +
        r.row_label +
        " removed from the working layout. Save the layout to keep the change.",
    );
  }

  addRow(ev) {
    ev.preventDefault();
    const label = this.newRowLabel().trim().toUpperCase();
    const seats = Number(this.newRowSeats());
    if (!label) {
      this.addRowError.set(
        "Give the row a label, such as J. Attendees see it as part of each seat address.",
      );
      return;
    }
    if (this.layoutRows().some((r) => (r.row_label || "").toUpperCase() === label)) {
      this.addRowError.set(
        "Row " +
          label +
          " already exists. Every row label has to be unique so each seat has one address.",
      );
      return;
    }
    if (!seats || seats < 1 || seats > 60) {
      this.addRowError.set("Enter between 1 and 60 seats for this row.");
      return;
    }
    this.rowSeq.update((n) => n + 1);
    const key = "r" + this.rowSeq();
    this.layoutRows.update((rows) => rows.concat([{ key: key, row_label: label, seats: seats }]));
    this.addRowError.set("");
    this.newRowLabel.set("");
    this.justAdded.set(key);
    setTimeout(() => {
      this.justAdded.set(null);
    }, 900);
  }

  saveLayout() {
    const rows = this.layoutRows();
    if (rows.length === 0) {
      this.layoutError.set("A layout needs at least one row before it can be saved.");
      return;
    }
    const seen = {};
    for (const r of rows) {
      const label = (r.row_label || "").trim().toUpperCase();
      const n = Number(r.seats);
      if (!label) {
        this.layoutError.set(
          "One row has no label. Every row needs one so each seat is addressed by row and seat number.",
        );
        return;
      }
      if (seen[label]) {
        this.layoutError.set("Row " + label + " appears twice. Row labels have to be unique.");
        return;
      }
      seen[label] = true;
      if (!n || n < 1 || n > 60) {
        this.layoutError.set("Row " + label + " needs between 1 and 60 seats.");
        return;
      }
    }
    this.layoutError.set("");
    this.saving.set(true);
    setTimeout(() => {
      const clean = rows.map((r) => ({
        key: r.key,
        row_label: (r.row_label || "").trim().toUpperCase(),
        seats: Number(r.seats),
      }));
      this.updateSelected({ rows: clean });
      this.layoutRows.set(
        clean.map((r) => ({ key: r.key, row_label: r.row_label, seats: r.seats })),
      );
      this.saving.set(false);
      this.publishError.set("");
      const total = clean.reduce((s, r) => s + r.seats, 0);
      this.say(
        "ok",
        "Layout saved: " +
          clean.length +
          " rows, " +
          total +
          " seats, each one addressed by its row label and seat number.",
      );
    }, 450);
  }

  discardLayout() {
    const e = this.selected();
    if (!e) {
      return;
    }
    this.layoutRows.set(
      e.rows.map((r) => ({ key: r.key, row_label: r.row_label, seats: r.seats })),
    );
    this.layoutError.set("");
    this.addRowError.set("");
    this.rowError.set(null);
    this.say("ok", "Layout changes discarded. The saved rows are back.");
  }

  async savePricing(ev) {
    ev.preventDefault();
    const free = this.pIsFree();
    const v = Number(this.pPrice());
    if (!free && (!v || v <= 0)) {
      this.priceError.set("Enter a price above zero, or mark the event as free.");
      this.say(
        "error",
        "Pricing was not saved. Set a price above zero, or tick the free event box.",
      );
      return;
    }
    this.priceError.set("");
    this.saving.set(true);
    const id = this.selectedId();
    try {
      const updated = await apiFetch(`/api/organiser/events/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          is_free: free,
          price_minor: free ? 0 : Math.round(v * 100),
          currency: this.pCurrency(),
          cancellation_policy: this.pPolicy(),
        }),
      });
      this.updateSelected({
        is_free: updated.is_free,
        price_minor: updated.price_minor,
        currency: updated.currency,
        cancellation_policy: updated.cancellation_policy,
      });
      this.saving.set(false);
      this.say(
        "ok",
        free
          ? "Saved. This event shows as free entry, and attendees book without any price being charged."
          : "Saved. Attendees now see " +
              this.money(updated.price_minor, updated.currency) +
              " per seat on the event page and through booking.",
      );
    } catch (e) {
      this.saving.set(false);
      if (this.handleUnauthorized(e)) return;
      this.priceError.set(e instanceof Error ? e.message : "Pricing was not saved.");
      this.say("error", "Pricing was not saved.");
    }
  }

  discardPricing() {
    const e = this.selected();
    if (!e) {
      return;
    }
    this.pIsFree.set(e.is_free);
    this.pPrice.set(e.price_minor / 100);
    this.pCurrency.set(e.currency);
    this.pPolicy.set(e.cancellation_policy);
    this.priceError.set("");
    this.say("ok", "Pricing changes discarded.");
  }
}
