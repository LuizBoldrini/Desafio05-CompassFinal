const RentalRepository = require("../repository/RentalRepository");

class RentalService {
	static async create(payload) {
		const result = await RentalRepository.create(payload);
		return result;
	}

	static async list(payload) {
		return RentalRepository.list(payload);
	}

	static async listById(payload) {
		return RentalRepository.listById(payload);
	}

	static async update(payload, reqBody) {
		return RentalRepository.update(payload, reqBody);
	}

	static async delete(payload) {
		return RentalRepository.delete(payload);
	}
}

module.exports = RentalService;