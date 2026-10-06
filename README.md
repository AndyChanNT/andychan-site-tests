# andychan-site-tests

Functional tests for andychan-site, written with Playwright and TypeScript.

Tests are written from `SPEC.md` and run in Chromium against a live URL given by the `BASE_URL` environment variable.

## Setup

```sh
npm install
npx playwright install chromium
```

## Run

```sh
# bash
BASE_URL=https://example.com npm test
```

```powershell
# PowerShell
$env:BASE_URL = 'https://example.com'; npm test
```

The HTML report is written to `playwright-report/` (`npx playwright show-report`).
