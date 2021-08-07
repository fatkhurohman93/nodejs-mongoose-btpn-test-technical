// M Fatkhurohman Akbar || Email: mfatkhurohman93@gmail.com / akbarpathur@gmail.com / contact@akbarpathur.com |
// Whatsapp: 0852-1958-4351

const express = require('express')
const cors = require('cors')
const path = __dirname + '/app/views/'

const app = express()

app.use(express.static(path))

const corsOptions = {
	origin: '*',
}

app.use(cors(corsOptions))

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

const db = require('./models')
db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to the database!')
	})
	.catch((err) => {
		console.log('Cannot connect to the database!', err)
		process.exit()
	})

require('./routes/item.route')(app)
require('./routes/user.route')(app)
require('./routes/auth.route')(app)

app.get('*', (req, res) => {
	res.status(404).send({ message: 'API Not found' })
})

// set port, listen for requests
const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})
