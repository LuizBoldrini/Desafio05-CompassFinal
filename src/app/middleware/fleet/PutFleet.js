const joi = require("joi");
const enuns = require("../../utils/Enuns");

module.exports =async (req, res, next) => {
	try{
		const fleetPut = joi.object({
			id_car: joi.string(),
			id_rental: joi.string(),
			status: joi.string().valid(...enuns.status),
			daily_value: joi.number().min(1),
			plate: joi.string()
		});
		const { error } = await fleetPut.validate(req.body, {abortEarly: true});
		if(error) throw error;
		return next();

	} catch (error) {
		return res.status(error.status || 400).json({
			name: error.name,
			description: error.description || error.message
		});}
};