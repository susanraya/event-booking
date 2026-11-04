package app.service;

import java.time.LocalDateTime;

/** The event shape returned to both organisers and the public API. */
public record EventResponse(
    String id,
    String title,
    String description,
    LocalDateTime startDatetime,
    String venue,
    Boolean isFree,
    Integer priceMinor,
    String currency,
    String status) {}
