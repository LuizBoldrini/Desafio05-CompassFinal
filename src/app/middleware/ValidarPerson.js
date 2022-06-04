const joi = require("joi");
const moment = require("moment");
const NameErro = require("../utils/NameErro");
const EnumErro = require("../utils/EnumErro");
const InvalidField = require("../utils/InvalidField");
const validaCpf = require("../utils/ValidaCpf");

const personPost = joi.object({
	name: joi.string().min(4).required().error(new NameErro),
	cpf: joi.string().required(),
	birthDay: joi.date().required().error(new InvalidField("birthDay")),
	email: joi.string().email().required().error(new InvalidField("email")),
	password: joi.string().min(6).required().error(new InvalidField("passowrd")),
	canDrive: joi.string().valid("yes", "no").error(new EnumErro("yes or no"))
});

const personPut = joi.object({
	name: joi.string().min(4).error(new NameErro),
	cpf: joi.string(),
	birthDay: joi.string().error(new InvalidField("birthDay")),
	email: joi.string().email().error(new InvalidField("email")),
	password: joi.string().min(6).error(new InvalidField("passowrd")),
	canDrive: joi.string().valid("yes", "no").error(new EnumErro("yes or no"))
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
	} catch(error) {
		res.status(400).json(error.message);
	}
};

function validaData(formatedDate) {
	const dateNow = new Date().toLocaleDateString();
	const formatedDateNow = moment(dateNow, "DD/MM/YYYY").format("YYYY/MM/DD");
	const age = moment(formatedDateNow).diff(formatedDate, "years", true);
	if( Math.trunc(age) < 18) {
		return false;
	} else return true; 	
}