import { test, expect } from '@playwright/test';

test('form shows validation errors for empty required fields', async ({ page }) => {
  await page.goto('https://example.com/contact');

  await page.click('button[type="submit"]');

  const nameError = page.locator('#name-error');
  const emailError = page.locator('#email-error');
  const messageError = page.locator('#message-error');

  await expect(nameError).toBeVisible();
  await expect(emailError).toBeVisible();
  await expect(messageError).toBeVisible();

  await expect(page).toHaveURL(/contact/);
});

import { test, expect } from '@playwright/test';

test('form rejects invalid email format', async ({ page }) => {
  await page.goto('https://example.com/contact');

  await page.fill('#name', 'Test User');
  await page.fill('#email', 'invalidemail');
  await page.fill('#message', 'Test message');

  await page.click('button[type="submit"]');

  const emailError = page.locator('#email-error');

  await expect(emailError).toBeVisible();
});