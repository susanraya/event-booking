package app.api;

/** The organiser identity returned alongside a sign-in token. */
public record OrganiserSummary(String id, String email, String name) {}
