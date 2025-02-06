export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInputField = page.locator('#email');
    this.passwordInputField = page.locator('#password');
    this.submitButton = page.locator('(//button[normalize-space()="Log in"])');
    this.rememberMeCheck = page.locator('.checkbox')
    this.errorMessage = page.locator('//p[normalize-space()="Wrong email or password"]')
    this.logOutButton = page.locator('//li[@class="sub-menu"]//a[contains(text(),"Log out")]')
    this.closeButton = page.locator('.CybotCookiebotBannerCloseButton')
  }
  async isUsernameInputFieldVisible() {
    const usernameInputField = this.usernameInputField;
    return await usernameInputField.isVisible();
  }

  async isPasswordInputFieldVisible() {
    const passwordInputField = this.passwordInputField;
    return await passwordInputField.isVisible();
  }

  async isSubmitButtonVisible() {
    const submitButton = this.submitButton;
    return await submitButton.isVisible();
  }

  //login-page.js
  async fillUsername(username) {
    const usernameInputField = this.usernameInputField;
    await usernameInputField.fill(username);
  }

  async fillPassword(password) {
    const passwordInputField = this.passwordInputField;
    await passwordInputField.fill(password);
  }

  async logIn(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
  }
  async checkRemember() {
    await page.getByLabel('Remember me').check();
    // expect(page.getByLabel('Remember me')).toBeChecked();
    await this.checkRemember.toBeChecked();
  }
  //login-page.js
  async clickSubmitLoginButton() {
    const clickAccessibilityButton = this.closeButton;
    const submitButton = this.submitButton;
    await submitButton.click({ force: true });
  }
  //login-page.js
  async isLogOutButtonVisible() {
    const logOutButton = this.logOutButton;
    return await logOutButton.isVisible();
  }

  async isErrorMessageVisible() {
    const errorMessage = this.errorMessage;
    return await errorMessage.isVisible();
  }

  async errorMessageText() {
    const errorMessage = this.errorMessage;
    return await errorMessage.textContent();
  }
}