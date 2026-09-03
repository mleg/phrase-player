import { test as base, expect, type Page } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FIXTURES_DIR = path.join(fileURLToPath(new URL("./fixtures", import.meta.url)));

const fixtureDir = (name: string) => path.join(FIXTURES_DIR, name);

/**
 * The audio element is an external boundary: play/pause are stubbed and the
 * latest command is recorded on window.__media ({state, seq}) so tests can
 * observe that the app commands playback without counting calls. The media
 * clock is driven deterministically through window.__seek(time), which sets
 * currentTime and dispatches timeupdate. File loading uses real WAV/SRT
 * fixtures.
 */
export const test = base.extend({
  page: async ({ page }, run) => {
    await page.addInitScript(() => {
      const media = { state: "paused", seq: 0 };
      Object.defineProperty(window, "__media", {
        value: media,
      });
      HTMLMediaElement.prototype.play = function play() {
        media.state = "playing";
        media.seq += 1;
        return Promise.resolve();
      };
      HTMLMediaElement.prototype.pause = function pause() {
        media.state = "paused";
        media.seq += 1;
      };
      Object.defineProperty(window, "__seek", {
        value: (time: number) => {
          const audio = document.querySelector("audio");
          if (!audio) {
            throw new Error("audio element not found");
          }
          audio.currentTime = time;
          audio.dispatchEvent(new Event("timeupdate"));
        },
      });
    });
    await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());
    await run(page);
  },
});

export { expect };

export async function loadMediaFolder(page: Page, fixture: string) {
  await page
    .getByLabel("Choose media folder")
    .setInputFiles(fixtureDir(fixture));
}

export async function seekTo(page: Page, time: number) {
  await page.evaluate((t) => {
    (window as unknown as { __seek(time: number): void }).__seek(t);
  }, time);
}

/**
 * Run the action and assert that the app commands play or pause at least
 * once because of it: the media-seam sequence must advance past the value
 * captured before the action, and the recorded state must match.
 */
export async function expectMediaCommand(
  page: Page,
  command: "play" | "pause",
  action: () => Promise<void>
) {
  const before = await page.evaluate(
    () => (window as unknown as { __media: { seq: number } }).__media.seq
  );
  await action();
  const expected = command === "play" ? "playing" : "paused";
  await expect
    .poll(() =>
      page.evaluate(
        (floor) => {
          const media = (
            window as unknown as { __media: { state: string; seq: number } }
          ).__media;
          return media.seq > floor ? media.state : null;
        },
        before
      )
    )
    .toBe(expected);
}

/** Press a key with no focused control, so hotkeys act alone. */
export async function pressKey(page: Page, key: string) {
  await page.evaluate(() => {
    (document.activeElement as HTMLElement | null)?.blur();
  });
  await page.keyboard.press(key);
}
