const joi = require("joi");

const reservePost = joi.object({
	id_user: joi.string().required(),
	data_start: joi.string().required(),
	data_end: joi.string().required(),
	id_car: joi.string().required(),
	id_rental: joi.string(),
	final_value: joi.number().min(1).required()
});

const reservePut = joi.object({
	id_user: joi.string(),
	data_start: joi.string(),
	data_end: joi.string(),
	id_car: joi.string(),
	id_rental: joi.string(),
	final_value: joi.number().min(1)
});

const reserveGet = joi.object({
	id_user: joi.string(),
	data_start: joi.string(),
	data_end: joi.string(),
	id_car: joi.string(),
	id_rental: joi.string(),
	final_value: joi.number().min(1)
});


module.exports =async (req, res, next) => {
	const reqBody = req.body;
	try {

		if(req.method == "POST") {
			await reservePost.validateAsync({...reqBody });
			next();
		}

		if(req.method == "PUT") {
			await reservePut.validateAsync({...reqBody });
			next();
		}

		if(req.method == "GET") {
			await reserveGet.validateAsync({...reqBody });
			next();
		}

	} catch (error) {
		return res.status(400).json({
			name: error.name,
			description: error.description || error.message
		});}
};