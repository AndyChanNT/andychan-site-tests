# andychan-site-tests

Functional tests for andychan-site, written with Playwright and TypeScript.

Tests are written from `SPEC.md` and run against a live URL given by the `BASE_URL` environment variable.

```sh
BASE_URL=https://example.com npx playwright test
```
