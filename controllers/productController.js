const Product = require('./../models/productModel')
const { getPostData } = require('./../utils')

const getProductAll = async (req, res) => {
  try {
    const products = await Product.findAll()

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(products))
    res.end()
  } catch (error) {
    console.log(error)
  }
}

const getProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify({ message: 'product not found' }))
      res.end()
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(product))
    res.end()
  } catch (error) {
    console.log(error)
  }
}

const createProduct = async (req, res) => {
  try {
    // dari req.body via POSTMAN -- sudah dalam format JSON
    const productInput = await getPostData(req)

    const newProduct = await Product.create(productInput)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(newProduct))
    res.end()
  } catch (error) {
    console.log(error)
  }
}

const updateProduct = async (req, res, id) => {
  try {
    const productFound = await Product.findById(id)
    if (!productFound) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify({ message: 'product not found' }))
    }
    const { name, email, description } = await getPostData(req)
    const productInput = {
      name: name || productFound.name,
      email: email || productFound.email,
      description: description || productFound.description,
    }

    const updatedProduct = await Product.update(id, productInput)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(updatedProduct))
    res.end()
  } catch (error) {
    console.log(error)
  }
}

const deleteProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify({ message: 'product not found' }))
      res.end()
    }
    await Product.remove(id)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({message: `Product ${id} has been removed`}))
    res.end()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProductAll,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
