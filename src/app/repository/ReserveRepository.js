const ReserveSchema = require("../models/Reserve");

class ReserveRepository {
	static async create(payload) {
		return ReserveSchema.create(payload);
	}

	static async list(payload) {
		const costumizePaginate = {totalDocs: "total", docs: "reserves", page: "offset", nextPage: false, prevPage: false, totalPages: "offsets", pagingCounter: false, meta: false, hasPrevPage: false, hasNextPage: false
		};
		const {limit = 100, offset = 0, ...query} = payload;  
		const options = {
			limit: Number(limit),
			offset: Number(offset),
			customLabels: costumizePaginate
		};
		return ReserveSchema.paginate(query, options);
	}

	static async listById(payload) {
		return ReserveSchema.findById(payload);
	}

	static async update(payload, reqBody) {
		return ReserveSchema.findByIdAndUpdate(payload, reqBody);
	}

	static async delete(payload) {
		return ReserveSchema.findByIdAndDelete(payload);
	}
}

module.exports = ReserveRepository;