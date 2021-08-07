const db = require('../models')
const Item = db.items

exports.create = (req, res) => {
	const { name, price, imageurl } = req.body
	if (!name || !price) {
		res.status(400).send({ message: 'Wrong Content!' })
		return
	}

	const item = new Item({
		name: name,
		price: price ? price : '',
		imageurl: imageurl ? imageurl : '',
	})

	item
		.save(item)
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the items.',
			})
		})
}

exports.findAll = (req, res) => {
	const { name } = req.query
	var condition = name
		? { name: { $regex: new RegExp(name), $options: 'i' } }
		: {}

	Item.find(condition)
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving items.',
			})
		})
}

exports.findOne = (req, res) => {
	const id = req.params.id

	Item.findById(id)
		.then((data) => {
			if (!data)
				res.status(404).send({ message: 'Not found item with id ' + id })
			else res.send(data)
		})
		.catch((err) => {
			res.status(500).send({ message: 'Error retrieving item with id=' + id })
		})
}

exports.update = (req, res) => {
	if (!req.body || JSON.stringify(req.body) === JSON.stringify({})) {
		return res.status(400).send({
			message: 'Data to update can not be empty!',
		})
	}

	const { id } = req.params

	Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot update item with id=${id}. Maybe item was not found!`,
				})
			} else res.send({ message: 'Item was updated successfully.' })
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating item with id=' + id,
			})
		})
}

exports.delete = (req, res) => {
	const { id } = req.params

	Item.findByIdAndRemove(id, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete item with id=${id}. Maybe item was not found!`,
				})
			} else {
				res.send({
					message: 'Item was deleted successfully!',
				})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete item with id=' + id,
			})
		})
}
