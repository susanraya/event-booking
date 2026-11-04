package app.api;

import app.Stubs;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handlers for API.
 *
 * <p>Endpoints the approved API spec declares without naming a component that owns them.
 *
 * <p>Every handler is a stub returning a placeholder. The shape comes from the approved API spec;
 * the behaviour does not exist yet.
 */
@RestController
public class ApiController {

  private final AuthService authService;

  public ApiController(AuthService authService) {
    this.authService = authService;
  }

  /**
   * List published events with optional keyword search over title and venue (AC-001, AC-004,
   * AC-005).
   */
  @GetMapping("/api/events")
  public Map<String, String> getApiEvents() {
    return Stubs.notImplemented("GET /api/events");
  }

  /** Public event detail incl. price or free; not-available if unpublished (AC-006, AC-008). */
  @GetMapping("/api/events/{id}")
  public Map<String, String> getApiEventsById() {
    return Stubs.notImplemented("GET /api/events/{id}");
  }

  /** Seating layout with per-seat availability (AC-009, AC-011). */
  @GetMapping("/api/events/{id}/seats")
  public Map<String, String> getApiEventsByIdSeats() {
    return Stubs.notImplemented("GET /api/events/{id}/seats");
  }

  /**
   * Lock selected seats for checkout, returns a hold token and expiry; conflict if any seat already
   * taken (AC-012, AC-013).
   */
  @PostMapping("/api/events/{id}/locks")
  public Map<String, String> postApiEventsByIdLocks() {
    return Stubs.notImplemented("POST /api/events/{id}/locks");
  }

  /** Organiser sign-in; generic error on failure (AC-031, AC-032, NFR-009). */
  @PostMapping("/api/auth/login")
  public LoginResponse postApiAuthLogin(
      @Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
    return authService.login(request, httpRequest.getRemoteAddr());
  }

  /**
   * Validate a scanned QR token and check in once; warns if used, invalid, cancelled or wrong event
   * (AC-047 to AC-050).
   */
  @PostMapping("/api/events/{id}/checkin")
  public Map<String, String> postApiEventsByIdCheckin() {
    return Stubs.notImplemented("POST /api/events/{id}/checkin");
  }
}
