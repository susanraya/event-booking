package app.webapp;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

/**
 * Covers US-014: defining a seating layout of rows and seats for an event (AC-037, AC-038) and,
 * where observable from the API, NFR-002 (hundreds of seats per event is in scope for sizing).
 *
 * <p>Contract, from docs/sdlc/architecture/api/openapi.yaml: PUT /api/organiser/events/{id}/layout
 * body {rows:[{label, seatCount, priceMinor}]}.
 */
@SpringBootTest
@AutoConfigureMockMvc
class SeatingLayoutIT {

  private static final String SEEDED_EMAIL = "organiser@example.com";
  private static final String SEEDED_PASSWORD = "ChangeMe123!";

  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;

  private String signIn() throws Exception {
    MvcResult result =
        mockMvc
            .perform(
                post("/api/auth/login")
                    .contentType("application/json")
                    .content(
                        objectMapper.writeValueAsString(
                            Map.of("email", SEEDED_EMAIL, "password", SEEDED_PASSWORD))))
            .andExpect(status().isOk())
            .andReturn();
    return objectMapper.readTree(result.getResponse().getContentAsString()).get("token").asText();
  }

  private String createDraftEvent(String token) throws Exception {
    MvcResult result =
        mockMvc
            .perform(
                post("/api/organiser/events")
                    .header("Authorization", "Bearer " + token)
                    .contentType("application/json")
                    .content(
                        objectMapper.writeValueAsString(
                            Map.of(
                                "title", "Seating Layout Test " + System.nanoTime(),
                                "start_datetime", "2026-12-10T19:00:00",
                                "venue", "Test Venue"))))
            .andExpect(status().isCreated())
            .andReturn();
    return objectMapper.readTree(result.getResponse().getContentAsString()).get("id").asText();
  }

  /** AC-037: defining rows and seats saves a layout that the organiser can read back. */
  @Test
  void testAc037SavingLayoutPersistsRowsAndSeats() throws Exception {
    String token = signIn();
    String eventId = createDraftEvent(token);

    Map<String, Object> body =
        Map.of(
            "rows",
            List.of(
                Map.of("label", "A", "seatCount", 10, "priceMinor", 50000),
                Map.of("label", "B", "seatCount", 10, "priceMinor", 40000)));

    mockMvc
        .perform(
            put("/api/organiser/events/{id}/layout", eventId)
                .header("Authorization", "Bearer " + token)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(body)))
        .andExpect(status().isOk());

    MvcResult seatsResult =
        mockMvc
            .perform(get("/api/events/{id}/seats", eventId))
            .andExpect(status().isOk())
            .andReturn();
    JsonNode seats = objectMapper.readTree(seatsResult.getResponse().getContentAsString());
    assertThat(seats.isArray()).isTrue();
    assertThat(seats.size()).isEqualTo(20);
  }

  /**
   * AC-038 / NFR-002: a layout of hundreds of seats saves with every seat uniquely identifiable by
   * row and seat number, and no duplicates.
   */
  @Test
  void testAc038HundredsOfSeatsAreEachUniquelyIdentifiedByRowAndNumber() throws Exception {
    String token = signIn();
    String eventId = createDraftEvent(token);

    List<String> rowLabels = List.of("J", "K", "L", "M", "N", "O");
    List<Map<String, Object>> rows =
        rowLabels.stream()
            .map(label ->
                (Map<String, Object>) Map.<String, Object>of("label", label, "seatCount", 60))
            .toList();

    mockMvc
        .perform(
            put("/api/organiser/events/{id}/layout", eventId)
                .header("Authorization", "Bearer " + token)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(Map.of("rows", rows))))
        .andExpect(status().isOk());

    MvcResult seatsResult =
        mockMvc
            .perform(get("/api/events/{id}/seats", eventId))
            .andExpect(status().isOk())
            .andReturn();
    JsonNode seats = objectMapper.readTree(seatsResult.getResponse().getContentAsString());

    assertThat(seats.size()).isEqualTo(360);

    java.util.Set<String> identifiers = new java.util.HashSet<>();
    for (JsonNode seat : seats) {
      String identifier = seat.get("row_label").asText() + "-" + seat.get("seat_number").asInt();
      assertThat(identifiers.add(identifier))
          .as("seat %s must be unique by row and seat number", identifier)
          .isTrue();
    }
    assertThat(identifiers).hasSize(360);
  }

  /** AC-037: the saved layout is what attendee seat selection reads from. */
  @Test
  void testAc037SavedLayoutIsUsedForAttendeeSeatSelection() throws Exception {
    String token = signIn();
    String eventId = createDraftEvent(token);

    mockMvc
        .perform(
            put("/api/organiser/events/{id}/layout", eventId)
                .header("Authorization", "Bearer " + token)
                .contentType("application/json")
                .content(
                    objectMapper.writeValueAsString(
                        Map.of("rows", List.of(Map.of("label", "A", "seatCount", 5))))))
        .andExpect(status().isOk());

    // No auth header: this is the public attendee-facing seat map for the event.
    MvcResult seatsResult =
        mockMvc
            .perform(get("/api/events/{id}/seats", eventId))
            .andExpect(status().isOk())
            .andReturn();
    JsonNode seats = objectMapper.readTree(seatsResult.getResponse().getContentAsString());
    assertThat(seats.size()).isEqualTo(5);
    for (JsonNode seat : seats) {
      assertThat(seat.get("row_label").asText()).isEqualTo("A");
      assertThat(seat.has("status")).isTrue();
    }
  }
}
