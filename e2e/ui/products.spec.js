import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage'; 

test.describe('Products Page Verification', () => {
    test('', async ({ page }) => {
        const productPage = new ProductPage(page);


    });

});