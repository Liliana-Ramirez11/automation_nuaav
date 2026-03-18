import { test, expect } from './fixtures';

test('user can add product to cart', async ({ productsPage, cartPage }) => {
  const product = await productsPage.getProductData('Sauce Labs Backpack');

  await productsPage.addToCart(product.name);
  await productsPage.goToCart();

  await cartPage.validateProduct(product.name, product.price);

  await expect(cartPage.cartItems).toHaveCount(1);
});