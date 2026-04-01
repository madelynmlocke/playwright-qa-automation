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

        this.productsLink = page.getByRole('link', { name: ' Products' });
        this.cartsLink = page.getByRole('link', { name: ' Cart' });
        this.loginLink = page.getByRole('link', { name: ' Signup / Login' });
        this.testsLink = page.getByRole('link', { name: ' Test Cases' });
        this.apiTestsLink = page.getByRole('link', { name: ' API Testing' });
        this.contactLink = page.getByRole('link', { name: ' Contact us' });


        //slideshow slides and images
        this.firstSlide = page.getByText('AutomationExercise Full-').first();
        this.secondSlide = page.getByText('AutomationExercise Full-').nth(1);
        this.thirdSlide = page.getByText('AutomationExercise Full-').nth(2);

        this.firstImg = page.getByAltText('demo website for practice').nth(0);
        this.secondImg = page.getByAltText('demo website for practice').nth(1);
        this.thirdImg = page.getByAltText('demo website for practice').nth(2);

        this.nextArrow = page.locator('[data-slide="next"][href="#slider-carousel"]');

        this.popUpAd = page.locator('iframe[name="aswift_3"]');
        this.adButton = page.locator('iframe[name="aswift_3"]').contentFrame().getByRole('button', { name: 'Close ad' });
    }

    async gotoHomePage() {
    // Block ad requests before navigating
    await this.page.route('**/*', (route) => {
        const url = route.request().url();
        if (url.includes('googlesyndication') || 
            url.includes('doubleclick') || 
            url.includes('adservice') ||
            url.includes('googletagmanager')) {
            route.abort();
        } else {
            route.continue();
        }
    });

    await this.page.goto('/');
    await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
}

    async assertNavLinksNavigate() {
        const expectedUrls = {
            'Products': /\/products/,
            'Cart': /\/view_cart/,
            'Signup / Login': /\/login/,
            'Test Cases': /\/test_cases/,
            'Contact us': /\/contact_us/,
        };

        for (const [linkText, urlPattern] of Object.entries(expectedUrls)) {
            await this.dismissAdOverlay();
            await this.page.locator(`a:has-text("${linkText}")`).first().click();
            await expect(this.page).toHaveURL(urlPattern);
            await this.gotoHomePage();
        }
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

    async 

    async assertFirstSlide() {
        await expect(this.firstSlide).toBeVisible();
        await expect(this.firstImg).toBeVisible();
    }

        async assertSecondSlide() {
        await expect(this.secondSlide).toBeVisible();
        await expect(this.secondImg).toBeVisible();
    }

        async assertThirdSlide() {
        await expect(this.thirdSlide).toBeVisible();
        await expect(this.thirdImg).toBeVisible();
    }

    async nextSlide() {
        await this.dismissAdOverlay();
        await this.nextArrow.click();
        await this.dismissAdOverlay();
    }

    async dismissAdOverlay() {
        try {
            // Wait briefly to see if an ad close button appears
            await this.adButton.waitFor({ state: 'visible', timeout: 2000 });
            await this.adButton.click();
        } catch {
            // No ad present, continue
        }
    }
}
