import { expect, test } from "@playwright/test";

// Seeded by backend/src/main/resources/db/migration/V1__seed_organiser.sql.
const VALID_EMAIL = "organiser@example.com";
const VALID_PASSWORD = "ChangeMe123!";

test.describe("organiser sign-in and access control", () => {
  test("[AC-031] signs in with valid credentials and lands on the organiser dashboard", async ({
    page,
  }) => {
    await page.goto("/organiser-sign-in");

    await page.getByLabel("Email address").fill(VALID_EMAIL);
    await page.getByLabel("Password").fill(VALID_PASSWORD);
    await page.getByRole("button", { name: /sign in to the dashboard/i }).click();

    // The form shows a success state with a link into the dashboard, then navigates there.
    await page.getByRole("button", { name: /open organiser dashboard/i }).click();

    await expect(page).toHaveURL(/\/organiser-events$/);
    await expect(page.getByRole("heading", { name: "Your events" })).toBeVisible();
  });

  test("[AC-032] shows a generic error for bad credentials with no field-level disclosure", async ({
    page,
  }) => {
    await page.goto("/organiser-sign-in");

    await page.getByLabel("Email address").fill(VALID_EMAIL);
    await page.getByLabel("Password").fill("definitely-wrong-password");
    await page.getByRole("button", { name: /sign in to the dashboard/i }).click();

    const alert = page.getByRole("alert");
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(/email and password/i);

    // No disclosure of which field was wrong: neither input is marked invalid, and the
    // message does not single out "email" or "password" as the culprit.
    await expect(page.getByLabel("Email address")).not.toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Password")).not.toHaveAttribute("aria-invalid", "true");
    await expect(alert).not.toContainText(/password is wrong/i);
    await expect(alert).not.toContainText(/email does not exist/i);
    await expect(alert).not.toContainText(/no account/i);

    // Also true for an unknown email: the same generic text, not "no such account".
    await page.getByLabel("Email address").fill("nobody-at-all@example.com");
    await page.getByLabel("Password").fill("whatever123");
    await page.getByRole("button", { name: /sign in to the dashboard/i }).click();
    await expect(page.getByRole("alert")).toContainText(/email and password/i);
  });

  test("[AC-033] redirects a signed-out visit to an organiser URL to sign-in with no protected content", async ({
    page,
  }) => {
    await page.context().clearCookies();
    await page.addInitScript(() => window.localStorage.clear());

    await page.goto("/organiser-events");

    await expect(page).toHaveURL(/\/organiser-sign-in$/);
    await expect(page.getByRole("heading", { name: "Organiser sign in" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your events" })).toHaveCount(0);
    await expect(page.getByText(/create a draft event/i)).toHaveCount(0);
  });
});
