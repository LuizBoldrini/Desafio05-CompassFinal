const PersonRepository = require("../repository/PersonRepository");
const formataCpf = require("../utils/FormataCpf");
const NotFound = require("../erros/NotFound");

class PersonService {
	static async create(payload) {
		const resultado = await PersonRepository.create(payload);
		formataCpf(resultado);
		return resultado;
	}

	static async list(payload) {
		const resultado = await PersonRepository.list(payload);
		formataCpf(resultado);
		return resultado;
	}

	static async listById(payload) {
		const resultado = await PersonRepository.listById(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		formataCpf(resultado);
		return resultado;
	}

	static async update(payload, reqBody) {
		const resultado = await PersonRepository.update(payload, reqBody);
		if(!resultado) {
			throw new NotFound("id");
		}
		formataCpf(resultado);
		return resultado;
	}

	static async delete(payload) {
		const resultado = await PersonRepository.delete(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

}

module.exports = PersonService;