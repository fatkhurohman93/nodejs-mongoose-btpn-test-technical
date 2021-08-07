const db = require('../models')
const User = db.users

var bcrypt = require('bcryptjs')

exports.create = (req, res) => {
	const { email, userName, accountNumber, identityNumber, password, role } =
		req.body

	if (!email || !userName || !password || !accountNumber || !identityNumber) {
		res.status(400).send({ message: 'Wrong Content!' })
		return
	}

	const user = new User({
		email: email,
		userName: userName,
		accountNumber: accountNumber,
		identityNumber: identityNumber,
		password: bcrypt.hashSync(password, 8),
		role: role ? role : 0,
	})

	user
		.save(user)
		.then((data) => {
			res.send({ name: data.name, email: data.email, role: data.role })
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

	User.find(condition, { password: 0 })
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving items.',
			})
		})
}

exports.findById = (req, res) => {
	const id = req.params.id

	User.findById(id, { password: 0 })
		.then((data) => {
			if (!data)
				res.status(404).send({ message: 'Not found user with id ' + id })
			else res.send(data)
		})
		.catch((err) => {
			res.status(500).send({ message: 'Error retrieving user with id=' + id })
		})
}

exports.findByAccountNumber = (req, res) => {
	const { accountNumber } = req.params

	User.findOne({ accountNumber: accountNumber }, { password: 0 })
		.then((data) => {
			if (!data)
				res.status(404).send({
					message: 'Not found user with accountNumber ' + accountNumber,
				})
			else res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving user with accountNumber=' + accountNumber,
			})
		})
}

exports.findByIdentityNumber = (req, res) => {
	const { identityNumber } = req.params

	User.findOne({ identityNumber: identityNumber }, { password: 0 })
		.then((data) => {
			if (!data)
				res.status(404).send({
					message: 'Not found user with identityNumber ' + identityNumber,
				})
			else res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving user with identityNumber=' + identityNumber,
			})
		})
}

exports.delete = (req, res) => {
	const { id } = req.params

	User.findByIdAndRemove(id, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete user with id=${id}. Maybe user was not found!`,
				})
			} else {
				res.send({
					message: 'User was deleted successfully!',
				})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete user with id=' + id,
			})
		})
}
