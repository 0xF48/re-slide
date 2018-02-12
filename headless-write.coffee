p = require 'puppeteer'
fs = require('fs')
express = require 'express'
app = express()
app.use(express.static(__dirname))
app.listen 3002, ()->
	console.log 'on port 3002'
	browser = await p.launch()
	page  = await browser.newPage()
	page.on 'console', (msg)->
		console.log 'PAGE LOG:', msg.text()
	await page.goto('http://localhost:3002/test.html')
	html = await page.evaluate ()->
		return document.body.innerHTML
	await browser.close()
	fs.writeFile 'eval.txt',html,'utf8',()->
		console.log html
		console.log 'wrote to eval.txt'
		process.exit(0)
