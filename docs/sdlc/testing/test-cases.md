# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
41 tests · Passed 32 · Failed 0 · Skipped 0 · Not run 9

Acceptance criteria covered: 10/54 · passing: 0/54
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-012: Organiser sign-in

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-033 | organiserAuthGuard > [AC-033] lets an authenticated organiser reach the guarded route | Unit | Passed | `frontend/src/lib/organiser-auth.guard.spec.ts` |
| AC-033 | organiserAuthGuard > [AC-033] redirects an unauthenticated visitor to sign-in and never renders the guarded screen | Unit | Passed | `frontend/src/lib/organiser-auth.guard.spec.ts` |
| AC-031 | Organiser sign-in > [AC-031] submits email and password to POST /api/auth/login, stores the JWT and navigates to the dashboard | Unit | Passed | `frontend/src/screens/organiser-sign-in.component.spec.ts` |
| AC-032 | Organiser sign-in > [AC-032] a failed sign-in shows only the server's single generic error message | Unit | Passed | `frontend/src/screens/organiser-sign-in.component.spec.ts` |
| — | Organiser sign-in > no seeded or sample credential data remains in the sign-in screen | Unit | Passed | `frontend/src/screens/organiser-sign-in.component.spec.ts` |
| — | testAc001ValidTokenIsAcceptedByOrganiserEndpoint | Integration | Passed | `backend/src/test/java/app/api/AuthLoginIT.java` |
| — | testAc031CorrectCredentialsReturnTokenAndOrganiser | Integration | Passed | `backend/src/test/java/app/api/AuthLoginIT.java` |
| — | testAc032WrongEmailReturnsSameGenericMessage | Integration | Passed | `backend/src/test/java/app/api/AuthLoginIT.java` |
| — | testAc032WrongPasswordReturnsGenericMessage | Integration | Passed | `backend/src/test/java/app/api/AuthLoginIT.java` |
| — | testAc033CheckinEndpointWithoutTokenIsRejected | Integration | Passed | `backend/src/test/java/app/api/AuthLoginIT.java` |
| — | testAc033OrganiserEndpointWithoutTokenIsRejected | Integration | Passed | `backend/src/test/java/app/api/AuthLoginIT.java` |
| — | testNfr005LoginWritesAuditLogRowsForSuccessAndFailure | Integration | Passed | `backend/src/test/java/app/api/AuthLoginIT.java` |
| AC-031 | [AC-031] signs in with valid credentials and lands on the organiser dashboard | E2E | Not run yet | `frontend/e2e/organiser-sign-in.spec.ts` |
| AC-032 | [AC-032] shows a generic error for bad credentials with no field-level disclosure | E2E | Not run yet | `frontend/e2e/organiser-sign-in.spec.ts` |
| AC-033 | [AC-033] redirects a signed-out visit to an organiser URL to sign-in with no protected content | E2E | Not run yet | `frontend/e2e/organiser-sign-in.spec.ts` |

### US-013: Create and edit events

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-039 | Event detail — price and free display > [AC-039] renders the ticket price from the API in the detail heading | Unit | Passed | `frontend/src/screens/event-detail.component.spec.ts` |
| AC-040 | Event detail — price and free display > [AC-040] renders Free when the API marks the event isFree | Unit | Passed | `frontend/src/screens/event-detail.component.spec.ts` |
| AC-034 | Organiser events screen > [AC-034] create form posts to POST /api/organiser/events and the new event appears as a draft | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| AC-034 | Organiser events screen > [AC-034] loads from GET /api/organiser/events and renders title, status and date/time with no sample data | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| AC-035 | Organiser events screen > [AC-035] edit form loads an existing event and saves via PUT, updating the list | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| AC-036 | Organiser events screen > [AC-036] submitting with an empty title blocks the save and shows the server's message beside the field | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| AC-039, AC-040 | Organiser events screen > [AC-039, AC-040] the free toggle clears the price and saves isFree | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| — | Organiser events screen > a 401 on load returns the organiser to sign-in and clears the token | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| AC-037 | Organiser events screen — seating layout editor (US-014-2) > [AC-037] adding and removing rows updates the live seat-count summary | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| AC-037 | Organiser events screen — seating layout editor (US-014-2) > [AC-037] each seat shows its row label and seat number | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| AC-037 | Organiser events screen — seating layout editor (US-014-2) > [AC-037] saving posts the layout via PUT, and the saved layout reloads from GET seats | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| AC-038 | Organiser events screen — seating layout editor (US-014-2) > [AC-038, NFR-002] a layout of several hundred seats renders without error | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| — | Organiser events screen — seating layout editor (US-014-2) > blocks adding a row with a duplicate row label | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| — | Organiser events screen — seating layout editor (US-014-2) > blocks adding a row with zero seats | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| — | Organiser events screen — seating layout editor (US-014-2) > blocks saving a layout with zero rows | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| — | Organiser events screen — seating layout editor (US-014-2) > shows the server's validation message when saving the layout is rejected | Unit | Passed | `frontend/src/screens/organiser-events.component.spec.ts` |
| AC-034, AC-035 | [AC-034] creates a draft event that is absent from public browsing, then [AC-035] edits it and sees the new details on the public page | E2E | Not run yet | `frontend/e2e/organiser-event-management.spec.ts` |
| AC-036 | [AC-036] blocks creating or saving an event with an empty title, with a visible message, and persists nothing | E2E | Not run yet | `frontend/e2e/organiser-event-management.spec.ts` |
| AC-037 | [AC-037] defines a multi-row layout and the seats appear for attendee selection | E2E | Not run yet | `frontend/e2e/organiser-event-management.spec.ts` |
| AC-038 | [AC-038] each seat in a large layout is uniquely identifiable by row and seat number | E2E | Not run yet | `frontend/e2e/organiser-event-management.spec.ts` |
| AC-039, AC-040 | [AC-039] setting a price shows it on the event detail and booking flow, and [AC-040] marking free shows the event as free | E2E | Not run yet | `frontend/e2e/organiser-event-management.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | dropsTheDriverPartThePlatformWrites | Unit | Passed | `backend/src/test/java/app/DatabaseUrlEnvironmentPostProcessorTest.java` |
| — | runsInMemoryWithNoDatabaseSet | Unit | Passed | `backend/src/test/java/app/DatabaseUrlEnvironmentPostProcessorTest.java` |
| — | reportsOk | Unit | Passed | `backend/src/test/java/app/HealthControllerTest.java` |
| — | App > renders a screen inside the app shell and shows its menu | Unit | Passed | `frontend/src/app.component.spec.ts` |
| — | the app loads | E2E | Not run yet | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
