import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/** The image's health probe: the JRE image ships no curl, wget or Python. Exit 0 when healthy. */
public final class HealthCheck {

  public static void main(String[] args) {
    HttpRequest request =
        HttpRequest.newBuilder(URI.create("http://localhost:8000/health"))
            .timeout(Duration.ofSeconds(5))
            .build();
    try {
      int status =
          HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.discarding()).statusCode();
      System.exit(status == 200 ? 0 : 1);
    } catch (Exception e) {
      System.exit(1);
    }
  }
}
