import { BasePage } from './BasePage';
import { ProductsLocators } from '../locators/products.locators';

export class ProductsPage extends BasePage {

  async getProductData(name: string) {
    const product = this.page.locator(ProductsLocators.productCard).filter({
      has: this.page.locator(ProductsLocators.productName, { hasText: name })
    });

    return {
      name: await product.locator(ProductsLocators.productName).innerText(),
      price: await product.locator(ProductsLocators.productPrice).innerText()
    };
  }

  async addToCart(name: string) {
    const product = this.page.locator(ProductsLocators.productCard).filter({
      has: this.page.locator(ProductsLocators.productName, { hasText: name })
    });

    await product.locator('button').click();
  }

  async goToCart() {
    await this.page.click(ProductsLocators.cartIcon);
  }
}