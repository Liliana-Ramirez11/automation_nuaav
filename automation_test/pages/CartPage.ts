import { BasePage } from './BasePage';
import { CartLocators } from '../locators/cart.locators';

export class CartPage extends BasePage {

  cartItems = this.page.locator('.cart_item');

  async validateProduct(name: string, price: string) {

    await this.page.locator(CartLocators.productName)
      .filter({ hasText: name })
      .isVisible();

    await this.page.locator(CartLocators.productPrice)
      .filter({ hasText: price })
      .isVisible();
  }

  async removeProduct() {
    await this.page.click(CartLocators.removeBackpackButton);
  }

  async checkout() {
    await this.page.click(CartLocators.checkoutButton);
  }
}