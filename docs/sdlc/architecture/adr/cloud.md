<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because Approved stack. The full AWS Mumbai (ap-south-1) region hosts the app, RDS personal-data store and Amazon SES SMTP email inside India as the DPDP consent notice promises, and CloudWatch retains activity logs for 180 days for CERT-In (NFR-004, NFR-005).

## Consequences

Region lock-in to ap-south-1 is intentional and required for residency; it limits multi-region failover, which is acceptable at this scale.
<!-- sdlc:auto:end adr -->