// NOTE: Maven's default test source root is backend/src/test/java (see the sibling stub at
// backend/tests/app/webapp/SeatingLayoutIT.java); this file documents the NFR-005 test intent
// but QA's write scope for this task is limited to backend/tests/. For `mvn test` to execute
// it, a maintainer with write access to backend/src/test/java must copy this class there
// unchanged (package app.security).
package app.security;

import static org.assertj.core.api.Assertions.assertThat;

import app.model.AuditLog;
import app.model.AuditLogRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

/**
 * NFR-005: activity logs must be retained for 180 days. Verifies the configured retention
 * window and that the purge job only removes rows older than that window, leaving rows inside
 * it (including one just inside the boundary) untouched.
 */
@SpringBootTest
@Transactional
class AuditLogServiceIT {

  @Autowired private AuditLogService auditLogService;
  @Autowired private AuditLogRepository auditLogRepository;

  @Value("${app.audit.retention-days}")
  private int retentionDays;

  @Test
  void testNfr005RetentionWindowIsConfiguredToAtLeast180Days() {
    assertThat(retentionDays).isGreaterThanOrEqualTo(180);
  }

  @Test
  void testNfr005PurgeRemovesOnlyRowsOlderThanTheRetentionWindowKeepingRecentOnes() {
    AuditLog old = row(LocalDateTime.now().minusDays(retentionDays + 1));
    AuditLog withinWindow = row(LocalDateTime.now().minusDays(retentionDays - 1));
    AuditLog fresh = row(LocalDateTime.now());
    auditLogRepository.saveAll(List.of(old, withinWindow, fresh));

    auditLogService.purgeExpired();

    assertThat(auditLogRepository.findById(old.getId())).isEmpty();
    assertThat(auditLogRepository.findById(withinWindow.getId())).isPresent();
    assertThat(auditLogRepository.findById(fresh.getId())).isPresent();
  }

  private AuditLog row(LocalDateTime createdAt) {
    AuditLog entry = new AuditLog();
    entry.setId(UUID.randomUUID().toString());
    entry.setAction("test.action");
    entry.setEntityType("test");
    entry.setEntityId("1");
    entry.setActor("tester");
    entry.setIpAddress("127.0.0.1");
    entry.setCreatedAt(createdAt);
    return entry;
  }
}
