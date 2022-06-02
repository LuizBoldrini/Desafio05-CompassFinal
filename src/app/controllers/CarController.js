const CarService = require("../services/CarService");
const moment = require("moment");

class CarController {
	static async criaCarro(req, res) {
		try{
			const reqBody = req.body;
			const year = moment(reqBody.year, "DD/MM/YYYY").format("YYYY/MM/DD");
			const carroCriado = await CarService.create({...reqBody, year});
			res.status(200).json(carroCriado);

		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async listaCarros(req, res) {
		try{
			const resultado = await CarService.list();
			res.status(200).json(resultado);

		} catch(error) {
			res.status(400).json(error);
		}
	}
}

module.exports = CarController;