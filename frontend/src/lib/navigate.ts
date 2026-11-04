/**
 * `navigate(route)` in the preview moved between screens by their route slug. Here it is
 * real routing, so the slug the screen was written against becomes the path the router
 * mounted it at. This mirrors `route_to_url_path` on the Python side; the two must agree
 * or a link goes nowhere.
 */
export function toPath(route: string): string {
  const trimmed = route.trim().replace(/^\/+|\/+$/g, "");
  if (!trimmed) return "/";
  return (
    "/" +
    trimmed
      .split("/")
      .map((segment) =>
        segment.startsWith(":")
          ? segment
          : segment.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      )
      .join("/")
  );
}
