# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| POST | /api/auth/login | postApiAuthLogin | `backend/src/main/java/app/api/ApiController.java:72` | Organiser sign-in; generic error on failure (AC-031, AC-032, NFR-009). |
| GET | /api/events | getApiEvents | `backend/src/main/java/app/api/ApiController.java:45` | List published events with optional keyword search over title and venue (AC-001, AC-004, |
| GET | /api/events/{id} | getApiEventsById | `backend/src/main/java/app/api/ApiController.java:51` | Public event detail incl. price or free; not-available if unpublished (AC-006, AC-008). |
| POST | /api/events/{id}/checkin | postApiEventsByIdCheckin | `backend/src/main/java/app/api/ApiController.java:82` | Validate a scanned QR token and check in once; warns if used, invalid, cancelled or wrong event |
| POST | /api/events/{id}/locks | postApiEventsByIdLocks | `backend/src/main/java/app/api/ApiController.java:66` | Lock selected seats for checkout, returns a hold token and expiry; conflict if any seat already |
| GET | /api/events/{id}/seats | getApiEventsByIdSeats | `backend/src/main/java/app/api/ApiController.java:57` | Seating layout with per-seat availability (AC-009, AC-011). |
| GET | /api/organiser/events | getApiOrganiserEvents | `backend/src/main/java/app/webapp/WebAppController.java:43` | Organiser dashboard listing events with status and date/time (AC-043). |
| POST | /api/organiser/events | postApiOrganiserEvents | `backend/src/main/java/app/webapp/WebAppController.java:49` | Create a draft event (AC-034, AC-036). |
| PUT | /api/organiser/events/{id} | putApiOrganiserEventsById | `backend/src/main/java/app/webapp/WebAppController.java:60` | Edit event details, pricing/free flag, and publish/unpublish (AC-035, AC-039 to AC-042). |
| GET | /api/organiser/events/{id}/bookings | getApiOrganiserEventsByIdBookings | `backend/src/main/java/app/webapp/WebAppController.java:82` | View and search an event's bookings by name, email or reference (AC-045, AC-046). |
| PUT | /api/organiser/events/{id}/layout | putApiOrganiserEventsByIdLayout | `backend/src/main/java/app/webapp/WebAppController.java:71` | Define/update seating layout rows and seats (AC-037, AC-038). |
| GET | /health | health | `backend/src/main/java/app/HealthController.java:11` | — |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Designed but missing:**

- POST /api/bookings
- POST /api/bookings/cancel
- POST /api/bookings/lookup
- POST /api/bookings/withdraw-consent
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `fba98a5`
<!-- sdlc:auto:end source -->
