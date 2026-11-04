package app.service;

import tools.jackson.databind.PropertyNamingStrategies;
import tools.jackson.databind.annotation.JsonNaming;

/**
 * One seat as returned to attendees for seat selection, in the snake_case the approved API spec
 * (schema `seat`) and the already-built screens both expect ({@code row_label}, {@code
 * seat_number}). {@code status} carries the seat table's own status string ({@code available},
 * {@code held}, {@code booked}, ...), as the already-built event-detail screen reads it (filtering
 * on {@code status === 'available'}), not a boolean.
 */
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SeatResponse(String id, String rowLabel, Integer seatNumber, String status) {}
