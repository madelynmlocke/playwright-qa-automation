import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;

        this.header = page.locator('header');
        this.footer = page.locator('footer');
        this.logo = page.locator('img[alt="Website for automation practice"]');
        this.hero = page.getByRole('heading', {name: /Full-Fledged practice website for Automation Engineers/i});
        this.navLinkTexts = [
            'Home',
            'Products',
            'Cart',
            'Signup / Login',
            'Test Cases',
            'API Testing',
            'Video Tutorials',
            'Contact us'
        ];
    }

    async gotoHomePage() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
        await expect(this.page).toHaveTitle(/Automation Exercise/i);
    }

    async assertLayout() {
        await expect(this.header).toBeVisible();
        await expect(this.footer).toBeVisible();
    }

    async assertLogo() {
        await expect(this.logo).toBeVisible();
    }

    async assertNavLinksVisible() {
        for (const linkText of this.navLinkTexts) {
            await expect(
                this.page.locator(`a:has-text("${linkText}")`).first()
            ).toBeVisible();
        }
    }

    async assertHero() {
        await expect(this.hero).toBeVisible();
    }
}