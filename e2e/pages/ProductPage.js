import { test, expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;

    }

    async gotoHomePage() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
        await expect(this.page).toHaveTitle(/Automation Exercise/i);
    }

    async assertLayout() {

    }

}