const CarSchema = require("../models/Car");

class CarRepository {
	static async cria(payload) {
		return CarSchema.create(payload);
	}

	static async lista(payload) {
		const costumizarPaginate = {totalDocs: "total", docs: "CarSchema", page: "offset", nextPage: false, prevPage: false, totalPages: "offsets", pagingCounter: false, meta: false, hasPrevPage: false, hasNextPage: false
		};
		const options = {
			limit: 10,
			offset: 1,
			customLabels: costumizarPaginate
		};
		return CarSchema.paginate(payload, options, {});
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