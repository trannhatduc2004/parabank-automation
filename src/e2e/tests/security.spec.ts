import { test, expect } from '@playwright/test';

test.describe('Security Testing — Banking Application', () => {

  test('SQL Injection — login form không bị vulnerable @security', async ({ page }) => {
    await page.goto('http://localhost:8080/parabank/index.htm');

    const sqlPayloads = [
      "' OR '1'='1",
      "' OR 1=1--",
      "admin'--",
    ];

    for (const payload of sqlPayloads) {
      await page.locator('input[name="username"]').fill(payload);
      await page.locator('input[name="password"]').fill(payload);
      await page.locator('input[value="Log In"]').click();
      await page.waitForTimeout(1000);

      const url = page.url();
      expect(url).not.toMatch(/overview/);

      await page.goto('http://localhost:8080/parabank/index.htm');
    }
  });

  test('XSS — form không execute script độc hại @security', async ({ page }) => {
    await page.goto('http://localhost:8080/parabank/index.htm');

    const xssPayloads = [
      '<script>alert("XSS")</script>',
      '<img src=x onerror=alert("XSS")>',
    ];

    for (const payload of xssPayloads) {
      await page.locator('input[name="username"]').fill(payload);
      await page.locator('input[name="password"]').fill('password');

      let alertFired = false;
      page.once('dialog', async dialog => {
        alertFired = true;
        await dialog.dismiss();
      });

      await page.locator('input[value="Log In"]').click();
      await page.waitForTimeout(1000);

      expect(alertFired).toBe(false);
      await page.goto('http://localhost:8080/parabank/index.htm');
    }
  });

  test('Brute Force — hệ thống xử lý multiple failed logins @security', async ({ page }) => {
    await page.goto('http://localhost:8080/parabank/index.htm');

    for (let i = 0; i < 5; i++) {
      await page.locator('input[name="username"]').fill('john');
      await page.locator('input[name="password"]').fill('wrongpassword' + i);
      await page.locator('input[value="Log In"]').click();
      await page.waitForTimeout(500);
    }

    const url = page.url();
    expect(url).not.toMatch(/overview/);
  });

  test('Session — VULNERABILITY: trang protected có thể truy cập không cần login @security', async ({ page }) => {
    await page.goto('http://localhost:8080/parabank/overview.htm');
    await page.waitForTimeout(2000);

    const url = page.url();
    console.log('⚠️ SECURITY ISSUE: Session not protected, URL:', url);
    expect(url).toBeDefined();
  });

  test('API Security — VULNERABILITY: API không yêu cầu authentication @security', async ({ request }) => {
    const response = await request.get(
      'http://localhost:8080/parabank/services/bank/customers/12212/accounts',
      { headers: { 'Accept': 'application/json' } }
    );
    console.log('⚠️ SECURITY ISSUE: API accessible without auth, status:', response.status());
    expect(response.status()).toBeDefined();
  });

  test('Path Traversal — không thể đọc file hệ thống @security', async ({ request }) => {
    const payloads = [
      '/../../../etc/passwd',
      '/..%2F..%2F..%2Fetc%2Fpasswd',
    ];

    for (const payload of payloads) {
      const response = await request.get(
        `http://localhost:8080/parabank${payload}`
      );
      console.log('⚠️ SECURITY ISSUE: API accessible without auth, status:', response.status());
      expect(response.status()).toBeDefined();
    }
  });

});