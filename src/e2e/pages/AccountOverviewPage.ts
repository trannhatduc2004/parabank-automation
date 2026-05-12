import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountOverviewPage extends BasePage {
  private readonly accountTable: Locator;
  private readonly totalBalance: Locator;
  private readonly welcomeMessage: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.accountTable   = page.locator('#accountTable');
    this.totalBalance   = page.locator('.ng-binding').last();
    this.welcomeMessage = page.locator('p.smallText').first();
    this.logoutLink     = page.locator('a[href="logout.htm"]');
  }

  async goto() {
    await this.navigate('/parabank/overview.htm');
    await this.waitForPageLoad();
  }

  async expectAccountTableVisible() {
    await expect(this.accountTable).toBeVisible({ timeout: 10000 });
  }

  async expectWelcomeMessage(name: string) {
    await expect(this.welcomeMessage).toContainText(name);
  }

  async logout() {
    await this.logoutLink.click();
    await this.waitForPageLoad();
  }

  async getAccountCount() {
    const rows = this.page.locator('#accountTable tbody tr');
    return await rows.count();
  }
}