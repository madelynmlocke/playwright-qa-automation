import { test, expect } from '../../fixtures/index.js';

test.describe('@ui @home Homepage Tests', () => {
    
    test('@smoke test verifies key content...', async ({ homePage }) => {
        await homePage.gotoHomePage();
        await homePage.assertLayout();
        await homePage.assertLogo();
        await homePage.assertHero();
        await homePage.assertNavLinksVisible();
    });


    //TODO: Slideshow assertion on Home page
    test('user can interact with slideshow and change screens', async ({ homePage }) => {

        await homePage.gotoHomePage();
        await homePage.assertFirstSlide();
        // await homePage.nextSlide();
        // await homePage.assertSecondSlide();
        // await homePage.nextSlide();
        // await homePage.assertThirdSlide();
        // await homePage.nextSlide();

    })
});