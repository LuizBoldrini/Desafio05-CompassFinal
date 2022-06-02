const CarSchema = require("../models/Car");

class CarRepository {
	static async create(payload) {
		return CarSchema.create(payload);
	}

	static async list(payload) {
		return CarSchema.find(payload);
	}
}

module.exports = CarRepository;