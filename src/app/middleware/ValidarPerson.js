const joi = require("joi");
const moment = require("moment");
const NameErro = require("../utils/NameErro");
const EnumErro = require("../utils/EnumErro");
const InvalidField = require("../utils/InvalidField");

const personPost = joi.object({
	name: joi.string().min(4).required().error(new NameErro),
	cpf: joi.string().required(),
	birthDay: joi.date().required().error(new InvalidField("birthDay")),
	email: joi.string().email().required().error(new InvalidField("email")),
	password: joi.string().min(6).required().error(new InvalidField("passowrd")),
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
	} catch(error) {
		res.status(400).json(error.message);
	}
};

function validaCpf(cpf) {
	if(!cpf) return true;

	let soma = 0;

	if(cpf === "01234567890") return false;

	for(let i = 0; i <= 9; i++) {
		let numerosRepetidos = `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`;
		if(cpf === numerosRepetidos) return false;
	}

	for(let i = 1; i <= 9; i++) {
		soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
	} 
	let resto = (soma * 10) % 11;

	if((resto == 10) || (resto == 11)) {
		resto = 0;
	}
	if(resto != parseInt(cpf.substring(9, 10))) return false;

	soma = 0;
	for(let i = 1; i<= 10; i++) {
		soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
	}
	resto = (soma * 10) % 11;
	if((resto == 10) || (resto == 11)) {
		resto = 0;
	}
	if(resto != parseInt(cpf.substring(10, 11))) return false;
	return true;
}

function validaData(formatedDate) {
	const dateNow = new Date().toLocaleDateString();
	const formatedDateNow = moment(dateNow, "DD/MM/YYYY").format("YYYY/MM/DD");
	const age = moment(formatedDateNow).diff(formatedDate, "years", true);
	if( Math.trunc(age) < 18) {
		return false;
	} else return true; 	
}