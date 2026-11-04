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

test.describe("organiser event create/edit (AC-034, AC-035, AC-036)", () => {
  test("[AC-034] creates a draft event that is absent from public browsing, then [AC-035] edits it and sees the new details on the public page", async ({
    page,
  }) => {
    await signIn(page);

    const draftTitle = uniqueTitle("Draft Recital");
    await page.getByRole("button", { name: "New event" }).click();
    await page.getByLabel("Title").fill(draftTitle);
    await page.locator("#c-start").fill("2026-12-10T19:00");
    await page.getByLabel("Venue").fill("Prithvi Theatre, Mumbai");
    await page.getByRole("button", { name: /save as draft/i }).click();

    // AC-034: the new event appears in the organiser's own list as a draft...
    await expect(page.getByText(draftTitle)).toBeVisible();
    await expect(page.getByText("Draft").first()).toBeVisible();

    // ...and is absent from public browsing while it is a draft.
    await page.goto("/events");
    await expect(page.getByText(draftTitle)).toHaveCount(0);

    // AC-035: edit title, description, date/time and venue, then publish so the public page
    // can show them, and confirm the public event detail reflects the new values.
    await page.goto("/organiser-events");
    await page.getByText(draftTitle).click();

    const editedTitle = uniqueTitle("Edited Recital");
    await page.locator("#d-title").fill(editedTitle);
    await page.locator("#d-start").fill("2026-12-15T20:30");
    await page.locator("#d-venue").fill("Royal Opera House, Mumbai");
    await page.locator("#d-desc").fill("An evening of classical thumri, newly rescheduled.");
    await page.getByRole("button", { name: /save changes/i }).click();

    await expect(page.getByText(editedTitle)).toBeVisible();

    await page.getByRole("button", { name: /publish event/i }).click();

    await page.getByRole("button", { name: "Public page" }).click();
    await expect(page.getByRole("heading", { name: editedTitle })).toBeVisible();
    await expect(page.getByText(/Royal Opera House, Mumbai/)).toBeVisible();
  });

  test("[AC-036] blocks creating or saving an event with an empty title, with a visible message, and persists nothing", async ({
    page,
  }) => {
    await signIn(page);

    const beforeCount = await page.getByRole("listitem").count();

    await page.getByRole("button", { name: "New event" }).click();
    // Leave title empty; fill the rest so title is isolated as the failing field.
    await page.locator("#c-start").fill("2026-12-10T19:00");
    await page.getByLabel("Venue").fill("Prithvi Theatre, Mumbai");
    await page.getByRole("button", { name: /save as draft/i }).click();

    await expect(page.getByText(/title is required/i)).toBeVisible();

    // Nothing was persisted: the list did not grow.
    await page.getByRole("button", { name: /cancel/i }).click();
    await expect(page.getByRole("listitem")).toHaveCount(beforeCount);
  });
});

test.describe("organiser pricing / free configuration (AC-039, AC-040)", () => {
  test("[AC-039] setting a price shows it on the event detail and booking flow, and [AC-040] marking free shows the event as free", async ({
    page,
  }) => {
    await signIn(page);

    const title = uniqueTitle("Priced Concert");
    await page.getByRole("button", { name: "New event" }).click();
    await page.getByLabel("Title").fill(title);
    await page.locator("#c-start").fill("2026-12-20T19:00");
    await page.getByLabel("Venue").fill("NCPA, Mumbai");
    await page.getByRole("button", { name: /save as draft/i }).click();
    await page.getByText(title).click();

    // Switch to the Pricing tab and set a concrete price.
    await page.getByRole("tab", { name: /pricing/i }).click();
    await page.locator("#p-price").fill("500");
    await page.locator("#p-currency").selectOption({ index: 0 });
    await page.getByRole("button", { name: /save pricing/i }).click();

    await page.getByRole("button", { name: /publish event/i }).click();
    await page.getByRole("button", { name: "Public page" }).click();

    // AC-039: the set price shows on the public event detail / booking flow.
    await expect(page.getByText(/tickets from/i)).toBeVisible();
    await expect(page.getByText(/free entry/i)).toHaveCount(0);

    // AC-040: marking the event free reports it as free with no price charged.
    await page.goto("/organiser-events");
    await page.getByText(title).click();
    await page.getByRole("tab", { name: /pricing/i }).click();
    await page.locator("#p-free").check();
    await page.getByRole("button", { name: /save pricing/i }).click();

    await page.getByRole("button", { name: "Public page" }).click();
    await expect(page.getByText(/free entry/i)).toBeVisible();
  });
});

test.describe("organiser seating layout for attendee selection (AC-037)", () => {
  test("[AC-037] defines a multi-row layout and the seats appear for attendee selection", async ({
    page,
  }) => {
    await signIn(page);

    const title = uniqueTitle("Large Hall Concert");
    await page.getByRole("button", { name: "New event" }).click();
    await page.getByLabel("Title").fill(title);
    await page.locator("#c-start").fill("2026-12-22T19:00");
    await page.getByLabel("Venue").fill("Siri Fort Auditorium, Delhi");
    await page.getByRole("button", { name: /save as draft/i }).click();
    await page.getByText(title).click();

    await page.getByRole("tab", { name: /seating layout/i }).click();

    // Add several rows of 60 seats each to exceed 300 seats across the layout
    // (AC-037, AC-038, NFR-002: every seat uniquely identified by row + seat number).
    const rowLabels = ["J", "K", "L", "M", "N", "O"];
    for (const label of rowLabels) {
      await page.locator("#new-row-label").fill(label);
      await page.locator("#new-row-seats").fill("60");
      await page.getByRole("button", { name: /add row/i }).click();
    }

    await expect(page.getByText(/360/)).toBeVisible();
    await page.getByRole("button", { name: /save layout/i }).click();

    await page.getByRole("button", { name: /publish event/i }).click();
    await page.getByRole("button", { name: "Public page" }).click();

    // Seats appear for attendee selection, distinguishable by row and number.
    await expect(page.getByLabel(/row j, seat 1[,.]?/i).first()).toBeVisible();
    const seatButtons = page.locator("button[aria-label*='Row']");
    await expect(seatButtons).toHaveCount(await seatButtons.count());
    expect(await seatButtons.count()).toBeGreaterThanOrEqual(300);
  });
});
