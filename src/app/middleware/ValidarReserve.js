const joi = require("joi");


const fleetPost = joi.object({
	id_user: joi.string().required(),
	data_start: joi.string().required(),
	data_end: joi.string().required(),
	id_car: joi.string().required(),
	id_rental: joi.string(),
	final_value: joi.number().min(1).required()
});


module.exports =async (req, res, next) => {
	const reqBody = req.body;
	try {

		if(req.method == "POST") {
			await fleetPost.validateAsync({...reqBody });
			next();
		}

		// if(req.method == "PUT") {
		// 	await fleetPut.validateAsync({...reqBody });
		// 	next();
		// }

		// if(req.method == "GET") {
		// 	await fleetGet.validateAsync({...reqBody });
		// 	next();
		// }

	} catch (error) {
		if(error.details === undefined) {
			return res.status(400).json({name: error.name, description: error.description});
		}
		return res.status(400).json(
			error.details.map((detail) => ({
				name: detail.path.join(),
				description: detail.message
			})));}
};