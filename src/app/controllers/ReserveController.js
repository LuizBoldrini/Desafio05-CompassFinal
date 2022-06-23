const IdNonStandard = require("../erros/IdNonStandard");
const NotFound = require("../erros/NotFound");
const ReserveService = require("../services/ReserveService");

class ReserveController {
	async createReserve(req, res) {
		try{
			const {id_rental} = req.params;
			const reqBody = req.body;
			const reserveCreate = await ReserveService.create({...reqBody, id_rental: String(id_rental)});
			return res.status(201).json(reserveCreate);

		} catch(error) {
			if(error.name === "TypeError") {
				return res.status(400).json(new NotFound("id_user, id_car or id_rental"));
			}
			if(error.name === "CastError") {
				return res.status(400).json(new IdNonStandard("id_user or id_car"));
			}if(error.name === "ValidationError") {
				return res.status(400).json(new IdNonStandard("id_rental"));
			}
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}

	async listReserve(req, res) {
		try{
			const {id_rental} = req.params;
			const reqQuery = req.query;
			const reserveList = await ReserveService.list({...reqQuery, id_rental: String(id_rental) });
			return res.status(200).json(reserveList);

		} catch(error) {
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}

	async listById(req, res) {
		try {
			const {id} = req.params;
			const listReserveById = await ReserveService.listById(id);
			return res.status(200).json(listReserveById);
		} catch(error) {
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}	
	}

	async updateReserve(req, res) {
		try{
			const {id} = req.params;
			const reqBody = req.body;
			const newReserve = await ReserveService.update(id, {$set: reqBody});
			return res.status(201).json(newReserve);
		} catch(error) {
			if(error.name === "TypeError") {
				return res.status(400).json(new NotFound("id_user, id_car or id_rental"));
			}
			if(error.name === "CastError") {
				return res.status(400).json(new IdNonStandard("id_user, id_car or id_rental"));
			}
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}

	async deleteReserve(req, res) {
		try {
			const DeleteReserve = await ReserveService.delete(req.params.id);
			return res.status(204).json(DeleteReserve);
		} catch(error) {
			if(error.name === "CastError") {
				return res.status(400).json(new IdNonStandard("id"));
			}
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}
}

module.exports = new ReserveController;