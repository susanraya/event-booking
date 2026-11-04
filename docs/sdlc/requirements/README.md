# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-EPIC-001 · approved · source: requirements:EPIC-001

Public attendees can browse and search the organisation's published events and open a detailed event page, with no account required.

US-001 (high): browse published events listing with title/date/venue; unpublished events never appear (AC-001..003). US-002 (medium): keyword search over title/venue, with a clear 'no events found' message when nothing matches (AC-004, AC-005). US-003 (high): event detail page shows title, description, date/time, venue and price/free status, and allows proceeding to seat selection when seats are available; non-published events show a not-available message (AC-006..008).

**Related:** US-001, US-002, US-003

### REQ-EPIC-002 · approved · source: requirements:EPIC-002

Attendees select exact seats, hold them during checkout, supply guest contact details and DPDP consent, and complete a free or offline-settled paid booking with a reference, QR ticket and confirmation email.

US-004 (critical): seat map shows available/booked seats; selections highlighted by row/seat (AC-009..011). US-005 (critical): seats locked during checkout via hold token; concurrent claims resolved first-come; abandoned holds expire and release seats (AC-012..014). US-006 (high): guest name/email/phone entry with validation (AC-015, AC-016). US-007 (high): explicit DPDP consent notice and 18+ confirmation required to proceed (AC-017..019). US-008 (critical): booking confirmed with unique reference; free events charge nothing, paid events record against displayed price with no in-app payment (AC-020..022). US-009 (high): confirmation email with reference, seats and QR ticket; on-screen QR ticket; email-only notifications (AC-023..025). Assumption stated in input: online payment (previously Razorpay) is out of scope for this version.

**Related:** US-004, US-005, US-006, US-007, US-008, US-009

### REQ-EPIC-003 · approved · source: requirements:EPIC-003

Attendees can retrieve a booking with reference plus email and request cancellation subject to the event's policy; refunds are handled outside the app.

US-010 (high): lookup by reference + email returns booking/seats/QR ticket; mismatches show a not-found message revealing nothing (AC-026, AC-027). US-011 (medium): cancellation where policy permits marks the booking cancelled, releases seats, and sends a cancellation email; monetary refunds for paid bookings are handled outside the app per event policy (AC-028..030).

**Related:** US-010, US-011

### REQ-EPIC-004 · approved · source: requirements:EPIC-004

Organisers sign in to create/edit events, define seating layouts, set pricing or mark events free, publish/unpublish, and manage events and bookings from a dashboard.

US-012 (critical): email/password sign-in; generic error on failure; unauthenticated users redirected (AC-031..033). US-013 (high): create/edit events saved as drafts with required-field validation (AC-034..036). US-014 (high): define rows/seats layout, uniquely identifiable even at hundreds of seats (AC-037, AC-038). US-015 (high): set price or mark free, reflected in detail/booking flow (AC-039, AC-040). US-016 (high): publish/unpublish controls public visibility and bookability (AC-041, AC-042). US-017 (medium): dashboard lists events with status and date/time, drill into management (AC-043, AC-044). US-018 (medium): view/search bookings by name, email or reference (AC-045, AC-046).

**Related:** US-012, US-013, US-014, US-015, US-016, US-017, US-018

### REQ-EPIC-005 · approved · source: requirements:EPIC-005

Door staff use a browser-based scan page (no native app) to validate and check in attendee QR tickets, preventing duplicate or invalid check-ins.

US-019 (high): valid ticket for the event marks the booking checked in; already-used tickets are warned and not re-checked-in; scan page works in a standard browser; invalid/cancelled/wrong-event tickets show an invalid-ticket message (AC-047..050).

**Related:** US-019

### REQ-EPIC-006 · approved · source: requirements:EPIC-006

DPDP Act compliance: India-region hosting of app and personal data, consent withdrawal and deletion as easy as consent-giving, and adults-only bookings to avoid children's-data duties.

DPDP Act: data-principal rights (withdrawal & erasure) and data-residency. US-020 (high): withdrawal of consent / deletion request actioned through the booking-management flow, available as easily as giving consent (AC-051, AC-052). US-021 (medium): application and personal data hosted in an India region; deletion requests remove data from that India-hosted store (AC-053, AC-054). Age restriction to 18+ (see NFR-006) is the stated mechanism for avoiding verifiable-parental-consent duties for minors.

**Related:** US-020, US-021

