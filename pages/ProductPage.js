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

        //Cart page
        this.cartLink = page.getByRole('link', { name: /Cart/i }).first();

        //Add Product to Cart
        this.continueButton = page.getByRole('button', { name: /continue shopping/i });
        this.viewCartButton = page.getByRole('link', { name: /view cart/i });
        this.quantityButton = page.locator('button.disabled');
        this.deleteButton = page.locator('a.cart_quantity_delete');

        // Categories
        this.categoryHeading = page.getByRole('heading', { name: 'Category' });
        this.womenCategory = page.getByRole('link', { name: /Women/i });
        this.subCategoryDress = page.getByRole('link', { name: 'Dress' });

        this.subHeading = page.locator('h2.title.text-center');

        // Brands 
        this.brandHeading = page.getByRole('heading', { name: 'Brands' });
        this.brandPolo = page.getByRole('link', { name: /Polo/i });

        //Ad overlay close button
        this.closeBtn = page.getByRole('button', { name: 'Close ad' });
    }

    async assertCategories() {
        await expect(this.categoryHeading).toBeVisible();
        await expect(this.womenCategory).toBeVisible();
        await this.womenCategory.click();
        await expect(this.subCategoryDress).toBeVisible();
        await this.subCategoryDress.click();
    }

    async assertSubCategoryPage(sub) {
        await expect(this.page).toHaveURL(/category_products\/\d+/);
        await expect(this.subHeading).toContainText(sub);
    }

    async assertBrand() {
        await expect(this.brandHeading).toBeVisible();
        await expect(this.brandPolo).toBeVisible();
        await this.brandPolo.click();
    }

    async assertBrandPage(sub) {
        await expect(this.page).toHaveURL(/brand_products\/Polo/i);
        await expect(this.subHeading).toContainText(sub);
    }

    async assertSubHeading(sub) {
        await expect(this.subHeading).toContainText(sub);
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

    async goToCart() {
        await expect(this.cartLink).toBeVisible();
        await this.cartLink.click();
    }

    async addProductToCart(productId) {
        const button = this.page.locator(`[data-product-id="${productId}"]`).first();
        
        await button.scrollIntoViewIfNeeded();
        await button.click();
    }

    async addVisibleProductsToCart() {
        const count = await this.productCards.count();

        for(let i = 0; i < count; i++) {
            const addButton = this.productCards.nth(i).locator('[data-product-id]').first();
            await addButton.scrollIntoViewIfNeeded();
            await addButton.click();
            await expect(this.continueButton).toBeVisible();

             if (i === count - 1) {
                await this.viewCartButton.click();
            } else {
                await this.continueButton.click();
            }
        }
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

    async clearCart() {
        const count = await this.deleteButton.count();
        for(let i = 0; i < count; i++) {
            await this.deleteButton.first().click();
        }
    }

    async assertQuantity(qty) {
        await expect(this.quantityButton).toHaveText(qty);
    }

    async assertProductInCart(productId) {
        await expect(this.page.locator(`#product-${productId}`)).toBeVisible();
    }

    async assertProductsInCart(searchTerm) {
        const cartItems = this.page.locator('td.cart_description');
        const count = await cartItems.count();
        expect(count).toBeGreaterThan(0);

        for(let i = 0; i < count; i++) {
            await expect(cartItems.nth(i)).toContainText(new RegExp(searchTerm, 'i'));
        }
    }

    async assertProductNotInCart(productId) {
        await expect(this.page.locator(`#product-${productId}`)).toHaveCount(0);
    }

    async searchForProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
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