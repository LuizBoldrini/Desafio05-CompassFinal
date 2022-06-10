const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const RentalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	cnpj: {
		type: String,
		required: true,
		unique: true
	},
	activities: {
		type: String,
		required: true
	},
	address:[ {
		_id: false,
		zipCode: {
			type: String,
			required: true
		},
		street: {
			type: String,
			required: true
		},
		complement: {
			type: String
		},
		district: {
			type: String,
			
		},
		number: {
			type: String,
			
		},
		city: {
			type: String,
			
		},
		state: {
			type: String,
			
		},
		isFilial: {
			type: Boolean,
			required: true
		}}]
},
{ timestamps: false, versionKey: false}
);

RentalSchema.plugin(mongoosePaginate);

const Rental = mongoose.model("Rental", RentalSchema);

module.exports = Rental;