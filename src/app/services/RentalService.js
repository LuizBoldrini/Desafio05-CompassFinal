const RentalRepository = require("../repository/RentalRepository");
const isFilial = require("../utils/IsFilial");

class RentalService {
	async create(payload) {
		const { address } = payload;
		isFilial(address);
		
		return RentalRepository.create(payload);
	}

	async list(payload) {
		return RentalRepository.list(payload);
	}

	async listById(payload) {
		return RentalRepository.listById(payload);
	}

	async update(payload, reqBody) {
		return RentalRepository.update(payload, reqBody);
	}

	async delete(payload) {
		return RentalRepository.delete(payload);
	}
}

module.exports = new RentalService;