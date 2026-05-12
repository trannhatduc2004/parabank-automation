# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\tests\register.spec.ts >> User Registration >> đăng ký thành công với thông tin hợp lệ @smoke
- Location: src\e2e\tests\register.spec.ts:7:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('#customer\\.firstName')

```

# Page snapshot

```yaml
- generic [ref=e2]: "{\"type\":\"about:blank\",\"title\":\"Not Found\",\"status\":404,\"detail\":\"No endpoint GET /parabank/index.htm/register.htm.\",\"instance\":\"/parabank/index.htm/register.htm\"}"
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class RegisterPage extends BasePage {
  5  |   private readonly firstNameInput: Locator;
  6  |   private readonly lastNameInput: Locator;
  7  |   private readonly addressInput: Locator;
  8  |   private readonly cityInput: Locator;
  9  |   private readonly stateInput: Locator;
  10 |   private readonly zipCodeInput: Locator;
  11 |   private readonly phoneInput: Locator;
  12 |   private readonly ssnInput: Locator;
  13 |   private readonly usernameInput: Locator;
  14 |   private readonly passwordInput: Locator;
  15 |   private readonly confirmInput: Locator;
  16 |   private readonly registerButton: Locator;
  17 | 
  18 |   constructor(page: Page) {
  19 |     super(page);
  20 |     this.firstNameInput = page.locator('#customer\\.firstName');
  21 |     this.lastNameInput  = page.locator('#customer\\.lastName');
  22 |     this.addressInput   = page.locator('#customer\\.address\\.street');
  23 |     this.cityInput      = page.locator('#customer\\.address\\.city');
  24 |     this.stateInput     = page.locator('#customer\\.address\\.state');
  25 |     this.zipCodeInput   = page.locator('#customer\\.address\\.zipCode');
  26 |     this.phoneInput     = page.locator('#customer\\.phoneNumber');
  27 |     this.ssnInput       = page.locator('#customer\\.ssn');
  28 |     this.usernameInput  = page.locator('#customer\\.username');
  29 |     this.passwordInput  = page.locator('#customer\\.password');
  30 |     this.confirmInput   = page.locator('#repeatedPassword');
  31 |     this.registerButton = page.locator('input[value="Register"]');
  32 |   }
  33 | 
  34 |   async goto() {
  35 |     await this.navigate('/parabank/index.htm/register.htm');
  36 |     await this.waitForPageLoad();
  37 |   }
  38 | 
  39 |   async register(data: {
  40 |     firstName: string;
  41 |     lastName: string;
  42 |     address: string;
  43 |     city: string;
  44 |     state: string;
  45 |     zipCode: string;
  46 |     phone: string;
  47 |     ssn: string;
  48 |     username: string;
  49 |     password: string;
  50 |   }) {
> 51 |     await this.firstNameInput.fill(data.firstName);
     |                               ^ Error: locator.fill: Test timeout of 60000ms exceeded.
  52 |     await this.lastNameInput.fill(data.lastName);
  53 |     await this.addressInput.fill(data.address);
  54 |     await this.cityInput.fill(data.city);
  55 |     await this.stateInput.fill(data.state);
  56 |     await this.zipCodeInput.fill(data.zipCode);
  57 |     await this.phoneInput.fill(data.phone);
  58 |     await this.ssnInput.fill(data.ssn);
  59 |     await this.usernameInput.fill(data.username);
  60 |     await this.passwordInput.fill(data.password);
  61 |     await this.confirmInput.fill(data.password);
  62 |     await this.registerButton.click();
  63 |     await this.waitForPageLoad();
  64 |   }
  65 | 
  66 |   async expectRegisterSuccess() {
  67 |     await expect(this.page.locator('#customer\\.firstName')).not.toBeVisible();
  68 |     await expect(this.page).toHaveURL(/register/, { timeout: 10000 });
  69 |     await expect(
  70 |       this.page.locator('h1.title')
  71 |     ).toContainText('Welcome', { timeout: 10000 });
  72 |   }
  73 | }
```