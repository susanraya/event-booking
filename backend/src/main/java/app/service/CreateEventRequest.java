package app.service;

import java.time.LocalDateTime;
import tools.jackson.databind.PropertyNamingStrategies;
import tools.jackson.databind.annotation.JsonNaming;

/**
 * The body of {@code POST /api/organiser/events}, in the snake_case the already-built
 * organiser-events screen sends (e.g. {@code start_datetime}).
 */
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record CreateEventRequest(
    String title, String description, LocalDateTime startDatetime, String venue) {}
