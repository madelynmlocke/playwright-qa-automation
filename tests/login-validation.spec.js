import { test, expect } from '@playwright/test';

test('user can login with valid credentials', async ({ page }) => {
  await page.goto('https://example.com/login');

  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password123');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('h1')).toContainText('Dashboard');
});

import { test, expect } from '@playwright/test';

test('login fails when password field is empty', async ({ page }) => {
  await page.goto('https://example.com/login');

  await page.fill('#username', 'testuser');
  await page.fill('#password', '');

  await page.click('button[type="submit"]');

  await expect(page.locator('.error')).toBeVisible();
  await expect(page).toHaveURL(/login/);
});