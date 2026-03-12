import { test, expect } from '@playwright/test';

test('API returns successful response with valid data', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBeTruthy();
  expect(responseBody.length).toBeGreaterThan(0);

  expect(responseBody[0]).toHaveProperty('id');
  expect(responseBody[0]).toHaveProperty('title');
  expect(responseBody[0]).toHaveProperty('body');
});

import { test, expect } from '@playwright/test';

test('API returns 404 for invalid endpoint', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/invalidendpoint');

  expect(response.status()).toBe(404);
});