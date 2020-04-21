const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function protectedRouteTest() {

    chrome.setDefaultService(new chrome.ServiceBuilder('/Users/nicole/Downloads/chromedriver').build());
    let driver = await new Builder().forBrowser('chrome').build();

    // test 1: go to home
    await driver.get('http://127.0.0.1:3000/login');
    await driver.get('http://127.0.0.1:3000/home');
    driver.sleep(9000); // let it load
    let currentURL = await driver.getCurrentUrl();
    assert.equal(currentURL, 'http://127.0.0.1:3000/login' );
    console.log("PASS: Cannot enter homepage without login")


    // test 2: go to manage-requirements/student
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/manage-requirements/student');
    driver.sleep(5000); // let it load
    let currentURL2 = await driver.getCurrentUrl();
    assert.equal(currentURL2, 'http://127.0.0.1:3000/login' );
    console.log("PASS: Cannot enter manage requriements student without login");

    // test 3: go to manage-requirements/admin
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/manage-requirements/admin');
    driver.sleep(5000); // let it load
    let currentURL3 = await driver.getCurrentUrl();
    assert.equal(currentURL3, 'http://127.0.0.1:3000/login' );
    console.log("PASS: cannot enter manage requirements admin without login");


    // test 4: sign out, sign in as student, go to manage-requirements/admin and signup, get redirected to home
    await driver.get('http://127.0.0.1:3000/login');
    let email4 = driver.findElement(By.name('email'));
    let password4 = driver.findElement(By.name('password'));
    let loginButton4 = driver.findElement(By.className('login-form-button'));
    await email4.sendKeys('student@example.com');
    await password4.sendKeys('student');
    await loginButton4.click();
    await driver.sleep(5000);
    await driver.get('http://127.0.0.1:3000/manage-requirements/admin');
    await driver.sleep(5000);
    let currentURL4 = await driver.getCurrentUrl();
    assert.equal(currentURL4, 'http://127.0.0.1:3000/home' );
    console.log("PASS: Student cannot enter manage requirements admin")

    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/signup');
    driver.sleep(5000); // let it load
    let currentURL5 = await driver.getCurrentUrl();
    assert.equal(currentURL5, 'http://127.0.0.1:3000/home' );
    console.log("PASS: Student cannot enter signup page")







})();