import { test, expect } from '../../fixtures/index.js';

test.describe('@ui @products Products page tests', () => {

    test('Test Case 8: Verify All Products and product detail page @smoke', async ({ productsPage }) => {
        await productsPage.assertProductsListVisible();
        await productsPage.viewProductById(1);
        await productsPage.assertProductDetailPageLoaded();
        await productsPage.assertProductDetailFieldsVisible();
    });

    test('Test Case 9: Search Product @regression', async ({ productsPage }) => {
        const searchTerm = 'Blue Top';
        await productsPage.searchForProduct(searchTerm);
        await productsPage.assertSearchedProductsVisible();
        await productsPage.assertSearchResultsContain(searchTerm);
    });

    test('Test Case 12/17: Add/Remove Products in Cart @regression', async ({ productsPage }) => {
        await productsPage.addProductToCart(1);
        await productsPage.continueShopping();
        await productsPage.addProductToCart(2);
        await productsPage.viewCart();
        await productsPage.assertProductInCart(1);
        await productsPage.assertProductInCart(2);
        await productsPage.removeProductFromCart(1);
        await productsPage.assertProductNotInCart(1);
    });
});