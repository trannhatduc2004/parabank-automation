import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton   = page.locator('input[value="Log In"]');
    this.errorMessage  = page.locator('.error');
    this.registerLink  = page.locator('a[href="register.htm"]');
  }

  async goto() {
    await this.page.goto('/parabank/index.htm');
    await this.waitForPageLoad();
    }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await Promise.all([
        this.page.waitForURL(/overview|account|login/, { timeout: 15000 }),
        this.loginButton.click(),
    ]);
    }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL(/overview|account/, { timeout: 10000 });
    }

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible({ timeout: 8000 });
  }

  async clickRegister() {
    await this.registerLink.click();
  }
}