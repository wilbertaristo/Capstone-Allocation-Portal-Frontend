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


    // test 1: LOGIN TESTS
    console.log("testing for invalid email format in login page");
    await email.sendKeys('invalid');
    await password.sendKeys('test');
    await loginButton.click(); // error message pops up
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/login');

    console.log("testing for special characters in email in login page");
    let email12 = driver.findElement(By.name('email'));
    let password12 = driver.findElement(By.name('password'));
    await email12.sendKeys('inva;;lid@example.com');
    await password12.sendKeys('test'); // error message pops up
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/login');

    console.log("testing for spaces in email in login page");
    let email13 = driver.findElement(By.name('email'));
    let password13 = driver.findElement(By.name('password'));
    await email13.sendKeys('inval id@example.com');
    await password13.sendKeys('test'); // error message pops up
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/login');

    console.log("testing for too long input in login page");
    let email14 = driver.findElement(By.name('email'));
    let password14 = driver.findElement(By.name('password'));
    await email14.sendKeys('testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest@example.com');
    await password14.sendKeys('test');  // error message pops up
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/login');

    console.log("XSS: input <script> alert('HACKED') </script> into password field, nothing should pop up");
    let email15 = driver.findElement(By.name('email'));
    let password15 = driver.findElement(By.name('password'));
    let loginButton15 = driver.findElement(By.className('login-form-button'));
    await email15.sendKeys('test@example.com');
    await password15.sendKeys("<script> alert('HACKED') </script>"); 
    await loginButton15.click();
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/login');

    console.log("test clicking the login button without any input");
    let loginButton16 = driver.findElement(By.className('login-form-button'));
    await loginButton16.click(); // prompts to fill in inputs pop up
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/login');

    console.log("input an incorrect email and password");
    let email17 = driver.findElement(By.name('email'));
    let password17 = driver.findElement(By.name('password'));
    let loginButton17 = driver.findElement(By.className('login-form-button'));
    await email17.sendKeys('thisdoesnotexsit@example.com');
    await password17.sendKeys('test');
    await loginButton17.click(); // error message pops up
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/login');

    console.log("brute force attack: force user to reset password after 5 login attempts")
    let email18 = driver.findElement(By.name('email'));
    let password18 = driver.findElement(By.name('password'));
    let loginButton18 = driver.findElement(By.className('login-form-button'));
    await email18.sendKeys('student@example.com');
    await password18.sendKeys('st');
    await loginButton18.click();
    await driver.sleep(3000);
    await password18.sendKeys('u');
    await loginButton18.click();
    await driver.sleep(3000);
    await password18.sendKeys('d');
    await loginButton18.click();
    await driver.sleep(3000);
    await password18.sendKeys('e');
    await loginButton18.click();
    await driver.sleep(3000);
    await password18.sendKeys('n');
    await loginButton18.click();
    await driver.sleep(3000);
    await password18.sendKeys('ttt');
    await loginButton18.click();
    await driver.sleep(5000); // this is the correct password, but error message will pop up
    await driver.get('http://127.0.0.1:3000/login');

    console.log("SQL injection: input '' OR '0'='0' into password")
    let email11 = driver.findElement(By.name('email'));
    let password11 = driver.findElement(By.name('password'));
    let loginButton11 = driver.findElement(By.className('login-form-button'));
    await email11.sendKeys('student@example.com');
    await password11.sendKeys("' OR '0'='0'");
    await loginButton11.click(); // this will enter the home page 
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/login');

    console.log("login to admin account")
    let email19 = driver.findElement(By.name('email'));
    let password19 = driver.findElement(By.name('password'));
    let loginButton19 = driver.findElement(By.className('login-form-button'));
    await email19.sendKeys('admin@example.com');
    await password19.sendKeys('admin');
    await loginButton19.click(); // this will enter the home page 
    await driver.sleep(3000);

    // TEST2: ADMIN MANAGE REQUIREMENTS PAGE
    console.log("XSS: try to enter a script into input fields, nothing should popup");
    let adminManageRequirementsButton21 = driver.findElement(By.className('admin-manage-requirements'));
    await adminManageRequirementsButton21.click();
    let groupName21 = driver.findElement(By.name('groupName'));
    let type21 = driver.findElement(By.name('typePrototype'));
    let spaceX21 = driver.findElement(By.name('spaceX'));
    let spaceY21 = driver.findElement(By.name('spaceY'));
    let spaceZ21 = driver.findElement(By.name('spaceZ'));
    let prototypeX21 = driver.findElement(By.name('prototypeX'));
    let prototypeY21 = driver.findElement(By.name('prototypeY'));
    let prototypeZ21 = driver.findElement(By.name('prototypeZ'));
    let prototypeWeight21 = driver.findElement(By.name('prototypeWeight'));
    let powerPointsCount21 = driver.findElement(By.name('powerPointsCount'));
    let pedestalBigCount21 = driver.findElement(By.name('pedestalBigCount'));
    let pedestalSmallCount21 = driver.findElement(By.name('pedestalSmallCount'));
    let monitorCount21 = driver.findElement(By.name('monitorCount'));
    let tvCount21 = driver.findElement(By.name('tvCount'));
    let tableCount21 = driver.findElement(By.name('tableCount'));
    let chairCount21 = driver.findElement(By.name('chairCount'));
    let hdmiToVgaAdapterCount21 = driver.findElement(By.name('hdmiToVgaAdapterCount'));
    let hdmiCableCount21 = driver.findElement(By.name('hdmiCableCount'));
    let remark21 = driver.findElement(By.name('remark'));
    await groupName21.sendKeys('<script> alert("HACKED") </script>');
    await type21.sendKeys('<script> alert("HACKED") </script>');
    await spaceX21.sendKeys('1');
    await spaceY21.sendKeys('1');
    await spaceZ21.sendKeys('1');
    await prototypeX21.sendKeys('1');
    await prototypeY21.sendKeys('1');
    await prototypeZ21.sendKeys('1');
    await prototypeWeight21.sendKeys('1');
    await powerPointsCount21.sendKeys('1');
    await pedestalBigCount21.sendKeys('1');
    await pedestalSmallCount21.sendKeys('1');
    await monitorCount21.sendKeys('1');
    await tvCount21.sendKeys('1');
    await tableCount21.sendKeys('1');
    await chairCount21.sendKeys('1');
    await hdmiToVgaAdapterCount21.sendKeys('1');
    await hdmiCableCount21.sendKeys('1');
    await remark21.sendKeys('<script> alert("HACKED") </script>');
    let submitButton21 = driver.findElement(By.className('reset-filter-button'));
    submitButton21.click();
    await driver.sleep(3000);
    
    console.log("test invalid inputs (inputs that are not numbers)")
    let groupName22 = driver.findElement(By.name('groupName'));
    let type22 = driver.findElement(By.name('typePrototype'));
    let spaceX22 = driver.findElement(By.name('spaceX'));
    let spaceY22 = driver.findElement(By.name('spaceY'));
    let spaceZ22 = driver.findElement(By.name('spaceZ'));
    let prototypeX22 = driver.findElement(By.name('prototypeX'));
    let prototypeY22 = driver.findElement(By.name('prototypeY'));
    let prototypeZ22 = driver.findElement(By.name('prototypeZ'));
    let prototypeWeight22 = driver.findElement(By.name('prototypeWeight'));
    let powerPointsCount22 = driver.findElement(By.name('powerPointsCount'));
    let pedestalBigCount22 = driver.findElement(By.name('pedestalBigCount'));
    let pedestalSmallCount22 = driver.findElement(By.name('pedestalSmallCount'));
    let monitorCount22 = driver.findElement(By.name('monitorCount'));
    let tvCount22 = driver.findElement(By.name('tvCount'));
    let tableCount22 = driver.findElement(By.name('tableCount'));
    let chairCount22 = driver.findElement(By.name('chairCount'));
    let hdmiToVgaAdapterCount22 = driver.findElement(By.name('hdmiToVgaAdapterCount'));
    let hdmiCableCount22 = driver.findElement(By.name('hdmiCableCount'));
    let remark22 = driver.findElement(By.name('remark'));
    await groupName22.sendKeys('test');
    await type22.sendKeys('test');
    await spaceX22.sendKeys('test');
    await spaceY22.sendKeys('test');
    await spaceZ22.sendKeys('test');
    await prototypeX22.sendKeys('test');
    await prototypeY22.sendKeys('test');
    await prototypeZ22.sendKeys('test');
    await prototypeWeight22.sendKeys('test');
    await powerPointsCount22.sendKeys('test');
    await pedestalBigCount22.sendKeys('test');
    await pedestalSmallCount22.sendKeys('test');
    await monitorCount22.sendKeys('test');
    await tvCount22.sendKeys('test');
    await tableCount22.sendKeys('test');
    await chairCount22.sendKeys('test');
    await hdmiToVgaAdapterCount22.sendKeys('test');
    await hdmiCableCount22.sendKeys('test');
    await remark22.sendKeys('test');
    let submitButton22 = driver.findElement(By.className('reset-filter-button'));
    submitButton22.click();
    await driver.sleep(3000);

    // TEST3: SIGNUP PAGE
    console.log("invalid email in signup, password and confirm password do not match")
    await driver.get('http://127.0.0.1:3000/signup');
    let fullName31 = driver.findElement(By.name('fullName'));
    let email31 = driver.findElement(By.name('email'));
    let password31 = driver.findElement(By.name('password'));
    let confirmPassword31 = driver.findElement(By.name('confirmPassword'));
    await fullName31.sendKeys('test');      
    await email31.sendKeys('invalidemails'); // see warning pops up 
    await password31.sendKeys('test');
    await confirmPassword31.sendKeys('test12'); // see warning pop up
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/signup');

    console.log("testing for special characters in email in sign page");
    let email32 = driver.findElement(By.name('email'));
    let password32 = driver.findElement(By.name('password'));
    await email32.sendKeys('inva;;lid@example.com');
    await password32.sendKeys('test'); // error message pops up
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/signup');

    console.log("testing for spaces in email in signup page");
    let email33 = driver.findElement(By.name('email'));
    let password33 = driver.findElement(By.name('password'));
    await email33.sendKeys('inval id@example.com');
    await password33.sendKeys('test'); // error message pops up
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/signup');

    console.log("testing for too long input in signup page");
    let email34 = driver.findElement(By.name('email'));
    let password34 = driver.findElement(By.name('password'));
    await email34.sendKeys('testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest@example.com');
    await password34.sendKeys('test');  // error message pops up
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/signup');

    console.log("XSS: input <script> alert('HACKED') </script> into full name and password field, nothing should pop up");
    let fullName35 = driver.findElement(By.name('fullName'));
    let email35 = driver.findElement(By.name('email'));
    let password35 = driver.findElement(By.name('password'));
    let confirmPassword35 = driver.findElement(By.name('confirmPassword'));
    let signupButton35 = driver.findElement(By.className('signup-form-button'));
    await fullName35.sendKeys("<script> alert('HACKED') </script>");
    await email35.sendKeys('newaccount1@example.com'); // CHANGE THIS BEFORE EACH TEST
    await password35.sendKeys("<script> alert('HACKED') </script>"); 
    await confirmPassword35.sendKeys("<script> alert('HACKED') </script>");
    await signupButton35.click();
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/signup');

    console.log("test empty fields in signup form")
    await driver.sleep(5000);
    let submitButton36 = driver.findElement(By.className('signup-form-button'));
    await submitButton36.click(); // try to click but cannot
    await driver.sleep(3000);
    await driver.get('http://127.0.0.1:3000/home');

    

    
    


})();
  