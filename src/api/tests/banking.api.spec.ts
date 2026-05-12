import { test, expect } from '@playwright/test';
import { ParabankApiClient } from '../clients/ParabankApiClient';
import { AccountSchema } from '../schemas/account.schema';

test.describe('Banking API', () => {
  test.describe.configure({ mode: 'serial' }); // Chạy tuần tự

  let customerId: number;
  let accountId: number;
  let secondAccountId: number;

  test('LOGIN — lấy customerId @smoke', async ({ request }) => {
    const client = new ParabankApiClient(request);
    const response = await client.login(
      process.env.TEST_USER!,
      process.env.TEST_PASSWORD!
    );
    expect(response.status()).toBe(200);
    const customer = await response.json();
    customerId = customer.id;
    expect(customerId).toBeDefined();
  });

  test('GET /customers/:id/accounts — trả về danh sách tài khoản @smoke', async ({ request }) => {
    const client = new ParabankApiClient(request);
    const response = await client.getAccounts(customerId);

    expect(response.status()).toBe(200);
    const accounts = await response.json();
    expect(Array.isArray(accounts)).toBe(true);
    expect(accounts.length).toBeGreaterThan(0);

    const parsed = AccountSchema.safeParse(accounts[0]);
    expect(parsed.success).toBe(true);

    accountId = accounts[0].id;
    secondAccountId = accounts[1]?.id || accounts[0].id;
  });

  test('GET /accounts/:id — trả về thông tin tài khoản @smoke', async ({ request }) => {
    const client = new ParabankApiClient(request);
    const response = await client.getAccount(accountId);

    expect(response.status()).toBe(200);
    const account = await response.json();
    expect(account.id).toBe(accountId);
    expect(account.balance).toBeDefined();
  });

  test('POST /transfer — chuyển tiền thành công @smoke', async ({ request }) => {
    const client = new ParabankApiClient(request);
    const response = await client.transfer(accountId, secondAccountId, 100);
    expect(response.status()).toBe(200);
  });

  test('GET /accounts/:id/transactions — trả về lịch sử giao dịch @regression', async ({ request }) => {
    const client = new ParabankApiClient(request);
    const response = await client.getTransactions(accountId);

    expect(response.status()).toBe(200);
    const transactions = await response.json();
    expect(Array.isArray(transactions)).toBe(true);
  });

  test('POST /deposit — nạp tiền thành công @regression', async ({ request }) => {
    const client = new ParabankApiClient(request);
    const response = await client.deposit(accountId, 500);
    expect(response.status()).toBe(200);
  });

});