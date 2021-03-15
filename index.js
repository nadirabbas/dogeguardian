require('dotenv').config();
const puppeteer = require('puppeteer');
const app = require('express')();

const credentials = {
    token: process.env.ACCESS_TOKEN,
    refresh: process.env.REFRESH_TOKEN
};

(async () => {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.goto("https://dogehouse.tv")
    await page.waitForSelector("button")
    await page.evaluate(credentials => {
        localStorage.setItem("@toum/token", credentials.token)
        localStorage.setItem("@toum/refresh-token", credentials.refresh)
    }, credentials)
    await page.goto(process.env.ROOM_LINK)


    app.get('/refresh', async (_, res) => {
        await page.reload();
        res.send('i refreshed')
    })
})()

const port = process.env.PORT || 5678
app.listen(port, '0.0.0.0', () => console.log('dude, I am LIVE! at ' + port))