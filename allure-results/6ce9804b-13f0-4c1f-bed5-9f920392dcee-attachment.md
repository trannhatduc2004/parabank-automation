# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\tests\register.spec.ts >> User Registration >> đăng ký thành công với thông tin hợp lệ @smoke
- Location: src\e2e\tests\register.spec.ts:7:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=created successfully').or(locator('text=Welcome'))
Expected: visible
Error: strict mode violation: locator('text=created successfully').or(locator('text=Welcome')) resolved to 3 elements:
    1) <b>Welcome</b> aka getByText('Welcome', { exact: true })
    2) <h1 class="title">Welcome Leticia.SpRYx6P6</h1> aka getByRole('heading', { name: 'Welcome Leticia.SpRYx6P6' })
    3) <p>Your account was created successfully. You are no…</p> aka getByText('Your account was created')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('text=created successfully').or(locator('text=Welcome'))

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
        - paragraph [ref=e29]: Welcome Cameron DuBuque
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e48]:
        - heading "Welcome Leticia.SpRYx6P6" [level=1] [ref=e49]
        - paragraph [ref=e50]: Your account was created successfully. You are now logged in.
  - generic [ref=e52]:
    - list [ref=e53]:
      - listitem [ref=e54]:
        - link "Home" [ref=e55] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e56]:
        - link "About Us" [ref=e57] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e58]:
        - link "Services" [ref=e59] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e60]:
        - link "Products" [ref=e61] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e62]:
        - link "Locations" [ref=e63] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e64]:
        - link "Forum" [ref=e65] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e66]:
        - link "Site Map" [ref=e67] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e68]:
        - link "Contact Us" [ref=e69] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e70]: © Parasoft. All rights reserved.
    - list [ref=e71]:
      - listitem [ref=e72]: "Visit us at:"
      - listitem [ref=e73]:
        - link "www.parasoft.com" [ref=e74] [cursor=pointer]:
          - /url: http://www.parasoft.com/
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
  35 |     await this.page.goto('http://localhost:8080/parabank/register.htm');
  36 |     await this.waitForPageLoad();
  37 |     }
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
  51 |     await this.firstNameInput.fill(data.firstName);
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
  67 |     await expect(this.page).toHaveURL(/overview|register/, { timeout: 10000 });
  68 |     await expect(
  69 |         this.page.locator('text=created successfully').or(
  70 |         this.page.locator('text=Welcome')
  71 |         )
> 72 |     ).toBeVisible({ timeout: 10000 });
     |       ^ Error: expect(locator).toBeVisible() failed
  73 |     }
  74 | }
```