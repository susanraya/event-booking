package app;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class DatabaseUrlEnvironmentPostProcessorTest {

  @Test
  void dropsTheDriverPartThePlatformWrites() {
    var properties =
        DatabaseUrlEnvironmentPostProcessor.datasource(
            "postgresql+driver://app:s%40cret@database:5432/app");

    assertThat(properties.get("spring.datasource.url"))
        .asString()
        .startsWith("jdbc:postgresql://database:5432/app");
    assertThat(properties).containsEntry("spring.datasource.username", "app");
    assertThat(properties).containsEntry("spring.datasource.password", "s@cret");
  }

  @Test
  void runsInMemoryWithNoDatabaseSet() {
    assertThat(DatabaseUrlEnvironmentPostProcessor.datasource(null))
        .containsEntry("spring.datasource.url", DatabaseUrlEnvironmentPostProcessor.IN_MEMORY);
  }
}
