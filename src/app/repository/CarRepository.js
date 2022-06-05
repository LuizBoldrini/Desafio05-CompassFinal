const CarSchema = require("../models/Car");

class CarRepository {
	static async cria(payload) {
		return CarSchema.create(payload);
	}

	static async lista(payload) {
		return CarSchema.paginate({}, { payload, limit: 5});
	}

	static async listaPorId(payload) {
		return CarSchema.findById(payload);
	}

	static async atualiza(payload, reqBody) {
		return CarSchema.findByIdAndUpdate(payload, reqBody);
	}

	static async deleta(payload) {
		return CarSchema.findByIdAndDelete(payload);
	}
}

module.exports = CarRepository;