module.exports = (mongoose) => {
	var itemSchema = mongoose.Schema(
		{
			name: String,
			price: Number,
			imageurl: String,
		},
		{ timestamps: false }
	)

	itemSchema.method('toJSON', function () {
		const { __v, _id, ...object } = this.toObject()
		object.id = _id
		return object
	})

	const Item = mongoose.model('item', itemSchema)
	return Item
}
