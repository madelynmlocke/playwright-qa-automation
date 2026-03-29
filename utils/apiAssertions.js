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
    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('products');

    expect(typeof body.responseCode).toBe('number');
    expect(typeof body.products).toBe('object');

    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

for (const product of body.products) {
        assertProduct(product);
    }
}

export function assertBrand(brand) {
    expect(brand).toHaveProperty('id');
    expect(brand).toHaveProperty('brand');
}

export function assertBrandsResponse(body) {
    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('brands');

    expect(typeof body.responseCode).toBe('number');
    expect(typeof body.brands).toBe('object');

    expect(Array.isArray(body.brands)).toBe(true);
    expect(body.brands.length).toBeGreaterThan(0);

    for (const brand of body.brands) {
        assertBrand(brand);
    }
}

export function assertAccountResponse(body) {
    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('user');

    expect(typeof body.responseCode).toBe('number');
    expect(typeof body.user).toBe('object');

    expect(body.user).toHaveProperty('name');
    expect(body.user).toHaveProperty('email');
    expect(typeof body.user.name).toBe('string');
    expect(typeof body.user.email).toBe('string');

    //const user = body.user;
}

export function assertAuthenticationResponse(body, expectedCode, expectedMessage) {
    expect(body).toHaveProperty('responseCode');
    expect(body).toHaveProperty('message');

    expect(typeof body.responseCode).toBe('number');
    expect(typeof body.message).toBe('string');

    expect(body.responseCode).toBe(expectedCode);
    expect(body.message).toBe(expectedMessage);
}