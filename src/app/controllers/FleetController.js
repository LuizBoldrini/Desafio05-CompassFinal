const FleetService = require("../services/FleetService");

class FleetController {
	static async createReserve(req, res) {
		try{
			const {id_rental} = req.params;
			const reqBody = req.body;
			const personCreate = await FleetService.create({...reqBody, id_rental: String(id_rental)});
			res.status(201).json(personCreate);

		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async listReserve(req, res) {
		try{
			const reqQuery = req.query;
			const reserveList = await FleetService.list(reqQuery);
			res.status(200).json(reserveList);

		} catch(error) {
			res.status(400).json({ description: error.description, name: error.message });
		}
	}

	static async listById(req, res) {
		const id = req.params.id;
		try {
			const listReserveById = await FleetService.listById(id);
			res.status(200).json(listReserveById);
		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}	
	}

	static async updateReserve(req, res) {
		try{
			const id = req.params.id;
			const reqBody = req.body;
			const newReserve = await FleetService.update(id, {$set: reqBody});
			res.status(204).json(newReserve);
		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async deleteReserve(req, res) {
		try {
			const DeleteReserve = await FleetService.delete(req.params.id);
			return res.status(204).json(DeleteReserve);
		} catch (error) {
			return res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}
}

module.exports = FleetController;