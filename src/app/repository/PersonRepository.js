const PersonSchema = require("../models/Person");

class PersonRepository {
	static async create(payload) {
		return PersonSchema.create(payload);
	}

	static async list(payload) {
		return PersonSchema.find(payload);
	}

	static async listById(payload) {
		return PersonSchema.findById(payload);
	}

	static async update(payload, reqBody) {
		return PersonSchema.findByIdAndUpdate(payload, reqBody);
	}

	static async delete(payload) {
		return PersonSchema.findByIdAndDelete(payload);
	}

	static async acess(payload) {
		return PersonSchema.findOne({ payload }).select("+password");
	}
	
	static async findPeopleByEmail(email) {
		return PersonRepository.acess({ email });
	}
}

module.exports = PersonRepository;