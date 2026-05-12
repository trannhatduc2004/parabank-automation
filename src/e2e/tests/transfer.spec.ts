import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TransferPage } from '../pages/TransferPage';

test.describe('Fund Transfer', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_USER!,
      process.env.TEST_PASSWORD!
    );
    await loginPage.expectLoginSuccess();
  });

  test('transfer thành công với số tiền hợp lệ @smoke', async ({ page }) => {
    const transferPage = new TransferPage(page);
    await transferPage.goto();
    await transferPage.transfer('100');
    await transferPage.expectTransferSuccess();
  });

  test('transfer thất bại với số tiền bằng 0 @regression', async ({ page }) => {
    const transferPage = new TransferPage(page);
    await transferPage.goto();
    await transferPage.transfer('0');
    await transferPage.expectTransferError();
  });

  test('transfer thất bại với số tiền âm @regression', async ({ page }) => {
    const transferPage = new TransferPage(page);
    await transferPage.goto();
    await transferPage.transfer('-100');
    await transferPage.expectTransferError();
  });

});