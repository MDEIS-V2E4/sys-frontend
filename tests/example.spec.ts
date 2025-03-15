import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sys-frontend-app-tom6q.ondigitalocean.app/');
  await page.getByRole('textbox', { name: 'Nombre:' }).click();
  await page.getByRole('textbox', { name: 'Nombre:' }).fill('aldo balderrama');
  await page.getByRole('textbox', { name: 'Nro. CI/NIT:' }).click();
  await page.getByRole('textbox', { name: 'Nro. CI/NIT:' }).fill('12345');
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill('aldo@autobook.com');
  await page.getByRole('button', { name: 'Registrar Cliente' }).click();
  await expect(page.locator('//div[contains(text(), "Guardado correctamente")]')).toContainText("Guardado correctamente");
});
