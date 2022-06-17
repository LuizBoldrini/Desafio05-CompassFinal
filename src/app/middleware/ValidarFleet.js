const joi = require("joi");

const fleetPost = joi.object({
	id_car: joi.string().required(),
	id_rental: joi.string().required(),
	status: joi.string().valid("available", "unavailable", "rented").required(),
	daily_value: joi.number.min(1).required(),
	plate: joi.date().required()
});


module.exports =async (req, res, next) => {
	const reqBody = req.body;
    
	try {
		if(req.method == "POST") {
			await carPost.validateAsync({...reqBody });
			next();
		}

		if(req.method == "PUT") {
			await carPut.validateAsync({...reqBody });
			next();
		}

		if(req.method == "GET") {
			await carGet.validateAsync({...reqBody });
			next();
		}

	} catch (error) {
		return res.status(400).json(
			error.details.map((detail) => ({
				name: detail.path.join(),
				description: detail.message
			})));}
};
