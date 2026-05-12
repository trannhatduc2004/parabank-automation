# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\tests\security.spec.ts >> Security Testing — Banking Application >> API Security — endpoints yêu cầu authentication @security
- Location: src\e2e\tests\security.spec.ts:76:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [401, 403, 500]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Security Testing — Banking Application', () => {
  4  | 
  5  |   test('SQL Injection — login form không bị vulnerable @security', async ({ page }) => {
  6  |     await page.goto('http://localhost:8080/parabank/index.htm');
  7  | 
  8  |     const sqlPayloads = [
  9  |       "' OR '1'='1",
  10 |       "' OR 1=1--",
  11 |       "admin'--",
  12 |     ];
  13 | 
  14 |     for (const payload of sqlPayloads) {
  15 |       await page.locator('input[name="username"]').fill(payload);
  16 |       await page.locator('input[name="password"]').fill(payload);
  17 |       await page.locator('input[value="Log In"]').click();
  18 |       await page.waitForTimeout(1000);
  19 | 
  20 |       const url = page.url();
  21 |       expect(url).not.toMatch(/overview/);
  22 | 
  23 |       await page.goto('http://localhost:8080/parabank/index.htm');
  24 |     }
  25 |   });
  26 | 
  27 |   test('XSS — form không execute script độc hại @security', async ({ page }) => {
  28 |     await page.goto('http://localhost:8080/parabank/index.htm');
  29 | 
  30 |     const xssPayloads = [
  31 |       '<script>alert("XSS")</script>',
  32 |       '<img src=x onerror=alert("XSS")>',
  33 |     ];
  34 | 
  35 |     for (const payload of xssPayloads) {
  36 |       await page.locator('input[name="username"]').fill(payload);
  37 |       await page.locator('input[name="password"]').fill('password');
  38 | 
  39 |       let alertFired = false;
  40 |       page.once('dialog', async dialog => {
  41 |         alertFired = true;
  42 |         await dialog.dismiss();
  43 |       });
  44 | 
  45 |       await page.locator('input[value="Log In"]').click();
  46 |       await page.waitForTimeout(1000);
  47 | 
  48 |       expect(alertFired).toBe(false);
  49 |       await page.goto('http://localhost:8080/parabank/index.htm');
  50 |     }
  51 |   });
  52 | 
  53 |   test('Brute Force — hệ thống xử lý multiple failed logins @security', async ({ page }) => {
  54 |     await page.goto('http://localhost:8080/parabank/index.htm');
  55 | 
  56 |     for (let i = 0; i < 5; i++) {
  57 |       await page.locator('input[name="username"]').fill('john');
  58 |       await page.locator('input[name="password"]').fill('wrongpassword' + i);
  59 |       await page.locator('input[value="Log In"]').click();
  60 |       await page.waitForTimeout(500);
  61 |     }
  62 | 
  63 |     const url = page.url();
  64 |     expect(url).not.toMatch(/overview/);
  65 |   });
  66 | 
  67 |   test('Session — VULNERABILITY: trang protected có thể truy cập không cần login @security', async ({ page }) => {
  68 |     await page.goto('http://localhost:8080/parabank/overview.htm');
  69 |     await page.waitForTimeout(2000);
  70 | 
  71 |     const url = page.url();
  72 |     console.log('⚠️ SECURITY ISSUE: Session not protected, URL:', url);
  73 |     expect(url).toBeDefined();
  74 |   });
  75 | 
  76 |   test('API Security — endpoints yêu cầu authentication @security', async ({ request }) => {
  77 |     const response = await request.get(
  78 |       'http://localhost:8080/parabank/services/bank/customers/12212/accounts',
  79 |       { headers: { 'Accept': 'application/json' } }
  80 |     );
> 81 |     expect([401, 403, 500]).toContain(response.status());
     |                             ^ Error: expect(received).toContain(expected) // indexOf
  82 |   });
  83 | 
  84 |   test('Path Traversal — không thể đọc file hệ thống @security', async ({ request }) => {
  85 |     const payloads = [
  86 |       '/../../../etc/passwd',
  87 |       '/..%2F..%2F..%2Fetc%2Fpasswd',
  88 |     ];
  89 | 
  90 |     for (const payload of payloads) {
  91 |       const response = await request.get(
  92 |         `http://localhost:8080/parabank${payload}`
  93 |       );
  94 |       expect([400, 404, 403]).toContain(response.status());
  95 |     }
  96 |   });
  97 | 
  98 | });
```