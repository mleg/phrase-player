import { test as base, expect, type Page } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FIXTURES_DIR = path.join(fileURLToPath(new URL("./fixtures", import.meta.url)));

const fixtureDir = (name: string) => path.join(FIXTURES_DIR, name);

/**
 * The audio element is an external boundary: play/pause become no-ops and the
 * media clock is driven deterministically through window.__seek(time), which
 * sets currentTime and dispatches timeupdate. The file-loading path itself
 * uses real WAV/SRT fixtures.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      HTMLMediaElement.prototype.play = function play() {
        return Promise.resolve();
      };
      HTMLMediaElement.prototype.pause = function pause() {};
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
    await use(page);
  },
});

export { expect };

export async function loadMediaFolder(page: Page, fixture: string) {
  await page.locator("#folder-input").setInputFiles(fixtureDir(fixture));
}

export async function seekTo(page: Page, time: number) {
  await page.evaluate((t) => {
    (window as unknown as { __seek(time: number): void }).__seek(t);
  }, time);
}

/** Press a key with no focused control, so hotkeys act alone. */
export async function pressKey(page: Page, key: string) {
  await page.evaluate(() => {
    (document.activeElement as HTMLElement | null)?.blur();
  });
  await page.keyboard.press(key);
}
