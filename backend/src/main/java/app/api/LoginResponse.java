package app.api;

/** The body of a successful {@code POST /api/auth/login}. */
public record LoginResponse(String token, OrganiserSummary organiser) {}
