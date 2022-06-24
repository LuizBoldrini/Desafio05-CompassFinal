const joi = require("joi");

module.exports =async (req, res, next) => {
	try{
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
		const { error } = await carGet.validate(req.body, {abortEarly: true});
		if(error) throw error;
		return next();

	} catch (error) {
		return res.status(error.status || 400).json({
			name: error.name,
			description: error.description || error.message
		});}
};