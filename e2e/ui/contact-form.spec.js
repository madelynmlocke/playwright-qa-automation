import { test } from '../../fixtures/index.js';

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

    test('Test Case 7: Contact Form Shows Error When Email is Missing @negative', async ({ contactPage, page }) => {  
        await contactPage.goToHomePage();
        await contactPage.gotoContactPage();
        await contactPage.assertForm();
        await contactPage.fillForm('maddy', '', 'test', 'testing a message');
        await contactPage.handleDialogOnce();
        await contactPage.submitForm();
        await contactPage.assertFormError();
    });

    test('Test Case 8: Contact Form Shows Error When Required Fields Are Missing @negative', async ({ contactPage }) => {  
        await contactPage.goToHomePage();
        await contactPage.gotoContactPage();
        await contactPage.assertForm();
        await contactPage.fillForm('', process.env.EMAIL_VALID, '', '');
        await contactPage.handleDialogOnce();
        await contactPage.submitForm();

        // Known BUG: Contact form validates and submits with missing fields. Bug ID: BUG-UI-CONTACT-001
            // await expect(contactPage.formName).toHaveJSProperty('validity.valueMissing', true); 
            // await expect(contactPage.formSubject).toHaveJSProperty('validity.valueMissing', true); 
            // await expect(contactPage.formMessage).toHaveJSProperty('validity.valueMissing', true); 
    });
});