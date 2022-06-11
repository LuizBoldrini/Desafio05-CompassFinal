const RentalSchema = require("../models/Rental");
const axios = require("axios").default;

class RentalRepository {
	static async cria(payload) {
		for (let dado = 0; dado < payload.address.length; dado++) {
			const { logradouro, bairro, localidade, uf } = (await axios.get(`https://viacep.com.br/ws/${payload.address[dado].zipCode}/json`)).data;
			payload.address[dado].street = logradouro;
			payload.address[dado].district = bairro;
			payload.address[dado].city = localidade;
			payload.address[dado].state = uf;
		}
		return RentalSchema.create(payload);
	}

	static async lista(payload) {
		const costumizarPaginate = {totalDocs: "total", docs: "CarSchema", page: "offset", nextPage: false, prevPage: false, totalPages: "offsets", pagingCounter: false, meta: false, hasPrevPage: false, hasNextPage: false
		};
		const options = {
			limit: 10,
			offset: 0,
			customLabels: costumizarPaginate
		};
		return RentalSchema.paginate(payload, options, {});
	}

	static async listaPorId(payload) {
		return RentalSchema.findById(payload);
	}

	static async atualiza(payload, reqBody) {
		return RentalSchema.findByIdAndUpdate(payload, reqBody);
	}

	static async deleta(payload) {
		return RentalSchema.findByIdAndDelete(payload);
	}

}


module.exports = RentalRepository;
