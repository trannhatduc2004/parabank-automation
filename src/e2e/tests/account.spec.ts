import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountOverviewPage } from '../pages/AccountOverviewPage';

test.describe('Account Overview', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_USER!,
      process.env.TEST_PASSWORD!
    );
    await loginPage.expectLoginSuccess();
  });

  test('hiển thị danh sách tài khoản sau khi login @smoke', async ({ page }) => {
    const overviewPage = new AccountOverviewPage(page);
    await overviewPage.expectAccountTableVisible();
  });

  test('có ít nhất 1 tài khoản @regression', async ({ page }) => {
    const overviewPage = new AccountOverviewPage(page);
    await overviewPage.expectAccountTableVisible();
    const count = await overviewPage.getAccountCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('hiển thị welcome message đúng @regression', async ({ page }) => {
    const overviewPage = new AccountOverviewPage(page);
    await overviewPage.expectAccountTableVisible();
    // Check tên user hiển thị ở đâu đó trên trang
    await expect(page.locator('text=John')).toBeVisible({ timeout: 5000 });
    });

});