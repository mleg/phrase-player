import {
  currentPhrase,
  expect,
  loadMediaFolder,
  pressKey,
  test,
} from "./helpers";

test.describe("utilities and restoration", () => {
  test("copies the current phrase to the clipboard", async ({ page }) => {
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await loadMediaFolder(page, "single");
    await expect(currentPhrase(page)).toHaveText("Alpha one");

    await page.getByRole("button", { name: "Copy" }).click();
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    await expect(clipboard).toBe("Alpha one");
  });

  test("switching to Russian translates the interface", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /Language|Язык/ }).click();
    await page.getByRole("menuitem", { name: /Русский/ }).click();

    await expect(page.getByText("Выбрать медиа-папку")).toBeVisible();
    await expect(page.getByText("После фразы:")).toBeVisible();
    await expect(
      page.getByRole("tab", { name: "Остановить" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Копировать" })).toBeVisible();
  });

  test("GitHub and help links point at the repository pages", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/mleg/phrase-player"
    );
    await expect(page.getByRole("link", { name: "Help" })).toHaveAttribute(
      "href",
      "https://github.com/mleg/phrase-player#how-to-use"
    );
  });

  test("reload restores files, position, mode, and speed", async ({ page }) => {
    await page.goto("/");
    await loadMediaFolder(page, "single");
    await expect(currentPhrase(page)).toHaveText("Alpha one");

    await pressKey(page, "ArrowRight");
    await expect(page.getByText("2 of 3")).toBeVisible();
    await page.getByRole("tab", { name: "Repeat" }).click();
    await expect(page.getByRole("tab", { name: "Repeat" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await pressKey(page, "ArrowUp");
    await expect(page.getByRole("button", { name: /1\.05 x/ })).toBeVisible();

    await page.reload();

    await expect(page.getByRole("combobox")).toContainText("lesson.wav");
    await expect(currentPhrase(page)).toHaveText("Alpha two");
    await expect(page.getByText("2 of 3")).toBeVisible();
    await expect(page.getByRole("tab", { name: "Repeat" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(page.getByRole("button", { name: /1\.05 x/ })).toBeVisible();
  });
});
