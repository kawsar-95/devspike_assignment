// @ts-check
// Positive LogIn test

// Open page
// Type email into email field
// Type password ******** into Password field
// Click Submit button 
// check remember me button
// Verify new page URL contains paperturn
// Verify button Log out is displayed on the new page
// — — — — — — —

// Negative username test

// Open page
// Type username incorrectUser into Username field
// Type password ******** into Password field
// Click Submit button
// Verify error message is displayed
// Verify error message text is Your username is invalid!
// — — — — — — —

// Negative password test

// Open page
// Type email into email field
// Type password incorrectPassword into Password field
// Click Submit button
// Verify error message is displayed
// Verify error message text is Your password is invalid!
// — — — — — — —

// However, there are more test cases that could be executed:

// Negative empty log in form test
// Open page
// Click Submit button
// Verify error message is not  displayed
// Verify error message text is Your username is invalid!
// — — — — — — —

// And some simple element visibility checks:

// Username input field is visible

// Open page
// Verify Username input field is visible
// — — — — — — —

// Password input field is visible

// Open page
// Verify Password input field is visible
// — — — — — — —

// Submit button is visible

// Open page
// Verify Submit button is visible


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';


test.beforeEach(async ({ page }) => {
  await page.goto('https://www.paperturn.com/login');
})

//test.spec.js
test.describe('Check elements visibility', () => {

  // test('Verify "Username" input field visibility', async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   const usernameInputFieldIsVisible = await loginPage.isUsernameInputFieldVisible();

  //   expect(usernameInputFieldIsVisible).toBe(true);
  // })

  // test('Verify "Password" input field visibility', async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   const passwordInputFieldIsVisible = await loginPage.isPasswordInputFieldVisible();

  //   expect(passwordInputFieldIsVisible).toBe(true);
  // })

  // test('Verify "Submit" button visibility', async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   const sumbitButtonIsVisible = await loginPage.isSubmitButtonVisible();

  //   expect(sumbitButtonIsVisible).toBe(true);
  // })
  // const validCredentials = ['test1@mitcare.com', 'Asdf@1234'];
  // const successfullyLoggedInURL = 'https://www.paperturn.com/publications';
  // const invalidUsername = 'incorrectUser@mail.com';
  // const invalidPassword = 'incorrectPassword';
  // const expectedInvalidUsernameErrorMessageText = 'Wrong email or password';
  // const expectedInvalidPasswordErrorMessageText = 'Wrong email or password';
  test('Test log in functionality with valid credentials', async ({ page }) => {
    const validCredentials = ['test1@mitcare.com', 'Asdf@1234'];
    const successfullyLoggedInURL = 'https://www.paperturn.com/publications';
    const loginPage = new LoginPage(page);

    await loginPage.logIn(validCredentials[0], validCredentials[1]);
    // await loginPage.checkRemember()
    await loginPage.clickSubmitLoginButton();
    await page.waitForTimeout(10000); // Waits for 3 seconds
    await expect(page).toHaveURL(successfullyLoggedInURL);

    const logOutButtonIsVisible = await loginPage.isLogOutButtonVisible();
    expect(logOutButtonIsVisible).toBe(true);
  })
  //test.spec.js
  test('Test log in functionality with invalid username', async ({ page }) => {
    const validCredentials = ['test1@mitcare.com', 'Asdf@1234'];
    const successfullyLoggedInURL = 'https://www.paperturn.com/publications';
    const invalidUsername = 'incorrectUser@mail.com';
    const invalidPassword = 'incorrectPassword';
    const expectedInvalidUsernameErrorMessageText = 'Wrong email or password';
    const expectedInvalidPasswordErrorMessageText = 'Wrong email or password';
    const loginPage = new LoginPage(page);
    await loginPage.logIn(invalidUsername, validCredentials[1]);
    await loginPage.clickSubmitLoginButton();
    
    const errorMessageIsVisible = await loginPage.isErrorMessageVisible();
    expect(errorMessageIsVisible).toBe(true);

    const actualInvalidUsernameErrorMessageText = await loginPage.errorMessageText();
    expect(actualInvalidUsernameErrorMessageText).toBe(expectedInvalidUsernameErrorMessageText);
  })

  test('Test log in functionality with invalid password', async ({ page }) => {
    const validCredentials = ['test1@mitcare.com', 'Asdf@1234'];
    const successfullyLoggedInURL = 'https://www.paperturn.com/publications';
    const invalidUsername = 'incorrectUser@mail.com';
    const invalidPassword = 'incorrectPassword';
    const expectedInvalidUsernameErrorMessageText = 'Wrong email or password';
    const expectedInvalidPasswordErrorMessageText = 'Wrong email or password';
    const loginPage = new LoginPage(page);
    await loginPage.logIn(validCredentials[0], invalidPassword);
    await loginPage.clickSubmitLoginButton();
    const errorMessageIsVisible = await loginPage.isErrorMessageVisible();
    expect(errorMessageIsVisible).toBe(true);

    const actualInvalidPasswordErrorMessageText = await loginPage.errorMessageText();
    expect(actualInvalidPasswordErrorMessageText).toBe(expectedInvalidPasswordErrorMessageText);
  })
  test('Test log in functionality by sumbitting empty log in form', async ({ page }) => {
    const validCredentials = ['test1@mitcare.com', 'Asdf@1234'];
    const successfullyLoggedInURL = 'https://www.paperturn.com/publications';
    const invalidUsername = 'incorrectUser@mail.com';
    const invalidPassword = 'incorrectPassword';
    const expectedInvalidUsernameErrorMessageText = 'Wrong email or password';
    const expectedInvalidPasswordErrorMessageText = 'Wrong email or password';
    const loginPage = new LoginPage(page);
    await loginPage.clickSubmitLoginButton();
    const errorMessageIsVisible = await loginPage.isErrorMessageVisible();
    expect(errorMessageIsVisible).toBe(false);

   
  })

})
// test.describe('Test "Log in" functionality', () => {
//   //   const validCredentials = ['test1@mitcare.com', 'Asdf@1234'];
//   //   const successfullyLoggedInURL = 'https://www.paperturn.com/publications';

 
// })