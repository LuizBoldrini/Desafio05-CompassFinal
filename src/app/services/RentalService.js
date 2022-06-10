const RentalRepository = require("../repository/RentalRepository");

class RentalService {
	static async cria(payload) {
		const resultado = await RentalRepository.cria(payload);
		return resultado;
	}

	static async lista(payload) {
		return RentalRepository.lista(payload);
	}

	static async listaPorId(payload) {
		return RentalRepository.listaPorId(payload);
	}

	static async atualiza(payload, reqBody) {
		return RentalRepository.atualiza(payload, reqBody);
	}

	static async deleta(payload) {
		return RentalRepository.deleta(payload);
	}
}

module.exports = RentalService;