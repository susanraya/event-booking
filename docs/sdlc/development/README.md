# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-v1 · approved · source: plan:v1

Development plan version 1 is approved. It organizes the full backlog (6 epics, 21 user stories, 14 technical subtasks) into 5 sprints of 20 points capacity each, with each story/task assigned an owning role (frontend-agent, backend-agent, integration-agent, security-agent, devops-agent).

Backlog composition: EPIC-001 Public event discovery (US-001, US-002, US-003); EPIC-002 Seat selection and booking (US-004, US-005 + subtasks US-005-T1..T4, US-006, US-007, US-008 + subtasks US-008-T1..T4, US-009); EPIC-003 Booking lookup and cancellation (US-010, US-011); EPIC-004 Organiser access and event management (US-012, US-013, US-014 + subtasks US-014-T1..T3, US-015, US-016, US-017, US-018); EPIC-005 Venue check-in by QR scan (US-019 + subtasks US-019-T1..T3); EPIC-006 DPDP compliance and data residency (US-020, US-021). Story points range from 2 (US-015) to 8 (US-005, US-008, US-014, US-019). Roles are pre-assigned per item as listed in the plan.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-016, US-017, US-018, US-019, US-020, US-021

- ⚠ Plan input does not explicitly state which sprint each backlog item belongs to; sprint-item groupings in the per-sprint entries below are inferred from each sprint's goal description, not an explicit mapping field.
- ⚠ US-007 (Confirm consent and adult eligibility at booking) is not clearly referenced by any sprint's goal text, so its planned sprint is unknown.

### DEV-SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 (capacity 20) targets organiser sign-in, event creation/editing, pricing, and seating-layout definition.

Inferred scope: US-012 Organiser sign-in; US-013 Create and edit events; US-014 Define seating layout plus its subtasks (seat data model/bulk-insert, layout save endpoint with uniqueness validation, seating-layout editor UI); US-015 Set pricing or mark event free.

**Related:** US-012, US-013, US-014, US-014-T1, US-014-T2, US-014-T3, US-015

- ⚠ Item-to-sprint assignment inferred from goal text, not explicitly stated in the plan input.

### DEV-SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 (capacity 20) targets India-region hosting, publish/unpublish, the organiser dashboard, and public event browsing/search/detail.

Inferred scope: US-021 Host application and data in an India region; US-016 Publish and unpublish events; US-017 Organiser dashboard of events; US-001 Browse published events; US-002 Search events; US-003 View event detail page.

**Related:** US-021, US-016, US-017, US-001, US-002, US-003

- ⚠ Item-to-sprint assignment inferred from goal text, not explicitly stated in the plan input.

### DEV-SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 (capacity 20) targets seat selection, seat locking, and guest contact capture for the booking flow.

Inferred scope: US-004 Select exact seats on the layout; US-005 Lock seats to prevent double-booking plus its subtasks (seat_lock table with expiry/conflict-safe claim, lock endpoint, expired-lock cleanup, lock state/countdown on seat map); US-006 Enter contact details as a guest.

**Related:** US-004, US-005, US-005-T1, US-005-T2, US-005-T3, US-005-T4, US-006

- ⚠ Item-to-sprint assignment inferred from goal text, not explicitly stated in the plan input.
- ⚠ US-007 (consent and adult-eligibility confirmation) is part of the same booking flow but is not named in this sprint's goal; its sprint placement is unclear.

### DEV-SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 (capacity 20) targets completing booking creation with reference and QR-ticket email, booking lookup, and the organiser bookings view.

Inferred scope: US-008 Complete booking and generate a reference plus its subtasks (booking creation transaction, unique reference generation, free vs. paid paths, booking confirmation screen); US-009 Receive confirmation email with QR ticket; US-010 Look up a booking by reference and email; US-018 View and search bookings.

**Related:** US-008, US-008-T1, US-008-T2, US-008-T3, US-008-T4, US-009, US-010, US-018

- ⚠ Item-to-sprint assignment inferred from goal text, not explicitly stated in the plan input.

### DEV-SPRINT-5 · approved · source: plan:Sprint 5

Sprint 5 (capacity 20) targets cancellation, venue QR check-in, and consent withdrawal/data deletion.

Inferred scope: US-011 Request cancellation of a booking; US-019 Scan QR ticket to check in attendees plus its subtasks (check-in validation endpoint, browser-based QR scanner page, check-in status tracking on bookings); US-020 Withdraw consent and request deletion.

**Related:** US-011, US-019, US-019-T1, US-019-T2, US-019-T3, US-020

- ⚠ Item-to-sprint assignment inferred from goal text, not explicitly stated in the plan input.

### DEV-US-001 · approved · source: dev:US-001

US-001 (Browse published events) was delivered in the development run.

Ticket status: delivered. Commit: 67746901e9d9f7dea6c8d61f130df8f1cbbe427c.

**Related:** US-001

### DEV-US-002 · approved · source: dev:US-002

US-002 (Search events) was delivered in the development run.

Ticket status: delivered. Commit: 67746901e9d9f7dea6c8d61f130df8f1cbbe427c.

**Related:** US-002

### DEV-US-003 · approved · source: dev:US-003

US-003 (View event detail page) was delivered in the development run.

Ticket status: delivered. Commit: 546a4eb46687d03d80de2d95af07299faa2fc173.

**Related:** US-003

### DEV-US-016 · approved · source: dev:US-016

US-016 (Publish and unpublish events) was delivered in the development run.

Ticket status: delivered. Commit: 546a4eb46687d03d80de2d95af07299faa2fc173.

**Related:** US-016

### DEV-US-017 · approved · source: dev:US-017

US-017 (Organiser dashboard of events) was delivered in the development run.

Ticket status: delivered. Commit: 546a4eb46687d03d80de2d95af07299faa2fc173.

**Related:** US-017

### DEV-US-021 · draft · source: dev:US-021

US-021 (Host application and data in an India region) was skipped in the development run, not delivered.

Ticket status: skipped. No commit recorded. The input gives no reason for the skip.

**Related:** US-021

- ⚠ Reason for skipping India-region hosting is not provided.
- ⚠ No alternative timeline or follow-up plan for this DPDP-relevant data-residency requirement is recorded.

### DEV-RUN-STATUS · draft · source: dev:run

The development run is reported as overall status 'completed', but ticket-level evidence is only provided for 6 of the 21 planned stories.

Reported run status: completed. Tickets with recorded outcomes: US-001, US-002, US-003, US-016, US-017 (delivered) and US-021 (skipped). No ticket records were provided for US-004, US-005 (+ subtasks), US-006, US-007, US-008 (+ subtasks), US-009, US-010, US-011, US-012, US-013, US-014 (+ subtasks), US-015, US-018, US-019 (+ subtasks), or US-020, despite all of these being part of the approved plan.

**Related:** US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-018, US-019, US-020

- ⚠ Discrepancy: run status says 'completed' while 15 of 21 planned stories (and all associated subtasks) have no delivery, in-progress, or skipped status recorded -- it is unclear whether this work was actually completed and simply not reported, or not started.
- ⚠ Seat locking, booking creation/confirmation email, booking lookup/cancellation, organiser sign-in/event/pricing/layout management, bookings view, and venue check-in -- the core booking and organiser functionality -- have no confirmed build status in this input.
<!-- sdlc:auto:end narrative -->
