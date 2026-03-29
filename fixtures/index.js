import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ContactPage } from '../pages/ContactPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { buildUser } from '../utils/userFactory.js';
import { createAccount, deleteAccount } from '../utils/apiClient.js';

export const test = base.extend({

    // Page object fixtures — replaces `new PageObject(page)` in beforeEach
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    contactPage: async ({ page }, use) => {
        const contactPage = new ContactPage(page);
        await use(contactPage);
    },

    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },

    // Authenticated user fixture — creates a real account via API before the
    // test runs and deletes it afterward, so UI tests that need a logged-in
    // user don't have to go through the registration flow every time
    authenticatedUser: async ({ page, request }, use) => {
        const loginPage = new LoginPage(page);
        const user = buildUser();

        await createAccount(request, user);
        await loginPage.gotoHomePage();
        await loginPage.goToLoginPage();
        await loginPage.login(user.email, user.password);
        await loginPage.assertLoggedIn();

        await use({ page, loginPage, user });

        await deleteAccount(request, user);
    },

    // Fresh user fixture — builds user data without creating the account,
    // for tests that need to go through the registration flow themselves
    freshUser: async ({}, use) => {
        const user = buildUser();
        await use(user);
    },

    // Logged out user fixture — goes to homepage and navigates to login page,
    // replaces the beforeEach block repeated across login spec tests
    loggedOutUser: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoHomePage();
        await loginPage.goToLoginPage();
        await use(loginPage);
    },

    // Products page fixture — navigates to products page and verifies it loaded,
    // replaces the beforeEach block in products.spec.js
    productsPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await productPage.gotoHomePage();
        await productPage.assertHomePageLoaded();
        await productPage.goToProductsPage();
        await productPage.assertAllProductsPageLoaded();
        await use(productPage);
    },

});

export { expect } from '@playwright/test';