- ⚠ No verification mechanism for the declared age is described -- the 18+ check appears to be a self-asserted confirmation, not a verified control.
- ⚠ Significant Data Fiduciary duties (India-based DPO, audits, DPIA) are not addressed; unclear whether this project would be classified as a Significant Data Fiduciary.
- ⚠ DPDP breach-notification duties (Data Protection Board + affected-person notice) are not addressed by this epic or any other requirement.

### REQ-NFR-001 · approved · source: requirements:NFR-001

Seat holding/booking must be reliably conflict-free: only the first of two simultaneous claims on the same seat succeeds.

Availability NFR: a seat can never be sold twice. No numeric target given beyond 'reliably conflict-free'.

**Related:** US-004, US-005, US-008

### REQ-NFR-002 · approved · source: requirements:NFR-002

System is sized for a small scale: a handful of concurrent events with hundreds of seats each, not high-concurrency sell-out spikes.

Scalability NFR. Target: a handful of events at a time; hundreds of seats per event.

**Related:** US-014

### REQ-NFR-003 · approved · source: requirements:NFR-003

Delivered as a responsive web app only; no native mobile apps; door-staff check-in must work in a standard browser.

Compatibility NFR, consistent with the explicit out-of-scope exclusion of native iOS/Android apps.

**Related:** US-019

### REQ-NFR-004 · approved · source: requirements:NFR-004

Application and all personal data, including transactional email, must be hosted in an India region; deletions remove data from that store.

DPDP Act: data-residency control. Target: AWS India (Mumbai) region.

**Related:** US-021

### REQ-NFR-005 · approved · source: requirements:NFR-005

Activity logs must be retained for 180 days across the whole system.

CERT-In: ICT log retention control. Target: 180 days.

- ⚠ CERT-In also requires reporting cyber incidents within 6 hours; only the 180-day log-retention half of the CERT-In direction is covered here.

### REQ-NFR-006 · approved · source: requirements:NFR-006

Booking collects only name, email and phone with notice/consent, and is restricted to attendees aged 18+.

DPDP Act: data-minimisation and avoidance of children's-data duties.

**Related:** US-006, US-007

### REQ-NFR-007 · approved · source: requirements:NFR-007

Attendees must be able to withdraw consent and request deletion as easily as they gave consent, via the booking-management flow.

DPDP Act: data-principal rights (withdrawal & erasure).

**Related:** US-020

### REQ-NFR-008 · approved · source: requirements:NFR-008

Booking details are disclosed only on a matching reference + email; mismatches reveal nothing.

Security NFR protecting guest booking data from enumeration/disclosure.

**Related:** US-010

### REQ-NFR-009 · approved · source: requirements:NFR-009

Only authenticated organisers can reach management/booking pages; failed sign-in gives a generic error.

Security NFR for organiser access control.

**Related:** US-012

### REQ-NFR-010 · approved · source: requirements:NFR-010

Empty searches, invalid/missing input, and failed lookups must show clear plain-language messages, not technical errors.

Usability NFR applied to search, guest contact entry, and booking lookup.

**Related:** US-002, US-006, US-010

### REQ-SCOPE · approved · source: requirements:scope

Lightweight delivery scope, requirements v1, with a product-owner-approved tech stack (Spring Boot 4.1, AWS Mumbai, PostgreSQL 16, Angular 22) and one approved service (SMTP email via env-configured credentials).

Delivery scope: lightweight. Approved services: SMTP server (SaaS) with env vars SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD for booking/cancellation emails with QR tickets, rationale given as Amazon SES over SMTP from Mumbai. API keys needed: SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER. Out of scope: native mobile apps for attendees/door staff (replaced by responsive web app + browser QR check-in page); payments (Razorpay removed from the approved stack).

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006

- ⚠ Discrepancy: the Cloud/AWS rationale text states 'your payments go through Razorpay to meet RBI's rule that card data stays in the country', but Payments/Razorpay is explicitly listed as out of scope and is absent from the architecture -- this RBI payment-data rationale no longer applies and should be reconciled or removed from the stack rationale.
- ⚠ Accessibility (RPwD Act 2016 / GIGW-WCAG), Consumer Protection Act 2019 / E-Commerce Rules 2020, and IT Act 2000 / Intermediary Rules 2021 obligations are not mentioned anywhere in the scope or capabilities.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-04

