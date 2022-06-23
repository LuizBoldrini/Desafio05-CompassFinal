const joi = require("joi");
const isFilial = require("../utils/IsFilial");
const { cnpj, zipCode } = require("../utils/Regex");

const rentalPost = joi.object({
	name: joi.string().min(2).required(),
	cnpj: joi.string().regex(cnpj).required(),
	activities: joi.string().min(5).required(),
	address: joi.array().min(1).items(
		{
			zipCode: joi.string().regex(zipCode).required(),
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
	cnpj: joi.string().regex(cnpj),
	activities: joi.string().min(5),
	address: joi.array().min(1).items(
		{
			zipCode: joi.string().regex(zipCode),
			street: joi.string().min(2),
			complement: joi.string(),
			number: joi.number().min(1),
			city: joi.string().min(1),
			state: joi.string().min(2).max(2),
			isFilial: joi.boolean()
		}
	)
});

const rentalGet = joi.object({
	name: joi.string().min(2),
	cnpj: joi.string().regex(cnpj),
	activities: joi.string().min(5),
	address: joi.array().min(1).items(
		{
			zipCode: joi.string().regex(zipCode),
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
		isFilial(reqBody);

		if(req.method === "POST") {
			await rentalPost.validateAsync(reqBody);
			next();
		}

		if(req.method === "PUT") {
			await rentalPut.validateAsync(reqBody);
			next();
		}

		if(req.method === "GET") {
			await rentalGet.validateAsync(reqBody);
			next();
		}
	} catch (error) {
		return res.status(error.status || 400).json({
			name: error.name,
			description: error.description || error.message
		});}
};