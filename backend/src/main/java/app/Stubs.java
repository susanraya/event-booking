package app;

import java.util.Map;

/**
 * What a generated endpoint returns until someone implements it.
 *
 * <p>A stub that returns a body rather than throwing keeps the service startable, so the frontend
 * can be built against the agreed shape while the endpoints are still being written.
 */
public final class Stubs {

  private Stubs() {}

  /** The placeholder body for one endpoint, named as the API spec names it. */
  public static Map<String, String> notImplemented(String endpoint) {
    return Map.of(
        "endpoint",
        endpoint,
        "status",
        "not_implemented",
        "detail",
        "Scaffolded from the approved API spec; no behaviour yet.");
  }
}
