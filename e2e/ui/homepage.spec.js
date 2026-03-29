import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage'; 

test.describe('@ui @home Homepage Tests', () => {
  
  test(' @smoke test verifies key content and navigation elements', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHomePage();
    await homePage.assertLayout();
    await homePage.assertLogo();
    await homePage.assertHero();
    await homePage.assertNavLinksVisible();
  });
});