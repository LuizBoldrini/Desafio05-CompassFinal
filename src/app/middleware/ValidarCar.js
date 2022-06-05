const joi = require("joi");
const moment = require("moment");
const InvalidField = require("../utils/InvalidField");

const carPost = joi.object({
	model: joi.string().required(),
	type: joi.string().required(),
	brand: joi.string().required(),
	color: joi.string().required(),
	year: joi.date().required(),
	accessories: joi.array().unique().min(1).items(joi.object(
		{
			description: joi.string().required()
		})).error(new InvalidField("accessories")),
	passengersQtd: joi.number().min(1).required().error(new InvalidField("passengersQtd")),

});

const carPut = joi.object({
	model: joi.string(),
	type: joi.string(),
	brand: joi.string(),
	color: joi.string(),
	year: joi.string(),
	accessories: joi.array().unique().min(1).items(joi.object(
		{
			description: joi.string()
		})).error(new InvalidField("accessories")),
	passengersQtd: joi.number().min(1).error(new InvalidField("passengersQtd")),

});

module.exports =async (req, res, next) => {
	const reqBody = req.body;
	const year = moment(reqBody.year, "YYYY").format("YYYY");

	function validaAccessories() {
		const accessoriesNow = req.body.accessories;
		if(accessoriesNow?.length == [0]) {
			return false;
		} else return true; 
	}

	function validaData() {
		const year = moment(req.body.year, "YYYY").format("YYYY") ;
		const dataMaiorQue = moment(year).isBefore("1950");
		const dataMenorQue = moment(year).isAfter("2022");
		if(dataMaiorQue || dataMenorQue) {
			return false;
		} else return true; 	
	}
    
	try {
		if(!validaAccessories(reqBody.accessories)) {
			throw new InvalidField("accerrories");
		}

		if(!validaData(reqBody.year)) {
			throw new InvalidField("year");
		}

		if(req.method == "POST") {
			await carPost.validateAsync({...reqBody, year});
			next();
		}

		if(req.method == "PUT") {
			await carPut.validateAsync({...reqBody, year});
			next();
		}

	} catch(error) {
		res.status(400).json(error.message);
	}
};
