const CarService = require("../services/CarService");

class CarController {
	static async criaCarro(req, res) {
		try{
			const reqBody = req.body;
			const carroCriado = await CarService.cria({...reqBody});
			res.status(201).json(carroCriado);

		} catch(error) {
			res.status(error.status || 400).json(error);
		}
	}

	static async listaCarros(req, res) {
		const reqQuery = req.query;
		try{
			const carrolistado = await CarService.lista(reqQuery);
			res.status(200).json(carrolistado);

		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async listaCarroPorId(req, res) {
		const id = req.params.id;
		try {
			const carrolistadoPorId = await CarService.listaPorId(id);
			res.status(200).json(carrolistadoPorId);
		} catch(error) {
			res.status(error.status|| 400).json(error);
		}	
	}

	static async atualizaCarro(req, res) {
		try{
			const id = req.params.id;
			const reqBody = req.body;
			const novoCarro = await CarService.atualiza(id, {$set: reqBody});
			res.status(204).json(novoCarro);
		} catch(error) {
			res.status(error.status || 400).json(error);
		}
	}

	static async deletaCarro(req, res) {
		try {
			const carroParaDeletar = await CarService.deleta(req.params.id);
			return res.status(204).json(carroParaDeletar);
		} catch (error) {
			return res.status(error.status || 400).json(error);
		}
	}
}

module.exports = CarController;