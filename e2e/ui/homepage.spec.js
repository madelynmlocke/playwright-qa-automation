import { test, expect } from '../../fixtures/index.js';

test.describe('@ui @home Homepage Tests', () => {
    test('@smoke test verifies key content...', async ({ homePage }) => {
        await homePage.gotoHomePage();
        await homePage.assertLayout();
        await homePage.assertLogo();
        await homePage.assertHero();
        await homePage.assertNavLinksVisible();
    });
});