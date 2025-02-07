export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInputField = page.locator('#email');
    this.passwordInputField = page.locator('#password');
    this.submitButton = page.locator('(//button[normalize-space()="Log in"])');
    this.rememberMeCheck = page.locator('.checkbox');
    this.errorMessage = this.page.getByText('Wrong email or password')
    this.logOutButton = page.locator('//li[@class="sub-menu"]//a[contains(text(),"Log out")]');
  }

  // Visibility checks
  async isUsernameInputFieldVisible() {
    return this.usernameInputField.isVisible();
  }
  async isPasswordInputFieldVisible() {
    return this.passwordInputField.isVisible();
  }
  async isSubmitButtonVisible() {
    return this.submitButton.isVisible();
  }
  async isLogOutButtonVisible() {
    return this.logOutButton.isVisible();
  }
  async isErrorMessageVisible() {
    return this.errorMessage.isVisible();
  }

  // Input methods
  async fillUsername(username) {
    await this.usernameInputField.fill(username);
  }
  async fillPassword(password) {
    await this.passwordInputField.fill(password);
  }
  async logIn(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
  }

  // Actions
  async checkRemember() {
    await this.page.getByLabel('Remember me').check();
    await expect(this.page.getByLabel('Remember me')).toBeChecked();
  }
  async clickSubmitLoginButton() {
    await this.page.evaluate(() => window.scrollBy(0, 200));

    await this.submitButton.click({ force: true });
  }

  // Error handling
  async errorMessageText() {
    return this.errorMessage.textContent();
  }
}
