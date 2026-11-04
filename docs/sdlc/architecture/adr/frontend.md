<!-- sdlc:auto:start adr -->
# ADR-0001: Use Angular 22 for Frontend

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- Angular 22
- React
- Vue

## Decision Outcome

Chosen option: Angular 22, because Approved stack. Angular 22 builds the responsive attendee and organiser SPA plus the browser-based QR check-in page, deployed as static assets via CloudFront/S3 in Mumbai; its forms and validation cover the clear-message guest booking flow (NFR-003, NFR-010).

## Consequences

Angular's structure is heavier than a minimal SPA for a small app, but it gives consistent routing, forms and guards for the organiser area out of the box.
<!-- sdlc:auto:end adr -->