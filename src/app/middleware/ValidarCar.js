const joi = require("joi");
const moment = require("moment");
const InvalidField = require("../utils/InvalidField");

const carPost = joi.object({
	model: joi.string().required(),
	type: joi.string().required(),
	brand: joi.string().required(),
	color: joi.string().required(),
	year:joi.date().required(),
	accessories: joi.array().items(joi.object(
		{
			description: joi.string().required(1)
		})),
	passengersQtd: joi.number().min(1).required(),

});

module.exports =async (req, res, next) => {
	const reqBody = req.body;
	const year = moment(reqBody.year, "YYYY").format("YYYY");

	function validaAccessories() {
		const accessoriesNow = req.body.accessories;
		if(accessoriesNow.length == [0]) {
			return false;
		} else return true; 
	}
    
	try {
		if(!validaAccessories(reqBody.accessories)) {
			throw new InvalidField("accerrories");
		}

		if(req.method == "POST") {
			await carPost.validateAsync({...reqBody, year});
			next();
		}

	} catch(error) {
		res.status(400).json(error.message);
	}
};

// function validaAccessories() {
// 	const accessories = req.body.accessories;
// 	if(accessories = []) {
// 		return false;
// 	} else return true; 
// }