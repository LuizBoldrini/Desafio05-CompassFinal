const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
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

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;
