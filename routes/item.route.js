module.exports = (app) => {
	const { verifyToken } = require('../middleware/authJWT')
	const Item = require('../controllers/item.controller.js')
	var router = require('express').Router()

	router.post('/', Item.create)

	router.get('/', Item.findAll)

	router.get('/:id', Item.findOne)

	router.put('/:id', Item.update)

	router.delete('/:id', Item.delete)

	app.use('/api/items', verifyToken, router)
}
