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
		if(resultado == null) {
			return new NotFound("id");
		}
		return resultado;		
	}

	static async atualiza(payload, reqBody) {
		const resultado = await CarRepository.atualiza(payload, reqBody);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
		
	}

	static async deleta(payload) {
		const resultado = await CarRepository.deleta(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}
}

module.exports = CarService;