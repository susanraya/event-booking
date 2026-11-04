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

test.describe("organiser dashboard (AC-043, AC-044)", () => {
  test("[AC-043] sees own events with status and date/time, and [AC-044] opens one to edit/manage layout and pricing", async ({
    page,
  }) => {
    const title = uniqueTitle("Dashboard Visible Event");
    const venue = "NCPA, Mumbai";

    await signIn(page);
    await createDraft(page, title, venue, "2026-12-18T19:00");

    // AC-043: status and date/time visible on the dashboard list item.
    const listItem = page.locator("li", { has: page.getByText(title) });
    await expect(listItem.getByText("Draft")).toBeVisible();
    await expect(listItem.getByText(venue)).toBeVisible();

    // AC-044: opening the event allows editing details, and managing layout and pricing.
    await page.getByText(title).click();
    await expect(page.getByRole("heading", { name: title })).toBeVisible();

    await page.getByRole("tab", { name: /seating layout/i }).click();
    await page.locator("#new-row-label").fill("Z");
    await page.locator("#new-row-seats").fill("5");
    await page.getByRole("button", { name: /add row/i }).click();
    await page.getByRole("button", { name: /save layout/i }).click();

    await page.getByRole("tab", { name: /pricing/i }).click();
    await page.locator("#p-price").fill("100");
    await page.locator("#p-currency").selectOption({ index: 0 });
    await page.getByRole("button", { name: /save pricing/i }).click();

    await publishAndVerify(page, title);
  });
});

async function publishAndVerify(page: Page, title: string) {
  await page.getByRole("button", { name: /publish event/i }).click();
  await expect(page.getByText("Published").first()).toBeVisible();
}

test.describe("publish/unpublish visibility loop (AC-041, AC-042)", () => {
  test("[AC-041] unpublishing an event removes it from public listing and search, [AC-042] republishing restores it", async ({
    page,
  }) => {
    const title = uniqueTitle("Publish Loop Event");
    const venue = "Siri Fort Auditorium, Delhi";

    await signIn(page);
    await createDraft(page, title, venue, "2026-12-19T19:00");
    await page.getByText(title).click();
    await page.getByRole("button", { name: /publish event/i }).click();

    // Confirm it is publicly visible before unpublishing.
    await page.goto("/events");
    await expect(page.getByText(title)).toBeVisible();

    // Unpublish from the organiser dashboard.
    await page.goto("/organiser-events");
    await page.getByText(title).click();
    await page.getByRole("button", { name: "Unpublish", exact: true }).click();
    await page.getByRole("button", { name: "Unpublish", exact: true }).click();

    // AC-041: gone from the public listing, and from search.
    await page.goto("/events");
    await expect(page.getByText(title)).toHaveCount(0);
    await page.getByLabel(/search published events/i).fill(title.split(" ")[0]);
    await expect(page.getByRole("heading", { name: "No events found" })).toBeVisible();

    // Republish.
    await page.goto("/organiser-events");
    await page.getByText(title).click();
    await page.getByRole("button", { name: /publish event/i }).click();

    // AC-042: restored to the public listing and search.
    await page.goto("/events");
    await expect(page.getByText(title)).toBeVisible();
    await page.getByLabel(/search published events/i).fill(title.split(" ")[0]);
    await expect(page.getByText(title)).toBeVisible();
  });
});
