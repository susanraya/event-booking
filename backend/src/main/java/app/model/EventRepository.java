package app.model;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/** Reads and writes Event rows; Spring Data implements it. */
public interface EventRepository extends JpaRepository<Event, String> {

  List<Event> findByOrganiserId(String organiserId);

  List<Event> findByStatus(String status);

  Optional<Event> findByIdAndStatus(String id, String status);
}
