package app.model;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/** Reads and writes Seat rows; Spring Data implements it. */
public interface SeatRepository extends JpaRepository<Seat, String> {

  List<Seat> findByEventIdOrderByRowLabelAscSeatNumberAsc(String eventId);

  void deleteByEventId(String eventId);
}
