const PeopleRepository = require("../repository/PeopleRepository");

class PeopleService {
	static async cria(payload) {
		const resultado = await PeopleRepository.cria(payload);
		return resultado;
	}

	static async lista(payload) {
		const resultado = await PeopleRepository.lista(payload);
		return resultado;
	}

	static async listaPorId(payload) {
		const resultado = await PeopleRepository.listaPorId(payload);
		return resultado;
	}

	static async atualiza(payload, reqBody) {
		const resultado = await PeopleRepository.atualiza(payload, reqBody);
		return resultado;
	}

	static async deleta(payload) {
		const resultado = await PeopleRepository.deleta(payload);
		return resultado;
	}

}

module.exports = PeopleService;