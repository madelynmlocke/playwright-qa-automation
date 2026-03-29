import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;

        // home page and navigation selectors
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

        //slideshow slides and images
        this.firstSlide = page.getByText('AutomationExercise Full-').first();
        this.secondSlide = page.getByText('AutomationExercise Full-').nth(1);
        this.thirdSlide = page.getByText('AutomationExercise Full-').nth(2);

        this.firstImg = page.getByAltText('demo website for practice').nth(0);
        this.secondImg = page.getByAltText('demo website for practice').nth(1);
        this.thirdImg = page.getByAltText('demo website for practice').nth(2);

        this.nextArrow = page.locator('[data-slide="next"]');
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

    async assertFirstSlide() {
        await expect(this.firstSlide).toBeVisible();
    }

        async assertSecondSlide() {
        await expect(this.secondSlide).toBeVisible();
    }

        async assertThirdSlide() {
        await expect(this.thirdSlide).toBeVisible();
    }

    async nextSlide() {
        await this.nextArrow.click();
    }
}