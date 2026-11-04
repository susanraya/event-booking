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
| [Architecture](architecture/README.md) | 14 entries |
| [Development](development/README.md) | 11 entries |
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
| [Tests](testing/test-cases.md) | 41 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 21 requirements |
| [Changelog](CHANGELOG.md) | 1 version |
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

- Backlog items in the plan input are not explicitly tagged to a sprint; any sprint-to-story mapping elsewhere in this documentation is inferred from the goal text, not an explicit field.
- No delivery ticket recorded for US-001, US-002 or US-003 despite the development run being marked 'completed'.
- No delivery tickets recorded for any of US-004 through US-009 despite the development run being marked 'completed'.
- No delivery tickets recorded for US-010 or US-011 despite the development run being marked 'completed'.
- US-016, US-017 and US-018 have no recorded delivery ticket despite the development run being marked 'completed', even though sibling stories in the same epic (US-012-015) were delivered.
- No delivery ticket recorded for US-019 despite the development run being marked 'completed'.
- No delivery ticket recorded for US-020 or US-021 despite the development run being marked 'completed' -- India hosting in particular is foundational and its unconfirmed delivery is a notable risk.

### Testing

- No ticket or story is associated with this run, so it cannot be traced to any specific acceptance criteria.
- No test plan, test type (unit/integration/E2E/security), or environment is documented.
- The 50 acceptance criteria across the 21 stories (and the 10 NFRs) have no individually recorded test evidence in the input.

### Deployment

- No deployment has occurred or been recorded; cannot confirm the AWS Mumbai infrastructure described in architecture (CloudFront/S3, ECS Fargate, RDS, SES, CloudWatch) has actually been provisioned.

### Maintenance

- No maintenance phase has started; there is no incident-response, monitoring, or support process documented, including none for the CERT-In 6-hour cyber-incident reporting duty.
<!-- sdlc:auto:end open-gaps -->
