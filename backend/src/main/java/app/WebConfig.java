package app;

import java.util.Arrays;
import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * The SPA runs on a different origin than the API, so the browser refuses its calls unless that
 * origin is allowed here. In development that is the Vite dev server; when deployed, the platform
 * injects the frontend's real URL as {@code ALLOWED_ORIGINS}.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

  private static final List<String> DEV_ORIGINS =
      List.of("http://localhost:5173", "http://127.0.0.1:5173");

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
        .addMapping("/**")
        .allowedOrigins(allowedOrigins(System.getenv("ALLOWED_ORIGINS")).toArray(String[]::new))
        .allowedMethods("*")
        .allowCredentials(true);
  }

  static List<String> allowedOrigins(String raw) {
    List<String> allowed =
        raw == null
            ? List.of()
            : Arrays.stream(raw.split(",")).map(String::strip).filter(s -> !s.isEmpty()).toList();
    return allowed.isEmpty() ? DEV_ORIGINS : allowed;
  }
}
