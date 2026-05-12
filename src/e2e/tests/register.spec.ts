import { test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { faker } from '@faker-js/faker';

test.describe('User Registration', () => {

  test('đăng ký thành công với thông tin hợp lệ @smoke', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    await registerPage.register({
      firstName: faker.person.firstName(),
      lastName:  faker.person.lastName(),
      address:   faker.location.streetAddress(),
      city:      faker.location.city(),
      state:     faker.location.state(),
      zipCode:   faker.location.zipCode('#####'),
      phone:     faker.phone.number(),
      ssn:       faker.finance.accountNumber(9),
      username: faker.string.uuid().slice(0, 12),
      password:  'Test1234!',
    });

    await registerPage.expectRegisterSuccess();
  });

});