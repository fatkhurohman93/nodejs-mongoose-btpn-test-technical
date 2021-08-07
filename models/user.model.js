module.exports = (mongoose) => {
	var schema = mongoose.Schema(
		{
			userName: {
				type: String,
				unique: true, // `userName` must be unique
				index: true,
				required: true,
			},
			email: {
				type: String,
				unique: true, // `email` must be unique
				required: true,
			},
			accountNumber: String,
			identityNumber: String,
			password: String,
			role: Boolean, // 0 === common user can only manage item, 1 admin can manage user and item
		},
		{ timestamps: false }
	)

	schema.method('toJSON', function () {
		const { __v, _id, ...object } = this.toObject()
		object.id = _id
		return object
	})

	const User = mongoose.model('user', schema)
	return User
}
