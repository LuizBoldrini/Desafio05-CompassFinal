const ReserveRepository = require("../repository/ReserveRepository");
const NotFound = require("../utils/NotFound");

class ReserveService {
	static async create(payload) {
		const resultado = await ReserveRepository.create(payload);
		return resultado;
	}

	static async list(payload) {
		const resultado = await ReserveRepository.list(payload);
		return resultado;
	}

	static async listById(payload) {
		const resultado = await ReserveRepository.listById(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

	static async update(payload, reqBody) {
		const resultado = await ReserveRepository.update(payload, reqBody);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

	static async delete(payload) {
		const resultado = await ReserveRepository.delete(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

}

module.exports = ReserveService;