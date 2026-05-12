import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly addressInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly phoneInput: Locator;
  private readonly ssnInput: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmInput: Locator;
  private readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#customer\\.firstName');
    this.lastNameInput  = page.locator('#customer\\.lastName');
    this.addressInput   = page.locator('#customer\\.address\\.street');
    this.cityInput      = page.locator('#customer\\.address\\.city');
    this.stateInput     = page.locator('#customer\\.address\\.state');
    this.zipCodeInput   = page.locator('#customer\\.address\\.zipCode');
    this.phoneInput     = page.locator('#customer\\.phoneNumber');
    this.ssnInput       = page.locator('#customer\\.ssn');
    this.usernameInput  = page.locator('#customer\\.username');
    this.passwordInput  = page.locator('#customer\\.password');
    this.confirmInput   = page.locator('#repeatedPassword');
    this.registerButton = page.locator('input[value="Register"]');
  }

  async goto() {
    await this.page.goto('http://localhost:8080/parabank/register.htm');
    await this.waitForPageLoad();
    }

  async register(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.zipCodeInput.fill(data.zipCode);
    await this.phoneInput.fill(data.phone);
    await this.ssnInput.fill(data.ssn);
    await this.usernameInput.fill(data.username);
    await this.passwordInput.fill(data.password);
    await this.confirmInput.fill(data.password);
    await this.registerButton.click();
    await this.page.waitForURL(/register|overview/, { timeout: 15000 });
    await this.waitForPageLoad();
  }

  async expectRegisterSuccess() {
    // WebKit đôi khi chậm hơn — tăng timeout
    await expect(
      this.page.locator('h1.title').filter({ hasText: 'Welcome' })
    ).toBeVisible({ timeout: 20000 });
  }
}