package app.service;

import java.time.LocalDateTime;

/** The body of {@code PUT /api/organiser/events/{id}}. */
public record UpdateEventRequest(
    String title,
    String description,
    LocalDateTime startDatetime,
    String venue,
    Boolean isFree,
    Integer priceMinor,
    String currency,
    String status) {}
