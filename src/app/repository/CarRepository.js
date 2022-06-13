const CarSchema = require("../models/Car");
// const NotFound = require("../utils/NotFound");

class CarRepository {
	static async cria(payload) {
		return CarSchema.create(payload);
	}

	static async lista(payload) {
		const costumizarPaginate = {totalDocs: "total", docs: "CarSchema", page: "offset", nextPage: false, prevPage: false, totalPages: "offsets", pagingCounter: false, meta: false, hasPrevPage: false, hasNextPage: false
		};
		const {limit = 100, offset = 0, ...query} = payload;  
		const options = {
			limit: Number(limit),
			offset: Number(offset),
			customLabels: costumizarPaginate
		};
		return CarSchema.paginate(query, options);
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

	static  async atualizaDesc(idAcess, atualizaDesc) {
		console.log(idAcess);
		const resultado = await CarSchema.findOneAndUpdate(
			{ "accessories._id": idAcess },
			{
				$set: {
					"accessories.$.description": atualizaDesc.description
				}
			},
			{ returnOriginal: false }
		);
		return resultado;
		
	}
}

module.exports = CarRepository;