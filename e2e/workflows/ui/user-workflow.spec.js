import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage.js';
import { ProductPage } from '../../../pages/ProductPage.js';
import { buildUser } from '../../../utils/userFactory.js';


test.describe('@ui @workflow End to end user workflow', () => {
    test('User can complete full lifecycle via UI', async({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const user = buildUser();

        // Go to Home page
        await loginPage.gotoHomePage();

        // Sign up
        await loginPage.goToLoginPage();
        await loginPage.assertSignUpForm();
        await loginPage.signUp(user.name, user.email);
        await loginPage.assertFormHeading();

        // Fill form + create account
        await loginPage.fillForm(user);
        await loginPage.assertAccountCreated();
        await page.getByRole('link', { name: 'Continue' }).click();
        await loginPage.assertLoggedIn();

        // Navigate to products 
        await productPage.goToProductsPage();
        await productPage.assertAllProductsPageLoaded();

        // Search for a product
        const searchTerm = 'Winter Top';

        await productPage.searchForProduct(searchTerm);
        await productPage.assertSearchedProductsVisible();
        await productPage.assertSearchResultsContain(searchTerm);

        // Add products to cart
        await productPage.addProductToCart(5);
        await productPage.continueShopping();
        await productPage.goToProductsPage();
        await productPage.assertAllProductsPageLoaded();
        await productPage.addProductToCart(2);

        // Go to cart + remove a product
        await productPage.viewCart();
        await productPage.assertProductInCart(2);
        await productPage.assertProductInCart(5);
        await productPage.removeProductFromCart(2);
        await productPage.assertProductNotInCart(2);

        // Delete account
        await loginPage.deleteAccount();

    });
});