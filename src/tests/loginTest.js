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
    await email.sendKeys('invalid');
    await password.sendKeys('test');
    await loginButton.click(); // error message pops up
    await driver.sleep(3000);
    await driver.navigate().refresh();

    // test 2: empty password/ email
    let loginButton2 = driver.findElement(By.className('login-form-button'));
    await loginButton2.click(); // prompts to fill in inputs pop up
    await driver.sleep(3000);
    await driver.navigate().refresh();

    // test 3: incorrect email and password
    let email3 = driver.findElement(By.name('email'));
    let password3 = driver.findElement(By.name('password'));
    let loginButton3 = driver.findElement(By.className('login-form-button'));
    await email3.sendKeys('thisdoesnotexsit@example.com');
    await password3.sendKeys('test');
    await loginButton3.click(); // error message pops up
    await driver.sleep(3000);
    await driver.navigate().refresh();

    // test 4: correct email and password
    let email4 = driver.findElement(By.name('email'));
    let password4 = driver.findElement(By.name('password'));
    let loginButton4 = driver.findElement(By.className('login-form-button'));
    await email4.sendKeys('admin@example.com');
    await password4.sendKeys('admin');
    await loginButton4.click(); // this will enter the home page 
    await driver.sleep(3000);
    // ends tests for login page

    // test 5: click reset password
    // SLEEP AWHILE FIRST
    let resetPasswordPage5 = driver.findElement(By.className('forgot-password'));
    await driver.sleep(5000);
    await resetPasswordPage5.click(); 
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/login');

    // test 5.1: invalid email, cannot click reset button
    await driver.sleep(5000);
    let resetPasswordPage51 = driver.findElement(By.className('forgot-password'));
    await resetPasswordPage51.click();
    let email51 = driver.findElement(By.name('email'));
    let resetButton51 = driver.findElement(By.className('login-form-button'));
    await email51.sendKeys('thisdoesnotexist@example.com');
    await resetButton51.click();
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/login');


    // test 5.2: valid email, click reset button
    await driver.sleep(5000);
    let resetPasswordPage52 = driver.findElement(By.className('forgot-password'));
    await resetPasswordPage52.click();
    let email52 = driver.findElement(By.name('email'));
    let resetButton52 = driver.findElement(By.className('login-form-button'));
    await email52.sendKeys('admin@example.com');
    await resetButton52.click();
    await driver.sleep(5000);
    await driver.get('http://127.0.0.1:3000/login');

    // test 5.3: empty email
    await driver.sleep(5000);
    let resetPasswordPage53 = driver.findElement(By.className('forgot-password'));
    await resetPasswordPage53.click();
    let resetButton53 = driver.findElement(By.className('login-form-button'));
    await resetButton53.click();
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/login');

    // test 5: go to sign up page
    // SLEEP AWHILE FIRST
    await driver.sleep(5000);
    let signupPage5 = driver.findElement(By.className('signup-page'));
    await driver.sleep(5000);
    await signupPage5.click();


})();
  