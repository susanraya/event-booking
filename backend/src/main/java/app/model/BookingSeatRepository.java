package app.model;

import org.springframework.data.jpa.repository.JpaRepository;

/** Reads and writes BookingSeat rows; Spring Data implements it. */
public interface BookingSeatRepository extends JpaRepository<BookingSeat, String> {

  boolean existsBySeatEventId(String eventId);
}
