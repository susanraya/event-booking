# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN · approved · source: plan:v1

Approved 5-sprint plan (20-point capacity each) sequencing organiser setup, public discovery/hosting, seat selection/locking, booking completion, and cancellation/check-in/DPDP rights.

Sprint 1: organiser sign-in, event creation/editing, pricing, seating-layout definition. Sprint 2: India-region hosting, publish/unpublish, organiser dashboard, public browsing/search/detail. Sprint 3: seat selection, seat locking, guest contact capture. Sprint 4: booking creation with reference and QR-ticket email, booking lookup, organiser bookings view. Sprint 5: cancellation, venue QR check-in, consent withdrawal/data deletion.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006

- ⚠ Backlog items in the plan input are not explicitly tagged to a sprint; any sprint-to-story mapping elsewhere in this documentation is inferred from the goal text, not an explicit field.

### DEV-EPIC-001 · draft · source: plan:EPIC-001

Backlog for public event discovery: browse (3 pts), search (2 pts), detail page (3 pts), all frontend-agent, inferred to Sprint 2.

US-001 (3 pts, frontend-agent), US-002 (2 pts, frontend-agent), US-003 (3 pts, frontend-agent). No sub-tasks listed.

**Related:** US-001, US-002, US-003

- ⚠ No delivery ticket recorded for US-001, US-002 or US-003 despite the development run being marked 'completed'.

### DEV-EPIC-002 · draft · source: plan:EPIC-002

Backlog for seat selection and booking: seat selection (5 pts), seat locking (8 pts, 4 sub-tasks), contact details (3 pts), consent/age (2 pts), booking completion (8 pts, 4 sub-tasks), confirmation email/QR (5 pts, integration-agent); inferred to Sprints 3-4.

US-004 (5 pts, frontend-agent). US-005 (8 pts, backend-agent) with tasks: seat_lock table+expiry/conflict-safe claim logic; seat lock endpoint; expired-lock cleanup; lock state/hold countdown UI. US-006 (3 pts, frontend-agent). US-007 (2 pts, frontend-agent). US-008 (8 pts, backend-agent) with tasks: booking creation transaction; unique reference generation; free vs paid path handling; booking confirmation screen. US-009 (5 pts, integration-agent).

**Related:** US-004, US-005, US-006, US-007, US-008, US-009

- ⚠ No delivery tickets recorded for any of US-004 through US-009 despite the development run being marked 'completed'.

### DEV-EPIC-003 · draft · source: plan:EPIC-003

Backlog for booking lookup (3 pts) and cancellation (5 pts), both backend-agent, inferred to Sprints 4-5.

US-010 (3 pts, backend-agent). US-011 (5 pts, backend-agent). No sub-tasks listed.

**Related:** US-010, US-011

- ⚠ No delivery tickets recorded for US-010 or US-011 despite the development run being marked 'completed'.

### DEV-EPIC-004 · draft · source: plan:EPIC-004

Backlog for organiser access and management: sign-in (5 pts, security-agent), create/edit events (5 pts), seating layout (8 pts, 3 sub-tasks), pricing (2 pts), publish/unpublish (3 pts), dashboard (3 pts, frontend-agent), bookings view/search (3 pts); inferred to Sprints 1-2.

US-012 (5 pts, security-agent) -- delivered, see DEV-TICKET-US-012. US-013 (5 pts, backend-agent) -- delivered, see DEV-TICKET-US-013. US-014 (8 pts, backend-agent) with tasks: seat data model/bulk-insert logic; layout save endpoint with uniqueness validation; seating-layout editor UI -- delivered, see DEV-TICKET-US-014. US-015 (2 pts, backend-agent) -- delivered, see DEV-TICKET-US-015. US-016 (3 pts, backend-agent), US-017 (3 pts, frontend-agent), US-018 (3 pts, backend-agent) -- no delivery ticket recorded.

**Related:** US-012, US-013, US-014, US-015, US-016, US-017, US-018

- ⚠ US-016, US-017 and US-018 have no recorded delivery ticket despite the development run being marked 'completed', even though sibling stories in the same epic (US-012-015) were delivered.

### DEV-EPIC-005 · draft · source: plan:EPIC-005

Backlog for venue QR check-in (8 pts, integration-agent, 3 sub-tasks), inferred to Sprint 5.

US-019 (8 pts, integration-agent) with tasks: check-in validation endpoint (backend-agent); browser-based QR scanner check-in page (frontend-agent); track check-in status on bookings (backend-agent).

**Related:** US-019

- ⚠ No delivery ticket recorded for US-019 despite the development run being marked 'completed'.

### DEV-EPIC-006 · draft · source: plan:EPIC-006

Backlog for DPDP compliance: consent withdrawal/deletion (5 pts, security-agent) and India-region hosting (5 pts, devops-agent); inferred to Sprints 5 and 2 respectively.

US-020 (5 pts, security-agent). US-021 (5 pts, devops-agent). No sub-tasks listed.

**Related:** US-020, US-021

- ⚠ No delivery ticket recorded for US-020 or US-021 despite the development run being marked 'completed' -- India hosting in particular is foundational and its unconfirmed delivery is a notable risk.

### DEV-TICKET-US-012 · approved · source: dev:US-012

Organiser sign-in delivered.

Ticket US-012 (Organiser sign-in): status=delivered, commit=9ba85955e031c492f153572caaf49606e82a64ec.

**Related:** US-012, REQ-EPIC-004

### DEV-TICKET-US-013 · approved · source: dev:US-013

Create and edit events delivered.

Ticket US-013 (Create and edit events): status=delivered, commit=38b985603dd867565fda5be7061ac70789930902.

**Related:** US-013, REQ-EPIC-004

### DEV-TICKET-US-014 · approved · source: dev:US-014

Define seating layout delivered.

Ticket US-014 (Define seating layout): status=delivered, commit=38b985603dd867565fda5be7061ac70789930902 (same commit as US-013).

**Related:** US-014, REQ-EPIC-004

### DEV-TICKET-US-015 · approved · source: dev:US-015

Set pricing or mark event free delivered.

Ticket US-015 (Set pricing or mark event free): status=delivered, commit=38b985603dd867565fda5be7061ac70789930902 (same commit as US-013/US-014).

**Related:** US-015, REQ-EPIC-004
<!-- sdlc:auto:end narrative -->
