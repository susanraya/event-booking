package app.service;

import java.time.LocalDateTime;

/** The body of {@code POST /api/organiser/events}. */
public record CreateEventRequest(
    String title, String description, LocalDateTime startDatetime, String venue) {}
