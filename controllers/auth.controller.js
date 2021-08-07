const db = require('../models')
const User = db.users

const config = require('../configs/auth.config')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signin = (req, res) => {
	const { email, userName, password } = req.body
	if ((!userName && !email) || !password) {
		res.status(400).send({ message: 'Invalid Input' })
		return
	}
	User.findOne(
		email
			? { email: email ? email : '' }
			: { userName: userName ? userName : '' }
	)
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: 'User Not found.' })
			}

			var passwordIsValid = bcrypt.compareSync(password, user.password)

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: 'Invalid Password!',
				})
			}

			var token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
				expiresIn: 86400, // 24 hours
			})

			var authorities = []
			if (user.role === true) {
				authorities.push('ROLE_ADMIN')
			}
			if (user.role === false) {
				authorities.push('ROLE_USER')
			}

			res.status(200).send({
				name: user.name,
				roles: authorities,
				accessToken: token,
				email: user.email,
			})
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while signIn.',
			})
		})
}
