const { test, expect } = require('@playwright/test');

test('homepage loads with heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Items');
});

test('can add a new item', async ({ page }) => {
  await page.goto('/');
  const uniqueName = `Test Item ${Date.now()}`;

  await page.fill('input[placeholder="New item name"]', uniqueName);
  await page.click('button:has-text("Add")');

  await expect(page.locator('.item-list')).toContainText(uniqueName);
});

test('can delete an item', async ({ page }) => {
  await page.goto('/');
  const uniqueName = `Delete Me ${Date.now()}`;

  await page.fill('input[placeholder="New item name"]', uniqueName);
  await page.click('button:has-text("Add")');
  await expect(page.locator('.item-list')).toContainText(uniqueName);

  const row = page.locator('li', { hasText: uniqueName });
  await row.locator('button:has-text("Delete")').click();

  await expect(page.locator('.item-list')).not.toContainText(uniqueName);
});

test('cannot add an empty item', async ({ page }) => {
  await page.goto('/');

  const initialCount = await page.locator('.item-list li').count();

  await page.fill('input[placeholder="New item name"]', '   ');
  await page.click('button:has-text("Add")');

  // Empty/whitespace-only input should not add a new item
  await expect(page.locator('.item-list li')).toHaveCount(initialCount);
});

test('deleting a non-existent item returns 404', async ({ request }) => {
  const response = await request.delete('/api/items/999999');
  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body.error).toBe('Item not found');
});