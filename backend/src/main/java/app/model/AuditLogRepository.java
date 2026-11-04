package app.model;

import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;

/** Reads and writes AuditLog rows; Spring Data implements it. */
public interface AuditLogRepository extends JpaRepository<AuditLog, String> {

  /** NFR-005: rows older than the retention cutoff are purged by the cleanup job. */
  long deleteByCreatedAtBefore(LocalDateTime cutoff);
}
