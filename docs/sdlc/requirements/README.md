# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-TECH-001 · approved · source: requirements:tech-stack

Product owner approved an exact technology stack: Spring Boot 4.1 (backend), AWS India/Mumbai region (cloud), PostgreSQL 16 (database), Angular 22 (frontend). Email is sent via SMTP (SaaS, e.g. Amazon SES over SMTP) using env vars SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD.

Decided stack and rationale as given:
- Backend: Spring Boot 4.1 -- no rationale text given beyond approval.
- Cloud: AWS (Mumbai/India region) -- chosen so app, database and transactional email stay inside India to satisfy the DPDP consent notice and keep CERT-In's 180-day activity logs in-country; rationale text also states 'payments go through Razorpay to meet RBI's rule that card data stays in the country.'
- Database: PostgreSQL 16 -- chosen for transactional guarantees so a seat/booking/payment-status combination can never be double-claimed even under concurrent requests; also supports DPDP deletion requests by keeping personal data centrally located; judged sufficient for the project's small scale.
- Frontend: Angular 22 -- no rationale text given beyond approval.
- Email service: SMTP server (SaaS) with env vars SMTP_HOST/PORT/USER/PASSWORD, used to send booking/cancellation confirmations containing booking reference and QR ticket; rationale ties Amazon SES over SMTP from Mumbai to keeping email content inside India per the privacy notice.
- API keys required: SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, NFR-001, NFR-004, NFR-005

- ⚠ Discrepancy: the AWS rationale text states payments go through Razorpay to meet RBI card-data-residency rules, but the scope section explicitly removes payments and Razorpay from this build. Confirm whether RBI payment-data localisation is now moot (no in-app payment processing) or whether this rationale is stale.
- ⚠ No rationale given for choice of Spring Boot 4.1 or Angular 22 versions specifically.

### REQ-SCOPE-001 · draft · source: requirements:scope

Lightweight-scope requirements version 1 defines in-scope capabilities (browsing/search, seat selection with locking, guest booking, QR ticketing, lookup/cancellation, organiser management, publish/unpublish, consent notice) and explicitly excludes native mobile apps and payments.

In scope: public event browsing and search; event detail page; exact seat selection on seating layout; seat locking to prevent double-booking; guest booking with contact details (no mandatory account); booking reference generation; on-screen scannable QR ticket; booking lookup by reference and email; organiser sign-in; event creation/editing; seating layout definition; seat pricing and free-event configuration; publish/unpublish events; organiser dashboard; consent notice at booking.
Out of scope -- explicitly not to be designed or built: native mobile apps (iOS/Android) for attendees or door staff (replaced by responsive web app and browser-based QR check-in page); payments (Razorpay was proposed then removed from the stack).

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006

- ⚠ See REQ-TECH-001 for the conflict between the payments-out-of-scope decision and the Razorpay/RBI rationale text attached to the AWS stack choice.

### EPIC-001 · draft · source: requirements:EPIC-001

Public attendees can browse and search only published events and open a full event detail page, with no account required. Unpublished events are never visible.

US-001 Browse published events: listing shows title, date/time, venue for each published event; unpublished/unpublished-again events are excluded; no sign-in needed (AC-001..AC-003).
US-002 Search events: keyword search matches title or venue among published events; no-match shows a clear 'no events found' message rather than an error (AC-004, AC-005).
US-003 View event detail page: shows title, description, date/time, venue, and price or 'free'; proceeding to seat selection is available when seats exist; requesting an unpublished event's detail page shows a not-available message and blocks booking (AC-006..AC-008).

**Related:** US-001, US-002, US-003, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008

### EPIC-002 · draft · source: requirements:EPIC-002

Attendees pick exact seats on a layout, have them locked during checkout, enter guest contact details, consent and confirm adult age, then complete a booking (free or priced with no in-app payment) and get a reference plus an emailed/on-screen QR ticket.

