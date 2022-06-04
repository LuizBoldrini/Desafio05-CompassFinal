const PersonRepository = require("../repository/PersonRepository");

class PersonService {
	static async cria(payload) {
		const resultado = await PersonRepository.cria(payload);
		return resultado;
	}

	static async lista(payload) {
		const resultado = await PersonRepository.lista(payload);
		return resultado;
	}

	static async listaPorId(payload) {
		const resultado = await PersonRepository.listaPorId(payload);
		return resultado;
	}

	static async atualiza(payload, reqBody) {
		const resultado = await PersonRepository.atualiza(payload, reqBody);
		return resultado;
	}

	static async deleta(payload) {
		const resultado = await PersonRepository.deleta(payload);
		return resultado;
	}

}

module.exports = PersonService;