import { test } from '../../fixtures/index.js';

test.describe('@ui @products Products page tests', () => {

    test.afterEach(async ({ productsPage }) => {
        await productsPage.goToCart();
        await productsPage.clearCart();
    });

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
        await productsPage.clickFirstViewProduct(); // ad pops up on clicking view product
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

    test('Test Case 13: Verify product quantity in cart @regression', async ({ productsPage }) => {
		await productsPage.addProductToCart(5);
        await productsPage.continueShopping();
        await productsPage.addProductToCart(5);
        await productsPage.viewCart();
        await productsPage.assertQuantity('2');
	});

	test.only('Test Case 18: View category products and verify sub category @smoke', async ({ productsPage }) => {
        await productsPage.assertCategories();
        await productsPage.assertSubCategoryPage(/women/i);
	});

	test('Test Case 19: View and cart brand products @smoke', async ({ productsPage }) => {
        await productsPage.assertBrand();
        await productsPage.assertBrandPage(/polo/i);        
	});

    test('Test Case 20: Search Products and Verify Cart After Login @regression @integration', async ({ productsPage, loginPage }) => {      
        const searchTerm = 'jeans';
        await productsPage.assertSubHeading(/all products/i);
        await productsPage.searchForProduct(searchTerm);
        await productsPage.assertSearchedProductsVisible();   
        await productsPage.assertSearchResultsContain(searchTerm);
        await productsPage.addVisibleProductsToCart();
        await loginPage.goToLoginPage();
        await loginPage.login(process.env.EMAIL_VALID, process.env.PASSWORD_VALID);
        await loginPage.assertLoggedIn();
        await productsPage.goToCart();
        await productsPage.assertProductsInCart(searchTerm);
    });

});