import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('user can remove product from cart', async ({ page }) => {

  await page.goto('/inventory.html');

  const productsPage = new ProductsPage(page);

  const product = await productsPage.getProductData('Sauce Labs Backpack');

  await productsPage.addToCart(product.name);
  await productsPage.goToCart();

  const cartPage = new CartPage(page);

  await cartPage.removeProduct();

  await expect(cartPage.cartItems).toHaveCount(0);

});