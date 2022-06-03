const CarRepository = require("../repository/CarRepository");

class CarService {
	static async cria(payload) {
		const resultado = await CarRepository.cria(payload);
		return resultado;
	}

	static async lista(payload) {
		const resultado = await CarRepository.lista(payload);
		return resultado;
	}

	static async listaPorId(payload) {
		const resultado = await CarRepository.listaPorId(payload);
		return resultado;
	}

	static async atualiza(payload, reqBody) {
		const resultado = CarRepository.atualiza(payload, reqBody);
		return resultado;
	}

	static async deleta(payload) {
		const resultado = await CarRepository.deleta(payload);
		return resultado;
	}
}

module.exports = CarService;