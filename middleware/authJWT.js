const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config.js')
const db = require('../models')
const User = db.users

verifyToken = (req, res, next) => {
	let token = ''

	token = req.headers.webtoken

	if (!token) {
		return res.status(403).send({
			message: `No token provided!`,
		})
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: 'Unauthorized!',
			})
		}

		req.email = decoded.email

		next()
	})
}

isAdmin = (req, res, next) => {
	User.findOne({ email: req.email }).then((user) => {
		if (user.role === true) {
			next()
			return
		}
		res.status(403).send({
			message: 'Require Admin Role!',
		})
	})
}

const authJwt = {
	verifyToken: verifyToken,
	isAdmin: isAdmin,
}

module.exports = authJwt
