import { expect } from '@playwright/test';

export function assertProduct(product) {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('brand');
    expect(product).toHaveProperty('category');

    expect(typeof product.id).toBe('number');
    expect(typeof product.name).toBe('string');
    expect(typeof product.price).toBe('string');
    expect(typeof product.brand).toBe('string');
    expect(typeof product.category).toBe('object');

    expect(product.category).toHaveProperty('usertype');
    expect(product.category).toHaveProperty('category');
}

export function assertProductsResponse(body) {
    expect(body).toHaveProperty('products');
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

for (const product of body.products) {
        assertProduct(product);
    }
}