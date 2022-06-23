/* eslint-disable node/no-unsupported-features/es-syntax */
const CarSchema = require("../models/Car");

class CarRepository {
	async create(payload) {
		return CarSchema.create(payload);
	}

	async list(payload) {
		const costumizePaginate = {totalDocs: "total", docs: "car", page: "offset", nextPage: false, prevPage: false, totalPages: "offsets", pagingCounter: false, meta: false, hasPrevPage: false, hasNextPage: false
		};
		const {limit = 100, offset = 0, ...query} = payload;  
		const options = {
			limit: Number(limit),
			offset: Number(offset),
			customLabels: costumizePaginate
		};
		return CarSchema.paginate(query, options);
	}

	async listById(payload) {
		return CarSchema.findById(payload);
	}

	async update(payload, reqBody) {
		return CarSchema.findByIdAndUpdate(payload, reqBody);
	}

	async delete(payload) {
		return CarSchema.findByIdAndDelete(payload);
	}

	async updateDesc(idAcess, attDesc) {
		const result = await CarSchema.findOneAndUpdate(
			{ "accessories._id": idAcess },
			{
				$set: {
					"accessories.$.description": attDesc.description
				}
			},
			{ returnOriginal: false }
		);
		return result;
		
	}
}

module.exports = new CarRepository;