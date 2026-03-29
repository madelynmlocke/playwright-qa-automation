import { test, expect } from '../../../fixtures/index.js';

test.describe.only('End to end user workflow @ui @workflow', () => {

    test('User can complete full lifecycle via UI @regression', async ({ authenticatedUser, productPage }) => {
        const { page, loginPage } = authenticatedUser;

        await productPage.goToProductsPage();
        await productPage.assertAllProductsPageLoaded();

        const searchTerm = 'Winter Top';
        await productPage.searchForProduct(searchTerm);
        await productPage.assertSearchedProductsVisible();
        await productPage.assertSearchResultsContain(searchTerm);

        await productPage.addProductToCart(5);
        await productPage.continueShopping();
        await productPage.goToProductsPage();
        await productPage.assertAllProductsPageLoaded();
        await productPage.addProductToCart(2);

        await productPage.viewCart();
        await productPage.assertProductInCart(2);
        await productPage.assertProductInCart(5);
        await productPage.removeProductFromCart(2);
        await productPage.assertProductNotInCart(2);

        await loginPage.deleteAccount();
    });
});