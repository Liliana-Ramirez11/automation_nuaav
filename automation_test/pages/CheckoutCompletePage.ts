import { BasePage } from './BasePage';
import { CheckoutLocators } from '../locators/checkout.locators';
import { expect } from '@playwright/test';

export class CheckoutCompletePage extends BasePage {

  async validateOrder() {
    await expect(this.page.locator(CheckoutLocators.confirmationTitle))
      .toHaveText('Checkout: Complete!');
  }
}