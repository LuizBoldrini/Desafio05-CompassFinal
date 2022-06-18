const joi = require("joi").extend(require("@joi/date"));
const validaData = require("../utils/ValidaData");
const validaCpf = require("../utils/ValidaCpf");
const CpfError = require("../erros/CpfError");

const personPost = joi.object({
	name: joi.string().min(4).required(),
	cpf: joi.string().required(),
	birthDay: joi.date().required().format("DD/MM/YYYY").max(validaData()).required(),
	email: joi.string().email().required(),
	password: joi.string().min(6).required(),
	canDrive: joi.string().valid("yes", "no").required()
});

const personPut = joi.object({
	name: joi.string().min(4),
	cpf: joi.string().required(),
	birthDay: joi.date().required().format("DD/MM/YYYY").max(validaData()),
	email: joi.string().email(),
	password: joi.string().min(6),
	canDrive: joi.string().valid("yes", "no")
});

const personGet = joi.object({
	name: joi.string().min(4),
	cpf: joi.string().required(),
	birthDay: joi.date().required().format("DD/MM/YYYY").max(validaData()),
	email: joi.string().email(),
	password: joi.string().min(6),
	canDrive: joi.string().valid("yes", "no")
});

module.exports =async (req, res, next) => {
	const reqBody = req.body;
	try{
		if(!validaCpf(reqBody.cpf)) {
			throw new CpfError("cpf");
		}

		if(req.method == "POST") {
			await personPost.validateAsync({...reqBody});
			next();
		}

		if(req.method == "PUT") {
			await personPut.validateAsync({...reqBody});
			next();
		}

		if(req.method == "GET") {
			await personGet.validateAsync({...reqBody});
			next();
		}

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

