import { test, expect } from '@playwright/test';
import { assertProduct, assertProductsResponse } from '../../../utils/apiAssertions.js';
import { assertBrandsResponse } from '../../../utils/apiAssertions.js';
import { searchProduct } from '../../../utils/apiClient.js';

test.describe('products -> brands -> search @api @workflow', () => {
    
    test('product data stays consistent across catalog, brands, and search endpoints @regression', async ({ request }) => {
        // 1) Get all products
        const productsResponse = await request.get('/api/productsList');
        expect(productsResponse.status()).toBe(200);

        const productsBody = await productsResponse.json();
        assertProductsResponse(productsBody);

        // Pick a real product from the API
        const product = productsBody.products[0];
        assertProduct(product);
        console.log('My product: \n', product);

        const productId = product.id;
        const productName = product.name;
        const productBrand = product.brand;

        // 2) Get brands list
        const brandsResponse = await request.get('/api/brandsList');
        expect(brandsResponse.status()).toBe(200);

        const brandsBody = await brandsResponse.json();
        assertBrandsResponse(brandsBody);

        // Verify the product's brand exists in the official brands list
        const brandNames = brandsBody.brands.map(b => b.brand);
        expect(brandNames).toContain(productBrand);
        console.log('Brands: \n', brandNames);

        // 3) Search for the product by name
        const searchResponse = await searchProduct(request, productName); 
        expect(searchResponse.status()).toBe(200);

        const searchBody = await searchResponse.json();
        assertProductsResponse(searchBody);
        expect(searchBody.responseCode).toBe(200);

        // Verify original product appears in search results
        const matchingProduct = searchBody.products.find(p => p.id === productId);
        expect(matchingProduct).toBeTruthy();
        console.log(matchingProduct);

        expect(matchingProduct.name).toBe(productName);
        expect(matchingProduct.brand).toBe(productBrand);
    });
});