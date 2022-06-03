const mongoose = require("mongoose");

const PeopleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	cpf: {
		type: String,
		required: true,
		unique: true
	},
	birthDay: {
		type: Date,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		default: false
	},
	canDrive: {
		type: String,
		required: true,
		enum: {
			values: ["yes", "no"],
		},
	}
});

const People = mongoose.model("People", PeopleSchema);

module.exports = People;
