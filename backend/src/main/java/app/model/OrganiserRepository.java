package app.model;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/** Reads and writes Organiser rows; Spring Data implements it. */
public interface OrganiserRepository extends JpaRepository<Organiser, String> {

  Optional<Organiser> findByEmail(String email);
}
