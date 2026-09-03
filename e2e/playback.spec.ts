import { expect, test, loadMediaFolder, pressKey, seekTo } from "./helpers";

test.describe("playback and speed", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await loadMediaFolder(page, "single");
  });

  test("replay, play, pause, Space, and P control playback", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Replay phrase" }).click();
    await expect(
      page.getByRole("button", { name: "Pause", exact: true })
    ).toBeVisible();

    await page.getByRole("button", { name: "Pause", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Play", exact: true })
    ).toBeVisible();

    await pressKey(page, "Space");
    await expect(
      page.getByRole("button", { name: "Pause", exact: true })
    ).toBeVisible();

    await pressKey(page, "p");
    await expect(
      page.getByRole("button", { name: "Play", exact: true })
    ).toBeVisible();

    await pressKey(page, "p");
    await expect(
      page.getByRole("button", { name: "Pause", exact: true })
    ).toBeVisible();
  });

  test("speed changes through preset, slider, and arrow keys", async ({
    page,
  }) => {
    const audioPlaybackRate = () =>
      page.evaluate(() => document.querySelector("audio")?.playbackRate ?? 0);

    const speedButton = page.getByRole("button", { name: /1\.00 x/ });
    await speedButton.click();

    await page.getByRole("menuitem", { name: "0.9" }).click();
    await expect(page.getByRole("button", { name: /0\.90 x/ })).toBeVisible();
    await expect.poll(audioPlaybackRate).toBe(0.9);

    await page.getByRole("button", { name: /0\.90 x/ }).click();
    await page.getByRole("slider").press("ArrowUp");
    await expect(page.getByRole("slider")).toHaveAttribute("aria-valuenow", "0.95");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: /0\.95 x/ })).toBeVisible();

    await pressKey(page, "ArrowUp");
    await expect(page.getByRole("button", { name: /1\.00 x/ })).toBeVisible();
    await pressKey(page, "ArrowDown");
    await expect(page.getByRole("button", { name: /0\.95 x/ })).toBeVisible();
    await expect.poll(audioPlaybackRate).toBe(0.95);
  });

  test("after-phrase modes stop, repeat, and continue", async ({ page }) => {
    // STOP: reaching the phrase end stops playback.
    await page.getByRole("button", { name: "Replay phrase" }).click();
    await expect(
      page.getByRole("button", { name: "Pause", exact: true })
    ).toBeVisible();
    await seekTo(page, 2);
    await expect(
      page.getByRole("button", { name: "Play", exact: true })
    ).toBeVisible();

    // REPEAT: the phrase restarts from its beginning.
    await page.getByRole("tab", { name: "Repeat" }).click();
    await page.getByRole("button", { name: "Replay phrase" }).click();
    await seekTo(page, 2);
    await expect
      .poll(() =>
        page.evaluate(() => document.querySelector("audio")?.currentTime ?? -1)
      )
      .toBe(1);
    await expect(
      page.getByRole("button", { name: "Pause", exact: true })
    ).toBeVisible();

    // CONTINUE: reaching the end moves to the next phrase.
    await page.getByRole("tab", { name: "Continue" }).click();
    await seekTo(page, 2);
    await expect(page.locator("div.font-mono")).toHaveText("Alpha two");
    await expect(page.getByText("2 of 3")).toBeVisible();
    await seekTo(page, 4);
    await expect(page.locator("div.font-mono")).toHaveText("Alpha three");
    await expect(page.getByText("3 of 3")).toBeVisible();
  });
});
