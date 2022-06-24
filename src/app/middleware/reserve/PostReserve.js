const joi = require("joi");

module.exports =async (req, res, next) => {
	try {
		const reservePost = joi.object({
			id_user: joi.string().required(),
			data_start: joi.string().required(),
			data_end: joi.string().required(),
			id_car: joi.string().required(),
			id_rental: joi.string(),
			final_value: joi.number().min(1)
		});
		const { error } = await reservePost.validate(req.body, {abortEarly: true});
		if(error) throw error;
		return next();

	} catch (error) {
		return res.status(error.status || 400).json({
			name: error.name,
			description: error.description || error.message
		});}
};