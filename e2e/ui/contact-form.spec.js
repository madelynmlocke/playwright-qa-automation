import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage'; 

test.describe('Contact Form Validation Tests', () => {
  test.only('Test Case 6: Contact form fields are visible and user submits form', async ({ page }) => {
    const contactPage = new ContactPage(page);
    //await page.pause();

    await contactPage.goToHomePage();
    await contactPage.gotoContactPage();
    //await page.goto('/contact_us');

    await Promise.all([
      page.waitForURL('**/contact_us'),
      page.locator('a[href="/contact_us"]').click()
    ]);

    await contactPage.assertForm();
    await contactPage.fillForm('maddy', process.env.EMAIL_VALID, 'test', 'testing a message');
    await contactPage.handleDialogOnce();
    await contactPage.submitForm();
    await contactPage.assertSubmission();

  });
});