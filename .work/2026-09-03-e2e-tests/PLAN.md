# Browser End-to-End Test Plan

Audience: an implementation agent working in the Phrase Player repository.

## Outcome

Add a local Playwright suite that covers every user-facing capability through representative paths. Run it against Playwright's bundled Chromium through Taskfile tasks. Keep a warm full-suite run at 15 seconds or less when practical.

## Constraints

- Use Playwright only. Do not add Vitest, React Testing Library, Cypress, or a coverage tool.
- Use one Chromium desktop project.
- Do not change GitHub Actions.
- Avoid visual snapshots, cross-browser projects, mobile viewports, malformed-file matrices, and rare edge cases.
- Avoid fixed sleeps and real-time waits for audio playback.
- Keep tests independent. Each test must create the state it needs.
- Assert visible behavior or an external browser boundary. Do not assert MobX internals or internal call counts.

## Test Seam

The primary seam is the rendered browser UI. Tests select files, use controls, press keys, reload the page, and assert what the learner can observe.

The audio element is an external browser boundary. Tests may replace `play()` and `pause()` with deterministic implementations and dispatch `timeupdate` after setting `currentTime`. The file-loading path must still use tiny real WAV and SRT fixtures.

Use role, label, and visible-text locators. Add localized `aria-label` values to icon-only controls that lack an accessible name. Add a test ID only when no meaningful user-facing selector exists.

## Scenario Map

| Scenario | Representative Checks |
| --- | --- |
| Initial and single-pair loading | The empty player has disabled actions. Upload one media-pair directory. The app auto-selects it and shows the folder, audio name, first phrase, and phrase counter. |
| Multiple-pair selection | Upload a directory with two media pairs. The audio selector lists both. Choosing the second pair changes the displayed phrase. |
| Phrase navigation | Exercise first, previous, next, and last controls. Exercise `Home`, `End`, `ArrowLeft`, and `ArrowRight`. Open the phrase list, select a phrase, and close it with `Escape`. |
| Playback and speed | Exercise replay, play, pause, `Space`, and `P`. Change speed through a preset, the slider, `ArrowUp`, and `ArrowDown`. Verify the visible speed and the audio boundary's playback rate. |
| After-phrase modes | Select Stop, Repeat, and Continue. Simulate reaching a phrase end and verify each visible result. Do not wait for real audio time. |
| Utilities and restoration | Copy the current phrase and read the clipboard. Switch English and Russian and verify representative translated text. Check GitHub and help link targets without opening them. Reload after changing the phrase, mode, and speed; verify that saved files, position, and settings return. |

These scenarios cover every current capability once. They do not cover every ordering or combination of those capabilities.

## Files and Structure

Use this shape unless existing conventions make a small adjustment clearer:

```text
Taskfile.yml
playwright.config.ts
e2e/
  fixtures/
    single/
      lesson.wav
      lesson.srt
    multiple/
      lesson-a.wav
      lesson-a.srt
      lesson-b.wav
      lesson-b.srt
  media-selection.spec.ts
  navigation.spec.ts
  playback.spec.ts
  persistence-and-language.spec.ts
```

Keep fixtures tiny. Three subtitle phrases are enough for first, middle, and last navigation. Extract a helper only after repeated setup makes the tests harder to read.

## Taskfile Interface

Add these developer-facing tasks:

- `task dev`: start Vite for normal development.
- `task build`: type-check and build the application.
- `task lint`: run ESLint.
- `task typecheck`: run TypeScript without emitting files.
- `task test:install`: install the Playwright Chromium binary.
- `task test`: run the full browser suite headlessly.
- `task test:headed`: run the suite with a visible browser.
- `task test:ui`: open Playwright UI mode.
- `task test:debug`: run with the Playwright inspector.
- `task check`: run lint, typecheck, and the browser suite locally.

Keep existing npm scripts. Do not add an npm `test` script unless a tool requires it.

## Fast Configuration

- Start one Vite server per suite through Playwright's `webServer` setting.
- Reuse an already running local server.
- Run headless by default.
- Use two workers unless measurement shows the default is faster and stable.
- Set retries to zero for local runs.
- Disable video. Capture a screenshot on failure.
- Keep tracing off in the normal run. The debug and UI tasks provide deeper diagnostics.
- Block unexpected external requests or make tests fail clearly if the app attempts one.
- Let Playwright locators and assertions wait for state. Do not add timeout sleeps.

## Implementation Order

1. Record a clean baseline with the existing lint, typecheck, and build commands.
2. Add `@playwright/test`, its configuration, and Taskfile tasks.
3. Add the single-pair fixture and the first loading test as a tracer path.
4. Add only the accessibility labels needed by stable role-based locators.
5. Add each remaining scenario as a vertical slice. Run the narrowest test after each slice.
6. Run `task check`, then run `task test` a second time and measure the warm duration.
7. If the warm run exceeds 15 seconds, measure browser launch, Vite startup, and test execution separately. Fix the largest cost before changing scope.

## Acceptance Criteria

- `task test:install` installs only Chromium.
- `task test` passes without network access, fixed sleeps, or real-time audio waits.
- The scenario map has one clear test path for every listed capability.
- `task lint`, `task typecheck`, `task build`, and `task check` pass.
- The second consecutive `task test` run takes 15 seconds or less when practical. Record the measured time.
- GitHub Actions remains unchanged.
- Production changes are limited to accessibility or small testability improvements justified by a public browser boundary.
