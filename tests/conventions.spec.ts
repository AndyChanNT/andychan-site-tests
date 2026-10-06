import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('./');
});

// SPEC.md line 4
test('all six sections exist: #hero #about #skills #projects #repos #contact', async ({ page }) => {
  for (const id of ['hero', 'about', 'skills', 'projects', 'repos', 'contact']) {
    await expect.soft(page.locator(`#${id}`), `#${id}`).toHaveCount(1);
  }
});

// SPEC.md line 5
test('no horizontal scroll at a viewport width of 375px', async ({ page }) => {
  // The spec gives no height; 667 is arbitrary.
  await page.setViewportSize({ width: 375, height: 667 });
  const overflow = () =>
    page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await expect.poll(overflow).toBeLessThanOrEqual(0);
});

// SPEC.md line 6
// The spec does not say what a card is, what the message says, or where the
// repos are fetched from, so the only thing checked here is that #repos ends
// up showing something. The cases below cannot be written from the spec.
test('#repos shows repo cards or a plain message', async ({ page }) => {
  await expect(page.locator('#repos')).toBeVisible();
  await expect(page.locator('#repos')).toHaveText(/\S/);
});

// SPEC.md line 6: unclear, no way to recognise a card or to know which repos to expect.
test.fixme('#repos lists the public GitHub repos as cards', async () => {});

// SPEC.md line 6: unclear, no message text and no fetch URL to block.
test.fixme('#repos shows a plain message if there are no repos or the fetch fails', async () => {});

// SPEC.md line 7
test('#hero and #contact contain links to email, GitHub and LinkedIn', async ({ page }) => {
  const links = {
    email: 'a[href^="mailto:"]',
    GitHub: 'a[href*="github.com"]',
    LinkedIn: 'a[href*="linkedin.com"]',
  };
  for (const section of ['#hero', '#contact']) {
    for (const [name, selector] of Object.entries(links)) {
      await expect
        .soft(page.locator(section).locator(selector).first(), `${name} link in ${section}`)
        .toBeVisible();
    }
  }
});
