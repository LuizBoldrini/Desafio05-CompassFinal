const RentalService = require("../services/RentalService");

class RentalController {
	static async createRental(req, res) {
		try{
			const reqBody = req.body;
			const rentalCreate = await RentalService.create({...reqBody});
			res.status(201).json(rentalCreate);
		} catch (error) {
			res.status(400).json({ dname: error.name, description: error.description });
		}
	}

	static async listRental(req, res) {
		try{
			const reqQuery = req.query;
			const RentalList = await RentalService.list(reqQuery);
			res.status(200).json(RentalList);

		} catch(error) {
			res.status(400).json({ name: error.name, description: error.description });
		}
	}

	static async listById(req, res) {
		try {
			const id = req.params.id;
			const rentalListById = await RentalService.listById(id);
			res.status(200).json(rentalListById);
		} catch(error) {
			res.status(error.status || 400).json({ name: error.name, description: error.description });
		}	
	}

	static async updateRental(req, res) {
		try{
			const id = req.params.id;
			const reqBody = req.body;
			const newRental = await RentalService.update(id, {$set: reqBody});
			res.status(204).json(newRental);
		} catch(error) {
			res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}

	static async delete(req, res) {
		try {
			const id = req.params.id;
			const deleteRental = await RentalService.delete(id);
			return res.status(204).json(deleteRental);
		} catch (error) {
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}
}

module.exports = RentalController;