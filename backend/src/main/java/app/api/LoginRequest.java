package app.api;

import jakarta.validation.constraints.NotBlank;

/** The body of {@code POST /api/auth/login}. */
public record LoginRequest(@NotBlank String email, @NotBlank String password) {}
