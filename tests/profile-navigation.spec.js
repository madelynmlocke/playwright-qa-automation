import { test, expect } from '@playwright/test';

test('Profile navigation works after login', async ({ page }) => {
  await page.goto('https://your-site-url.com/login');

  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');

  await page.click('text=Profile');

  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.locator('h1')).toContainText('Profile');
});