**Capabilities in scope:** Public event browsing and search, Event detail page (title, description, date/time, venue), Exact seat selection on the seating layout, Seat locking to prevent double-booking, Guest booking with contact details, Booking reference generation, On-screen scannable QR ticket, Booking lookup by reference and email, Organiser sign-in, Event creation and editing, Seating layout definition, Seat pricing and free-event configuration, Publish and unpublish events, Organiser dashboard of events, Consent notice at booking, Guest booking with no mandatory attendee account

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | Spring Boot | — |
| cloud | AWS | You must host the app and all personal data in India, and your payments go through Razorpay to meet RBI's rule that card data stays in the country. AWS has a full India region in Mumbai, so your database, app and transactional email can all sit inside India, which is what your DPDP consent notice promises attendees. It also keeps the 180-day activity logs that CERT-In expects. |
| database | PostgreSQL | Your hardest rule is that a seat can never be sold twice. PostgreSQL enforces that reliably: it can hold the seat, the booking, and the payment status together and refuse a second claim on the same seat, even if two people tap 'book' at the same moment. It also comfortably handles search over your handful of events and keeps all personal data in one place you can point at for a DPDP deletion request. At your scale you will never stress it. |
| frontend | Angular | — |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Public event discovery

Public attendees can browse and search the organisation's published events and open a detailed event page. Only published events are visible to the public; unpublished events never appear in browsing or search results. No attendee account is required to browse.

### US-001: Browse published events

**Priority:** high

> As a public attendee, I want to browse a list of the organisation's published events, so that I can discover events I might want to attend.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | there are events marked as published | I open the public events listing | I see each published event with its title, date/time and venue |
| AC-002 | an event is unpublished or has been unpublished | I view the public events listing | that event does not appear in the list |
| AC-003 | I am a member of the public with no account | I open the events listing | I can view it without signing in or registering |

### US-002: Search events

**Priority:** medium

> As a public attendee, I want to search events by keyword, so that I can quickly find a specific event.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | published events exist whose title or venue matches my search term | I enter a search term | only matching published events are shown |
| AC-005 | no published event matches my search term | I run the search | I see a clear 'no events found' message rather than an error |

### US-003: View event detail page

**Priority:** high

> As a public attendee, I want to open an event and see its full details, so that I can decide whether to book and start the booking process.

| ID | Given | When | Then |
|---|---|---|---|
| AC-006 | I am viewing the events listing | I open a published event | I see its title, description, date/time, venue and ticket price (or that it is free) |
| AC-007 | I am on an event detail page | the event has seats available | I can proceed to select seats |
| AC-008 | I try to open an event that is not published | I request its detail page | I am shown a not-available message and cannot proceed to book |

## EPIC-002: Seat selection and booking

Attendees select exact seats on the event's seating layout, enter their contact details, consent to data processing, and receive a confirmation email with a booking reference and scannable QR ticket. Selected/booked seats are locked to prevent double-booking. Assumption: online payment (previously proposed via Razorpay) is out of scope for this version; paid events display a price but settlement is handled outside the app, while free events complete booking without payment.

### US-004: Select exact seats on the layout

**Priority:** critical

> As a public attendee, I want to pick specific seats on the event's seating layout, so that I know exactly where I will be sitting.

| ID | Given | When | Then |
|---|---|---|---|
| AC-009 | I am on an event with a defined seating layout | I open the seat selection view | I see the layout showing which seats are available and which are already booked |
| AC-010 | I am viewing the seating layout | I select one or more available seats | the chosen seats are highlighted and identified by row and seat number (e.g. Row C, Seat 12) |
| AC-011 | a seat is already booked or locked by another attendee | I view the layout | that seat is shown as unavailable and cannot be selected |

### US-005: Lock seats to prevent double-booking

**Priority:** critical

> As a public attendee, I want the seats I am booking to be held for me during checkout, so that nobody else can book the same seats while I complete my details.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | I have selected seats and started the booking process | I am entering my details | those seats are locked and shown as unavailable to other attendees |
| AC-013 | two attendees attempt to book the same seat at the same time | the first attendee locks it | the second attendee cannot select or book that seat and is told it is no longer available |
| AC-014 | I have locked seats but abandon the booking without completing it | the hold expires | the seats are released and become available to others again |

### US-006: Enter contact details as a guest

**Priority:** high

> As a public attendee, I want to book using my name, email and phone without creating an account, so that I can complete my booking quickly.

| ID | Given | When | Then |
|---|---|---|---|
| AC-015 | I have selected and locked my seats | I reach the booking form | I can enter my name, email and phone number without registering or logging in |
| AC-016 | I leave a required contact field empty or enter an invalid email | I submit the booking | the booking is blocked and I see a clear validation message |

### US-007: Confirm consent and adult eligibility at booking

**Priority:** high

