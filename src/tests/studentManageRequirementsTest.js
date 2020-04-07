const {Builder, By, Keys} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function loginTest() {
    
    chrome.setDefaultService(new chrome.ServiceBuilder('/Users/nicole/Downloads/chromedriver').build());
    let driver = await new Builder().forBrowser('chrome').build();
    //your code inside this block
    await driver.get('http://127.0.0.1:3000/login');

    // test 1: empty fields - all warnings pop up
    // test 2: input things that are not numbers - warning
    // test 3: click alot of times


})();
  