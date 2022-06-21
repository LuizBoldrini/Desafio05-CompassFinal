const NotFound = require("../erros/NotFound");
const FleetService = require("../services/FleetService");
const IdNonStandard = require("../erros/IdNonStandard");

class FleetController {
	static async createReserve(req, res) {
		try{
			const {id_rental} = req.params;
			const reqBody = req.body;
			const fleetCreate = await FleetService.create({...reqBody, id_rental: String(id_rental)});
			res.status(201).json(fleetCreate);

		} catch(error) {
			if(error.name === "CastError") {
				return res.status(400).json(new IdNonStandard("id_rental or id_car"));
			}
			res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}

	static async listReserve(req, res) {
		try{
			const reqQuery = req.query;
			const fleetList = await FleetService.list(reqQuery);
			res.status(200).json(fleetList);

		} catch(error) {
			res.status(400).json({ name: error.name, description: error.description });
		}
	}

	static async listById(req, res) {
		const id = req.params.id;
		try {
			const listFleetById = await FleetService.listById(id);
			res.status(200).json(listFleetById);
		} catch(error) {
			res.status(error.status || 400).json({ name: error.name, description: error.description });
		}	
	}

	static async updateReserve(req, res) {
		try{
			const id = req.params.id;
			const reqBody = req.body;
			const newFleet = await FleetService.update(id, {$set: reqBody});
			res.status(201).json(newFleet);
		} catch(error) {
			if(error.name === "ValidationError") {
				return res.status(400).json(new NotFound("id_car or id_rental"));
			}
			res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}

	static async deleteReserve(req, res) {
		try {
			const deleteFleet = await FleetService.delete(req.params.id);
			return res.status(204).json(deleteFleet);
		} catch (error) {
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}
}

module.exports = FleetController;