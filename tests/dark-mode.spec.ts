import { test, expect, type Locator, type Page } from '@playwright/test';

const isDark = (page: Page) => page.evaluate(() => document.body.classList.contains('dark'));

// The spec does not name the button, so click each visible button in the nav
// until one flips the 'dark' class on <body>. Returns that button, already
// clicked once.
async function clickDarkToggle(page: Page): Promise<Locator> {
  const buttons = page.getByRole('navigation').getByRole('button');
  await expect(buttons.first(), 'a button in the nav').toBeVisible();
  for (const button of await buttons.all()) {
    if (!(await button.isVisible())) continue;
    const before = await isDark(page);
    await button.click();
    try {
      await expect.poll(() => isDark(page), { timeout: 1000 }).toBe(!before);
      return button;
    } catch {
      // Not the toggle; try the next button.
    }
  }
  throw new Error("No button in the nav toggles a 'dark' class on <body>");
}

test.beforeEach(async ({ page }) => {
  await page.goto('./');
});

// SPEC.md line 10
test("a button in the nav toggles a 'dark' class on <body>", async ({ page }) => {
  const initial = await isDark(page);
  const toggle = await clickDarkToggle(page);
  expect(await isDark(page)).toBe(!initial);
  await toggle.click();
  await expect.poll(() => isDark(page)).toBe(initial);
});

// SPEC.md line 11
// "Kept for the session" is read as: still applied after a reload in the same tab.
test('the dark-mode choice is kept for the session', async ({ page }) => {
  const initial = await isDark(page);
  await clickDarkToggle(page);
  await page.reload();
  await expect.poll(() => isDark(page)).toBe(!initial);
});
