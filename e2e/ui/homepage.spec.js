import { test, expect } from '../../fixtures/index.js';

test.describe('@ui @home Homepage Tests', () => {
    
    test('@smoke test verifies key content...', async ({ homePage }) => {
        await homePage.gotoHomePage();
        await homePage.assertLayout();
        await homePage.assertLogo();
        await homePage.assertHero();
        await homePage.assertNavLinksVisible();
    });

    test('user can interact with slideshow and change screens', async ({ homePage }) => {

        await homePage.gotoHomePage();
        await homePage.assertFirstSlide();
        await homePage.nextSlide();
        await homePage.assertSecondSlide();
        await homePage.nextSlide();
        await homePage.assertThirdSlide();
        await homePage.nextSlide();
    });

    test('user can redirect to pages with navigation', async ({ homePage }) => {

        await homePage.gotoHomePage();
        await homePage.assertNavLinksNavigate();

    });
});