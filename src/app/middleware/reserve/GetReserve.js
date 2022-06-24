const joi = require("joi");

module.exports =async (req, res, next) => {
	try {
		const reserveGet = joi.object({
			id_user: joi.string(),
			data_start: joi.string(),
			data_end: joi.string(),
			id_car: joi.string(),
			id_rental: joi.string(),
			final_value: joi.number().min(1)
		});
		const { error } = await reserveGet.validate(req.body, {abortEarly: true});
		if(error) throw error;
		return next();

	} catch (error) {
		return res.status(error.status || 400).json({
			name: error.name,
			description: error.description || error.message
		});}
};