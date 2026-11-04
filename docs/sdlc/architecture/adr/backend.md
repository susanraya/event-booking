<!-- sdlc:auto:start adr -->
# ADR-0002: Use Spring Boot 4.1 for Backend

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- Spring Boot 4.1
- FastAPI
- NestJS

## Decision Outcome

Chosen option: Spring Boot 4.1, because Approved stack. Spring Boot 4.1 hosts the REST API, transactional seat-locking with JPA/row locks, JWT organiser auth, QR generation, email dispatch and audit logging in one deployable, run on ECS Fargate in Mumbai.

## Consequences

JVM footprint is larger than a lightweight runtime, but transactional integrity and mature libraries make conflict-free booking straightforward.
<!-- sdlc:auto:end adr -->