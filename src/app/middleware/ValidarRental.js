const joi = require("joi");

const rentalPost = joi.object({
	name: joi.string().min(2).required(),
	cnpj: joi.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/).required(),
	activities: joi.string().min(5).required(),
	address: joi.array().min(1).items(
		{
			zipCode: joi.string().regex(/^\d{5}-\d{3}$/).required(),
			street: joi.string().min(2),
			complement: joi.string(),
			number: joi.number().min(1).required(),
			city: joi.string().min(1),
			state: joi.string().min(2).max(2),
			isFilial: joi.boolean().required()
		}
	)
});

const rentalPut = joi.object({
	name: joi.string().min(2),
	cnpj: joi.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
	activities: joi.string().min(5),
	address: joi.array().min(1).items(
		{
			zipCode: joi.string().min(8).max(8),
			street: joi.string().min(2),
			complement: joi.string(),
			number: joi.number().min(1),
			city: joi.string().min(1),
			state: joi.string().min(2).max(2),
			isFilial: joi.boolean()
		}
	)
});

module.exports =async (req, res, next) => {
	const reqBody = req.body;

	try {
		if(req.method == "POST") {
			await rentalPost.validateAsync({...reqBody });
			next();
		}

		if(req.method == "PUT") {
			await rentalPut.validateAsync({...reqBody });
			next();
		}
	} catch (error) {
		return res.status(400).json(
			error.details.map((detail) => ({
				name: detail.path.join(),
				description: detail.message
			})));}


};