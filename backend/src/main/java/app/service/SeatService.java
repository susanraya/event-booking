package app.service;

import app.model.BookingSeatRepository;
import app.model.Event;
import app.model.EventRepository;
import app.model.Seat;
import app.model.SeatRepository;
import app.security.AuditLogService;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 * Seating layout definition (US-014-1): organiser-defined rows and seats, persisted so attendees
 * can select from them (AC-037, AC-038).
 */
@Service
public class SeatService {

  private static final String AVAILABLE = "available";

  private final SeatRepository seatRepository;
  private final EventRepository eventRepository;
  private final BookingSeatRepository bookingSeatRepository;
  private final AuditLogService auditLogService;

  public SeatService(
      SeatRepository seatRepository,
      EventRepository eventRepository,
      BookingSeatRepository bookingSeatRepository,
      AuditLogService auditLogService) {
    this.seatRepository = seatRepository;
    this.eventRepository = eventRepository;
    this.bookingSeatRepository = bookingSeatRepository;
    this.auditLogService = auditLogService;
  }

  /**
   * Replaces an event's seating layout with freshly generated, uniquely addressable seats (AC-037,
   * AC-038); refuses when bookings already exist so they are never orphaned (NFR-010).
   */
  public LayoutResponse saveLayout(
      String organiserId, String eventId, LayoutRequest request, String ipAddress) {
    Event event =
        eventRepository
            .findById(eventId)
            .filter(e -> e.getOrganiser().getId().equals(organiserId))
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

    if (request == null || request.rows() == null || request.rows().isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "At least one row is required");
    }

    Set<String> seenLabels = new HashSet<>();
    for (LayoutRowRequest row : request.rows()) {
      if (row.label() == null || row.label().isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Row label is required");
      }
      if (row.seatCount() == null || row.seatCount() <= 0) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, "Seat count must be greater than zero for row " + row.label());
      }
      if (!seenLabels.add(row.label())) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, "Duplicate row label: " + row.label());
      }
    }

    if (bookingSeatRepository.existsBySeatEventId(eventId)) {
      throw new ResponseStatusException(
          HttpStatus.CONFLICT,
          "This event already has bookings against its seating layout; the layout cannot be"
              + " replaced");
    }

    seatRepository.deleteByEventId(eventId);

    List<Seat> seats = new ArrayList<>();
    for (LayoutRowRequest row : request.rows()) {
      for (int seatNumber = 1; seatNumber <= row.seatCount(); seatNumber++) {
        Seat seat = new Seat();
        seat.setId(UUID.randomUUID().toString());
        seat.setEvent(event);
        seat.setRowLabel(row.label());
        seat.setSeatNumber(seatNumber);
        seat.setPriceMinor(row.priceMinor());
        seat.setStatus(AVAILABLE);
        seats.add(seat);
      }
    }
    seatRepository.saveAll(seats);

    auditLogService.record("layout_saved", "event", eventId, organiserId, ipAddress);
    return new LayoutResponse(seats.size());
  }

  /** AC-037, AC-009, AC-011: the saved layout with per-seat availability. */
  public List<SeatResponse> listSeats(String eventId) {
    if (!eventRepository.existsById(eventId)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found");
    }
    return seatRepository.findByEventIdOrderByRowLabelAscSeatNumberAsc(eventId).stream()
        .map(seat ->
            new SeatResponse(
                seat.getId(), seat.getRowLabel(), seat.getSeatNumber(), seat.getStatus()))
        .toList();
  }
}
