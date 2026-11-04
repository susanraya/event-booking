# Event booking — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
event booking app: events, seats, bookings, confirmation email

**Documentation version:** v1
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 1 entry |
| [Development](development/README.md) | 1 entry |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | not generated yet |
| [API (OpenAPI)](architecture/api/openapi.yaml) | not generated yet |
| [Decisions (ADRs)](architecture/adr/README.md) | 0 decisions |
| [Sprint plan](development/sprint-plan.md) | not generated yet |
| [Developer guide](development/developer-guide.md) | not generated yet |
| [API reference](development/api-reference.md) | 0 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 21 requirements |
| [Changelog](CHANGELOG.md) | 1 version |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- Discrepancy: the AWS rationale text states payments go through Razorpay to meet RBI card-data-residency rules, but the scope section explicitly removes payments and Razorpay from this build. Confirm whether RBI payment-data localisation is now moot (no in-app payment processing) or whether this rationale is stale.
- No rationale given for choice of Spring Boot 4.1 or Angular 22 versions specifically.
- See REQ-TECH-001 for the conflict between the payments-out-of-scope decision and the Razorpay/RBI rationale text attached to the AWS stack choice.
- Age confirmation (AC-018) is a self-declared checkbox per the text given; no mechanism for actual age verification is specified -- flagged for DPDP 'verifiable parental consent for under-18s' topic (see top-level gaps).
- The 'event's cancellation policy' that gates whether cancellation is permitted is referenced but its configuration/definition is not described anywhere in the input.
- No requirement describes a Data Protection Board / affected-individual breach-notification process, or CERT-In's 6-hour cyber-incident reporting -- only the 180-day log-retention NFR is specified.
- No requirement mentions a registered DPDP consent manager, despite the regulation naming consent managers as an accepted consent-capture route.
- The 18+ gate (US-007/EPIC-002) is self-declared, not verified -- confirm this is an accepted substitute for 'verifiable parental consent for under-18s' rather than an open compliance risk.
- No requirement specifies the separate CERT-In obligation to report cyber incidents within 6 hours -- only log retention is covered.

### Architecture

- Architecture phase has not started -- no design artifacts, ADRs, or diagrams available to summarise.
- Key open design questions flagged by requirements (e.g. concrete seat-locking mechanism satisfying NFR-001, data model for seats/bookings/events, DPDP deletion/anonymisation mechanism, consent-withdrawal flow) remain unanswered pending architecture work.

### Development

- Development has not started -- no tickets, code, or implementation notes available.

### Testing

- Testing phase has not started -- no test plans, cases, or results available.
- Critical NFR-001 ('seat can never be sold twice') and the DPDP consent/deletion flows (US-007, US-020) have no recorded verification yet.

### Deployment

- No deployment recorded yet -- cannot confirm the India (Mumbai) hosting requirement (NFR-004) has actually been implemented in practice.

### Maintenance

- No maintenance activity recorded yet -- project has not reached post-deployment.
<!-- sdlc:auto:end open-gaps -->
