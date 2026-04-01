import { test, expect } from '../../fixtures/index.js';

test.describe('@ui @contactform Contact Form Validation Tests', () => {
    test('Test Case 6: Contact form fields are visible and user submits form @smoke', async ({ contactPage }) => {  
        await contactPage.goToHomePage();
        await contactPage.gotoContactPage();
        await contactPage.assertForm();
        await contactPage.fillForm('maddy', process.env.EMAIL_VALID, 'test', 'testing a message');
        await contactPage.handleDialogOnce();
        await contactPage.submitForm();
        await contactPage.assertSubmission();  
    });
});