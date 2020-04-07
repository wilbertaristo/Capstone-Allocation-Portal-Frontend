const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function protectedRouteTest() {

    chrome.setDefaultService(new chrome.ServiceBuilder('/Users/nicole/Downloads/chromedriver').build());
    let driver = await new Builder().forBrowser('chrome').build();

    // test 1: go to home
    await driver.get('http://127.0.0.1:3000/home');
    driver.sleep(5000); // let it load
    let currentURL = await driver.getCurrentUrl();
    console.log(currentURL);
    assert.equal(currentURL, 'http://127.0.0.1:3000/login' );

    // test 2: go to manage-requirements/student
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/manage-requirements/student');
    driver.sleep(5000); // let it load
    let currentURL2 = await driver.getCurrentUrl();
    console.log(currentURL2);
    assert.equal(currentURL2, 'http://127.0.0.1:3000/login' );

    // test 3: go to manage-requirements/admin
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/manage-requirements/admin');
    driver.sleep(5000); // let it load
    let currentURL3 = await driver.getCurrentUrl();
    console.log(currentURL3);
    assert.equal(currentURL3, 'http://127.0.0.1:3000/login' );

    // test 4: login (as admin) and go to /login, but redirected to home
    await driver.get('http://127.0.0.1:3000/login');
    let email = driver.findElement(By.name('email'));
    let password = driver.findElement(By.name('password'));
    let loginButton = driver.findElement(By.className('login-form-button'));
    await email.sendKeys('admin@example.com');
    await password.sendKeys('admin');
    await loginButton.click();
    await driver.sleep(5000);
    await driver.get('http://127.0.0.1:3000/login');
    await driver.sleep(5000);
    let currentURL4 = await driver.getCurrentUrl();
    console.log(currentURL4);
    assert.equal(currentURL4, 'http://127.0.0.1:3000/home' );

    // test 5: sign out, sign in as student, go to manage-requirements/admin, get redirected to home
    await driver.get('http://127.0.0.1:3000/login');
    let email5 = driver.findElement(By.name('email'));
    let password5 = driver.findElement(By.name('password'));
    let loginButton5 = driver.findElement(By.className('login-form-button'));
    await email5.sendKeys('student@example.com');
    await password5.sendKeys('student');
    await loginButton5.click();
    await driver.sleep(5000);
    await driver.get('http://127.0.0.1:3000/manage-requirements/admin');
    await driver.sleep(5000);
    let currentURL5 = await driver.getCurrentUrl();
    console.log(currentURL5);
    assert.equal(currentURL5, 'http://127.0.0.1:3000/home' );






})();