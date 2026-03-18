import { expect, test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('E2E Compra Sauce Labs Fleece Jacket', async ({ page }) => {


  await page.goto('/inventory.html');
  await expect(page).toHaveURL(/inventory.html/);


  const productsPage = new ProductsPage(page);
  const product = await productsPage.getProductData('Sauce Labs Fleece Jacket');
  await productsPage.addToCart(product.name);
  await productsPage.goToCart();

  const cartPage = new CartPage(page);
  await cartPage.validateProduct(product.name, product.price);
  await cartPage.checkout();


  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillForm('Liliana','Ramirez','110111');
  await checkoutPage.finish();

  const completePage = new CheckoutCompletePage(page);
  await completePage.validateOrder();
});