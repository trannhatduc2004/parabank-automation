import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountOverviewPage } from '../pages/AccountOverviewPage';
import { faker } from '@faker-js/faker';

test.describe('Authentication', () => {

  test('login thành công với credentials hợp lệ @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_USER!,
      process.env.TEST_PASSWORD!
    );
    await loginPage.expectLoginSuccess();
  });

  test('login thất bại với password sai @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_USER!,
      'wrongpassword'
    );
    await loginPage.expectLoginError();
  });

  test('login thất bại với username không tồn tại @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      faker.internet.username(),
      'anypassword'
    );
    await loginPage.expectLoginError();
  });

  test('login thành công rồi logout @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const overviewPage = new AccountOverviewPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_USER!,
      process.env.TEST_PASSWORD!
    );
    await loginPage.expectLoginSuccess();
    await overviewPage.logout();
    await expect(page).toHaveURL(/index|parabank/, { timeout: 10000 });
  });

});