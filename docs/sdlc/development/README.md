# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-V1 · approved · source: plan:v1

Development plan version 1 is approved and organizes all 21 user stories (6 epics, 11 sub-tasks) into 5 sprints of 20-point capacity each.

Plan status: approved, version 1. Scope spans organiser-side event/seating management, public discovery, seat-locking booking flow, confirmation email, booking lookup/cancellation, venue QR check-in, and DPDP consent/data-residency work. Delivered as 5 sequential sprints (see DEV-SPRINT-1..5) each capacity 20 points.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-016, US-017, US-018, US-019, US-020, US-021

- ⚠ No execution/completion status (code, PRs, test results) reported for any backlog item -- this entry documents the plan only.
- ⚠ No approval metadata (approver, date) was provided for the plan.

### DEV-SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 goal: stand up organiser sign-in, event creation/editing, pricing, and seating-layout definition. Capacity 20 points.

Goal text: 'Stand up organiser sign-in, event creation/editing, pricing, and seating-layout definition.' Matched backlog items by content: US-012 (organiser sign-in), US-013 (create/edit events), US-015 (pricing/free event), US-014 and its tasks US-014-T1/T2/T3 (seating layout data model, save endpoint, editor UI).

**Related:** US-012, US-013, US-014, US-014-T1, US-014-T2, US-014-T3, US-015

- ⚠ Item-to-sprint assignment is inferred from the goal description text; the plan input did not explicitly list item IDs per sprint.
- ⚠ No status reported on whether Sprint 1 work was started, completed, or carried over.

### DEV-SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 goal: deliver India-region hosting, publish/unpublish, the organiser dashboard, and public event browsing/search/detail. Capacity 20 points.

Goal text: 'Deliver India-region hosting, publish/unpublish, the organiser dashboard, and public event browsing/search/detail.' Matched items: US-021 (India-region hosting), US-016 (publish/unpublish), US-017 (organiser dashboard), US-001 (browse), US-002 (search), US-003 (event detail).

**Related:** US-021, US-016, US-017, US-001, US-002, US-003

- ⚠ Item-to-sprint assignment inferred from goal text, not explicit in input.
- ⚠ No completion/progress status reported.

### DEV-SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 goal: enable seat selection, seat locking, and guest contact capture for the booking flow. Capacity 20 points.

Goal text: 'Enable seat selection, seat locking, and guest contact capture for the booking flow.' Matched items: US-004 (select seats), US-005 and tasks US-005-T1..T4 (seat lock table, lock endpoint, expired-lock cleanup, lock UI/countdown), US-006 (guest contact details), US-007 (consent/adult eligibility).

**Related:** US-004, US-005, US-005-T1, US-005-T2, US-005-T3, US-005-T4, US-006, US-007

- ⚠ Item-to-sprint assignment inferred from goal text, not explicit in input.
- ⚠ No completion/progress status reported.

### DEV-SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 goal: complete booking creation with reference and QR-ticket email, booking lookup, and organiser bookings view. Capacity 20 points.

Goal text: 'Complete booking creation with reference and QR-ticket email, booking lookup, and organiser bookings view.' Matched items: US-008 and tasks US-008-T1..T4 (booking transaction, reference generation, free/paid path, confirmation screen), US-009 (confirmation email with QR ticket), US-010 (lookup by reference/email), US-018 (organiser view/search bookings).

**Related:** US-008, US-008-T1, US-008-T2, US-008-T3, US-008-T4, US-009, US-010, US-018

- ⚠ Item-to-sprint assignment inferred from goal text, not explicit in input.
- ⚠ No completion/progress status reported.

### DEV-SPRINT-5 · approved · source: plan:Sprint 5

Sprint 5 goal: deliver cancellation, venue QR check-in, and consent withdrawal/data deletion. Capacity 20 points.

Goal text: 'Deliver cancellation, venue QR check-in, and consent withdrawal/data deletion.' Matched items: US-011 (cancellation request), US-019 and tasks US-019-T1..T3 (check-in validation endpoint, browser QR scanner page, check-in status tracking), US-020 (consent withdrawal/deletion).

**Related:** US-011, US-019, US-019-T1, US-019-T2, US-019-T3, US-020

- ⚠ Item-to-sprint assignment inferred from goal text, not explicit in input.
- ⚠ No completion/progress status reported.
- ⚠ US-021 (India hosting) is the only DPDP-epic item not in this sprint -- it was matched to Sprint 2 instead; confirm this split is correct.

### DEV-EPIC-001 · approved · source: plan:EPIC-001

