import { BasePage } from './BasePage';
import { LoginLocators } from '../locators/login.locators';

export class LoginPage extends BasePage {

  errorMessage = this.page.locator(LoginLocators.errorMessage);

  async login(username: string, password: string) {
    await this.page.fill(LoginLocators.username, username);
    await this.page.fill(LoginLocators.password, password);
    await this.page.click(LoginLocators.loginButton);
  }
}