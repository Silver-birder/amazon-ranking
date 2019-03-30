const output = require('./output')()
const { closeBrowser, initBrowser, getAmazonCategoryUrl, evalGetTopFunc } = require('./chromium');

module.exports = async function (req, res) {
    const max = output.length - 1
    const random = Math.floor(Math.random() * (max + 1))
    const amazonCategoryUrl = output[random]
    const browser = await initBrowser()
    try {
        const selector = ''
        const data = await getAmazonCategoryUrl(browser, amazonCategoryUrl, selector, evalGetTopFunc)
        await closeBrowser(browser)
        res.statusCode = 200
        res.setHeader('Content-Type', `application/json`)
        res.end(JSON.stringify({
            'message': 'ok',
            'data': data,
            'url': amazonCategoryUrl
        }))
    } catch (e) {
        console.log(e)
        await closeBrowser(browser)
        res.statusCode = 200
        res.setHeader('Content-Type', `application/json`)
        res.end(JSON.stringify({
            'message': e,
            'data': [],
            'url': amazonCategoryUrl
        }))
    }
}