Epic: Public event discovery -- covers browsing, searching, and viewing event details for unauthenticated users.

No owning role assigned at epic level. Child stories: US-001 Browse published events (3 pts, frontend-agent), US-002 Search events (2 pts, frontend-agent), US-003 View event detail page (3 pts, frontend-agent).

**Related:** US-001, US-002, US-003

- ⚠ Epic has no assigned role/owner.
- ⚠ No implementation status reported.

### DEV-EPIC-002 · approved · source: plan:EPIC-002

Epic: Seat selection and booking -- covers the end-to-end guest booking flow from seat map to confirmation email.

No owning role assigned at epic level. Child stories: US-004 Select exact seats (5 pts, frontend-agent), US-005 Lock seats to prevent double-booking (8 pts, backend-agent, 4 sub-tasks), US-006 Enter contact details as guest (3 pts, frontend-agent), US-007 Confirm consent/adult eligibility (2 pts, frontend-agent), US-008 Complete booking and generate reference (8 pts, backend-agent, 4 sub-tasks), US-009 Receive confirmation email with QR ticket (5 pts, integration-agent).

**Related:** US-004, US-005, US-006, US-007, US-008, US-009

- ⚠ Epic has no assigned role/owner.
- ⚠ No implementation status reported.

### DEV-EPIC-003 · approved · source: plan:EPIC-003

Epic: Booking lookup and cancellation -- lets guests find and request cancellation of an existing booking.

No owning role assigned at epic level. Child stories: US-010 Look up a booking by reference and email (3 pts, backend-agent), US-011 Request cancellation of a booking (5 pts, backend-agent).

**Related:** US-010, US-011

- ⚠ Epic has no assigned role/owner.
- ⚠ No implementation status reported.

### DEV-EPIC-004 · approved · source: plan:EPIC-004

Epic: Organiser access and event management -- organiser sign-in plus event, pricing, seating, publishing, dashboard, and bookings tooling.

No owning role assigned at epic level. Child stories: US-012 Organiser sign-in (5 pts, security-agent), US-013 Create and edit events (5 pts, backend-agent), US-014 Define seating layout (8 pts, backend-agent, 3 sub-tasks), US-015 Set pricing or mark free (2 pts, backend-agent), US-016 Publish/unpublish events (3 pts, backend-agent), US-017 Organiser dashboard (3 pts, frontend-agent), US-018 View and search bookings (3 pts, backend-agent).

**Related:** US-012, US-013, US-014, US-015, US-016, US-017, US-018

- ⚠ Epic has no assigned role/owner.
- ⚠ No implementation status reported.

### DEV-EPIC-005 · approved · source: plan:EPIC-005

Epic: Venue check-in by QR scan -- lets venue staff scan QR tickets to check attendees in.

No owning role assigned at epic level. Single child story: US-019 Scan QR ticket to check in attendees (8 pts, integration-agent, 3 sub-tasks).

**Related:** US-019

- ⚠ Epic has no assigned role/owner.
- ⚠ No implementation status reported.

### DEV-EPIC-006 · approved · source: plan:EPIC-006

Epic: DPDP compliance and data residency -- consent withdrawal/data deletion and India-region hosting.

No owning role assigned at epic level. Child stories: US-020 Withdraw consent and request deletion (5 pts, security-agent), US-021 Host application and data in an India region (5 pts, devops-agent).

**Related:** US-020, US-021

