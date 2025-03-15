import { test, expect } from '@playwright/test';

test('List of Clients', async ({ page }) => {
    await page.goto('https://sys-frontend-develop-3y58e.ondigitalocean.app/');
    await page.getByRole('link', { name: 'Listar Clientes' }).click();
    await expect(page.getByRole('cell', { name: 'Juan Pérez' })).toBeVisible();
    await expect(page.locator('tbody')).toContainText('Juan Pérez');
});