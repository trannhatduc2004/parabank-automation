# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\tests\auth.spec.ts >> Authentication >> login thành công với credentials hợp lệ @smoke
- Location: src\e2e\tests\auth.spec.ts:8:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /overview/
Received string:  "http://localhost:8080/parabank/login.htm;jsessionid=2E97FCB15CA1D65351261BF650367601"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    14 × unexpected value "http://localhost:8080/parabank/login.htm;jsessionid=2E97FCB15CA1D65351261BF650367601"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - heading "Customer Login" [level=2] [ref=e29]
        - generic [ref=e30]:
          - generic [ref=e31]:
            - paragraph [ref=e32]: Username
            - textbox [active] [ref=e34]
            - paragraph [ref=e35]: Password
            - textbox [ref=e37]
            - button "Log In" [ref=e39] [cursor=pointer]
          - paragraph [ref=e40]:
            - link "Forgot login info?" [ref=e41] [cursor=pointer]:
              - /url: lookup.htm
          - paragraph [ref=e42]:
            - link "Register" [ref=e43] [cursor=pointer]:
              - /url: register.htm
      - generic [ref=e44]:
        - heading "Error!" [level=1] [ref=e45]
        - paragraph [ref=e46]: The username and password could not be verified.
  - generic [ref=e48]:
    - list [ref=e49]:
      - listitem [ref=e50]:
        - link "Home" [ref=e51] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e52]:
        - link "About Us" [ref=e53] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e54]:
        - link "Services" [ref=e55] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e56]:
        - link "Products" [ref=e57] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e58]:
        - link "Locations" [ref=e59] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e60]:
        - link "Forum" [ref=e61] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e62]:
        - link "Site Map" [ref=e63] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e64]:
        - link "Contact Us" [ref=e65] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e66]: © Parasoft. All rights reserved.
    - list [ref=e67]:
      - listitem [ref=e68]: "Visit us at:"
      - listitem [ref=e69]:
        - link "www.parasoft.com" [ref=e70] [cursor=pointer]:
          - /url: http://www.parasoft.com/
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
  21 |     await this.page.goto('/parabank/index.htm');
  22 |     await this.waitForPageLoad();
  23 |     }
  24 | 
  25 |   async login(username: string, password: string) {
  26 |     await this.usernameInput.fill(username);
  27 |     await this.passwordInput.fill(password);
  28 |     await Promise.all([
  29 |       this.page.waitForURL(/overview|login/),
  30 |       this.loginButton.click(),
  31 |     ]);
  32 |   }
  33 | 
  34 |   async expectLoginSuccess() {
> 35 |     await expect(this.page).toHaveURL(/overview/, { timeout: 10000 });
     |                             ^ Error: expect(page).toHaveURL(expected) failed
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