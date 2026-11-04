# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Browse published events | US-001 | 2 | GET /api/events, backend_api, event, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Search events | US-002 | 2 | GET /api/events, backend_api, event, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-003 | EPIC-001 | View event detail page | US-003 | 2 | GET /api/events/{id}, backend_api, event, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-004 | EPIC-002 | Select exact seats on the layout | US-004 | 3 | GET /api/events/{id}/seats, backend_api, database, event, seat, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-005 | EPIC-002 | Lock seats to prevent double-booking | US-005, US-005-T1, US-005-T2, US-005-T3, US-005-T4 | 3 | POST /api/events/{id}/locks, backend_api, database, seat, seat_lock, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-006 | EPIC-002 | Enter contact details as a guest | US-006 | 3 | booking, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-002 | Confirm consent and adult eligibility at booking | US-007 | 3 | booking, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-008 | EPIC-002 | Complete booking and generate a reference | US-008, US-008-T1, US-008-T2, US-008-T3, US-008-T4 | 4 | POST /api/bookings, backend_api, booking, booking_seat, database, seat, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-009 | EPIC-002 | Receive confirmation email with QR ticket | US-009 | 4 | backend_api, booking, email_smtp, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-010 | EPIC-003 | Look up a booking by reference and email | US-010 | 4 | POST /api/bookings/lookup, backend_api, booking, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-011 | EPIC-003 | Request cancellation of a booking | US-011 | 5 | POST /api/bookings/cancel, backend_api, booking, booking_seat, email_smtp, seat, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-012 | EPIC-004 | Organiser sign-in | US-012 | 1 | POST /api/auth/login, backend_api, organiser, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-013 | EPIC-004 | Create and edit events | US-013 | 1 | POST /api/organiser/events, PUT /api/organiser/events/{id}, backend_api, event, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-014 | EPIC-004 | Define seating layout | US-014, US-014-T1, US-014-T2, US-014-T3 | 1 | PUT /api/organiser/events/{id}/layout, backend_api, database, event, seat, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-015 | EPIC-004 | Set pricing or mark event free | US-015 | 1 | PUT /api/organiser/events/{id}, backend_api, event, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-016 | EPIC-004 | Publish and unpublish events | US-016 | 2 | PUT /api/organiser/events/{id}, backend_api, event, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-017 | EPIC-004 | Organiser dashboard of events | US-017 | 2 | GET /api/organiser/events, backend_api, event, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-018 | EPIC-004 | View and search bookings | US-018 | 4 | GET /api/organiser/events/{id}/bookings, backend_api, booking, booking_seat, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-019 | EPIC-005 | Scan QR ticket to check in attendees | US-019, US-019-T1, US-019-T2, US-019-T3 | 5 | POST /api/events/{id}/checkin, backend_api, booking, booking_seat, web_app | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-020 | EPIC-006 | Withdraw consent and request deletion | US-020 | 5 | POST /api/bookings/withdraw-consent, backend_api, booking, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-021 | EPIC-006 | Host application and data in an India region | US-021 | 2 | backend_api, database, email_smtp | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
<!-- sdlc:auto:end matrix -->
