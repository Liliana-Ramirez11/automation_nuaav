import { test as base } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

type Fixtures = {
  productsPage: ProductsPage;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  productsPage: async ({ page }, use) => {

    await page.goto('/inventory.html');
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});

export const expect = test.expect;