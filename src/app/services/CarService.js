const CarRepository = require("../repository/CarRepository");

class CarService {
	static async create(payload) {
		const resultado = await CarRepository.create(payload);
		return resultado;
	}

	static async list(payload) {
		const resultado = await CarRepository.list(payload);
		return resultado;
	}

}

module.exports = CarService;