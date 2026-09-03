import { expect, test, loadMediaFolder } from "./helpers";

test.describe("media selection", () => {
  test("empty player disables actions; a single pair auto-selects", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("combobox")).toBeDisabled();
    await expect(page.getByRole("button", { name: "Play", exact: true })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Copy" })).toBeDisabled();
    await expect(page.getByText("Choose media folder")).toBeVisible();

    await loadMediaFolder(page, "single");

    await expect(page.getByText("single", { exact: true })).toBeVisible();
    const audioSelect = page.getByRole("combobox");
    await expect(audioSelect).toBeEnabled();
    await expect(audioSelect).toContainText("lesson.wav");
    await expect(page.getByRole("status")).toHaveText("Alpha one");
    await expect(page.getByText("1 of 3")).toBeVisible();
  });

  test("two pairs are listed and switching pairs changes the phrase", async ({
    page,
  }) => {
    await page.goto("/");
    await loadMediaFolder(page, "multiple");

    const audioSelect = page.getByRole("combobox");
    await expect(audioSelect).toBeEnabled();
    await expect(audioSelect).toContainText("Select audio file");

    await audioSelect.click();
    await page.getByRole("option", { name: "lesson-a.wav" }).click();
    await expect(page.getByRole("status")).toHaveText("Alpha one");

    await audioSelect.click();
    await page.getByRole("option", { name: "lesson-b.wav" }).click();
    await expect(page.getByRole("status")).toHaveText("Bravo one");
    await expect(page.getByText("1 of 3")).toBeVisible();
  });
});