> As a public attendee, I want to see a clear data-processing notice and confirm I am an adult before booking, so that my personal data is handled lawfully under the DPDP Act.

| ID | Given | When | Then |
|---|---|---|---|
| AC-017 | I am completing the booking form | I view the consent section | I see a clear notice of what personal data (name, email, phone) is collected and why, and must give explicit consent to proceed |
| AC-018 | the DPDP assumption that bookings are restricted to adults to avoid children's-data duties | I complete the booking form | I must confirm I am 18 or older, and the booking is blocked if I do not |
| AC-019 | I do not give the required consent | I try to submit the booking | the booking is not created and I am told consent is required |

### US-008: Complete booking and generate a reference

**Priority:** critical

> As a public attendee, I want to finalise my booking and receive a unique booking reference, so that I can identify and retrieve my booking later.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | I have selected seats, entered valid details and given consent | I submit a booking for a free event | the booking is confirmed, the seats are marked as booked, and a unique booking reference is generated |
| AC-021 | the assumption that online payment is out of scope for this version | I book a paid event | the booking is recorded against the displayed price without taking an online payment in the app, and I receive a booking reference |
| AC-022 | a booking has just been confirmed | the reference is generated | it is unique across all bookings and shown to me on screen |

### US-009: Receive confirmation email with QR ticket

**Priority:** high

> As a public attendee, I want to get a confirmation email containing my booking reference and a scannable QR ticket, so that I can present it for entry at the venue.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | my booking has been confirmed | the confirmation is sent | I receive an email via the transactional email provider containing my booking reference, seat details and a scannable QR ticket |
| AC-024 | my booking has been confirmed | I view my booking on screen | a scannable QR ticket is displayed that can be scanned at the door |
| AC-025 | the assumption that no SMS notifications are included at launch | my booking is confirmed | notifications are sent by email only |

## EPIC-003: Booking lookup and cancellation

Attendees can retrieve a booking using its reference together with the email used to book, view their ticket, and request cancellation subject to the per-event policy. Assumption: refunds are governed by a per-event policy but any monetary refund is handled outside the app, since online payment is out of scope for this version.

### US-010: Look up a booking by reference and email

**Priority:** high

> As a public attendee, I want to retrieve my booking using my booking reference and email, so that I can view my ticket without needing an account.

| ID | Given | When | Then |
|---|---|---|---|
| AC-026 | I have a valid booking reference and the email used to book | I submit them in the booking lookup | I see my booking details, seats and QR ticket |
| AC-027 | I enter a reference and email that do not match a booking | I submit the lookup | I am shown a clear not-found message and no booking details are revealed |

### US-011: Request cancellation of a booking

**Priority:** medium

> As a public attendee, I want to cancel my booking, so that I can release seats I no longer need.

| ID | Given | When | Then |
|---|---|---|---|
| AC-028 | I have retrieved my booking and the event's policy permits cancellation | I cancel the booking | the booking is marked cancelled and its seats are released for others to book |
| AC-029 | my booking is cancelled | the cancellation is processed | I receive a cancellation email confirming it |
| AC-030 | the assumption that refunds follow a per-event policy and online payment is out of scope | a paid booking is cancelled | any monetary refund is handled outside the app according to the event's policy |

## EPIC-004: Organiser access and event management

The organiser/admin signs in with email and password to create and edit events, define seating layouts, set pricing or mark events free, publish and unpublish events, and manage them from a dashboard. Only authenticated organisers can access these functions.

### US-012: Organiser sign-in

**Priority:** critical

> As a organiser/admin, I want to sign in with my email and password, so that only I can manage events and bookings.

| ID | Given | When | Then |
|---|---|---|---|
| AC-031 | I am a registered organiser | I sign in with correct email and password | I gain access to the organiser dashboard and management functions |
| AC-032 | I enter incorrect credentials | I attempt to sign in | I am denied access and shown an error without revealing which field was wrong |
| AC-033 | I am not signed in | I try to open any organiser management page | I am redirected to sign in and cannot access the page |

### US-013: Create and edit events

**Priority:** high

> As a organiser/admin, I want to create and edit event details, so that the public sees accurate event information.

| ID | Given | When | Then |
|---|---|---|---|
| AC-034 | I am signed in | I create an event with title, description, date/time and venue | the event is saved as a draft that is not yet visible to the public |
| AC-035 | an existing event | I edit its title, description, date/time or venue and save | the updated details are stored and reflected on the event detail page |
| AC-036 | I omit a required field such as title or date/time | I save the event | the save is blocked and I see a clear validation message |

