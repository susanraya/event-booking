package app.service;

/** One row within a {@code PUT /api/organiser/events/{id}/layout} request. */
public record LayoutRowRequest(String label, Integer seatCount, Integer priceMinor) {}
