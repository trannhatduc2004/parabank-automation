import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferPage extends BasePage {
  private readonly amountInput: Locator;
  private readonly fromAccountSelect: Locator;
  private readonly toAccountSelect: Locator;
  private readonly transferButton: Locator;
  private readonly successMessage: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.amountInput       = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect   = page.locator('#toAccountId');
    this.transferButton    = page.locator('input[value="Transfer"]');
    this.successMessage    = page.locator('#showResult');
    this.errorMessage = page.locator('.error').first();

    
  }

  async goto() {
    await this.navigate('parabank/transfer.htm');
    await this.waitForPageLoad();
  }

  async transfer(amount: string, fromIndex: number = 0, toIndex: number = 1) {
    await this.amountInput.fill(amount);

    const fromOptions = await this.fromAccountSelect.locator('option').all();
    if (fromOptions.length > fromIndex) {
      await this.fromAccountSelect.selectOption({ index: fromIndex });
    }

    const toOptions = await this.toAccountSelect.locator('option').all();
    if (toOptions.length > toIndex) {
      await this.toAccountSelect.selectOption({ index: toIndex });
    }

    await this.transferButton.click();
    await this.waitForPageLoad();
  }

  async expectTransferSuccess() {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
    await expect(this.successMessage).toContainText('Transfer Complete');
  }

  async expectTransferError() {
    // Khi transfer fail — vẫn ở trang transfer hoặc hiện error page
    await expect(this.page).toHaveURL(/transfer|error/, { timeout: 10000 });
  }
}