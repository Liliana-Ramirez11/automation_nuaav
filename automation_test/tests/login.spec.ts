import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login setup', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Abrir página de login', async () => {
    await loginPage.open();
  });

  await test.step('Hacer login con usuario válido', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Validar redirección a inventario', async () => {
    await expect(page).toHaveURL(/inventory/);
  });

  await test.step('Guardar estado de sesión', async () => {
    await page.context().storageState({ path: 'storageState.json' });
  });
});