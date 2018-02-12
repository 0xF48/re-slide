p = require 'puppeteer'
fs = require 'fs'
express = require 'express'
test = require 'tape'
path = require 'path'


test 'diff test', (t)->
	app = express()
	app.use(express.static(path.join(__dirname,'..')))
	await app.listen 3002
	console.log 'test server started on port 3002'
	try
		browser = await p.launch()
		page  = await browser.newPage()
		page.on 'console', (msg)->
			console.log 'PAGE LOG:', msg.text()
		page.on 'error', (msg)->
			console.log 'PAGE ERROR:', msg.text()
		await page.goto('http://localhost:3002/test/test.html')
		html = await page.evaluate ()->
			return document.body.innerHTML
		await browser.close()
		fs.readFile 'test/eval.txt','utf8',(err,file)->
			t.equal(file,html,'should be equal')
			t.end()
			process.exit(0)
	catch e
		throw new Error 'STOP'
