# Agreed Test Direction

- Use browser end-to-end tests only.
- Cover every user-facing capability through representative happy paths.
- Avoid exhaustive combinations, rare edge cases, and meticulous validation.
- Run tests locally through Taskfile tasks.
- Do not add the browser suite to GitHub Actions because CI runtime is outside this effort.
- Run against Playwright's bundled Chromium only.
- Aim for a warm local `task test` run of 15 seconds or less. Browser installation time is separate.
- Cover each visible capability through one representative path. Do not test every state combination.
- Use tiny real WAV and SRT fixtures. Simulate the media clock when a test needs an audio-time event.
- Permit small accessibility changes, such as localized `aria-label` attributes, when they provide stable user-facing selectors.
