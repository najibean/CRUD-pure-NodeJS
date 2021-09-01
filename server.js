const http = require('http')
const {
  getProductAll,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers/productController')
const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
  if (req.url === '/api/product' && req.method === 'GET') {
    getProductAll(req, res)
  } else if (
    req.url.match(/\/api\/product\/([0-9]+)/) &&
    req.method === 'GET'
  ) {
    const id = parseInt(req.url.split('/')[3])
    getProduct(req, res, id)
  } else if (req.url === '/api/product' && req.method === 'POST') {
    createProduct(req, res)
  } else if (
    req.url.match(/\/api\/product\/([0-9]+)/) &&
    req.method === 'PUT'
  ) {
    const id = parseInt(req.url.split('/')[3])
    updateProduct(req, res, id)
  } else if (
    req.url.match(/\/api\/product\/([0-9]+)/) &&
    req.method === 'DELETE'
  ) {
    const id = parseInt(req.url.split('/')[3])
    deleteProduct(req, res, id)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ message: 'url not found' }))
    res.end()
  }
})

server.listen(PORT, () => {
  console.log('server running on port ' + PORT)
})
