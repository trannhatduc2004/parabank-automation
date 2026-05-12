# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: performance\security-test.js >> Security Testing — Banking Application >> API Security — endpoints yêu cầu authentication @security
- Location: src\performance\security-test.js:89:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [401, 403, 500]
```

# Test source

```ts
  1   | // Security test dùng Playwright — không cần ZAP CLI
  2   | import { test, expect } from '@playwright/test';
  3   | 
  4   | test.describe('Security Testing — Banking Application', () => {
  5   | 
  6   |   // 1. SQL Injection
  7   |   test('SQL Injection — login form không bị vulnerable @security', async ({ page }) => {
  8   |     await page.goto('http://localhost:8080/parabank/index.htm');
  9   | 
  10  |     const sqlPayloads = [
  11  |       "' OR '1'='1",
  12  |       "' OR 1=1--",
  13  |       "admin'--",
  14  |       "' UNION SELECT * FROM users--",
  15  |     ];
  16  | 
  17  |     for (const payload of sqlPayloads) {
  18  |       await page.locator('input[name="username"]').fill(payload);
  19  |       await page.locator('input[name="password"]').fill(payload);
  20  |       await page.locator('input[value="Log In"]').click();
  21  | 
  22  |       // Không được redirect về trang có data nhạy cảm
  23  |       await expect(page).not.toHaveURL(/overview/, { timeout: 3000 }).catch(() => {});
  24  |       const url = page.url();
  25  |       expect(url).not.toMatch(/overview/);
  26  | 
  27  |       await page.goto('http://localhost:8080/parabank/index.htm');
  28  |     }
  29  |   });
  30  | 
  31  |   // 2. XSS Attack
  32  |   test('XSS — form không execute script độc hại @security', async ({ page }) => {
  33  |     await page.goto('http://localhost:8080/parabank/index.htm');
  34  | 
  35  |     const xssPayloads = [
  36  |       '<script>alert("XSS")</script>',
  37  |       '<img src=x onerror=alert("XSS")>',
  38  |       'javascript:alert("XSS")',
  39  |     ];
  40  | 
  41  |     for (const payload of xssPayloads) {
  42  |       await page.locator('input[name="username"]').fill(payload);
  43  |       await page.locator('input[name="password"]').fill('password');
  44  | 
  45  |       // Kiểm tra không có dialog alert xuất hiện
  46  |       let alertFired = false;
  47  |       page.once('dialog', async dialog => {
  48  |         alertFired = true;
  49  |         await dialog.dismiss();
  50  |       });
  51  | 
  52  |       await page.locator('input[value="Log In"]').click();
  53  |       await page.waitForTimeout(1000);
  54  | 
  55  |       expect(alertFired).toBe(false);
  56  |       await page.goto('http://localhost:8080/parabank/index.htm');
  57  |     }
  58  |   });
  59  | 
  60  |   // 3. Brute Force Protection
  61  |   test('Brute Force — hệ thống xử lý multiple failed logins @security', async ({ page }) => {
  62  |     await page.goto('http://localhost:8080/parabank/index.htm');
  63  | 
  64  |     // Thử login sai nhiều lần
  65  |     for (let i = 0; i < 5; i++) {
  66  |       await page.locator('input[name="username"]').fill('john');
  67  |       await page.locator('input[name="password"]').fill('wrongpassword' + i);
  68  |       await page.locator('input[value="Log In"]').click();
  69  |       await page.waitForTimeout(500);
  70  |     }
  71  | 
  72  |     // Sau nhiều lần fail — vẫn ở trang login hoặc có error message
  73  |     const url = page.url();
  74  |     expect(url).not.toMatch(/overview/);
  75  |   });
  76  | 
  77  |   // 4. Session Management
  78  |   test('Session — không thể truy cập trang protected khi chưa login @security', async ({ page }) => {
  79  |     // Truy cập thẳng vào trang overview mà không login
  80  |     await page.goto('http://localhost:8080/parabank/overview.htm');
  81  |     await page.waitForTimeout(2000);
  82  | 
  83  |     // Phải redirect về login
  84  |     const url = page.url();
  85  |     expect(url).toMatch(/login|index/);
  86  |   });
  87  | 
  88  |   // 5. Sensitive Data Exposure via API
  89  |   test('API Security — endpoints yêu cầu authentication @security', async ({ request }) => {
  90  |     // Thử gọi API không có credentials
  91  |     const response = await request.get(
  92  |       'http://localhost:8080/parabank/services/bank/customers/12212/accounts',
  93  |       {
  94  |         headers: {
  95  |           'Accept': 'application/json',
  96  |         },
  97  |       }
  98  |     );
  99  | 
  100 |     // Phải trả về 401 hoặc 500, không được trả về data
> 101 |     expect([401, 403, 500]).toContain(response.status());
      |                             ^ Error: expect(received).toContain(expected) // indexOf
  102 |   });
  103 | 
  104 |   // 6. HTTPS / Secure Headers Check
  105 |   test('Security Headers — response có security headers @security', async ({ request }) => {
  106 |     const response = await request.get(
  107 |       'http://localhost:8080/parabank/index.htm'
  108 |     );
  109 | 
  110 |     expect(response.status()).toBe(200);
  111 | 
  112 |     // Log headers để kiểm tra
  113 |     const headers = response.headers();
  114 |     console.log('Response headers:', JSON.stringify(headers, null, 2));
  115 | 
  116 |     // Basic check — server không expose version info
  117 |     const serverHeader = headers['server'] || '';
  118 |     expect(serverHeader).not.toMatch(/Apache\/\d+\.\d+\.\d+/);
  119 |   });
  120 | 
  121 |   // 7. Path Traversal
  122 |   test('Path Traversal — không thể đọc file hệ thống @security', async ({ request }) => {
  123 |     const traversalPayloads = [
  124 |       '/../../../etc/passwd',
  125 |       '/..%2F..%2F..%2Fetc%2Fpasswd',
  126 |     ];
  127 | 
  128 |     for (const payload of traversalPayloads) {
  129 |       const response = await request.get(
  130 |         `http://localhost:8080/parabank${payload}`
  131 |       );
  132 |       // Phải trả về 400 hoặc 404, không được trả về file content
  133 |       expect([400, 404, 403]).toContain(response.status());
  134 |     }
  135 |   });
  136 | 
  137 | });
```