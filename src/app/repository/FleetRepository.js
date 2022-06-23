/* eslint-disable node/no-unsupported-features/es-syntax */
const FleetSchema = require("../models/Fleet");

class FleetRepository {
	async create(payload) {
		return FleetSchema.create(payload);
	}

	async list(payload) {
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

	async listById(payload) {
		return FleetSchema.findById(payload);
	}

	async update(payload, reqBody) {
		return FleetSchema.findByIdAndUpdate(payload, reqBody);
	}

	async delete(payload) {
		return FleetSchema.findByIdAndDelete(payload);
	}
}

module.exports = new FleetRepository;