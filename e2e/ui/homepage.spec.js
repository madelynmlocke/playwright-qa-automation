import { test, expect } from '../../fixtures/index.js';

test.describe('@ui @home Homepage Tests', () => {
    
    test('@smoke test verifies key content', async ({ homePage }) => {    
        await homePage.gotoHomePage();
        await homePage.assertLayout();
        await homePage.assertLogo();
        await homePage.assertHero();
        await homePage.assertNavLinksVisible();
    });

    test('user can interact with slideshow and change screens @regression', async ({ homePage }) => {
        await homePage.gotoHomePage();
        await homePage.assertFirstSlide();
        await homePage.nextSlide();
        await homePage.assertSecondSlide();
        await homePage.nextSlide();
        await homePage.assertThirdSlide();
        await homePage.nextSlide();
    });

    test('user can redirect to pages with navigation @regression', async ({ homePage }) => {
        await homePage.gotoHomePage();
        await homePage.assertNavLinksNavigate();
    });

    test('verify scroll up and scroll down functionality using arrow button @integration @regression', async ({ homePage, page}) => {
        await homePage.gotoHomePage();
        await homePage.scrollDown(page);
        await homePage.scrollWithPageDown(page);
        await homePage.assertSub();
        await homePage.scrollWithButton();
    });
});