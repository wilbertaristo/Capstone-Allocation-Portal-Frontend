const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function studentAccountTest() {

    chrome.setDefaultService(new chrome.ServiceBuilder('../chromedriver.exe').build());
    let driver = await new Builder().forBrowser('chrome').build();

    driver.manage().window().maximize();

    // test 1: go to home
    console.log("TESTING: Enter homepage without login, redirected to login")
    await driver.get('http://127.0.0.1:3000/login');
    await driver.get('http://127.0.0.1:3000/home'); 
    driver.sleep(9000); // let it load
    let currentURL = await driver.getCurrentUrl();
    assert.equal(currentURL, 'http://127.0.0.1:3000/login' );
    console.log("PASSED")


    // test 2: go to manage-requirements/student
    console.log("TESTING: Enter student manage requirements page without login, redirected to login");
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/manage-requirements/student');
    driver.sleep(3000); // let it load
    let currentURL2 = await driver.getCurrentUrl();
    assert.equal(currentURL2, 'http://127.0.0.1:3000/login' );
    console.log("PASSED")

    // test 3: go to manage-requirements/admin
    console.log("TESTING: Enter admin manage requirements page without login, redirected to login");
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/manage-requirements/admin');
    driver.sleep(3000); // let it load
    let currentURL3 = await driver.getCurrentUrl();
    assert.equal(currentURL3, 'http://127.0.0.1:3000/login' );
    console.log("PASSED");


    // test 4: sign out, sign in as student, go to manage-requirements/admin and signup, get redirected to home
    console.log("TESTING: Enter admin manage requirements page with student account, redirected back to home")
    await driver.get('http://127.0.0.1:3000/login');
    let email4 = driver.findElement(By.name('email'));
    let password4 = driver.findElement(By.name('password'));
    let loginButton4 = driver.findElement(By.className('login-form-button'));
    await email4.sendKeys('test@example.com');
    await password4.sendKeys('test7');
    await loginButton4.click();
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/manage-requirements/admin');
    await driver.sleep(2500);
    let currentURL4 = await driver.getCurrentUrl();
    assert.equal(currentURL4, 'http://127.0.0.1:3000/home' );
    console.log("PASSED")

    console.log("TESTING: Enter signup page with student account, redirected back to home")
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/signup');
    driver.sleep(3000); // let it load
    let currentURL5 = await driver.getCurrentUrl();
    assert.equal(currentURL5, 'http://127.0.0.1:3000/home' );
    console.log("PASSED")

    console.log("TESTING: Invalid inputs into student manage requirements fields")
    let studentManageRequirementsButton = driver.findElement(By.className('student-manage-requirements'));
    await studentManageRequirementsButton.click();
    await driver.sleep(3000);

    // test 1: inputs things that are not numbers 
    let groupName = driver.findElement(By.name('groupName'));
    let typePrototype = driver.findElement(By.name('typePrototype'));
    let spaceX = driver.findElement(By.name('spaceX'));
    let spaceY = driver.findElement(By.name('spaceY'));
    let spaceZ = driver.findElement(By.name('spaceZ'));
    let prototypeX = driver.findElement(By.name('prototypeX'));
    let prototypeY = driver.findElement(By.name('prototypeY'));
    let prototypeZ = driver.findElement(By.name('prototypeZ'));
    let prototypeWeight = driver.findElement(By.name('prototypeWeight'));
    let powerPointsCount = driver.findElement(By.name('powerPointsCount'));
    let pedestalBigCount = driver.findElement(By.name('pedestalBigCount'));
    let pedestalSmallCount = driver.findElement(By.name('pedestalSmallCount'));
    let pedestalDescription = driver.findElement(By.name('pedestalDescription'));
    let monitorCount = driver.findElement(By.name('monitorCount'));
    let tvCount = driver.findElement(By.name('tvCount'));
    let tableCount = driver.findElement(By.name('tableCount'));
    let chairCount = driver.findElement(By.name('chairCount'));
    let hdmiToVgaAdapterCount = driver.findElement(By.name('hdmiToVgaAdapterCount'));
    let hdmiCableCount = driver.findElement(By.name('hdmiCableCount'));
    await groupName.sendKeys('test');
    await typePrototype.sendKeys('test');
    await spaceX.sendKeys('test');
    await spaceY.sendKeys('test');
    await spaceZ.sendKeys('test');
    await prototypeX.sendKeys('test');
    await prototypeY.sendKeys('test');
    await prototypeZ.sendKeys('test');
    await prototypeWeight.sendKeys('test');
    await powerPointsCount.sendKeys('test');
    await pedestalBigCount.sendKeys('test');
    await pedestalSmallCount.sendKeys('test');
    await pedestalDescription.sendKeys('test');
    await monitorCount.sendKeys('test');
    await tvCount.sendKeys('test');
    await tableCount.sendKeys('test');
    await chairCount.sendKeys('test');
    await hdmiToVgaAdapterCount.sendKeys('test');
    await hdmiCableCount.sendKeys('test');
    let submitButton = driver.findElement(By.className("submit-requirements-button"));
    submitButton.click();
    console.log("PASSED")
    await driver.get('http://127.0.0.1:3000/manage-requirements/student');


    // test 2: click submit with empty fields
    console.log("test submit empty form")
    await driver.sleep(5000);
    let submitButton2 = driver.findElement(By.className("submit-requirements-button"));
    await driver.sleep(3000);
    submitButton2.click();
})();