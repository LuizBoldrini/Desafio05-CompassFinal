const CarRepository = require("../repository/CarRepository");
const NotFound = require("../utils/NotFound");

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
		const resultado = await CarRepository.atualiza(payload, reqBody);
		return resultado;
		
	}

	static async deleta(payload) {
		const resultado = await CarRepository.deleta(payload);
		return resultado;
	}

	static async atualizaDesc(id, idAcess, payload) {
		const car = await CarRepository.listaPorId(id);
		if (!car) throw new NotFound(id);
	
		const resultado = await CarRepository.atualizaDesc(id, idAcess, payload);
		return resultado;
	}
}

module.exports = CarService;