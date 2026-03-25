import { expect } from '@playwright/test';

export class ProductPage {
    constructor(page) {
        this.page = page;

        // Top nav / page headings
        this.productsNavLink = page.getByRole('link', { name: /products/i });
        this.allProductsHeading = page.getByRole('heading', { name: /all products/i });
        this.searchedProductsHeading = page.getByRole('heading', { name: /searched products/i });

        // Product list / cards
        this.productCards = page.locator('.features_items .product-image-wrapper');
        this.viewProductLinks = page.getByRole('link', { name: /view product/i });

        // Search
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');

        // Product detail page
        this.productInfo = page.locator('.product-information');
        this.productName = this.productInfo.locator('h2');

        //Add Product to Cart
        this.continueButton = page.getByRole('button', { name: /continue shopping/i });
        this.viewCartButton = page.getByRole('link', { name: /view cart/i });

        //Ad overlay close button
        this.closeBtn = page.getByRole('button', { name: 'Close ad' });
    }

    async gotoHomePage() {
        await this.page.goto('/');
    }

    async goToProductsPage() {
    //await this.page.goto('/products');
    await expect(this.productsNavLink).toBeVisible();
    await this.productsNavLink.click();

    await this.page.waitForLoadState('domcontentloaded');

    // If ad close button appears, try closing it
    if (this.page.url().includes('google_vignette')) {
        if (await this.closeBtn.isVisible().catch(() => false)) {
            await this.closeBtn.click();
            await this.page.waitForLoadState('domcontentloaded');
        } else {
            await this.page.goBack();
            await expect(this.productsNavLink).toBeVisible();
            await this.productsNavLink.click();
        }
    }
    
    await this.page.waitForURL(/\/products$/);
    console.log('Current URL after clicking Products:', this.page.url());
    }

    async assertHomePageLoaded() {
        await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
    }

    async assertAllProductsPageLoaded() {
        await expect(this.allProductsHeading).toBeVisible();

    }

    async assertProductsListVisible() {
        const count = await this.productCards.count();
        expect(count).toBeGreaterThan(0);
        await expect(this.productCards.first()).toBeVisible();
    }

    async clickFirstViewProduct() { //hardcoding first view product, bug found as result
        await this.viewProductLinks.first().click();
    }

    async viewProductById(productId) {
        await this.page.locator(`a[href="/product_details/${productId}"]`).first().click();
        await this.page.waitForLoadState('domcontentloaded');

        if (!this.page.url().includes('/product_details/')) {
            await this.page.goto(`/product_details/${productId}`);
        }
    }

    async assertProductDetailPageLoaded() {
        await expect(this.page).toHaveURL(/\/product_details\/\d+/);
        await expect(this.productInfo).toBeVisible();
    }

    async assertProductDetailFieldsVisible() {
        await expect(this.productName).toBeVisible();
        await expect(this.productInfo).toContainText(/category:/i);
        await expect(this.productInfo).toContainText(/rs\./i);
        await expect(this.productInfo).toContainText(/availability:/i);
        await expect(this.productInfo).toContainText(/condition:/i);
        await expect(this.productInfo).toContainText(/brand:/i);
    }

    async searchForProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async addProductToCart(productId) {
        const button = this.page.locator(`[data-product-id="${productId}"]`).first();
        
        await button.scrollIntoViewIfNeeded();
        await button.click();
    }

    async removeProductFromCart(productId) {
        const button = this.page.locator(`[data-product-id="${productId}"].cart_quantity_delete`);
        await button.click();
    }

    async continueShopping() {
        await this.continueButton.click();
    }

    async viewCart() {
        await this.viewCartButton.click();
    }

    async assertSearchedProductsVisible() {
        await expect(this.searchedProductsHeading).toBeVisible();
    }

    async assertSearchResultsContain(searchTerm) {
        const count = await this.productCards.count();
        await expect(this.productCards.first()).toBeVisible();

        for (let i = 0; i < count; i++) {
        await expect(this.productCards.nth(i)).toContainText(new RegExp(searchTerm, 'i'));
        }
    }
}