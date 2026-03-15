import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {

  test('products navigation link redirects to products page', async ({ page }) => {
    await test.step('Navigate to homepage', async () => {
      await page.goto('/');
    });

    await test.step('Verify products navigation link is visible', async () => {
      const productsLink = page.getByRole('link', { name: /Products/i }).first();
      await expect(productsLink).toBeVisible();
    });

    await test.step('Click products navigation link', async () => {
      const productsLink = page.getByRole('link', { name: /Products/i }).first();
      await productsLink.click();
    });

    await test.step('Verify products page loads', async () => {
      await expect(page).toHaveURL(/\/products$/);
      await expect(page.getByText('All Products')).toBeVisible();
    });
  });

  test('contact us navigation link redirects to contact page', async ({ page }) => {
    await test.step('Navigate to homepage', async () => {
      await page.goto('/');
    });

    await test.step('Verify contact navigation link is visible', async () => {
      const contactLink = page.getByRole('link', { name: /Contact us/i }).first();
      await expect(contactLink).toBeVisible();
    });

    await test.step('Click contact navigation link', async () => {
      const contactLink = page.getByRole('link', { name: /Contact us/i }).first();
      await contactLink.click();
    });

    await test.step('Verify redirect to contact page', async () => {
      await expect(page).toHaveURL(/\/contact_us$/);
      await expect(page.getByRole('heading', { name: /Get In Touch/i }).first()).toBeVisible();
    });
  });

});