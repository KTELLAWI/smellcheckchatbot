const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com');
    console.log('Successfully loaded WhatsApp Web');
    await browser.close();
})();
