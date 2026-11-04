package app.service;

import java.time.LocalDateTime;
import tools.jackson.databind.PropertyNamingStrategies;
import tools.jackson.databind.annotation.JsonNaming;

/**
 * The event shape returned to both organisers and the public API, in the snake_case the approved
 * API spec (docs/sdlc/architecture/api/openapi.yaml, schema `event`) and the already-built
 * organiser-events screen both expect (e.g. {@code start_datetime}, {@code is_free}).
 */
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record EventResponse(
    String id,
    String title,
    String description,
    LocalDateTime startDatetime,
    String venue,
    Boolean isFree,
    Integer priceMinor,
    String currency,
    String status,
    Integer seatsAvailable) {}
