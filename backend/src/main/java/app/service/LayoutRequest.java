package app.service;

import java.util.List;

/** The body of {@code PUT /api/organiser/events/{id}/layout}. */
public record LayoutRequest(List<LayoutRowRequest> rows) {}
