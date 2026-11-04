package app.api;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import app.model.AuditLogRepository;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import tools.jackson.databind.ObjectMapper;

/**
 * Covers US-012-1: organiser sign-in issuing a JWT, the generic failure message, and the security
 * filter protecting /api/organiser/** and the check-in endpoint.
 */
@SpringBootTest
@AutoConfigureMockMvc
class AuthLoginIT {

  private static final String SEEDED_EMAIL = "organiser@example.com";
  private static final String SEEDED_PASSWORD = "ChangeMe123!";

  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;
  @Autowired private AuditLogRepository auditLogRepository;

  @Test
  void testAc031CorrectCredentialsReturnTokenAndOrganiser() throws Exception {
    mockMvc
        .perform(
            post("/api/auth/login")
                .contentType("application/json")
                .content(
                    objectMapper.writeValueAsString(
                        Map.of("email", SEEDED_EMAIL, "password", SEEDED_PASSWORD))))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").isNotEmpty())
        .andExpect(jsonPath("$.organiser.email").value(SEEDED_EMAIL));
  }

  @Test
  void testAc032WrongPasswordReturnsGenericMessage() throws Exception {
    mockMvc
        .perform(
            post("/api/auth/login")
                .contentType("application/json")
                .content(
                    objectMapper.writeValueAsString(
                        Map.of("email", SEEDED_EMAIL, "password", "wrong-password"))))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.message").value("Email or password is incorrect"));
  }

  @Test
  void testAc032WrongEmailReturnsSameGenericMessage() throws Exception {
    mockMvc
        .perform(
            post("/api/auth/login")
                .contentType("application/json")
                .content(
                    objectMapper.writeValueAsString(
                        Map.of("email", "nobody@example.com", "password", SEEDED_PASSWORD))))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.message").value("Email or password is incorrect"));
  }

  @Test
  void testNfr005LoginWritesAuditLogRowsForSuccessAndFailure() throws Exception {
    long before = auditLogRepository.count();

    mockMvc.perform(
        post("/api/auth/login")
            .contentType("application/json")
            .content(
                objectMapper.writeValueAsString(
                    Map.of("email", SEEDED_EMAIL, "password", SEEDED_PASSWORD))));
    mockMvc.perform(
        post("/api/auth/login")
            .contentType("application/json")
            .content(
                objectMapper.writeValueAsString(
                    Map.of("email", SEEDED_EMAIL, "password", "wrong-password"))));

    assertThat(auditLogRepository.count()).isGreaterThanOrEqualTo(before + 2);
  }

  @Test
  void testAc033OrganiserEndpointWithoutTokenIsRejected() throws Exception {
    mockMvc.perform(get("/api/organiser/events")).andExpect(status().isUnauthorized());
  }

  @Test
  void testAc033CheckinEndpointWithoutTokenIsRejected() throws Exception {
    mockMvc
        .perform(
            post("/api/events/some-event/checkin").contentType("application/json").content("{}"))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void testAc001ValidTokenIsAcceptedByOrganiserEndpoint() throws Exception {
    MvcResult loginResult =
        mockMvc
            .perform(
                post("/api/auth/login")
                    .contentType("application/json")
                    .content(
                        objectMapper.writeValueAsString(
                            Map.of("email", SEEDED_EMAIL, "password", SEEDED_PASSWORD))))
            .andExpect(status().isOk())
            .andReturn();
    String token =
        objectMapper.readTree(loginResult.getResponse().getContentAsString()).get("token").asText();

    mockMvc
        .perform(get("/api/organiser/events").header("Authorization", "Bearer " + token))
        .andExpect(status().isOk());
  }
}
