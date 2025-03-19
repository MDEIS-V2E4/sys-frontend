import { test, expect } from '@playwright/test';

test('List of Clients', async ({ page }) => {
    await page.goto('https://sys-frontend-develop-3y58e.ondigitalocean.app/');
    await page.getByRole('textbox', { name: 'Nombre:' }).click();
    await page.getByRole('textbox', { name: 'Nombre:' }).fill('Juan Pérez 34');
    await page.getByRole('textbox', { name: 'Nro. CI/NIT:' }).click();
    await page.getByRole('textbox', { name: 'Nro. CI/NIT:' }).fill('12345675634');
    await page.getByRole('textbox', { name: 'Email:' }).click();
    await page.getByRole('textbox', { name: 'Email:' }).fill('test@gmail.com');
    await page.getByRole('button', { name: 'Registrar Cliente' }).click();
    await expect(page.locator('//div[contains(text(), "Guardado correctamente")]')).toContainText("Guardado correctamente");

    await page.waitForTimeout(1000)
    await page.getByRole('link', { name: 'Listar Clientes' }).click();
    await  page.waitForLoadState();
    await  page.waitForSelector('//td[contains(text(), "Juan Pérez 34")]', { state: 'visible' });
    await expect(page.getByRole('cell', { name: 'Juan Pérez 34' })).toBeVisible();
    await expect(page.locator('tbody')).toContainText('Juan Pérez 34');

    // After this test, the client is deleted
    await page.getByRole('row', { name: 'Juan Pérez 34 12345675634 CI test@' }).getByTestId('btnGetProduct-').nth(1).click();
    await expect(page.getByRole('cell', { name: 'Juan Pérez 34' })).toBeHidden();
});