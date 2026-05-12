# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\tests\auth.spec.ts >> Authentication >> login thành công với credentials hợp lệ @smoke
- Location: src\e2e\tests\auth.spec.ts:8:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('input[name="username"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "HTTP Status 404 – Not Found" [level=1] [ref=e2]
  - separator [ref=e3]
  - paragraph [ref=e4]: Type Status Report
  - paragraph [ref=e5]: Description The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.
  - separator [ref=e6]
  - heading "Apache Tomcat/10.1.54" [level=3] [ref=e7]
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class LoginPage extends BasePage {
  5  |   private readonly usernameInput: Locator;
  6  |   private readonly passwordInput: Locator;
  7  |   private readonly loginButton: Locator;
  8  |   private readonly errorMessage: Locator;
  9  |   private readonly registerLink: Locator;
  10 | 
  11 |   constructor(page: Page) {
  12 |     super(page);
  13 |     this.usernameInput = page.locator('input[name="username"]');
  14 |     this.passwordInput = page.locator('input[name="password"]');
  15 |     this.loginButton   = page.locator('input[value="Log In"]');
  16 |     this.errorMessage  = page.locator('.error');
  17 |     this.registerLink  = page.locator('a[href="register.htm"]');
  18 |   }
  19 | 
  20 |   async goto() {
  21 |     await this.navigate('/index.htm');
  22 |     await this.waitForPageLoad();
  23 |   }
  24 | 
  25 |   async login(username: string, password: string) {
> 26 |     await this.usernameInput.fill(username);
     |                              ^ Error: locator.fill: Test timeout of 60000ms exceeded.
  27 |     await this.passwordInput.fill(password);
  28 |     await Promise.all([
  29 |       this.page.waitForURL(/overview|login/),
  30 |       this.loginButton.click(),
  31 |     ]);
  32 |   }
  33 | 
  34 |   async expectLoginSuccess() {
  35 |     await expect(this.page).toHaveURL(/overview/, { timeout: 10000 });
  36 |   }
  37 | 
  38 |   async expectLoginError() {
  39 |     await expect(this.errorMessage).toBeVisible({ timeout: 8000 });
  40 |   }
  41 | 
  42 |   async clickRegister() {
  43 |     await this.registerLink.click();
  44 |   }
  45 | }
```