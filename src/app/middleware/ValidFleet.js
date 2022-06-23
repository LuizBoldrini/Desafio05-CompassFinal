const joi = require("joi");

const fleetPost = joi.object({
	id_car: joi.string().required(),
	id_rental: joi.string(),
	status: joi.string().valid("available", "unavailable", "rented").required(),
	daily_value: joi.number().min(1).required(),
	plate: joi.string().required()
});

const fleetPut = joi.object({
	id_car: joi.string(),
	id_rental: joi.string(),
	status: joi.string().valid("available", "unavailable", "rented"),
	daily_value: joi.number().min(1),
	plate: joi.string()
});

const fleetGet = joi.object({
	id_car: joi.string(),
	id_rental: joi.string(),
	status: joi.string().valid("available", "unavailable", "rented"),
	daily_value: joi.number().min(1),
	plate: joi.string()
});


module.exports =async (req, res, next) => {
	try {
		const reqBody = req.body;
		if(req.method === "POST") {
			await fleetPost.validateAsync({...reqBody });
			next();
		}

		if(req.method === "PUT") {
			await fleetPut.validateAsync({...reqBody });
			next();
		}

		if(req.method === "GET") {
			await fleetGet.validateAsync({...reqBody });
			next();
		}

	} catch (error) {
		return res.status(400).json({
			name: error.name,
			description: error.description || error.message
		});}
};
