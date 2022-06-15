const CarService = require("../services/CarService");
const IdNonStandard = require("../utils/IdNonStandard");
const NotFound = require("../utils/NotFound");

class CarController {
	static async createCar(req, res) {
		try{
			const reqBody = req.body;
			const createCar = await CarService.create({...reqBody});
			res.status(201).json(createCar);

		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async listCar(req, res) {
		try{
			const reqQuery = req.query;
			const listCar = await CarService.list(reqQuery);
			res.status(200).json(listCar);

		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async listById(req, res) {
		try {
			const id = req.params.id;
			const listCarById = await CarService.listById(id);
			if(listCarById == null) {
				return res.status(404).json(new NotFound("id"));
			}
			res.status(200).json(listCarById);
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
			const newCar = await CarService.update(id, {$set: reqBody});
			if(newCar == null) {
				return res.status(404).json(new NotFound("id"));
			}
			res.status(204).json(newCar);
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
			const deleteCar = await CarService.delete(id);
			if(deleteCar == null) {
				return res.status(404).json(new NotFound("id"));
			}
			return res.status(204).json(deleteCar);
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