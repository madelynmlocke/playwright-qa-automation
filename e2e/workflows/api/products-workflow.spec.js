import { test, expect } from '@playwright/test';

test.describe('API workflow: products -> brands -> search', () => {
    test('product data stays consistent across catalog, brands, and search endpoints', async ({ request }) => {
        // 1) Get all products
        const productsResponse = await request.get('/api/productsList');
        expect(productsResponse.status()).toBe(200);

        const productsBody = await productsResponse.json();
        expect(productsBody).toHaveProperty('products');
        expect(Array.isArray(productsBody.products)).toBeTruthy();
        expect(productsBody.products.length).toBeGreaterThan(0);

        // Pick a real product from the API
        const product = productsBody.products[0];

        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('brand');

        const productId = product.id;
        const productName = product.name;
        const productBrand = product.brand;

        // 2) Get brands list
        const brandsResponse = await request.get('/api/brandsList');
        expect(brandsResponse.status()).toBe(200);

        const brandsBody = await brandsResponse.json();
        expect(brandsBody).toHaveProperty('brands');
        expect(Array.isArray(brandsBody.brands)).toBeTruthy();
        expect(brandsBody.brands.length).toBeGreaterThan(0);

        // Verify the product's brand exists in the official brands list
        const brandNames = brandsBody.brands.map(b => b.brand);
        expect(brandNames).toContain(productBrand);

        // 3) Search for the product by name
        const searchResponse = await request.post('/api/searchProduct', {
            form: {
                search_product: productName
            }
        });

        expect(searchResponse.status()).toBe(200);

        const searchBody = await searchResponse.json();
        expect(searchBody.responseCode).toBe(200);
        expect(searchBody).toHaveProperty('products');
        expect(Array.isArray(searchBody.products)).toBeTruthy();
        expect(searchBody.products.length).toBeGreaterThan(0);

        // Verify original product appears in search results
        const matchingProduct = searchBody.products.find(p => p.id === productId);
        expect(matchingProduct).toBeTruthy();

        expect(matchingProduct.name).toBe(productName);
        expect(matchingProduct.brand).toBe(productBrand);
    });
});