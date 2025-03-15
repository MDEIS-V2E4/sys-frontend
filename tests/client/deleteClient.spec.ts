import { test, expect } from '@playwright/test';

test('Delete Client', async ({ page }) => {
    await page.goto('https://sys-frontend-develop-3y58e.ondigitalocean.app/');
    await page.getByRole('textbox', { name: 'Nombre:' }).click();
    await page.getByRole('textbox', { name: 'Nombre:' }).fill('Aldo UI 2');
    await page.getByRole('textbox', { name: 'Nro. CI/NIT:' }).click();
    await page.getByRole('textbox', { name: 'Nro. CI/NIT:' }).fill('123456756');
    await page.getByRole('textbox', { name: 'Email:' }).click();
    await page.getByRole('textbox', { name: 'Email:' }).fill('aldo@gmail.com');
    await page.getByRole('button', { name: 'Registrar Cliente' }).click();
    await expect(page.locator('//div[contains(text(), "Guardado correctamente")]')).toContainText("Guardado correctamente");

    await page.waitForTimeout(1000)
    await page.getByRole('link', { name: 'Listar Clientes' }).click();
    await  page.waitForLoadState();
    await  page.waitForSelector('//td[contains(text(), "Aldo UI 2")]', { state: 'visible' });
    await page.getByRole('row', { name: 'Aldo UI 2 123456756 CI aldo@' }).getByTestId('btnGetProduct-').nth(1).click();
    await expect(page.getByRole('cell', { name: 'Aldo UI 2' })).toBeHidden();
});