### US-014: Define seating layout

**Priority:** high

> As a organiser/admin, I want to define the seating layout for an event, so that attendees can select exact seats.

| ID | Given | When | Then |
|---|---|---|---|
| AC-037 | I am editing an event | I define rows and seats for the layout | the layout is saved and used for attendee seat selection |
| AC-038 | a seating layout of hundreds of seats | I save it | each seat is uniquely identifiable by row and seat number |

### US-015: Set pricing or mark event free

**Priority:** high

> As a organiser/admin, I want to set the ticket price or configure the event as free, so that attendees see the correct cost.

| ID | Given | When | Then |
|---|---|---|---|
| AC-039 | I am configuring an event | I set a ticket price | that price is displayed on the event detail page and booking flow |
| AC-040 | I am configuring an event | I mark the event as free | attendees can book without any price being charged and the event shows as free |

### US-016: Publish and unpublish events

**Priority:** high

> As a organiser/admin, I want to publish and unpublish events, so that I control when events are visible and bookable by the public.

| ID | Given | When | Then |
|---|---|---|---|
| AC-041 | a draft event with a seating layout defined | I publish it | it becomes visible in public browsing and search and is bookable |
| AC-042 | a published event | I unpublish it | it is removed from public browsing and search and can no longer be booked |

### US-017: Organiser dashboard of events

**Priority:** medium

> As a organiser/admin, I want a dashboard listing my events and their status, so that I can manage all events in one place.

| ID | Given | When | Then |
|---|---|---|---|
| AC-043 | I am signed in | I open the dashboard | I see my events with their status (draft/published) and date/time |
| AC-044 | I am viewing the dashboard | I select an event | I can open it to edit, manage its layout and pricing, or publish/unpublish it |

### US-018: View and search bookings

**Priority:** medium

> As a organiser/admin, I want to view and search the bookings for my events, so that I can see who is attending and manage bookings.

| ID | Given | When | Then |
|---|---|---|---|
| AC-045 | an event has bookings | I open the event's bookings view | I see each booking's reference, attendee contact details and seats |
| AC-046 | I am viewing an event's bookings | I search by attendee name, email or booking reference | only matching bookings are shown |

## EPIC-005: Venue check-in by QR scan

Door staff use a browser-based scan page (no native app) to scan an attendee's QR ticket and check them in at the venue. The page validates the ticket and prevents duplicate check-ins.

### US-019: Scan QR ticket to check in attendees

**Priority:** high

> As a door staff member, I want to scan an attendee's QR ticket in a browser page, so that I can admit valid ticket-holders at the venue.

| ID | Given | When | Then |
|---|---|---|---|
| AC-047 | I open the browser-based check-in page for an event | I scan a valid QR ticket for that event | the attendee's booking is shown as valid and marked as checked in |
| AC-048 | a ticket has already been checked in | I scan it again | I am warned that it was already used and the attendee is not checked in a second time |
| AC-049 | the assumption that door staff do not need a native app | I need to check attendees in | the scan page works in a web browser on a standard device |
| AC-050 | I scan a QR code that is invalid, cancelled or for a different event | the ticket is validated | I am shown an invalid-ticket message and the attendee is not checked in |

## EPIC-006: DPDP compliance and data residency

The app handles personal data in line with India's DPDP Act: hosted in an India region, consent captured with easy withdrawal, and deletion requests honoured as easily as consent was given. Bookings are restricted to adults to avoid children's-data duties.

### US-020: Withdraw consent and request deletion

**Priority:** high

> As a public attendee, I want to withdraw my consent and request deletion of my personal data, so that I can exercise my DPDP rights as easily as I gave consent.

| ID | Given | When | Then |
|---|---|---|---|
| AC-051 | I have made a booking and given consent | I retrieve my booking and request withdrawal of consent or deletion | my request is actioned and my personal data is deleted or anonymised |
| AC-052 | the DPDP requirement that withdrawal is as easy as giving consent | I look for how to withdraw consent | the option is clearly available through the same booking-management flow |

### US-021: Host application and data in an India region

**Priority:** medium

> As a organiser/admin, I want the application and personal data to be hosted in an India region, so that we meet DPDP data-residency expectations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-053 | the assumption that the app and personal data are hosted in an India region | the system is deployed | application hosting and personal-data storage are located in an India region |
| AC-054 | personal data is stored | a user exercises a deletion request | the data is removed from the India-hosted store |
<!-- sdlc:auto:end epics -->
