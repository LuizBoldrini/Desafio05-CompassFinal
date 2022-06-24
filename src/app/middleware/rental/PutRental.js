const joi = require("joi");
const { cnpj, zipCode } = require("../../utils/Regex");

module.exports =async (req, res, next) => {
	try {
		const rentalPost = joi.object({
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
		const { error } = await rentalPost.validate(req.body);
		if(error) throw error;
		return next();

	} catch (error) {
		return res.status(error.status || 400).json({
			name: error.name,
			description: error.description || error.message
		});}
};