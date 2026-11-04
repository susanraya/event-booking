package app.service;

import java.time.LocalDateTime;
import tools.jackson.databind.PropertyNamingStrategies;
import tools.jackson.databind.annotation.JsonNaming;

/**
 * The body of {@code PUT /api/organiser/events/{id}}, in the snake_case the already-built
 * organiser-events screen sends (e.g. {@code is_free}, {@code price_minor}).
 */
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record UpdateEventRequest(
    String title,
    String description,
    LocalDateTime startDatetime,
    String venue,
    Boolean isFree,
    Integer priceMinor,
    String currency,
    String status) {}
