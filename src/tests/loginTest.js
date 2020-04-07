const {Builder, By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function loginTest() {
    
    chrome.setDefaultService(new chrome.ServiceBuilder('/Users/nicole/Downloads/chromedriver').build());
    let driver = await new Builder().forBrowser('chrome').build();
    //your code inside this block
    await driver.get('http://127.0.0.1:3000/login');

    let email = driver.findElement(By.name('email'));
    let password = driver.findElement(By.name('password'));
    let loginButton = driver.findElement(By.className('login-form-button'));
    let resetPasswordPage = driver.findElement(By.className('forgot-password'));
    let signupPage = driver.findElement(By.className('signup-form'));
    let resetButton = driver.findElement(By.className('login-form-button'));


    // test 1: invalid email
    // await email.sendKeys('invalid');
    // await password.sendKeys('test');
    // await loginButton.click();

    // // test 2: empty password/ email
    // await loginButton.click();

    // // test 3: incorrect email and password
    // await email.sendKeys('thisdoesnotexsit@example.com');
    // await password.sendKeys('test');
    // await loginButton.click();

    // // test 4: correct email and password
    // await email.sendKeys('admin@example.com');
    // await password.sendKeys('admin');
    // await loginButton.click();

    // // test 5: click reset password
    // // SLEEP AWHILE FIRST
    await driver.sleep(5000);
    await resetPasswordPage.click();

    // test 5.1: invalid email, cannot click reset button
    // await resetPasswordPage.click();
    // await email.sendKeys('thisdoesnotexist@example.com');
    // await resetButton.click();

    // // test 5.2: valid email, click reset button many times
    // await resetPasswordPage.click();
    // await email.sendKeys('admin@example.com');
    // await resetButton.click();
    // await resetButton.click();
    // await resetButton.click();
    // await resetButton.click();

    // // test 5.3: empty email
    // await resetPasswordPage.click();
    // await resetButton.click();

    // test 5: go to sign up page
    // SLEEP AWHILE FIRST
    await driver.sleep(5000);
    await signupPage.click();


})();
  