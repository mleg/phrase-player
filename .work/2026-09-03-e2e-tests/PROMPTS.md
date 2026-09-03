# Agent Prompts

Run the implementation prompt from the repository root. Run the review prompt in a fresh agent session after implementation.

## Prompt 1: Implement the Suite

```text
Implement the agreed browser test plan in:
.work/2026-09-03-e2e-tests/PLAN.md

Read these files first:
- .work/2026-09-03-e2e-tests/DECISIONS.md
- .work/2026-09-03-e2e-tests/CONTEXT.md
- .work/2026-09-03-e2e-tests/RESEARCH.md
- .work/2026-09-03-e2e-tests/PLAN.md

Load and apply the Matt Pocock `codebase-design` and `tdd` skills. The public seams in PLAN.md are pre-agreed. Use the `tdd` rules for observable behavior, vertical slices, and boundary-only mocks.

This suite characterizes an existing application. A correct new test can pass on its first run. Do not manufacture a red state, alter production behavior to force a failure, or rewrite working code merely to satisfy a strict red-green ritual.

Work autonomously within the plan:

1. Inspect the repository and run the current lint, typecheck, and build baselines. Report any pre-existing failure before relying on it.
2. Add `@playwright/test` as the only test-framework dependency and update the npm lockfile.
3. Add Taskfile.yml and playwright.config.ts with one bundled Chromium project and the fast settings from the plan.
4. Add tiny real WAV/SRT fixture directories.
5. Implement the scenario map one vertical slice at a time. Run the narrowest Playwright command after each slice.
6. Add localized aria-labels only where icon-only controls lack stable accessible names. Prefer role, label, and visible-text locators. Avoid test IDs unless no meaningful accessible selector exists.
7. Treat media playback as an external boundary. Stub play/pause and drive currentTime/timeupdate deterministically. Do not use fixed sleeps or wait for real audio playback.
8. Keep tests independent and safe to run in parallel. Do not share browser storage between tests except within the single reload-restoration scenario.
9. Do not add Vitest, React Testing Library, snapshots, coverage thresholds, extra browsers, mobile projects, or GitHub Actions changes.
10. Finish by running task lint, task typecheck, task build, task test, and task check. Run task test a second time, measure the warm duration, and aim for 15 seconds or less.

Do not commit or push. At the end, list changed files, scenario coverage, commands and results, measured warm runtime, and any deliberate deviation from PLAN.md.
```

## Prompt 2: Review and Fix

```text
Review the uncommitted browser-test implementation against:
.work/2026-09-03-e2e-tests/PLAN.md

Start read-only. Inspect the diff and map every test to the plan's scenario table. Then run the suite and fix only concrete defects you can reproduce.

Check these points:
- Every listed user-facing capability has one representative path.
- Tests use public UI behavior and external browser boundaries, not MobX internals.
- Locators prefer roles, labels, and visible text.
- Media-clock simulation is deterministic and stays at the audio boundary.
- No fixed sleeps, unnecessary retries, real-time playback waits, snapshots, coverage tooling, or extra browser projects exist.
- Tests are independent and do not rely on execution order.
- Taskfile.yml is the developer-facing command surface.
- GitHub Actions is unchanged.
- Production changes are limited to justified accessibility or testability improvements.

Run task lint, task typecheck, task build, task test, and task check. Run task test twice and report the second duration. If it exceeds 15 seconds, identify the measured bottleneck before optimizing it. Preserve the agreed scenario coverage.

Do not commit or push. Report findings by severity, fixes made, final command results, and residual risks.
```

## Prompt 3: Diagnose a Slow Suite

Use this only if the warm suite misses its target.

```text
Use the Matt Pocock `diagnosing-bugs` skill to diagnose why local `task test` takes more than 15 seconds.

Read .work/2026-09-03-e2e-tests/PLAN.md. Reproduce the slowdown with two warm runs. Measure Vite startup, Chromium launch, fixture upload, and individual tests. Form one hypothesis at a time and test it with the smallest experiment.

Keep all agreed scenarios. Do not hide the problem with retries, larger timeouts, fixed sleeps, shared state, or weaker assertions. Prefer configuration and fixture-size fixes. Make a code change only after evidence identifies the cause.

Run the full validation after the fix. Do not commit or push. Report measurements before and after, the confirmed cause, the change, and any remaining limit.
```

## Optional Skill Installation

If an agent lacks the named Matt Pocock skills, run:

```sh
npx skills@latest add mattpocock/skills
```

Select `codebase-design`, `tdd`, and `diagnosing-bugs`. Skip `diagnosing-bugs` unless the suite misses the runtime target.
