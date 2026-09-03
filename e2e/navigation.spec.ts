import { expect, test, loadMediaFolder, pressKey } from "./helpers";

test.describe("phrase navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await loadMediaFolder(page, "single");
  });

  test("navigates with buttons", async ({ page }) => {
    const phrase = page.locator("div.font-mono");
    const counter = page.getByText(/\d of 3/);

    await expect(phrase).toHaveText("Alpha one");
    await expect(
      page.getByRole("button", { name: "First phrase" })
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Previous phrase" })
    ).toBeDisabled();

    await page.getByRole("button", { name: "Next phrase" }).click();
    await expect(phrase).toHaveText("Alpha two");
    await expect(counter).toHaveText("2 of 3");

    await page.getByRole("button", { name: "Last phrase" }).click();
    await expect(phrase).toHaveText("Alpha three");
    await expect(
      page.getByRole("button", { name: "Next phrase" })
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Last phrase" })
    ).toBeDisabled();

    await page.getByRole("button", { name: "First phrase" }).click();
    await expect(phrase).toHaveText("Alpha one");

    await page.getByRole("button", { name: "Next phrase" }).click();
    await page.getByRole("button", { name: "Previous phrase" }).click();
    await expect(phrase).toHaveText("Alpha one");
  });

  test("navigates with keyboard", async ({ page }) => {
    const phrase = page.locator("div.font-mono");

    await pressKey(page, "End");
    await expect(phrase).toHaveText("Alpha three");

    await pressKey(page, "Home");
    await expect(phrase).toHaveText("Alpha one");

    await pressKey(page, "ArrowRight");
    await expect(phrase).toHaveText("Alpha two");

    await pressKey(page, "ArrowLeft");
    await expect(phrase).toHaveText("Alpha one");
  });

  test("phrase list opens, selects a phrase, and closes with Escape", async ({
    page,
  }) => {
    const phrase = page.locator("div.font-mono");
    const listHeading = page.getByRole("heading", { name: "lesson.wav" });

    await page.getByRole("button", { name: "Phrase list" }).click();
    await expect(listHeading).toBeVisible();

    await page.locator("div.grid").getByText("Alpha two").click();
    await expect(listHeading).toBeHidden();
    await expect(phrase).toHaveText("Alpha two");
    await expect(page.getByText("2 of 3")).toBeVisible();

    await page.getByRole("button", { name: "Phrase list" }).click();
    await expect(listHeading).toBeVisible();
    await pressKey(page, "Escape");
    await expect(listHeading).toBeHidden();
  });
});
