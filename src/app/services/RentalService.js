const RentalRepository = require("../repository/RentalRepository");

class RentalService {
	async create(payload) {
		const result = await RentalRepository.create(payload);
		return result;
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