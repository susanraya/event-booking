import { expect, test, type Page } from "@playwright/test";

// Seeded by backend/src/main/resources/db/migration/V1__seed_organiser.sql.
const VALID_EMAIL = "organiser@example.com";
const VALID_PASSWORD = "ChangeMe123!";

async function signIn(page: Page) {
  await page.goto("/organiser-sign-in");
  await page.getByLabel("Email address").fill(VALID_EMAIL);
  await page.getByLabel("Password").fill(VALID_PASSWORD);
  await page.getByRole("button", { name: /sign in to the dashboard/i }).click();
  await page.getByRole("button", { name: /open organiser dashboard/i }).click();
  await expect(page).toHaveURL(/\/organiser-events$/);
}

function uniqueTitle(label: string) {
  return `${label} ${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

async function createDraft(page: Page, title: string, venue: string, startLocal: string) {
  await page.getByRole("button", { name: "New event" }).click();
  await page.getByLabel("Title").fill(title);
  await page.locator("#c-start").fill(startLocal);
  await page.getByLabel("Venue").fill(venue);
  await page.getByRole("button", { name: /save as draft/i }).click();
  await expect(page.getByText(title)).toBeVisible();
}

test.describe("US-017 organiser dashboard (AC-043, AC-044)", () => {
  test("[AC-043] the dashboard lists my events each with its own status (draft/published) and date/time", async ({
    page,
  }) => {
    const draftTitle = uniqueTitle("Dashboard Draft Item");
    const publishedTitle = uniqueTitle("Dashboard Published Item");

    await signIn(page);

    await createDraft(page, draftTitle, "Kamani Auditorium, Delhi", "2026-12-24T19:00");

    await createDraft(page, publishedTitle, "NCPA, Mumbai", "2026-12-25T20:00");
    await page.getByText(publishedTitle).click();
    await page.getByRole("button", { name: /publish event/i }).click();
    await page.goto("/organiser-events");

    const draftItem = page.locator("li", { has: page.getByText(draftTitle) });
    await expect(draftItem.getByText("Draft")).toBeVisible();
    // Date/time for the draft event is rendered alongside its status.
    await expect(draftItem).toContainText(/2026|Dec/i);

    const publishedItem = page.locator("li", { has: page.getByText(publishedTitle) });
    await expect(publishedItem.getByText("Published")).toBeVisible();
    await expect(publishedItem).toContainText(/2026|Dec/i);

    // The two events are independently labelled: one draft, one published, not mixed up.
    await expect(draftItem.getByText("Published")).toHaveCount(0);
    await expect(publishedItem.getByText("Draft")).toHaveCount(0);
  });

  test("[AC-044] selecting an event opens it to edit details, manage its seating layout and pricing, and toggle publish/unpublish", async ({
    page,
  }) => {
    const title = uniqueTitle("Dashboard Manage Item");

    await signIn(page);
    await createDraft(page, title, "Siri Fort Auditorium, Delhi", "2026-12-26T19:00");

    // Select the event from the dashboard list.
    await page.getByText(title).click();
    await expect(page.getByRole("heading", { name: title })).toBeVisible();

    // Edit details.
    const editedTitle = uniqueTitle("Dashboard Manage Item Edited");
    await page.locator("#d-title").fill(editedTitle);
    await page.getByRole("button", { name: /save changes/i }).click();
    await expect(page.getByText(editedTitle)).toBeVisible();

    // Manage seating layout.
    await page.getByRole("tab", { name: /seating layout/i }).click();
    await page.locator("#new-row-label").fill("Q");
    await page.locator("#new-row-seats").fill("10");
    await page.getByRole("button", { name: /add row/i }).click();
    await page.getByRole("button", { name: /save layout/i }).click();

    // Manage pricing.
    await page.getByRole("tab", { name: /pricing/i }).click();
    await page.locator("#p-price").fill("250");
    await page.locator("#p-currency").selectOption({ index: 0 });
    await page.getByRole("button", { name: /save pricing/i }).click();

    // Publish from the event detail view, reflected back on the dashboard.
    await page.getByRole("button", { name: /publish event/i }).click();
    await expect(page.getByText("Published").first()).toBeVisible();

    // Unpublish again, from the same detail view.
    await page.getByRole("button", { name: "Unpublish", exact: true }).click();
    await page.getByRole("button", { name: "Unpublish", exact: true }).click();
    await page.goto("/organiser-events");
    const item = page.locator("li", { has: page.getByText(editedTitle) });
    await expect(item.getByText("Draft")).toBeVisible();
  });
});

// NFR-005 (retain activity logs for 180 days): not verifiable as an e2e/UI scenario -- there is
// no organiser-facing screen or API in this ticket's scope that surfaces audit-log retention or
// age, and exercising an actual 180-day retention window is outside what an e2e test can drive.
// This requirement needs a backend-level check (e.g. an integration test against
// AuditLogService/AuditLogRepository asserting a retention/cleanup policy, or a documented
// scheduled-job configuration) which is outside frontend/e2e and outside the WebAppController
// surface already covered by backend/tests. Left PENDING; flagging for a backend test owner.
