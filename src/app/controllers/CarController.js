const CarService = require("../services/CarService");
const IdNonStandard = require("../utils/IdNonStandard");
const NotFound = require("../utils/NotFound");

class CarController {
	static async createCar(req, res) {
		try{
			const reqBody = req.body;
			const carroCriado = await CarService.create({...reqBody});
			res.status(201).json(carroCriado);

		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async listCar(req, res) {
		try{
			const reqQuery = req.query;
			const carrolistado = await CarService.list(reqQuery);
			res.status(200).json(carrolistado);

		} catch(error) {
			res.status(400).json({ description: error.description, name: error.message });
		}
	}

	static async listById(req, res) {
		const id = req.params.id;
		try {
			const carrolistadoPorId = await CarService.listById(id);
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

	static async updateCar(req, res) {
		try{
			const id = req.params.id;
			const reqBody = req.body;
			const novoCarro = await CarService.update(id, {$set: reqBody});
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

	static async deleteCar(req, res) {
		const id = req.params.id;
		try {
			const carroParaDeletar = await CarService.delete(id);
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

	static async updateDesc(req, res) {
		try {
			const { idAcess} = req.params;
			const reqBody = req.body;

			const result = await CarService.updateDesc( idAcess, reqBody);
			return res.status(200).json(result);
			
		} catch (error) {
			return res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}
}

module.exports = CarController;