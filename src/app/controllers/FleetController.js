const NotFound = require("../erros/NotFound");
const FleetService = require("../services/FleetService");
const IdNonStandard = require("../erros/IdNonStandard");

class FleetController {
	async createReserve(req, res) {
		try{
			const {id_rental} = req.params;
			const reqBody = req.body;
			const fleetCreate = await FleetService.create({...reqBody, id_rental: String(id_rental)});
			
			return res.status(201).json(fleetCreate);
		} catch(error) {
			if(error.name === "CastError") {
				return res.status(400).json(new IdNonStandard("id_rental or id_car"));
			}
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}

	async listReserve(req, res) {
		try{
			const {id_rental} = req.params;
			const reqQuery = req.query;
			const fleetList = await FleetService.list({reqQuery, id_rental: String(id_rental) });
			return res.status(200).json(fleetList);

		} catch(error) {
			return res.status(400).json({ name: error.name, description: error.description });
		}
	}

	async listById(req, res) {
		const {id} = req.params;
		try {
			const listFleetById = await FleetService.listById(id);
			return res.status(200).json(listFleetById);
		} catch(error) {
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}	
	}

	async updateReserve(req, res) {
		try{
			const {id} = req.params;
			const reqBody = req.body;
			const newFleet = await FleetService.update(id, {$set: reqBody});
			return res.status(200).json(newFleet);
		} catch(error) {
			if(error.name === "ValidationError") {
				return res.status(400).json(new NotFound("id_car or id_rental"));
			}
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}

	async deleteReserve(req, res) {
		try {
			const deleteFleet = await FleetService.delete(req.params.id);
			return res.status(204).json(deleteFleet);
		} catch (error) {
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}
}

module.exports = new FleetController;