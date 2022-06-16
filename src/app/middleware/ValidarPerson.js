const joi = require("joi");
const moment = require("moment");
const InvalidField = require("../utils/InvalidField");
const validaCpf = require("../utils/ValidaCpf");

const personPost = joi.object({
	name: joi.string().min(4).required(),
	cpf: joi.string().required(),
	birthDay: joi.date().required(),
	email: joi.string().email().required(),
	password: joi.string().min(6).required(),
	canDrive: joi.string().valid("yes", "no").required()
});

const personPut = joi.object({
	name: joi.string().min(4),
	cpf: joi.string(),
	birthDay: joi.string(),
	email: joi.string().email(),
	password: joi.string().min(6),
	canDrive: joi.string().valid("yes", "no")
});

const personGet = joi.object({
	name: joi.string().min(4),
	cpf: joi.string(),
	birthDay: joi.string(),
	email: joi.string().email(),
	password: joi.string().min(6),
	canDrive: joi.string().valid("yes", "no")
});

module.exports =async (req, res, next) => {
	const reqBody = req.body;
	const birthDay = moment(reqBody.birthDay, "DD/MM/YYYY").format("YYYY/MM/DD");
	try{
		if(!validaCpf(reqBody.cpf)) {
			throw new InvalidField("cpf");
		}

		if (!validaData(birthDay)) {
			throw new InvalidField("birthDay");
		}

		if(req.method == "POST") {
			await personPost.validateAsync({...reqBody, birthDay});
			next();
		}

		if(req.method == "PUT") {
			await personPut.validateAsync({...reqBody, birthDay});
			next();
		}

		if(req.method == "GET") {
			await personGet.validateAsync({...reqBody, birthDay});
			next();
		}

	} catch (error) {
		if(error.details === undefined) {
			return res.status(400).json(error.message);
		}
		return res.status(400).json(
			error.details.map((detail) => ({
				name: detail.path.join(),
				description: detail.message
			})));}
};

function validaData(formatedDate) {
	const dateNow = new Date().toLocaleDateString();
	const formatedDateNow = moment(dateNow, "DD/MM/YYYY").format("YYYY/MM/DD");
	const age = moment(formatedDateNow).diff(formatedDate, "years", true);
	if( Math.trunc(age) < 18) {
		return false;
	} else return true; 	
}