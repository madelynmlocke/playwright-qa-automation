import { test, expect } from '@playwright/test';

test('form validation prevents submission when required fields are empty', async ({ page }) => {
  await page.goto('https://example.com/contact');

  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();

  const errorMessages = page.locator('.error, .validation-error');
  await expect(errorMessages.first()).toBeVisible();

  await expect(page).toHaveURL(/contact/);
});

test('form rejects invalid email format', async ({ page }) => {
  await page.goto('https://example.com/contact');

  await page.fill('#name', 'Test User');
  await page.fill('#email', 'invalidemail');
  await page.fill('#message', 'Test message');

  await page.click('button[type="submit"]');

  const emailError = page.locator('#email-error');
  await expect(emailError).toBeVisible();
});