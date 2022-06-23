const joi = require("joi").extend(require("@joi/date"));
const validData = require("../utils/ValidaData");
const validCpf = require("../utils/ValidaCpf");
const CpfError = require("../erros/CpfError");
const enuns = require("../utils/Enuns");

const personPost = joi.object({
	name: joi.string().min(4).required(),
	cpf: joi.string().required(),
	birthDay: joi.date().required().format("DD/MM/YYYY").max(validData()).required(),
	email: joi.string().email().required(),
	password: joi.string().min(6).required(),
	canDrive: joi.string().valid(...enuns.canDrive).required()
});

const personPut = joi.object({
	name: joi.string().min(4),
	cpf: joi.string(),
	birthDay: joi.date().format("DD/MM/YYYY").max(validData()),
	email: joi.string().email(),
	password: joi.string().min(6),
	canDrive: joi.string().valid(...enuns.canDrive)
});

const personGet = joi.object({
	name: joi.string().min(4),
	cpf: joi.string(),
	birthDay: joi.date().format("DD/MM/YYYY").max(validData()),
	email: joi.string().email(),
	password: joi.string().min(6),
	canDrive: joi.string().valid(...enuns.canDrive)
});

module.exports =async (req, res, next) => {
	try{
		const reqBody = req.body;
		if(!validCpf(reqBody.cpf)) {
			throw new CpfError("cpf");
		}

		if(req.method === "POST") {
			await personPost.validateAsync(reqBody);
			next();
		}

		if(req.method === "PUT") {
			await personPut.validateAsync(reqBody);
			next();
		}

		if(req.method ==="GET") {
			await personGet.validateAsync(reqBody);
			next();
		}

	} catch (error) {
		return res.status(error.status || 400).json({
			name: error.name,
			description: error.description || error.message
		});}
};

