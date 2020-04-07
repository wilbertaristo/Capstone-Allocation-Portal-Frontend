const {Builder, By} = require('selenium-webdriver');
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to Url
    await driver.get('http://127.0.0.1:3000/signup');
    // Store 'SearchInput' element
    let searchInput = driver.findElement(By.name('fullName'));
    await searchInput.sendKeys("selenium");
    // Clears the entered text
    await searchInput.clear();
  }
  finally {
    //await driver.quit();
  }
})();