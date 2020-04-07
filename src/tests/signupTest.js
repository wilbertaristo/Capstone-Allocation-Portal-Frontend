const {Builder, By, Keys} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function signupTest() {
    
    chrome.setDefaultService(new chrome.ServiceBuilder('/Users/nicole/Downloads/chromedriver').build());   
    let driver = await new Builder().forBrowser('chrome').build();
    //your code inside this block
    await driver.get('http://127.0.0.1:3000/signup');

    let fullName = driver.findElement(By.name('fullName'));
    let email = driver.findElement(By.name('email'));
    let password = driver.findElement(By.name('password'));
    let confirmPassword = driver.findElement(By.name('confirmPassword'));
    let submitButton = driver.findElement(By.className('signup-form-button'));

    // test 1: invalid email and different password
    // await fullName.sendKeys('test');      
    // await email.sendKeys('invalidemails'); // see warning pops up
    // await email.clear();  
    // await password.sendKeys('test');
    // await confirmPassword.sendKeys('test12'); // see warning pop up
    // try to  click but cannot
    

    // test 2: empty field
    // await email.sendKeys('valid@example.com');
    // await password.sendKeys('test');
    // await confirmPassword.sendKeys('test');
    // // try to click but cannot

    // test 3: repeatedly click signup button
    await fullName.sendKeys('test');
    await fullName.clear();
    await email.sendKeys('valid@example.com');
    await password.sendKeys('test');
    await confirmPassword.sendKeys('test');    
    await submitButton.click();
    await submitButton.click();
    await submitButton.click();
    await submitButton.click();
    await submitButton.click();
    await submitButton.click();
    await submitButton.click();

    // // test 4: create new account normally
    // await fullName.sendKeys('test');
    // await fullName.clear();
    // await email.sendKeys('newaccount@example.com');
    // await password.sendKeys('test');
    // await confirmPassword.sendKeys('test');  
    // await submitButton.click();






})();
  