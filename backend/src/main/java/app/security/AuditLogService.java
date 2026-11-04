package app.security;

import app.model.AuditLog;
import app.model.AuditLogRepository;
import java.time.LocalDateTime;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/**
 * Writes audit_log rows for security-relevant events (sign-in success/failure) and enforces
 * NFR-005's retention policy: activity logs are kept for at least {@code app.audit.retention-days}
 * (180 by default) and purged by a daily job thereafter.
 */
@Service
public class AuditLogService {

  private static final Logger LOGGER = LoggerFactory.getLogger(AuditLogService.class);

  private final AuditLogRepository auditLogRepository;
  private final int retentionDays;

  public AuditLogService(
      AuditLogRepository auditLogRepository,
      @Value("${app.audit.retention-days}") int retentionDays) {
    this.auditLogRepository = auditLogRepository;
    this.retentionDays = retentionDays;
  }

  /** Records one action; {@code entityId} and {@code actor} may be null. */
  public void record(
      String action, String entityType, String entityId, String actor, String ipAddress) {
    AuditLog entry = new AuditLog();
    entry.setId(UUID.randomUUID().toString());
    entry.setAction(action);
    entry.setEntityType(entityType);
    entry.setEntityId(entityId);
    entry.setActor(actor);
    entry.setIpAddress(ipAddress);
    entry.setCreatedAt(LocalDateTime.now());
    auditLogRepository.save(entry);
  }

  /** NFR-005: deletes rows older than the retention window; runs once a day. */
  @Scheduled(cron = "0 0 3 * * *")
  public void purgeExpired() {
    LocalDateTime cutoff = LocalDateTime.now().minusDays(retentionDays);
    long deleted = auditLogRepository.deleteByCreatedAtBefore(cutoff);
    if (deleted > 0) {
      LOGGER.info("Purged {} audit_log rows older than {} days", deleted, retentionDays);
    }
  }
}
