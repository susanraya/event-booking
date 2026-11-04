package app.service;

import app.model.Event;
import app.model.EventRepository;
import app.model.OrganiserRepository;
import app.security.AuditLogService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 * Organiser event management: list, create draft, and edit event details including pricing/free
 * configuration (US-013-1), plus the public read side (list/detail) that only ever exposes
 * published events.
 */
@Service
public class EventService {

  private static final String PUBLISHED = "published";
  private static final String DRAFT = "draft";

  private final EventRepository eventRepository;
  private final OrganiserRepository organiserRepository;
  private final AuditLogService auditLogService;

  public EventService(
      EventRepository eventRepository,
      OrganiserRepository organiserRepository,
      AuditLogService auditLogService) {
    this.eventRepository = eventRepository;
    this.organiserRepository = organiserRepository;
    this.auditLogService = auditLogService;
  }

  /** AC-043: the signed-in organiser's own events, with status and date/time. */
  public List<EventResponse> listOrganiserEvents(String organiserId) {
    return eventRepository.findByOrganiserId(organiserId).stream().map(this::toResponse).toList();
  }

  /** AC-034, AC-036: creates a draft event; nothing is persisted when validation fails. */
  public EventResponse createEvent(
      String organiserId, CreateEventRequest request, String ipAddress) {
    validateRequired(request.title(), request.startDatetime(), request.venue());

    Event event = new Event();
    event.setId(UUID.randomUUID().toString());
    event.setOrganiser(organiserRepository.getReferenceById(organiserId));
    event.setTitle(request.title());
    event.setDescription(request.description());
    event.setStartDatetime(request.startDatetime());
    event.setVenue(request.venue());
    event.setIsFree(false);
    event.setStatus(DRAFT);
    event.setCreatedAt(LocalDateTime.now());
    eventRepository.save(event);

    auditLogService.record("event_created", "event", event.getId(), organiserId, ipAddress);
    return toResponse(event);
  }

  /** AC-035, AC-039, AC-040, AC-036: edits details, pricing/free flag and status. */
  public EventResponse updateEvent(
      String organiserId, String eventId, UpdateEventRequest request, String ipAddress) {
    Event event =
        eventRepository
            .findById(eventId)
            .filter(e -> e.getOrganiser().getId().equals(organiserId))
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

    validateRequired(request.title(), request.startDatetime(), request.venue());
    boolean free = Boolean.TRUE.equals(request.isFree());
    validatePricing(free, request.priceMinor());

    event.setTitle(request.title());
    event.setDescription(request.description());
    event.setStartDatetime(request.startDatetime());
    event.setVenue(request.venue());
    event.setIsFree(free);
    if (free) {
      event.setPriceMinor(null);
      event.setCurrency(null);
    } else {
      event.setPriceMinor(request.priceMinor());
      event.setCurrency(request.currency());
    }
    if (request.status() != null && !request.status().isBlank()) {
      event.setStatus(request.status());
    }
    eventRepository.save(event);

    auditLogService.record("event_updated", "event", event.getId(), organiserId, ipAddress);
    return toResponse(event);
  }

  /** AC-001, AC-004, AC-005: published events only. */
  public List<EventResponse> listPublishedEvents() {
    return eventRepository.findByStatus(PUBLISHED).stream().map(this::toResponse).toList();
  }

  /** AC-006, AC-008, AC-034: 404 unless the event is published. */
  public EventResponse getPublishedEvent(String id) {
    Event event =
        eventRepository
            .findByIdAndStatus(id, PUBLISHED)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
    return toResponse(event);
  }

  private void validateRequired(String title, LocalDateTime startDatetime, String venue) {
    if (title == null || title.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title is required");
    }
    if (startDatetime == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date/time is required");
    }
    if (venue == null || venue.isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Venue is required");
    }
  }

  private void validatePricing(boolean free, Integer priceMinor) {
    if (free && priceMinor != null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A free event cannot have a price");
    }
    if (!free && priceMinor != null && priceMinor < 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Price cannot be negative");
    }
  }

  private EventResponse toResponse(Event event) {
    return new EventResponse(
        event.getId(),
        event.getTitle(),
        event.getDescription(),
        event.getStartDatetime(),
        event.getVenue(),
        event.getIsFree(),
        event.getPriceMinor(),
        event.getCurrency(),
        event.getStatus());
  }
}
