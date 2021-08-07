module.exports = (app) => {
	const { verifyToken, isAdmin } = require('../middleware/authJWT')
	const User = require('../controllers/user.controller.js')
	var router = require('express').Router()

	router.post('/', User.create)

	router.get('/', User.findAll)

	router.get('/:id', User.findById)

	router.get('/accountnumber/:accountNumber', User.findByAccountNumber)

	router.get('/identitynumber/:identityNumber', User.findByIdentityNumber)

	router.delete('/:id', User.delete)

	app.use(
		'/api/users',
		//[verifyToken, isAdmin],
		router
	)
}
