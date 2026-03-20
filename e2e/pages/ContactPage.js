import { expect } from '@playwright/test';

export class ContactPage {
    constructor(page) {
        this.page = page;
        
        this.contactLink = page.getByRole('link', { name: /contact us/i }); 

        this.contactHeading = page.getByRole('heading', { name: /Get In Touch/i }); 
        this.formName = page.locator('[data-qa="name"]');
        this.formEmail = page.locator('[data-qa="email"]');
        this.formSubject = page.locator('[data-qa="subject"]');
        this.formMessage = page.locator('[data-qa="message"]');
        this.formButton = page.locator('[data-qa="submit-button"]');

        this.successMessage = page.locator('.status.alert.alert-success');
    }

    async goToHomePage() {
        await this.page.goto('/');
    }

    async gotoContactPage() {
        await expect(this.contactLink).toBeVisible();
        await this.contactLink.click();
    }

    async assertForm() {
        await expect(this.contactHeading).toBeVisible();
        await expect(this.formName).toBeVisible();
        await expect(this.formEmail).toBeVisible();
        await expect(this.formSubject).toBeVisible();
        await expect(this.formMessage).toBeVisible();
        await expect(this.formButton).toBeVisible();
    }

    async fillForm(name, email, subject, message) {
        await this.formName.fill(name);
        await this.formEmail.fill(email);
        await this.formSubject.fill(subject);
        await this.formMessage.fill(message);
    }

    async handleDialogOnce() {
        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });
    }

    async submitForm() {
        await this.formButton.click();
    }

    async assertSubmission() {
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText('Success! Your details have been submitted successfully.');
    }

}