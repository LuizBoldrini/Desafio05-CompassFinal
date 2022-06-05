const PersonRepository = require("../repository/PersonRepository");
const formataCpf = require("../utils/FormataCpf");
const NotFound = require("../utils/NotFound");

class PersonService {
	static async cria(payload) {
		const resultado = await PersonRepository.cria(payload);
		formataCpf(resultado);
		return resultado;
	}

	static async lista(payload) {
		const resultado = await PersonRepository.lista(payload);
		formataCpf(resultado);
		return resultado;
	}

	static async listaPorId(payload) {
		const resultado = await PersonRepository.listaPorId(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		formataCpf(resultado);
		return resultado;
	}

	static async atualiza(payload, reqBody) {
		const resultado = await PersonRepository.atualiza(payload, reqBody);
		if(!resultado) {
			throw new NotFound("id");
		}
		formataCpf(resultado);
		return resultado;
	}

	static async deleta(payload) {
		const resultado = await PersonRepository.deleta(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

}

module.exports = PersonService;