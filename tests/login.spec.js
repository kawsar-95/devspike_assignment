// Positive Login Test
// 1. Open page
// 2. Type email into email field
// 3. Type password (********) into password field
// 4. Check "Remember me" option
// 5. Click Submit button
// 6. Verify URL contains "paperturn"
// 7. Verify "Log out" button is visible

// Negative Username Test
// 1. Open page
// 2. Type "incorrectUser" into username field
// 3. Type password (********) into password field
// 4. Click Submit button
// 5. Verify error message is displayed
// 6. Verify error message text is "Your username is invalid!"

// Negative Password Test
// 1. Open page
// 2. Type email into email field
// 3. Type "incorrectPassword" into password field
// 4. Click Submit button
// 5. Verify error message is displayed
// 6. Verify error message text is "Your password is invalid!"

// Negative Empty Form Test
// 1. Open page
// 2. Click Submit button
// 3. Verify error message is not displayed
// 4. Verify error message text is "Your username is invalid!"

// Element Visibility Checks
// 1. Open page
// 2. Verify Username field is visible
// 3. Verify Password field is visible
// 4. Verify Submit button is visible

// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

// Common variables
const validCredentials = ['test1@mitcare.com', 'Asdf@1234'];
const successfullyLoggedInURL = 'https://www.paperturn.com/publications';
const invalidUsername = 'incorrectUser@mail.com';
const invalidPassword = 'incorrectPassword';
const expectedInvalidErrorMessageText = 'Wrong email or password';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.paperturn.com/login');
});

test.describe('Log in tests', () => {
  test('Verify "Username", "Password" input fields and "Submit" button visibility', async ({ page }) => {
    const loginPage = new LoginPage(page);

    expect(await loginPage.isUsernameInputFieldVisible()).toBe(true);
    expect(await loginPage.isPasswordInputFieldVisible()).toBe(true);
    expect(await loginPage.isSubmitButtonVisible()).toBe(true);
  });

  test('Should log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.logIn(validCredentials[0], validCredentials[1]);
    await loginPage.clickSubmitLoginButton();
    await expect(page).toHaveURL(successfullyLoggedInURL);
    await page.waitForTimeout(5000);

    expect(await loginPage.isLogOutButtonVisible()).toBe(true);
  });

  test('Should show error for invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.logIn(invalidUsername, validCredentials[1]);
    await loginPage.clickSubmitLoginButton();
    await page.waitForTimeout(5000);

    expect(await loginPage.isErrorMessageVisible()).toBe(true);
    expect(await loginPage.errorMessageText()).toBe(expectedInvalidErrorMessageText);
  });

  test('Should show error for invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.logIn(validCredentials[0], invalidPassword);
    await loginPage.clickSubmitLoginButton();
    await page.waitForTimeout(5000);

    expect(await loginPage.isErrorMessageVisible()).toBe(true);
    expect(await loginPage.errorMessageText()).toBe(expectedInvalidErrorMessageText);
  });

  test('Should handle empty login form gracefully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickSubmitLoginButton();
    expect(await loginPage.isErrorMessageVisible()).toBe(false);
  });

  // Merged visibility tests

});

