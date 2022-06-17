const CarRepository = require("../repository/CarRepository");
const NotFound = require("../erros/NotFound");

class CarService {
	static async create(payload) {
		const result = await CarRepository.create(payload);
		return result;
	}

	static async list(payload) {
		const result = await CarRepository.list(payload);
		return result;
	}

	static async listById(payload) {
		const result = await CarRepository.listById(payload);
		return result;		
	}

	static async update(payload, reqBody) {
		const result = await CarRepository.update(payload, reqBody);
		return result;
		
	}

	static async delete(payload) {
		const result = await CarRepository.delete(payload);
		return result;
	}

	static async updateDesc(idAcess, payload) {
		const result = await CarRepository.updateDesc( idAcess, payload);
		if(!result) {
			throw new NotFound("id");
		}
		return result;
	}
}

module.exports = CarService;