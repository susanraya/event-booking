# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up organiser sign-in, event creation/editing, pricing, and seating-layout definition.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-012 | Story | Organiser sign-in | 5 | security-agent | — |
| US-013 | Story | Create and edit events | 5 | backend-agent | US-012 |
| US-014 | Story | Define seating layout | 8 | backend-agent | US-013 |
| ↳ US-014-T1 | Task | Design seat data model and bulk-insert logic for rows/seats | — | backend-agent | — |
| ↳ US-014-T2 | Task | Implement layout save endpoint with uniqueness validation | — | backend-agent | — |
| ↳ US-014-T3 | Task | Build seating-layout editor UI | — | frontend-agent | — |
| US-015 | Story | Set pricing or mark event free | 2 | backend-agent | US-013 |

## Sprint 2: Sprint 2

Deliver India-region hosting, publish/unpublish, the organiser dashboard, and public event browsing/search/detail.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Browse published events | 3 | frontend-agent | US-016 |
| US-002 | Story | Search events | 2 | frontend-agent | US-001 |
| US-003 | Story | View event detail page | 3 | frontend-agent | US-001 |
| US-016 | Story | Publish and unpublish events | 3 | backend-agent | US-013, US-014 |
| US-017 | Story | Organiser dashboard of events | 3 | frontend-agent | US-013, US-016 |
| US-021 | Story | Host application and data in an India region | 5 | devops-agent | — |

## Sprint 3: Sprint 3

Enable seat selection, seat locking, and guest contact capture for the booking flow.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-004 | Story | Select exact seats on the layout | 5 | frontend-agent | US-003, US-014 |
| US-005 | Story | Lock seats to prevent double-booking | 8 | backend-agent | US-004 |
| ↳ US-005-T1 | Task | Add seat_lock table with expiry and conflict-safe claim logic | — | backend-agent | — |
| ↳ US-005-T2 | Task | Implement seat lock endpoint | — | backend-agent | — |
| ↳ US-005-T3 | Task | Add expired-lock cleanup | — | backend-agent | — |
| ↳ US-005-T4 | Task | Show lock state and hold countdown on the seat map | — | frontend-agent | — |
| US-006 | Story | Enter contact details as a guest | 3 | frontend-agent | US-005 |
| US-007 | Story | Confirm consent and adult eligibility at booking | 2 | frontend-agent | US-006 |

## Sprint 4: Sprint 4

Complete booking creation with reference and QR-ticket email, booking lookup, and organiser bookings view.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-008 | Story | Complete booking and generate a reference | 8 | backend-agent | US-007, US-005 |
| ↳ US-008-T1 | Task | Implement booking creation transaction | — | backend-agent | — |
| ↳ US-008-T2 | Task | Implement unique booking reference generation | — | backend-agent | — |
| ↳ US-008-T3 | Task | Handle free vs. paid booking paths | — | backend-agent | — |
| ↳ US-008-T4 | Task | Build booking confirmation screen | — | frontend-agent | — |
| US-009 | Story | Receive confirmation email with QR ticket | 5 | integration-agent | US-008 |
| US-010 | Story | Look up a booking by reference and email | 3 | backend-agent | US-008 |
| US-018 | Story | View and search bookings | 3 | backend-agent | US-017, US-008 |

## Sprint 5: Sprint 5

Deliver cancellation, venue QR check-in, and consent withdrawal/data deletion.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-011 | Story | Request cancellation of a booking | 5 | backend-agent | US-010 |
| US-019 | Story | Scan QR ticket to check in attendees | 8 | integration-agent | US-009 |
| ↳ US-019-T1 | Task | Implement check-in validation endpoint | — | backend-agent | — |
| ↳ US-019-T2 | Task | Build browser-based QR scanner check-in page | — | frontend-agent | — |
| ↳ US-019-T3 | Task | Track check-in status on bookings | — | backend-agent | — |
| US-020 | Story | Withdraw consent and request deletion | 5 | security-agent | US-010 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
