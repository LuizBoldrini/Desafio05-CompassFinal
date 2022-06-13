const CarService = require("../services/CarService");
const IdNonStandard = require("../utils/IdNonStandard");
const NotFound = require("../utils/NotFound");

class CarController {
	static async criaCarro(req, res) {
		try{
			const reqBody = req.body;
			const carroCriado = await CarService.cria({...reqBody});
			res.status(201).json(carroCriado);

		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async listaCarros(req, res) {
		try{
			const reqQuery = req.query;
			const carrolistado = await CarService.lista(reqQuery);
			res.status(200).json(carrolistado);

		} catch(error) {
			res.status(400).json({ description: error.description, name: error.message });
		}
	}

	static async listaCarroPorId(req, res) {
		const id = req.params.id;
		try {
			const carrolistadoPorId = await CarService.listaPorId(id);
			if(carrolistadoPorId == null) {
				return res.status(404).json(new NotFound("id"));
			}
			res.status(200).json(carrolistadoPorId);
		} catch(error) {
			if(error.name === "CastError") {
				return res.status(400).json(new IdNonStandard());
			}
			res.status(error.status|| 400).json({ description: error.description, name: error.message });
		}	
	}

	static async atualizaCarro(req, res) {
		try{
			const id = req.params.id;
			const reqBody = req.body;
			const novoCarro = await CarService.atualiza(id, {$set: reqBody});
			if(novoCarro == null) {
				return res.status(404).json(new NotFound("id"));
			}
			res.status(204).json(novoCarro);
		} catch(error) {
			if(error.name === "CastError") {
				return res.status(400).json(new IdNonStandard());
			}
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async deletaCarro(req, res) {
		const id = req.params.id;
		try {
			const carroParaDeletar = await CarService.deleta(id);
			if(carroParaDeletar == null) {
				return res.status(404).json(new NotFound("id"));
			}
			return res.status(204).json(carroParaDeletar);
		} catch (error) {
			if(error.name === "CastError") {
				return res.status(400).json(new IdNonStandard());
			}
			return res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async atualizaDesc(req, res) {
		const { idAcess} = req.params;
		const reqBody = req.body;
		try {
			const result = await CarService.atualizaDesc( idAcess, reqBody);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}
}

module.exports = CarController;