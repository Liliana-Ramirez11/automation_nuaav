## Prerequisites

- **Node.js version**: Recommended **Node.js 18+** (LTS).  
  Check your version with:

```bash
node -v
```

- **Install project dependencies**:

```bash
npm install
```

- **Install Playwright with browsers and system dependencies**:

```bash
npx playwright install --with-deps
```

## How to run all tests

- **Run the whole test suite**:

```bash
npx playwright test
```

or using the npm script:

```bash
npm test
```

- **What is expected to happen**:
  - All tests defined under `tests/` are executed in the projects configured in `playwright.config.ts` (including the `setup` project and the configured browsers).
  - **Screenshots and traces** are generated only on failure (according to `screenshot: 'only-on-failure'` and `trace: 'on-first-retry'`).
  - An **HTML report** is generated in the `playwright-report` folder.

## How to run a specific test

- **Run a test file** (by path):

```bash
npx playwright test tests/login.spec.ts
```

- **Run a test by name** (using `-g` with the test title):

```bash
npx playwright test -g "should allow a valid login"
```

(Replace `"should allow a valid login"` with the exact `test(...)` title you want to run.)

## How to view the HTML report

- **Generate and open the HTML report** after running tests:

```bash
npx playwright show-report
```

or with the npm script:

```bash
npm run test:report
```

This will open the generated HTML report in your browser, including status, duration, screenshots, and traces for each run.

## Design decisions

- **Page Object Model (POM) structure**: The page layer (`pages/`, e.g. `LoginPage.ts`) encapsulates selectors and high-level actions (such as `login`, `fillCredentials`, etc.), so that tests remain **readable and decoupled** from DOM changes. This allows new scenarios to be built by composing existing methods.
- **Test isolation strategy**: Each test runs in its own browser context and relies on `storageState.json` generated in the `setup` project. This avoids repeating login flows in every test while keeping **logical isolation** (each test controls its own data and assumptions) without sacrificing performance.
- **Time-driven trade-offs / technical decisions**: A simple project configuration (`setup`, `chromium`, `firefox`, `login-tests`) was preferred instead of a more complex matrix of environments and datasets to favour **maintainability and speed of iteration**. Global settings (`slowMo`, `--start-maximized`, `screenshot: 'only-on-failure'`) were chosen to make visual debugging easier at the cost of slightly longer execution time in CI.

## Onboarding a Junior Engineer

This repository is designed so that a junior engineer can progressively learn Playwright and good automation practices while working on a realistic, browser-based application. The ideal starting point is to read `playwright.config.ts` to understand how projects are defined, how the `setup` project works, and how `storageState.json` is used to reuse authenticated state. Next, it is recommended to open the tests under `tests/` and follow the flow of an end‑to‑end scenario, identifying which parts live in the Page Objects and which live in the test logic. During this first pass, focus less on implementation details and more on the overall story the test is telling from the user’s perspective.

When you need to create a new scenario, first ask yourself whether a method is missing in the POM layer; if so, add it there and keep it **generic** (no assertion logic). Then, in the test, combine those page methods with `expect` calls to describe the behaviour you want to validate, keeping assertions explicit and business-focused. If something fails, run the test in isolation using `npx playwright test <path> -g "<test name>"`, check the terminal output, and then inspect the HTML report with `npx playwright show-report` to review screenshots and traces. Over time, try to keep a consistent naming convention for tests and Page Object methods so that failures are easy to trace back to specific behaviours. Finally, any significant change you make should be documented briefly in this `README.md` or in high‑level comments in the tests, so the next junior engineer clearly understands the intent behind the automation and can continue to evolve the suite without fear of breaking existing coverage.

## Note on AI usage

Part of this `README.md` and the documentation was generated with the help of an AI tool to speed up writing, but all instructions, commands, and technical decisions have been manually reviewed and adapted to this project’s context.

