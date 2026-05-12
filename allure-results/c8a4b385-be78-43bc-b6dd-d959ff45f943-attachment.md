# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\tests\banking.api.spec.ts >> Banking API >> POST /transfer — chuyển tiền thành công @smoke
- Location: src\api\tests\banking.api.spec.ts:47:7

# Error details

```
SyntaxError: Unexpected token '<', "<?xml vers"... is not valid JSON
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { ParabankApiClient } from '../clients/ParabankApiClient';
  3  | import { AccountSchema } from '../schemas/account.schema';
  4  | 
  5  | test.describe('Banking API', () => {
  6  | 
  7  |   let customerId: number;
  8  |   let accountId: number;
  9  | 
  10 |   test.beforeAll(async ({ request }) => {
  11 |     const client = new ParabankApiClient(request);
  12 |     const response = await client.login(
  13 |       process.env.TEST_USER!,
  14 |       process.env.TEST_PASSWORD!
  15 |     );
  16 |     expect(response.status()).toBe(200);
> 17 |     const customer = await response.json();
     |                      ^ SyntaxError: Unexpected token '<', "<?xml vers"... is not valid JSON
  18 |     customerId = customer.id;
  19 |   });
  20 | 
  21 |   test('GET /customers/:id/accounts — trả về danh sách tài khoản @smoke', async ({ request }) => {
  22 |     const client = new ParabankApiClient(request);
  23 |     const response = await client.getAccounts(customerId);
  24 | 
  25 |     expect(response.status()).toBe(200);
  26 |     const accounts = await response.json();
  27 |     expect(Array.isArray(accounts)).toBe(true);
  28 |     expect(accounts.length).toBeGreaterThan(0);
  29 | 
  30 |     // Validate schema
  31 |     const parsed = AccountSchema.safeParse(accounts[0]);
  32 |     expect(parsed.success).toBe(true);
  33 | 
  34 |     accountId = accounts[0].id;
  35 |   });
  36 | 
  37 |   test('GET /accounts/:id — trả về thông tin tài khoản @smoke', async ({ request }) => {
  38 |     const client = new ParabankApiClient(request);
  39 |     const response = await client.getAccount(accountId);
  40 | 
  41 |     expect(response.status()).toBe(200);
  42 |     const account = await response.json();
  43 |     expect(account.id).toBe(accountId);
  44 |     expect(account.balance).toBeDefined();
  45 |   });
  46 | 
  47 |   test('POST /transfer — chuyển tiền thành công @smoke', async ({ request }) => {
  48 |     const client = new ParabankApiClient(request);
  49 |     const accounts = await (await client.getAccounts(customerId)).json();
  50 | 
  51 |     expect(accounts.length).toBeGreaterThanOrEqual(2);
  52 | 
  53 |     const response = await client.transfer(
  54 |       accounts[0].id,
  55 |       accounts[1].id,
  56 |       100
  57 |     );
  58 |     expect(response.status()).toBe(200);
  59 |   });
  60 | 
  61 |   test('GET /accounts/:id/transactions — trả về lịch sử giao dịch @regression', async ({ request }) => {
  62 |     const client = new ParabankApiClient(request);
  63 |     const response = await client.getTransactions(accountId);
  64 | 
  65 |     expect(response.status()).toBe(200);
  66 |     const transactions = await response.json();
  67 |     expect(Array.isArray(transactions)).toBe(true);
  68 |   });
  69 | 
  70 |   test('POST /deposit — nạp tiền thành công @regression', async ({ request }) => {
  71 |     const client = new ParabankApiClient(request);
  72 |     const response = await client.deposit(accountId, 500);
  73 |     expect(response.status()).toBe(200);
  74 |   });
  75 | 
  76 | });
```