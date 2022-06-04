const PersonSchema = require("../models/Person");

class PersonRepository {
	static async cria(payload) {
		return PersonSchema.create(payload);
	}

	static async lista(payload) {
		return PersonSchema.find(payload);
	}

	static async listaPorId(payload) {
		return PersonSchema.findById(payload);
	}

	static async atualiza(payload, reqBody) {
		return PersonSchema.findByIdAndUpdate(payload, reqBody);
	}

	static async deleta(payload) {
		return PersonSchema.findByIdAndDelete(payload);
	}
}

module.exports = PersonRepository;