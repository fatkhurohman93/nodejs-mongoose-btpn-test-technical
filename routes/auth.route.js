module.exports = (app) => {
	const Auth = require('../controllers/auth.controller.js')
	var router = require('express').Router()

	router.post('/signin', Auth.signin)

	app.use('/api/auth', router)
}
