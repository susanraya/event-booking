package app;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

/**
 * The datasource, from {@code DATABASE_URL}.
 *
 * <p>The platform writes one URL form for every backend ({@code
 * postgresql+psycopg://user:password@host:5432/app}); JDBC wants {@code
 * jdbc:postgresql://host:5432/app} with the user and password apart. With no {@code DATABASE_URL}
 * the app runs on an in-memory H2 database that keeps nothing, so it starts and its tests pass with
 * no database server.
 */
public class DatabaseUrlEnvironmentPostProcessor implements EnvironmentPostProcessor {

  static final String IN_MEMORY = "jdbc:h2:mem:app;MODE=PostgreSQL;DB_CLOSE_DELAY=-1";

  @Override
  public void postProcessEnvironment(
      ConfigurableEnvironment environment, SpringApplication application) {
    String url = environment.getProperty("DATABASE_URL");
    environment
        .getPropertySources()
        .addFirst(new MapPropertySource("databaseUrl", datasource(url)));
  }

  /** The {@code spring.datasource.*} properties for a {@code DATABASE_URL}, or none set. */
  static Map<String, Object> datasource(String url) {
    Map<String, Object> properties = new HashMap<>();
    if (url == null || url.isBlank()) {
      properties.put("spring.datasource.url", IN_MEMORY);
      return properties;
    }
    URI uri = URI.create(url.strip());
    String scheme = uri.getScheme().split("\\+", 2)[0];
    String engine = scheme.startsWith("postgres") ? "postgresql" : scheme;
    String port = uri.getPort() == -1 ? "" : ":" + uri.getPort();
    String query = uri.getRawQuery() == null ? "" : "?" + uri.getRawQuery();
    if (engine.equals("mysql") && query.isEmpty()) {
      // MySQL 8 signs in without TLS only when the client may fetch the server's key.
      query = "?allowPublicKeyRetrieval=true&useSSL=false";
    }
    properties.put(
        "spring.datasource.url",
        "jdbc:" + engine + "://" + uri.getHost() + port + uri.getRawPath() + query);
    String userInfo = uri.getRawUserInfo();
    if (userInfo != null) {
      String[] parts = userInfo.split(":", 2);
      properties.put("spring.datasource.username", decode(parts[0]));
      if (parts.length > 1) {
        properties.put("spring.datasource.password", decode(parts[1]));
      }
    }
    return properties;
  }

  private static String decode(String part) {
    return URLDecoder.decode(part, StandardCharsets.UTF_8);
  }
}
