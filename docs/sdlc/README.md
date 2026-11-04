# Event booking — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
event booking app: events, seats, bookings, confirmation email

**Documentation version:** v3
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 9 entries |
| [Development](development/README.md) | 33 entries |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 5 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 21 requirements |
| [Changelog](CHANGELOG.md) | 3 versions |
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

- Full NFR/AC catalogue is not included in this input -- only the IDs cited inline (e.g. NFR-001, NFR-003/004/005/008/009/010, AC-001 to AC-052) are known; their full text is not available to this documentation phase.
- No explicit statement of how 'paid-but-settled-offline' payment status is tracked or reconciled beyond being mentioned once -- payment settlement workflow is unclear.
- The mechanism that actually expires abandoned locks (scheduled job, lazy check-on-read, DB TTL, etc.) is not specified.
- No explicit field or mechanism on audit_log (or elsewhere) documents how/when the 180-day retention is enforced (e.g. scheduled purge job) -- the retention policy is stated at the summary level only.
- Rationale given for each stack choice is high-level (feature fit, compliance fit) -- no cost, performance-benchmark, or team-skill comparison against the named alternatives is included in this input.

### Development

- No execution/completion status (code, PRs, test results) reported for any backlog item -- this entry documents the plan only.
- No approval metadata (approver, date) was provided for the plan.
- Item-to-sprint assignment is inferred from the goal description text; the plan input did not explicitly list item IDs per sprint.
- No status reported on whether Sprint 1 work was started, completed, or carried over.
- Item-to-sprint assignment inferred from goal text, not explicit in input.
- No completion/progress status reported.
- US-021 (India hosting) is the only DPDP-epic item not in this sprint -- it was matched to Sprint 2 instead; confirm this split is correct.
- Epic has no assigned role/owner.
- No implementation status reported.
- Epic name references DPDP (India's data protection law); no explicit compliance/regulation checklist was supplied in this input to confirm full coverage -- recommend a dedicated compliance review beyond US-020/US-021.
- No implementation status, code, or test evidence reported.
- No implementation status, code, or test evidence reported for the story or any of its 4 tasks.
- No implementation status, code, or test evidence reported for the story or any of its 3 tasks.
- No explicit DPDP regulation checklist supplied in this input to confirm this story's scope fully satisfies consent-withdrawal obligations.
- No implementation status, code, or infrastructure evidence reported.
- No explicit DPDP data-residency checklist supplied in this input to confirm full regulatory coverage.

### Testing

- Testing phase has not started -- no test plans, cases, or results available.
- Critical NFR-001 ('seat can never be sold twice') and the DPDP consent/deletion flows (US-007, US-020) have no recorded verification yet.

### Deployment

- No deployment recorded yet -- cannot confirm the India (Mumbai) hosting requirement (NFR-004) has actually been implemented in practice.

### Maintenance

- No maintenance activity recorded yet -- project has not reached post-deployment.
<!-- sdlc:auto:end open-gaps -->
