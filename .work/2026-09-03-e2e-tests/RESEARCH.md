# Browser Test Stack Research

Audience: the Phrase Player owner and the agents that will add its first test suite.

Checked on 2026-09-03.

## Project Fit

Phrase Player is a React 19, TypeScript 5.9, and Vite 7 client application. It has no backend and no current test framework. Its main journey uses a directory file input, `FileReader`, object URLs, an audio element, IndexedDB through Dexie, local storage, clipboard access, and keyboard events.

A simulated DOM would need substitutes for many of these browser boundaries. A real browser covers them with less custom test infrastructure.

## Options

### Playwright

Playwright provides a browser runner, assertions, automatic waiting, isolated browser contexts, and directory upload support. Its file-upload API can assign a directory to an input with the `webkitdirectory` attribute. This directly matches Phrase Player's entry point.

The main cost is browser and Vite startup. One bundled Chromium project and a small suite keep that cost bounded.

Sources:

- [Playwright installation](https://playwright.dev/docs/intro)
- [File and directory uploads](https://playwright.dev/docs/input#upload-files)
- [Locator guidance](https://playwright.dev/docs/locators)
- [Test best practices](https://playwright.dev/docs/best-practices)
- [Web server configuration](https://playwright.dev/docs/test-webserver)
- [Parallel execution](https://playwright.dev/docs/test-parallel)

### Vitest with React Testing Library

Vitest and React Testing Library would give faster feedback for isolated stores and components. Page-level tests would still need substitutes for the browser APIs listed above. Maintaining both Vitest and Playwright would also create two test environments for a small project.

This remains a good later option if a component or store develops enough logic to need focused tests.

Sources:

- [Vitest environments](https://vitest.dev/guide/environment.html)
- [React Testing Library introduction](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library query priorities](https://testing-library.com/docs/queries/about/)

### Vitest Browser Mode

Vitest Browser Mode runs tests in a real browser and is stable in Vitest 4. It still needs a browser provider and framework renderer. That setup overlaps with Playwright while providing little benefit for this first, user-journey-focused suite.

Sources:

- [Vitest Browser Mode](https://vitest.dev/guide/browser/)
- [Vitest 4 announcement](https://vitest.dev/blog/vitest-4)

## Decision

Use Playwright alone. Run a small set of independent end-to-end tests against Playwright's bundled Chromium. Keep the suite local and expose every command through `Taskfile.yml`.

This choice favors one real environment and one test framework. It accepts slower startup than store-level Vitest tests. The 15-second warm-run target limits that cost.

## Matt Pocock Skills

The current catalog has no skill dedicated to Playwright, React testing, or end-to-end tests. The useful implementation pair is `tdd` with its required `codebase-design` reference. Use their public-seam, observable-behavior, vertical-slice, and boundary-mocking rules.

Strict red-green work only partly fits characterization tests for existing behavior. A new test may pass on its first correct run. Agents must not manufacture a failure or change production code to create one.

The `research` skill is useful when this stack choice needs fresh validation later. The full `to-spec`, `to-tickets`, `implement`, and `code-review` chain adds too much process for this pet-project pass.

Sources:

- [Matt Pocock skill catalog](https://www.aihero.dev/skills)
- [TDD skill](https://www.aihero.dev/skills-tdd)
- [Codebase-design skill](https://www.aihero.dev/skills-codebase-design)
- [Research skill](https://www.aihero.dev/skills-research)

Install selected skills with the interactive command below if the target agent lacks them:

```sh
npx skills@latest add mattpocock/skills
```

Select `tdd` and `codebase-design`. The interactive route avoids current ambiguity in some `skills` CLI versions around single-skill flags.

## Task Runner

Go Task is already installed locally. The Taskfile will be the developer-facing command surface. npm will remain the dependency manager, and existing npm scripts will remain for compatibility.

Source: [Go Task usage guide](https://taskfile.dev/docs/guide)

## ADR Decision

No ADR is warranted. This test-runner choice is isolated and cheap to reverse, so it does not meet the project's ADR threshold.
