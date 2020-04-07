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
    await fullName.sendKeys('test');      
    await email.sendKeys('invalidemails'); // see warning pops up 
    await password.sendKeys('test');
    await confirmPassword.sendKeys('test12'); // see warning pop up
    await driver.sleep(3000);
    await driver.navigate().refresh();
    
    
    // test 2: empty field
    await driver.sleep(5000);
    let submitButton2 = driver.findElement(By.className('signup-form-button'));
    await submitButton2.click();
    // try to click but cannot
    await driver.sleep(3000);
    await driver.navigate().refresh();

    // test 3: repeatedly click signup button
    let fullName3 = driver.findElement(By.name('fullName'));
    let email3 = driver.findElement(By.name('email'));
    let password3 = driver.findElement(By.name('password'));
    let confirmPassword3 = driver.findElement(By.name('confirmPassword'));
    let submitButton3 = driver.findElement(By.className('signup-form-button'));
    await fullName3.sendKeys('test');
    await email3.sendKeys('valid@example.com');
    await password3.sendKeys('test');
    await confirmPassword3.sendKeys('test');    
    await submitButton3.click();
    await submitButton3.click();
    await submitButton3.click();
    await submitButton3.click();
    await submitButton3.click();
    await submitButton3.click();
    await submitButton3.click();
    await driver.sleep(5000);
    await driver.get('http://127.0.0.1:3000/signup');

    // test 4: create new account normally
    await driver.sleep(5000);
    let fullName4 = driver.findElement(By.name('fullName'));
    let email4 = driver.findElement(By.name('email'));
    let password4 = driver.findElement(By.name('password'));
    let confirmPassword4 = driver.findElement(By.name('confirmPassword'));
    let submitButton4 = driver.findElement(By.className('signup-form-button'));
    await fullName4.sendKeys('test');
    await email4.sendKeys('newaccount@example.com');
    await password4.sendKeys('test');
    await confirmPassword4.sendKeys('test');  
    await submitButton4.click();






})();
  