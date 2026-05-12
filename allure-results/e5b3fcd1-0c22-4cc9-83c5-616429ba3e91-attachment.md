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

Locator: locator('p').filter({ hasText: 'Your account was created successfully' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('p').filter({ hasText: 'Your account was created successfully' })

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
        - heading "Signing up is easy!" [level=1] [ref=e45]
        - paragraph [ref=e46]: If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.
        - table [ref=e48]:
          - rowgroup [ref=e49]:
            - 'row "First Name: Leora" [ref=e50]':
              - cell "First Name:" [ref=e51]
              - cell "Leora" [ref=e52]:
                - textbox [ref=e53]: Leora
              - cell [ref=e54]
            - 'row "Last Name: Botsford" [ref=e55]':
              - cell "Last Name:" [ref=e56]
              - cell "Botsford" [ref=e57]:
                - textbox [ref=e58]: Botsford
              - cell [ref=e59]
            - 'row "Address: 3443 Yasmeen Landing" [ref=e60]':
              - cell "Address:" [ref=e61]
              - cell "3443 Yasmeen Landing" [ref=e62]:
                - textbox [ref=e63]: 3443 Yasmeen Landing
              - cell [ref=e64]
            - 'row "City: Parkerburgh" [ref=e65]':
              - cell "City:" [ref=e66]
              - cell "Parkerburgh" [ref=e67]:
                - textbox [ref=e68]: Parkerburgh
              - cell [ref=e69]
            - 'row "State: Kentucky" [ref=e70]':
              - cell "State:" [ref=e71]
              - cell "Kentucky" [ref=e72]:
                - textbox [ref=e73]: Kentucky
              - cell [ref=e74]
            - 'row "Zip Code: 39404" [ref=e75]':
              - cell "Zip Code:" [ref=e76]
              - cell "39404" [ref=e77]:
                - textbox [ref=e78]: "39404"
              - cell [ref=e79]
            - 'row "Phone #: (436) 619-5647 x87479" [ref=e80]':
              - 'cell "Phone #:" [ref=e81]'
              - cell "(436) 619-5647 x87479" [ref=e82]:
                - textbox [ref=e83]: (436) 619-5647 x87479
              - cell [ref=e84]
            - 'row "SSN: 616149804" [ref=e85]':
              - cell "SSN:" [ref=e86]
              - cell "616149804" [ref=e87]:
                - textbox [ref=e88]: "616149804"
              - cell [ref=e89]
            - row [ref=e90]:
              - cell [ref=e91]
            - 'row "Username: Fatima.BlixdBV0I This username already exists." [ref=e92]':
              - cell "Username:" [ref=e93]
              - cell "Fatima.BlixdBV0I" [ref=e94]:
                - textbox [ref=e95]: Fatima.BlixdBV0I
              - cell "This username already exists." [ref=e96]
            - row "Password:" [ref=e97]:
              - cell "Password:" [ref=e98]
              - cell [ref=e99]:
                - textbox [ref=e100]
              - cell [ref=e101]
            - row "Confirm:" [ref=e102]:
              - cell "Confirm:" [ref=e103]
              - cell [ref=e104]:
                - textbox [ref=e105]
              - cell [ref=e106]
            - row "Register" [ref=e107]:
              - cell [ref=e108]
              - cell "Register" [ref=e109]:
                - button "Register" [ref=e110] [cursor=pointer]
  - generic [ref=e112]:
    - list [ref=e113]:
      - listitem [ref=e114]:
        - link "Home" [ref=e115] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e116]:
        - link "About Us" [ref=e117] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e118]:
        - link "Services" [ref=e119] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e120]:
        - link "Products" [ref=e121] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e122]:
        - link "Locations" [ref=e123] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e124]:
        - link "Forum" [ref=e125] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e126]:
        - link "Site Map" [ref=e127] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e128]:
        - link "Contact Us" [ref=e129] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e130]: © Parasoft. All rights reserved.
    - list [ref=e131]:
      - listitem [ref=e132]: "Visit us at:"
      - listitem [ref=e133]:
        - link "www.parasoft.com" [ref=e134] [cursor=pointer]:
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
  67 |     await expect(
  68 |         this.page.locator('p', { hasText: 'Your account was created successfully' })
> 69 |     ).toBeVisible({ timeout: 10000 });
     |       ^ Error: expect(locator).toBeVisible() failed
  70 |     }
  71 | }
```