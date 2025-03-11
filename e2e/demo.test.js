import { expect, test } from '@playwright/test';

test('test browser', async ({ page }) => {
    await page.goto('/')
    await page.pause()
  })
