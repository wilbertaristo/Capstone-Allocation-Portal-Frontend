const {Builder, By, Keys} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');


(async function loginTest() {
    
    chrome.setDefaultService(new chrome.ServiceBuilder('/Users/nicole/Downloads/chromedriver').build());
    let driver = await new Builder().forBrowser('chrome').build();
    //your code inside this block

    await driver.get('http://127.0.0.1:3000/login');
    let email = driver.findElement(By.name('email'));
    let password = driver.findElement(By.name('password'));
    let loginButton = driver.findElement(By.className('login-form-button'));
    await email.sendKeys('student@example.com');
    await password.sendKeys('student');
    await loginButton.click();
    await driver.sleep(5000);
    let studentManageRequirementsButton = driver.findElement(By.className('student-manage-requirements'));
    await studentManageRequirementsButton.click();

    // test 1: inputs things that are not numbers 
    let groupName = driver.findElement(By.name('groupName'));
    let typePrototype = driver.findElement(By.name('typePrototype'));
    let typeDescription = driver.findElement(By.name('typeDescription'));
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
    await typeDescription.sendKeys('test');
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
    let submitButton = driver.findElement(By.className('submit-requirements-button'));
    submitButton.click();
    await driver.get('http://127.0.0.1:3000/manage-requirements/student');

    // test 2: click submit with empty fields
    await driver.sleep(5000);
    let submitButton2 = driver.findElement(By.className('submit-requirements-button'));
    await driver.sleep(3000);
    submitButton2.click();
    await driver.sleep(3000);
    await driver.navigate().refresh();

    // test 3: submit with valid values
    let groupName3 = driver.findElement(By.name('groupName'));
    let typePrototype3 = driver.findElement(By.name('typePrototype'));
    let typeDescription3 = driver.findElement(By.name('typeDescription'));
    let spaceX3 = driver.findElement(By.name('spaceX'));
    let spaceY3 = driver.findElement(By.name('spaceY'));
    let spaceZ3 = driver.findElement(By.name('spaceZ'));
    let prototypeX3 = driver.findElement(By.name('prototypeX'));
    let prototypeY3 = driver.findElement(By.name('prototypeY'));
    let prototypeZ3 = driver.findElement(By.name('prototypeZ'));
    let prototypeWeight3 = driver.findElement(By.name('prototypeWeight'));
    let powerPointsCount3 = driver.findElement(By.name('powerPointsCount'));
    let pedestalBigCount3 = driver.findElement(By.name('pedestalBigCount'));
    let pedestalSmallCount3 = driver.findElement(By.name('pedestalSmallCount'));
    let pedestalDescription3 = driver.findElement(By.name('pedestalDescription'));
    let monitorCount3 = driver.findElement(By.name('monitorCount'));
    let tvCount3 = driver.findElement(By.name('tvCount'));
    let tableCount3 = driver.findElement(By.name('tableCount'));
    let chairCount3 = driver.findElement(By.name('chairCount'));
    let hdmiToVgaAdapterCount3 = driver.findElement(By.name('hdmiToVgaAdapterCount'));
    let hdmiCableCount3 = driver.findElement(By.name('hdmiCableCount'));
    await groupName3.sendKeys('test');
    await typePrototype3.sendKeys('test');
    await typeDescription3.sendKeys('test');
    await spaceX3.sendKeys('1');
    await spaceY3.sendKeys('1');
    await spaceZ3.sendKeys('1');
    await prototypeX3.sendKeys('1');
    await prototypeY3.sendKeys('1');
    await prototypeZ3.sendKeys('1');
    await prototypeWeight3.sendKeys('1');
    await powerPointsCount3.sendKeys('1');
    await pedestalBigCount3.sendKeys('1');
    await pedestalSmallCount3.sendKeys('1');
    await pedestalDescription3.sendKeys('test');
    await monitorCount3.sendKeys('1');
    await tvCount3.sendKeys('1');
    await tableCount3.sendKeys('1');
    await chairCount3.sendKeys('1');
    await hdmiToVgaAdapterCount3.sendKeys('1');
    await hdmiCableCount3.sendKeys('1');
    let submitButton3 = driver.findElement(By.className('submit-requirements-button'));
    submitButton3.click();


})();
  