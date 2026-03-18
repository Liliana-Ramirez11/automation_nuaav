import { BasePage } from './BasePage';
import { CheckoutLocators } from '../locators/checkout.locators';

export class CheckoutPage extends BasePage {

  async fillForm(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.fill(CheckoutLocators.firstName, firstName);
    await this.page.fill(CheckoutLocators.lastName, lastName);
    await this.page.fill(CheckoutLocators.postalCode, postalCode);
    await this.page.click(CheckoutLocators.continueButton);
  }

  async finish() {
    await this.page.click(CheckoutLocators.finishButton);
  }
}