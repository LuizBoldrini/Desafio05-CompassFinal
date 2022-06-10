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
		return RentalSchema.find(payload);
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
