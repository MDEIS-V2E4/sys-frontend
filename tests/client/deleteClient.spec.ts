import { test, expect } from '@playwright/test';

test('delete a client', async ({ page }) => {
  // Given
  await page.goto('https://sys-frontend-develop-3y58e.ondigitalocean.app/');
  await page.getByRole('link', { name: 'Clientes' }).click();
  await page.getByRole('heading', { name: 'Clientes' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Nombre:' }).fill('aldo UI 45');
  await page.getByRole('textbox', { name: 'Nro. CI/NIT:' }).click();
  await page.getByRole('textbox', { name: 'Nro. CI/NIT:' }).fill('956956369');
  await page.getByRole('textbox', { name: 'Correo:' }).click();
  await page.getByRole('textbox', { name: 'Correo:' }).fill('aldotest@autobots.com');

  // When
  await page.getByRole('button', { name: 'Registrar Cliente' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Empleados' }).click();
  await page.waitForLoadState();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Clientes' }).click();
  await page.waitForLoadState();

  // Then
  await page.getByRole('row', { name: 'aldo UI 45 956956369 CI' }).getByRole('button').nth(1).click();
  await expect(page.getByRole('cell', { name: 'aldo UI 45' })).toBeHidden();
});