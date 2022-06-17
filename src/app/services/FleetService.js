const FleetRepository = require("../repository/FleetRepository");
const NotFound = require("../utils/NotFound");

class FleetService {
	static async create(payload) {
		const resultado = await FleetRepository.create(payload);
		return resultado;
	}

	static async list(payload) {
		const resultado = await FleetRepository.list(payload);
		return resultado;
	}

	static async listById(payload) {
		const resultado = await FleetRepository.listById(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

	static async update(payload, reqBody) {
		const resultado = await FleetRepository.update(payload, reqBody);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

	static async delete(payload) {
		const resultado = await FleetRepository.delete(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

}

module.exports = FleetService;