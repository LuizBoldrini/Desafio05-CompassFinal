const joi = require("joi").extend(require("@joi/date"));
const validData = require("../../utils/ValidaData");
const enuns = require("../../utils/Enuns");

module.exports =async (req, res, next) => {
	try{
		const personPost = joi.object({
			name: joi.string().min(4).required(),
			cpf: joi.string().min(11).required(),
			birthDay: joi.date().required().format("DD/MM/YYYY").max(validData()).required(),
			email: joi.string().email().required(),
			password: joi.string().min(6).required(),
			canDrive: joi.string().valid(...enuns.canDrive).required()
		});
		const { error } = await personPost.validate(req.body, {abortEarly: true});
		if(error) throw error;
		return next();

	} catch (error) {
		return res.status(error.status || 400).json({
			name: error.name,
			description: error.description || error.message
		});}
};

