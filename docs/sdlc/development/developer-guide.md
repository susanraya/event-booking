# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `eb57ee9` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
Event booking is a two-part generated application: an Angular 22 (Vite/Analog) frontend containing the approved, reviewed screens (currently running on seeded sample data) and a Spring Boot 4.1 (Java 21, Maven) backend that exposes the approved API shape. Most backend endpoints are still stubs (returning 'not implemented' placeholders) except for health, organiser login, and the event/seat read and organiser event/layout write paths, which are wired to JPA repositories backed by PostgreSQL (with Flyway migrations and an H2 fallback when no database is configured).
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for npm/Vite/Angular 22 tooling)
- Java 21
- Maven (invoked via the bundled ./mvnw wrapper, no separate install needed)
- Docker and Docker Compose (to run the PostgreSQL 16 database)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. git clone the repository and cd into it
2. Copy .env.example to .env and fill in values it defines
3. docker-compose up -d (starts the Postgres 16 db service on port 5432)
4. cd frontend && npm install
5. cd backend && sh mvnw dependency:go-offline (optional pre-fetch of Maven dependencies)
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `cd frontend && npm run dev` | Starts the Vite/Analog dev server for the Angular app |
| frontend build | `cd frontend && npm run build` | Compiles Angular components ahead-of-time and bundles the app |
| frontend preview | `cd frontend && npm run preview` | Serves the production build locally |
| backend run | `cd backend && sh mvnw spring-boot:run` | Starts the Spring Boot API on PORT 8000 (default), using DATABASE_URL if set or falling back to H2 |
| db up | `docker-compose up -d` | Starts the PostgreSQL 16 database container used by the backend |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend/` | Angular 22 SPA (Vite/Analog) with the approved, seeded-data screens |
| `frontend/src/screens` | One component per approved screen (events, event detail, my booking, organiser sign-in/events, check-in) |
| `frontend/src/lib` | Shared app code: API client (api.ts), auth helpers, navigation, UI directives/icons, brand tokens, screen base class |
| `frontend/e2e` | Playwright acceptance tests |
| `backend/` | Spring Boot 4.1 (Java 21) API service, built with Maven |
| `backend/src/main/java/app` | Application entry point, health controller, web config, shared Stubs helper for not-yet-implemented endpoints |
| `backend/src/main/java/app/api` | Public API controller, auth service/DTOs (login) |
| `backend/src/main/java/app/webapp` | Organiser/attendee web app controller (organiser events, layout) |
| `backend/src/main/java/app/model` | JPA entities and Spring Data repositories (Event, Seat, Organiser, BookingSeat, AuditLog) |
| `backend/src/main/java/app/service` | Business logic and request/response DTOs for events, layouts, and seats |
| `backend/src/main/java/app/security` | JWT issuance/validation, security config, audit logging |
| `backend/src/main/resources` | application.properties and Flyway migration scripts (db/migration) |
| `.quorq/` | Platform metadata (handoff.json) from the Quorq AI SDLC generator |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend endpoints not yet implemented return a placeholder via app.Stubs.notImplemented(...) until real logic is added
- Frontend screens live one-per-file in src/screens, each paired with an x.component.spec.ts test beside it
- Screens extend/use src/lib/screen-base.ts for shared navigate and brand helpers
- API calls go through the single apiFetch helper in src/lib/api.ts, which attaches a Bearer token (organiser JWT or shared API secret) and normalizes error handling via ApiError
- Backend REST routes are grouped by audience: /api/events & /api/auth (public), /api/organiser/* (authenticated organiser actions)
- JPA repositories follow Spring Data naming conventions (e.g. findByOrganiserId, findByEventIdOrderByRowLabelAscSeatNumberAsc)
- Database schema managed by a combination of Hibernate ddl-auto=update and additive Flyway migrations (db/migration/V*.sql)
- Java code formatted/enforced via Spotless (Google Java Format) and Checkstyle (checkstyle.xml)
- Frontend code formatted/linted via Prettier and ESLint
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `cd frontend && npm test` | Runs Vitest component tests (TestBed) colocated with components |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint across the frontend app |
| frontend e2e install | `cd frontend && npm run test:e2e:install` | Installs the Chromium browser Playwright needs |
| frontend e2e tests | `cd frontend && npm run test:e2e` | Runs Playwright acceptance tests from e2e/, building/serving the app locally unless E2E_BASE_URL is set |
| backend tests | `cd backend && sh mvnw test` | Runs JUnit *Test/*Tests/*IT classes via Surefire, with JaCoCo coverage instrumentation |
| backend style checks | `cd backend && sh mvnw checkstyle:check spotless:check` | Verifies Java code against Checkstyle rules and Spotless formatting |
| backend format | `cd backend && sh mvnw spotless:apply` | Auto-formats Java source to satisfy Spotless |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Backend fails to connect to a database | Run docker-compose up -d to start the Postgres 16 service, or leave DATABASE_URL unset so the app falls back to its in-memory H2 database |
| Frontend API calls fail or hit the wrong backend | Set VITE_API_BASE_URL to the backend's URL (defaults to http://localhost:8000); ensure the backend is running |
| Organiser-authenticated requests return 401/403 | Sign in via POST /api/auth/login to obtain a JWT, or set VITE_API_SECRET_KEY matching the backend's app.jwt.secret/JWT_SECRET_KEY for shared-secret calls |
| Playwright e2e tests fail to start | Run npm run test:e2e:install first to fetch the Chromium browser; without E2E_BASE_URL the suite builds and boots both backend (mvn package + java -jar) and frontend (vite build + preview) itself, which can take up to 180s |
| Calling an endpoint returns a generic placeholder response | That route (e.g. seat locks, check-in, organiser bookings search) is still a stub per app.Stubs.notImplemented; no real behavior exists yet |
<!-- sdlc:auto:end troubleshooting -->
