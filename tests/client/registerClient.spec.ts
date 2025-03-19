import { test, expect } from '@playwright/test';

test('Register a new client', async ({ page }) => {
  await page.goto('https://sys-frontend-develop-3y58e.ondigitalocean.app/');
  await page.getByRole('link', { name: 'Clientes' }).click();
  await page.getByRole('heading', { name: 'Clientes' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Nombre:' }).fill('aldo UI 34');
  await page.getByRole('textbox', { name: 'Nro. CI/NIT:' }).click();
  await page.getByRole('textbox', { name: 'Nro. CI/NIT:' }).fill('123456789');
  await page.getByRole('textbox', { name: 'Correo:' }).click();
  await page.getByRole('textbox', { name: 'Correo:' }).fill('aldotest@autobots.com');
  await page.getByRole('button', { name: 'Registrar Cliente' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Empleados' }).click();
  await page.waitForLoadState();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Clientes' }).click();
  await page.waitForLoadState();
  await expect(page.getByRole('cell', { name: 'aldo UI 34' })).toBeVisible();

  // After this test, the client is deleted
  await page.getByRole('row', { name: 'aldo UI 34 123456789 CI' }).getByRole('button').nth(1).click();
  await expect(page.getByRole('cell', { name: 'aldo UI 34' })).toBeHidden();
});