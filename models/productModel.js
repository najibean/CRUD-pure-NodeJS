const data = require('./../data/mock.json')
const { writeDataToFile } = require('./../utils')

const findAll = () => {
	return new Promise((resolve, reject) => {
		resolve(data)
	})
}

const findById = id => {
	return new Promise((resolve, reject) => {
		const product = data.find(el => el.id === id)
		resolve(product)
	})
}

const create = product => {
	return new Promise((resolve, reject) => {
		const newProduct = { id: data[data.length - 1].id + 1, ...product }
		data.push(newProduct)
		writeDataToFile('./data/mock.json', data)
		resolve(newProduct)
	})
}

const update = (id, product) => {
	return new Promise((resolve, reject) => {
		const index = data.findIndex(el => el.id === id)
		data[index] = { id, ...product }
		writeDataToFile('./data/mock.json', data)
		resolve(data[index])
	})
}

const remove = id => {
	return new Promise((resolve, reject) => {
		const product = data.filter(el => el.id !== id)
		writeDataToFile('./data/mock.json', product)
		resolve()
	})
}

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove
}
