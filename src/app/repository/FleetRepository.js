/* eslint-disable node/no-unsupported-features/es-syntax */
const FleetSchema = require("../models/Fleet");

class FleetRepository {
	static async create(payload) {
		return FleetSchema.create(payload);
	}

	static async list(payload) {
		const costumizePaginate = {totalDocs: "total", docs: "fleet", page: "offset", nextPage: false, prevPage: false, totalPages: "offsets", pagingCounter: false, meta: false, hasPrevPage: false, hasNextPage: false
		};
		const {limit = 100, offset = 0, ...query} = payload;  
		const options = {
			limit: Number(limit),
			offset: Number(offset),
			customLabels: costumizePaginate
		};
		return FleetSchema.paginate(query, options);
	}

	static async listById(payload) {
		return FleetSchema.findById(payload);
	}

	static async update(payload, reqBody) {
		return FleetSchema.findByIdAndUpdate(payload, reqBody);
	}

	static async delete(payload) {
		return FleetSchema.findByIdAndDelete(payload);
	}
}

module.exports = FleetRepository;