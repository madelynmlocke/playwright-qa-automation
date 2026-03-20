import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage'; 

test.describe('Contact Form Validation Tests', () => {
  test.only('contact form fields are visible and user submits form', async ({ page }) => {
    const contactPage = new ContactPage(page);
    //await page.pause();

    await contactPage.goToHomePage();
    await contactPage.gotoContactPage();
    await contactPage.assertForm();
    await contactPage.fillForm('maddy', 'test@test.com', 'test', 'testing a message');

    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.click('[data-qa="submit-button"]');
    await contactPage.assertSubmission();

  });

  test('contact form accepts valid input and submits successfully', async ({ page }) => {
    await test.step('Navigate to contact page', async () => {
      await page.goto('/contact_us');
    });

    await test.step('Fill out contact form with valid input', async () => {
      await page.fill('[data-qa="name"]', 'Maddy Locke');
      await page.fill('[data-qa="email"]', 'maddy@example.com');
      await page.fill('[data-qa="subject"]', 'QA Automation Test');
      await page.fill('[data-qa="message"]', 'This is a Playwright test submission.');
    });

    await test.step('Handle confirmation dialog', async () => {
      page.once('dialog', async (dialog) => {
        await dialog.accept();
      });
    });

    await test.step('Submit the form', async () => {
      await page.click('[data-qa="submit-button"]');
    });

    await test.step('Verify successful submission message appears', async () => {
      const successMessage = page.locator('.status.alert.alert-success');
      await expect(successMessage).toBeVisible();
      await expect(successMessage).toContainText('Success! Your details have been submitted successfully.');
    });

  });

});