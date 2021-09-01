const fs = require('fs')
const data = require('./data/mock.json')

const writeDataToFile = (filename, content) => {
	fs.writeFileSync(filename, JSON.stringify(content), 'utf8', err => {
		if (err) {
			console.log(err)
		}
	})
}

const getPostData = req => {
	return new Promise((resolve, reject) => {
		try {
			let body = ''
			req.on('data', chunk => {
				body += chunk.toString()
			})
			req.on('end', () => {
				const productInput = JSON.parse(body)
				resolve(productInput)
			})
		} catch (error) {
			console.log(error)
		}
	})
}

module.exports = {
	writeDataToFile,
	getPostData
}