US-004 Select exact seats: layout shows available vs. booked seats; selected seats highlighted and identified by row/seat number; seats already booked or locked by others are unselectable (AC-009..AC-011).
US-005 Lock seats to prevent double-booking: seats lock on starting checkout and show unavailable to others; concurrent attempts on the same seat let only the first succeed, second is told it's unavailable; abandoned holds expire and release the seat (AC-012..AC-014). Ties to NFR-001 (a seat can never be sold twice).
US-006 Guest contact details: name/email/phone entered without account creation; empty required field or invalid email blocks submission with a validation message (AC-015, AC-016).
US-007 Consent and adult eligibility (DPDP Act: notice and consent for name/email/phone; children's-data avoidance via 18+ gate): booking form shows a data-use notice and requires explicit consent plus confirmation of being 18+; missing either blocks the booking (AC-017..AC-019).
US-008 Complete booking and generate reference: free events confirm without charge; paid events record against displayed price with no in-app payment; a unique booking reference is generated and shown on screen; seats marked booked (AC-020..AC-022).
US-009 Confirmation email with QR ticket: confirmation email via the transactional email provider contains reference, seat details and a scannable QR; the same QR is shown on-screen; notifications are email-only, no SMS (AC-023..AC-025).

**Related:** US-004, US-005, US-006, US-007, US-008, US-009, NFR-001, NFR-006

- ⚠ Age confirmation (AC-018) is a self-declared checkbox per the text given; no mechanism for actual age verification is specified -- flagged for DPDP 'verifiable parental consent for under-18s' topic (see top-level gaps).

### EPIC-003 · draft · source: requirements:EPIC-003

Attendees can retrieve a booking by reference plus email to view seats and QR ticket, and cancel it where the event policy allows, releasing seats; any refund is handled outside the app.

US-010 Look up a booking: matching reference+email reveals booking details, seats and QR; non-matching input shows a clear not-found message without revealing any booking data (AC-026, AC-027). Ties to NFR-008 (booking details gated by reference+email match).
US-011 Request cancellation: where the event's policy permits, cancelling marks the booking cancelled and releases seats; a cancellation email confirms it; for paid bookings, any monetary refund is handled outside the app per event policy, since online payment is out of scope (AC-028..AC-030).

**Related:** US-010, US-011, NFR-008

- ⚠ The 'event's cancellation policy' that gates whether cancellation is permitted is referenced but its configuration/definition is not described anywhere in the input.

### EPIC-004 · draft · source: requirements:EPIC-004

An organiser signs in to create/edit events, define seating layouts, set pricing or mark events free, publish/unpublish, and manage events and bookings from a dashboard. Only authenticated organisers can reach these functions.

US-012 Organiser sign-in: correct email/password grants dashboard access; incorrect credentials are denied with a generic error (no field disclosed); unauthenticated access to any organiser page redirects to sign-in (AC-031..AC-033). Ties to NFR-009.
US-013 Create and edit events: new events (title, description, date/time, venue) save as an unpublished draft; edits update the live detail page; missing required fields (e.g. title, date/time) block saving with a validation message (AC-034..AC-036).
US-014 Define seating layout: organiser defines rows/seats used for attendee selection; even at hundreds of seats, each seat is uniquely identifiable by row and seat number (AC-037, AC-038). Ties to NFR-002 (sized for a handful of events, hundreds of seats each, not high-concurrency sell-outs).
US-015 Pricing or free: a set price displays on detail page and booking flow; marking an event free allows booking with no charge and a 'free' label (AC-039, AC-040).
US-016 Publish/unpublish: publishing a draft event with a defined layout makes it publicly visible and bookable; unpublishing removes it from browsing/search and blocks booking (AC-041, AC-042).
US-017 Organiser dashboard: lists the organiser's events with status (draft/published) and date/time; selecting an event opens it for editing, layout/pricing management, or publish/unpublish (AC-043, AC-044).
US-018 View and search bookings: per-event view shows each booking's reference, attendee contact details and seats; search by attendee name, email, or reference filters the list (AC-045, AC-046).

**Related:** US-012, US-013, US-014, US-015, US-016, US-017, US-018, NFR-002, NFR-009

### EPIC-005 · draft · source: requirements:EPIC-005

Door staff use a browser-based QR scan page (no native app) to validate and check in attendees for a specific event, preventing duplicate or invalid check-ins.

US-019 Scan QR ticket to check in: a valid ticket for the event being checked shows as valid and marks the attendee checked in; a ticket already checked in triggers a warning and is not re-admitted; the page must work in a standard web browser (no native app) (AC-047..AC-049). An invalid, cancelled, or wrong-event QR shows an invalid-ticket message and does not check the attendee in (AC-050). Ties to NFR-003 (responsive web/browser-only, no native apps).

**Related:** US-019, NFR-003

### EPIC-006 · draft · source: requirements:EPIC-006

DPDP Act 2023: data handled in an India region with consent captured at booking, easy consent withdrawal/deletion through the same booking-management flow, and bookings restricted to adults to avoid children's-data duties.

US-020 Withdraw consent and request deletion -- DPDP Act: data-principal rights (withdrawal, erasure): through the same flow used to retrieve a booking, an attendee can withdraw consent or request deletion; the request is actioned and personal data deleted or anonymised; withdrawal must be as easy as giving consent (AC-051, AC-052). Ties to NFR-007.
US-021 Host application and data in an India region -- DPDP Act: data-residency expectation: application hosting and personal-data storage (including transactional email) are located in an India (Mumbai) region; deletion requests remove data from that India-hosted store (AC-053, AC-054). Ties to NFR-004 and NFR-005 (CERT-In 180-day ICT log retention, same India-hosted environment).

**Related:** US-020, US-021, NFR-004, NFR-005, NFR-006, NFR-007

- ⚠ No requirement describes a Data Protection Board / affected-individual breach-notification process, or CERT-In's 6-hour cyber-incident reporting -- only the 180-day log-retention NFR is specified.
- ⚠ No requirement mentions a registered DPDP consent manager, despite the regulation naming consent managers as an accepted consent-capture route.
- ⚠ The 18+ gate (US-007/EPIC-002) is self-declared, not verified -- confirm this is an accepted substitute for 'verifiable parental consent for under-18s' rather than an open compliance risk.

### NFR-001 · draft · source: requirements:NFR-001

Availability/correctness: a seat can never be sold twice; concurrent claims on the same seat must resolve so only the first succeeds.

Seat holding and booking must be reliably conflict-free -- when two attendees try to claim the same seat at the same moment, only the first succeeds and the second is told the seat is no longer available.

**Related:** US-004, US-005, US-008

### NFR-002 · draft · source: requirements:NFR-002

Scale target: a handful of events at a time, hundreds of seats per event; not designed for high-concurrency sell-out spikes.

System sizing target: a handful of concurrent events, hundreds of seats per event; no requirement to absorb high-concurrency sell-out traffic.

**Related:** US-014

### NFR-003 · draft · source: requirements:NFR-003

Compatibility: responsive web app only, no native mobile apps; browser-based QR check-in must work on a standard device.

Product is delivered as a responsive web application with no native mobile apps; the door-staff QR check-in page must work in a web browser on a standard device.

**Related:** US-019

### NFR-004 · draft · source: requirements:NFR-004

DPDP Act: data-residency control -- application and all personal data, including transactional email, hosted in an India (AWS Mumbai) region; deletions remove data from that store.

Target: AWS India (Mumbai) region for app hosting, database and transactional email, meeting DPDP data-residency expectations; deletion requests remove data from the India-hosted store.

**Related:** US-021

### NFR-005 · draft · source: requirements:NFR-005

CERT-In: activity/ICT logs must be retained for 180 days across the whole system.

Target: 180-day retention of activity logs to meet CERT-In directions. Applies to the whole system, not tied to a specific story.

- ⚠ No requirement specifies the separate CERT-In obligation to report cyber incidents within 6 hours -- only log retention is covered.

### NFR-006 · draft · source: requirements:NFR-006

DPDP Act: minimal data collection and adults-only booking -- only name, email, phone collected, each with notice and explicit consent; under-18s excluded to avoid children's-data duties.

Booking collects only name, email and phone, each with a clear notice and explicit consent; bookings restricted to 18+ to avoid DPDP children's-data duties.

**Related:** US-006, US-007

### NFR-007 · draft · source: requirements:NFR-007

DPDP Act: consent withdrawal and data deletion must be as easy as giving consent, via the same booking-management flow.

Attendees must be able to withdraw consent and request deletion as easily as they gave it, through the same booking-lookup flow; data is then deleted or anonymised.

**Related:** US-020

### NFR-008 · draft · source: requirements:NFR-008

Security: booking details, seats and QR ticket are revealed only on a matching reference + email pair; mismatches disclose nothing.

Booking details, seats and QR ticket are revealed only when a matching booking reference and the email used to book are supplied; a mismatch returns a not-found message and discloses no booking details.

**Related:** US-010

### NFR-009 · draft · source: requirements:NFR-009

Security: organiser pages require authentication; failed sign-in gives a generic error.

Only authenticated organisers can reach event-management and booking pages; unauthenticated requests are redirected to sign-in; a failed sign-in shows a generic error that does not reveal which field was wrong.

**Related:** US-012

### NFR-010 · draft · source: requirements:NFR-010

Usability: empty searches, invalid/missing input, and failed lookups show clear plain-language messages instead of technical errors.

Empty searches, invalid or missing input, and lookups that do not match a booking must present clear, plain-language messages that guide the user rather than showing technical errors.

**Related:** US-002, US-006, US-010
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