- ⚠ Epic has no assigned role/owner.
- ⚠ No implementation status reported.
- ⚠ Epic name references DPDP (India's data protection law); no explicit compliance/regulation checklist was supplied in this input to confirm full coverage -- recommend a dedicated compliance review beyond US-020/US-021.

### US-001 · approved · source: plan:US-001

Story: Browse published events. 3 points, assigned to frontend-agent.

Part of EPIC-001 Public event discovery. Allocated to frontend-agent, estimated 3 points, scheduled per Sprint 2 goal (public event browsing).

**Related:** EPIC-001, DEV-SPRINT-2

- ⚠ No implementation status, code, or test evidence reported.

### US-002 · approved · source: plan:US-002

Story: Search events. 2 points, assigned to frontend-agent.

Part of EPIC-001 Public event discovery. Allocated to frontend-agent, estimated 2 points, scheduled per Sprint 2 goal (public event search).

**Related:** EPIC-001, DEV-SPRINT-2

- ⚠ No implementation status, code, or test evidence reported.

### US-003 · approved · source: plan:US-003

Story: View event detail page. 3 points, assigned to frontend-agent.

Part of EPIC-001 Public event discovery. Allocated to frontend-agent, estimated 3 points, scheduled per Sprint 2 goal (public event detail).

**Related:** EPIC-001, DEV-SPRINT-2

- ⚠ No implementation status, code, or test evidence reported.

### US-004 · approved · source: plan:US-004

Story: Select exact seats on the layout. 5 points, assigned to frontend-agent.

Part of EPIC-002 Seat selection and booking. Allocated to frontend-agent, estimated 5 points, scheduled per Sprint 3 goal (seat selection).

**Related:** EPIC-002, DEV-SPRINT-3

- ⚠ No implementation status, code, or test evidence reported.

### US-005 · approved · source: plan:US-005

Story: Lock seats to prevent double-booking. 8 points, assigned to backend-agent, decomposed into 4 tasks.

Part of EPIC-002 Seat selection and booking. Scheduled per Sprint 3 goal (seat locking). Sub-tasks: US-005-T1 Add seat_lock table with expiry and conflict-safe claim logic (backend-agent); US-005-T2 Implement seat lock endpoint (backend-agent); US-005-T3 Add expired-lock cleanup (backend-agent); US-005-T4 Show lock state and hold countdown on the seat map (frontend-agent).

**Related:** EPIC-002, DEV-SPRINT-3, US-005-T1, US-005-T2, US-005-T3, US-005-T4

- ⚠ No implementation status, code, or test evidence reported for the story or any of its 4 tasks.

### US-006 · approved · source: plan:US-006

Story: Enter contact details as a guest. 3 points, assigned to frontend-agent.

Part of EPIC-002 Seat selection and booking. Allocated to frontend-agent, estimated 3 points, scheduled per Sprint 3 goal (guest contact capture).

**Related:** EPIC-002, DEV-SPRINT-3

- ⚠ No implementation status, code, or test evidence reported.

### US-007 · approved · source: plan:US-007

Story: Confirm consent and adult eligibility at booking. 2 points, assigned to frontend-agent.

Part of EPIC-002 Seat selection and booking. Allocated to frontend-agent, estimated 2 points, scheduled per Sprint 3 goal (booking flow).

**Related:** EPIC-002, DEV-SPRINT-3

- ⚠ No implementation status, code, or test evidence reported.

### US-008 · approved · source: plan:US-008

Story: Complete booking and generate a reference. 8 points, assigned to backend-agent, decomposed into 4 tasks.

Part of EPIC-002 Seat selection and booking. Scheduled per Sprint 4 goal (booking creation with reference). Sub-tasks: US-008-T1 Implement booking creation transaction (backend-agent); US-008-T2 Implement unique booking reference generation (backend-agent); US-008-T3 Handle free vs. paid booking paths (backend-agent); US-008-T4 Build booking confirmation screen (frontend-agent).

**Related:** EPIC-002, DEV-SPRINT-4, US-008-T1, US-008-T2, US-008-T3, US-008-T4

- ⚠ No implementation status, code, or test evidence reported for the story or any of its 4 tasks.

### US-009 · approved · source: plan:US-009

Story: Receive confirmation email with QR ticket. 5 points, assigned to integration-agent.

Part of EPIC-002 Seat selection and booking. Allocated to integration-agent, estimated 5 points, scheduled per Sprint 4 goal (QR-ticket email).

**Related:** EPIC-002, DEV-SPRINT-4

- ⚠ No implementation status, code, or test evidence reported.

### US-010 · approved · source: plan:US-010

Story: Look up a booking by reference and email. 3 points, assigned to backend-agent.

Part of EPIC-003 Booking lookup and cancellation. Allocated to backend-agent, estimated 3 points, scheduled per Sprint 4 goal (booking lookup).

**Related:** EPIC-003, DEV-SPRINT-4

- ⚠ No implementation status, code, or test evidence reported.

### US-011 · approved · source: plan:US-011

Story: Request cancellation of a booking. 5 points, assigned to backend-agent.

Part of EPIC-003 Booking lookup and cancellation. Allocated to backend-agent, estimated 5 points, scheduled per Sprint 5 goal (cancellation).

**Related:** EPIC-003, DEV-SPRINT-5

- ⚠ No implementation status, code, or test evidence reported.

### US-012 · approved · source: plan:US-012

Story: Organiser sign-in. 5 points, assigned to security-agent.

Part of EPIC-004 Organiser access and event management. Allocated to security-agent, estimated 5 points, scheduled per Sprint 1 goal (organiser sign-in).

**Related:** EPIC-004, DEV-SPRINT-1

- ⚠ No implementation status, code, or test evidence reported.

### US-013 · approved · source: plan:US-013

Story: Create and edit events. 5 points, assigned to backend-agent.

Part of EPIC-004 Organiser access and event management. Allocated to backend-agent, estimated 5 points, scheduled per Sprint 1 goal (event creation/editing).

**Related:** EPIC-004, DEV-SPRINT-1

- ⚠ No implementation status, code, or test evidence reported.

### US-014 · approved · source: plan:US-014

Story: Define seating layout. 8 points, assigned to backend-agent, decomposed into 3 tasks.

Part of EPIC-004 Organiser access and event management. Scheduled per Sprint 1 goal (seating-layout definition). Sub-tasks: US-014-T1 Design seat data model and bulk-insert logic for rows/seats (backend-agent); US-014-T2 Implement layout save endpoint with uniqueness validation (backend-agent); US-014-T3 Build seating-layout editor UI (frontend-agent).

**Related:** EPIC-004, DEV-SPRINT-1, US-014-T1, US-014-T2, US-014-T3

- ⚠ No implementation status, code, or test evidence reported for the story or any of its 3 tasks.

### US-015 · approved · source: plan:US-015

Story: Set pricing or mark event free. 2 points, assigned to backend-agent.

Part of EPIC-004 Organiser access and event management. Allocated to backend-agent, estimated 2 points, scheduled per Sprint 1 goal (pricing).

**Related:** EPIC-004, DEV-SPRINT-1

- ⚠ No implementation status, code, or test evidence reported.

### US-016 · approved · source: plan:US-016

Story: Publish and unpublish events. 3 points, assigned to backend-agent.

Part of EPIC-004 Organiser access and event management. Allocated to backend-agent, estimated 3 points, scheduled per Sprint 2 goal (publish/unpublish).

**Related:** EPIC-004, DEV-SPRINT-2

- ⚠ No implementation status, code, or test evidence reported.

### US-017 · approved · source: plan:US-017

Story: Organiser dashboard of events. 3 points, assigned to frontend-agent.

Part of EPIC-004 Organiser access and event management. Allocated to frontend-agent, estimated 3 points, scheduled per Sprint 2 goal (organiser dashboard).

**Related:** EPIC-004, DEV-SPRINT-2

- ⚠ No implementation status, code, or test evidence reported.

### US-018 · approved · source: plan:US-018

Story: View and search bookings. 3 points, assigned to backend-agent.

Part of EPIC-004 Organiser access and event management. Allocated to backend-agent, estimated 3 points, scheduled per Sprint 4 goal (organiser bookings view).

**Related:** EPIC-004, DEV-SPRINT-4

- ⚠ No implementation status, code, or test evidence reported.

### US-019 · approved · source: plan:US-019

Story: Scan QR ticket to check in attendees. 8 points, assigned to integration-agent, decomposed into 3 tasks.

Part of EPIC-005 Venue check-in by QR scan. Scheduled per Sprint 5 goal (venue QR check-in). Sub-tasks: US-019-T1 Implement check-in validation endpoint (backend-agent); US-019-T2 Build browser-based QR scanner check-in page (frontend-agent); US-019-T3 Track check-in status on bookings (backend-agent).

**Related:** EPIC-005, DEV-SPRINT-5, US-019-T1, US-019-T2, US-019-T3

- ⚠ No implementation status, code, or test evidence reported for the story or any of its 3 tasks.

### US-020 · approved · source: plan:US-020

Story: Withdraw consent and request deletion. 5 points, assigned to security-agent.

Part of EPIC-006 DPDP compliance and data residency. Allocated to security-agent, estimated 5 points, scheduled per Sprint 5 goal (consent withdrawal/data deletion).

**Related:** EPIC-006, DEV-SPRINT-5

- ⚠ No implementation status, code, or test evidence reported.
- ⚠ No explicit DPDP regulation checklist supplied in this input to confirm this story's scope fully satisfies consent-withdrawal obligations.

### US-021 · approved · source: plan:US-021

Story: Host application and data in an India region. 5 points, assigned to devops-agent.

Part of EPIC-006 DPDP compliance and data residency. Allocated to devops-agent, estimated 5 points, scheduled per Sprint 2 goal (India-region hosting).

**Related:** EPIC-006, DEV-SPRINT-2

- ⚠ No implementation status, code, or infrastructure evidence reported.
- ⚠ No explicit DPDP data-residency checklist supplied in this input to confirm full regulatory coverage.
<!-- sdlc:auto:end narrative -->
