const ReserveSchema = require("../models/Reserve");

class ReserveRepository {
	async create(payload) {
		return ReserveSchema.create(payload);
	}

	async list(payload) {
		const costumizePaginate = {totalDocs: "total", docs: "reserve", page: "offset", nextPage: false, prevPage: false, totalPages: "offsets", pagingCounter: false, meta: false, hasPrevPage: false, hasNextPage: false
		};
		const {limit = 100, offset = 0, ...query} = payload;  
		const options = {
			limit: Number(limit),
			offset: Number(offset),
			customLabels: costumizePaginate
		};
		return ReserveSchema.paginate(query, options);
	}

	async listById(payload) {
		return ReserveSchema.findById(payload);
	}

	async update(payload, reqBody) {
		return ReserveSchema.findByIdAndUpdate(payload, reqBody);
	}

	async delete(payload) {
		return ReserveSchema.findByIdAndDelete(payload);
	}
}

module.exports = new ReserveRepository;