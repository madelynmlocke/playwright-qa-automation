import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage'; 

test.describe('@ui @products Products page tests', () => {
    let productPage;

    test.beforeEach(async ({ page }) => { // goes back to homepage before each numbered test is run
        productPage = new ProductPage(page);
        
        await productPage.gotoHomePage();
        await productPage.assertHomePageLoaded();
        await productPage.goToProductsPage();
        await productPage.assertAllProductsPageLoaded();
    });

    test.only('Test Case 8: Verify All Products and product detail page', async () => {

        await productPage.assertProductsListVisible();
        await productPage.viewProductById(1);
        await productPage.assertProductDetailPageLoaded();
        await productPage.assertProductDetailFieldsVisible();
    });

    test('Test Case 9: Search Product', async () => {
        const searchTerm = 'Blue Top';

        await productPage.searchForProduct(searchTerm);
        await productPage.assertSearchedProductsVisible();
        await productPage.assertSearchResultsContain(searchTerm);
    });

    test('Test Case 12/17: Add/Remove Products in Cart', async ({ page }) => {

        await productPage.addProductToCartById(1);
        await productPage.continueShopping();
        await productPage.addProductToCartById(2);
        await productPage.viewCart();
        await productPage.removeProductFromCart(1);
    });
});