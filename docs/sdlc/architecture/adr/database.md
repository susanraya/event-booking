<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- MongoDB

## Decision Outcome

Chosen option: PostgreSQL 16, because Approved stack. PostgreSQL 16 holds seats, locks, bookings and payment status together and enforces seat-once-only via a unique constraint plus SELECT ... FOR UPDATE (NFR-001); its full-text/ILIKE search covers the handful of events with no extra search service, and it is the single India-hosted store for DPDP deletion.

## Consequences

A single instance is a scaling ceiling, but NFR-002 explicitly targets small volumes where this never binds.
<!-- sdlc:auto:end adr -->