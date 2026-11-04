package app.webapp;

import app.Stubs;
import app.service.CreateEventRequest;
import app.service.EventResponse;
import app.service.EventService;
import app.service.UpdateEventRequest;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handlers for Attendee & Organiser Web App.
 *
 * <p>Responsive SPA for public browsing/search, seat selection, guest booking with consent, booking
 * lookup/cancellation/deletion, on-screen QR ticket, organiser dashboard and the browser-based QR
 * check-in page.
 */
@RestController
public class WebAppController {

  private final EventService eventService;

  public WebAppController(EventService eventService) {
    this.eventService = eventService;
  }

  /** Organiser dashboard listing events with status and date/time (AC-043). */
  @GetMapping("/api/organiser/events")
  public List<EventResponse> getApiOrganiserEvents(Authentication authentication) {
    return eventService.listOrganiserEvents(authentication.getName());
  }

  /** Create a draft event (AC-034, AC-036). */
  @PostMapping("/api/organiser/events")
  public ResponseEntity<EventResponse> postApiOrganiserEvents(
      Authentication authentication,
      @RequestBody CreateEventRequest request,
      HttpServletRequest httpRequest) {
    EventResponse created =
        eventService.createEvent(authentication.getName(), request, httpRequest.getRemoteAddr());
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  /** Edit event details, pricing/free flag, and publish/unpublish (AC-035, AC-039 to AC-042). */
  @PutMapping("/api/organiser/events/{id}")
  public EventResponse putApiOrganiserEventsById(
      Authentication authentication,
      @PathVariable String id,
      @RequestBody UpdateEventRequest request,
      HttpServletRequest httpRequest) {
    return eventService.updateEvent(
        authentication.getName(), id, request, httpRequest.getRemoteAddr());
  }

  /** Define/update seating layout rows and seats (AC-037, AC-038). */
  @PutMapping("/api/organiser/events/{id}/layout")
  public Map<String, String> putApiOrganiserEventsByIdLayout() {
    return Stubs.notImplemented("PUT /api/organiser/events/{id}/layout");
  }

  /** View and search an event's bookings by name, email or reference (AC-045, AC-046). */
  @GetMapping("/api/organiser/events/{id}/bookings")
  public Map<String, String> getApiOrganiserEventsByIdBookings() {
    return Stubs.notImplemented("GET /api/organiser/events/{id}/bookings");
  }
}
