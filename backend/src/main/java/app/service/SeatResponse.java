package app.service;

/** One seat as returned to attendees for seat selection. */
public record SeatResponse(String id, String rowLabel, Integer seatNumber, Boolean available) {}
