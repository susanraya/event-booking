# Event booking — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
event booking app: events, seats, bookings, confirmation email

**Documentation version:** v2
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 14 entries |
| [Development](development/README.md) | 13 entries |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 5 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 12 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 73 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 21 requirements |
| [Changelog](CHANGELOG.md) | 2 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- No verification mechanism for the declared age is described -- the 18+ check appears to be a self-asserted confirmation, not a verified control.
- Significant Data Fiduciary duties (India-based DPO, audits, DPIA) are not addressed; unclear whether this project would be classified as a Significant Data Fiduciary.
- DPDP breach-notification duties (Data Protection Board + affected-person notice) are not addressed by this epic or any other requirement.
- CERT-In also requires reporting cyber incidents within 6 hours; only the 180-day log-retention half of the CERT-In direction is covered here.
- Discrepancy: the Cloud/AWS rationale text states 'your payments go through Razorpay to meet RBI's rule that card data stays in the country', but Payments/Razorpay is explicitly listed as out of scope and is absent from the architecture -- this RBI payment-data rationale no longer applies and should be reconciled or removed from the stack rationale.
- Accessibility (RPwD Act 2016 / GIGW-WCAG), Consumer Protection Act 2019 / E-Commerce Rules 2020, and IT Act 2000 / Intermediary Rules 2021 obligations are not mentioned anywhere in the scope or capabilities.

### Architecture

- No deployment phase input exists yet confirming these nodes have actually been provisioned -- architecture specifies them as design intent only.

### Development

- Plan input does not explicitly state which sprint each backlog item belongs to; sprint-item groupings in the per-sprint entries below are inferred from each sprint's goal description, not an explicit mapping field.
- US-007 (Confirm consent and adult eligibility at booking) is not clearly referenced by any sprint's goal text, so its planned sprint is unknown.
- Item-to-sprint assignment inferred from goal text, not explicitly stated in the plan input.
- US-007 (consent and adult-eligibility confirmation) is part of the same booking flow but is not named in this sprint's goal; its sprint placement is unclear.
- Reason for skipping India-region hosting is not provided.
- No alternative timeline or follow-up plan for this DPDP-relevant data-residency requirement is recorded.
- Discrepancy: run status says 'completed' while 15 of 21 planned stories (and all associated subtasks) have no delivery, in-progress, or skipped status recorded -- it is unclear whether this work was actually completed and simply not reported, or not started.
- Seat locking, booking creation/confirmation email, booking lookup/cancellation, organiser sign-in/event/pricing/layout management, bookings view, and venue check-in -- the core booking and organiser functionality -- have no confirmed build status in this input.

### Testing

- No ticket or story is associated with this run, so it cannot be traced to any specific acceptance criteria.
- No test plan, test type (unit/integration/E2E/security), or environment is documented.
- The 50 acceptance criteria across the 21 stories (and the 10 NFRs) have no individually recorded test evidence in the input.

### Deployment

- No deployment has occurred or been recorded; cannot confirm the AWS Mumbai infrastructure described in architecture (CloudFront/S3, ECS Fargate, RDS, SES, CloudWatch) has actually been provisioned.

### Maintenance

- No maintenance phase has started; there is no incident-response, monitoring, or support process documented, including none for the CERT-In 6-hour cyber-incident reporting duty.
<!-- sdlc:auto:end open-gaps -->
