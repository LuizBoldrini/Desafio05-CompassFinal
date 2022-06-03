const PeopleSchema = require("../models/People");

class PeopleRepository {
	static async cria(payload) {
		return PeopleSchema.create(payload);
	}

	static async lista(payload) {
		return PeopleSchema.find(payload);
	}

	static async listaPorId(payload) {
		return PeopleSchema.findById(payload);
	}

	static async atualiza(payload, reqBody) {
		return PeopleSchema.findByIdAndUpdate(payload, reqBody);
	}

	static async deleta(payload) {
		return PeopleSchema.findByIdAndDelete(payload);
	}
}

module.exports = PeopleRepository;