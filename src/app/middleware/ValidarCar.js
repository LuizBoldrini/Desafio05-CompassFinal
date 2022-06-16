const joi = require("joi");

const carPost = joi.object({
	model: joi.string().min(4).required(),
	type: joi.string().min(1).required(),
	brand: joi.string().min(1).required(),
	color: joi.string().min(1).required(),
	year: joi.date().required().min(1950).max(2022),
	accessories: joi.array().min(1).unique().items(
		{ 
			description: joi.string().min(1).trim() 
		}),
	passengersQtd: joi.number().min(1).required()
});

const carPut = joi.object({
	model: joi.string().min(4),
	type: joi.string().min(1),
	brand: joi.string().min(1),
	color: joi.string().min(1),
	year: joi.date().min(1950).max(2022),
	accessories: joi.array().min(1).unique().items(
		{ 
			description: joi.string().min(1).trim() 
		}),
	passengersQtd: joi.number().min(1)
});

const carGet = joi.object({
	model: joi.string().min(4),
	type: joi.string().min(1),
	brand: joi.string().min(1),
	color: joi.string().min(1),
	year: joi.date().min(1950).max(2022),
	accessories: joi.array().min(1).unique().items(
		{ 
			description: joi.string().min(1).trim() 
		}),
	passengersQtd: joi.number().min(1)
});

const carPatch = joi.object({
	description: joi.string().min(3)
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

		if(req.method == "PATCH") {
			await carPatch.validateAsync({...reqBody });
			next();
		}

	} catch (error) {
		return res.status(400).json(
			error.details.map((detail) => ({
				name: detail.path.join(),
				description: detail.message
			})));}
};
