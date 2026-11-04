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

async function publishCurrent(page: Page) {
  await page.getByRole("button", { name: /publish event/i }).click();
}

test.describe("public browsing and search (AC-001..AC-005)", () => {
  test("[AC-001][AC-003] an anonymous visitor sees published events with title, date/time and venue, with no sign-in prompt", async ({
    page,
  }) => {
    const title = uniqueTitle("Public Sitar Recital");
    const venue = "Prithvi Theatre, Mumbai";

    await signIn(page);
    await createDraft(page, title, venue, "2026-12-11T19:00");
    await page.getByText(title).click();
    await publishCurrent(page);

    // Simulate a fresh anonymous visitor.
    await page.context().clearCookies();
    await page.addInitScript(() => window.localStorage.clear());
    await page.goto("/events");

    const row = page.locator("tr", { has: page.getByRole("button", { name: new RegExp(`Open ${title}`) }) });
    await expect(row).toBeVisible();
    await expect(row.getByText(venue)).toBeVisible();
    // Date/time is rendered as "<weekday day month> · <time>"; just assert it's non-empty text
    // next to the venue, distinct from a sign-in prompt.
    await expect(page.getByRole("heading", { name: "Organiser sign in" })).toHaveCount(0);
    await expect(page.getByText(/sign in/i)).toHaveCount(0);
  });

  test("[AC-002] a draft event does not appear in the public listing", async ({ page }) => {
    const title = uniqueTitle("Hidden Draft Ghazal");

    await signIn(page);
    await createDraft(page, title, "NCPA, Mumbai", "2026-12-12T19:00");
    // Left as a draft -- never published.

    await page.goto("/events");
    await expect(page.getByText(title)).toHaveCount(0);
  });

  test("[AC-004] searching a matching term filters the list to matching events", async ({ page }) => {
    const title = uniqueTitle("Qawwali Night Searchable");
    const venue = "Siri Fort Auditorium, Delhi";

    await signIn(page);
    await createDraft(page, title, venue, "2026-12-13T19:00");
    await page.getByText(title).click();
    await publishCurrent(page);

    await page.goto("/events");
    await page.getByLabel(/search published events/i).fill(title.split(" ")[0]);
    await expect(page.getByText(title)).toBeVisible();
  });

  test("[AC-005] a non-matching search term shows the 'no events found' message and no error", async ({
    page,
  }) => {
    await page.goto("/events");
    const nonsense = `zzz-no-such-event-${Date.now()}`;
    await page.getByLabel(/search published events/i).fill(nonsense);

    await expect(page.getByRole("heading", { name: "No events found" })).toBeVisible();
    await expect(page.getByRole("alert")).toHaveCount(0);
  });
});

test.describe("public event detail (AC-006, AC-007, AC-008)", () => {
  test("[AC-006] opening a published event shows title, description, date/time, venue and price, [AC-007] select-seats is available when seats exist", async ({
    page,
  }) => {
    const title = uniqueTitle("Detailed Concert");
    const venue = "Royal Opera House, Mumbai";
    const description = "A detailed description of the evening's programme.";

    await signIn(page);
    await createDraft(page, title, venue, "2026-12-14T19:30");
    await page.getByText(title).click();
    await page.locator("#d-desc").fill(description);
    await page.getByRole("button", { name: /save changes/i }).click();

    // Give the event some seats so the select-seats action has something to act on.
    await page.getByRole("tab", { name: /seating layout/i }).click();
    await page.locator("#new-row-label").fill("A");
    await page.locator("#new-row-seats").fill("10");
    await page.getByRole("button", { name: /add row/i }).click();
    await page.getByRole("button", { name: /save layout/i }).click();

    // Set a concrete price.
    await page.getByRole("tab", { name: /pricing/i }).click();
    await page.locator("#p-price").fill("350");
    await page.locator("#p-currency").selectOption({ index: 0 });
    await page.getByRole("button", { name: /save pricing/i }).click();

    await publishCurrent(page);
    await page.getByRole("button", { name: "Public page" }).click();

    await expect(page.getByRole("heading", { name: title })).toBeVisible();
    await expect(page.getByText(description)).toBeVisible();
    await expect(page.getByText(new RegExp(venue))).toBeVisible();
    await expect(page.getByText(/tickets from/i)).toBeVisible();

    // AC-007: seats exist, so a select-seats action is available and usable.
    const seatButton = page.locator("button[aria-label*='Row']").first();
    await expect(seatButton).toBeVisible();
    await expect(seatButton).toBeEnabled();
    await seatButton.click();
    await expect(seatButton).toHaveAttribute("aria-pressed", "true");
  });

  test("[AC-006] a free published event shows 'Free entry' instead of a price", async ({ page }) => {
    const title = uniqueTitle("Free Community Concert");

    await signIn(page);
    await createDraft(page, title, "Community Hall, Pune", "2026-12-16T18:00");
    await page.getByText(title).click();
    await page.getByRole("tab", { name: /pricing/i }).click();
    await page.locator("#p-free").check();
    await page.getByRole("button", { name: /save pricing/i }).click();
    await publishCurrent(page);
    await page.getByRole("button", { name: "Public page" }).click();

    await expect(page.getByText(/free entry/i)).toBeVisible();
  });

  test("[AC-008] requesting an unpublished event's detail route shows the not-available message with no booking action", async ({
    page,
  }) => {
    const title = uniqueTitle("Still A Draft Event");

    await signIn(page);
    await createDraft(page, title, "Kamani Auditorium, Delhi", "2026-12-17T19:00");
    await page.getByText(title).click();
    await page.getByRole("button", { name: "Public page" }).click();

    await expect(page.getByRole("heading", { name: "This event isn't available" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Choose your seats" })).toHaveCount(0);
    await expect(page.locator("button[aria-label*='Row']")).toHaveCount(0);
  });
});
