const PersonSchema = require("../models/Person");

class AuthenticateRepository {
	static async acessa(payload) {
		return PersonSchema.findOne({ payload }).select("+password");
	}
	
	static async findPeopleByEmail(email) {
		return AuthenticateRepository.acessa({ email });
	}
}

module.exports = AuthenticateRepository;