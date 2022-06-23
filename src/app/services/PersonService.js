const PersonRepository = require("../repository/PersonRepository");
const CpfFormat = require("../utils/CpfFormat");
const NotFound = require("../erros/NotFound");

class PersonService {
	async create(payload) {
		const result = await PersonRepository.create(payload);
		CpfFormat(result);
		return result;
	}

	async list(payload) {
		const result = await PersonRepository.list(payload);
		CpfFormat(result);
		return result;
	}

	async listById(payload) {
		const result = await PersonRepository.listById(payload);
		if(!result) {
			throw new NotFound("id");
		}
		CpfFormat(result);
		return result;
	}

	async update(payload, reqBody) {
		const result = await PersonRepository.update(payload, reqBody);
		if(!result) {
			throw new NotFound("id");
		}
		CpfFormat(result);
		return result;
	}

	async delete(payload) {
		const result = await PersonRepository.delete(payload);
		if(!result) {
			throw new NotFound("id");
		}
		return result;
	}

}

module.exports = new PersonService;