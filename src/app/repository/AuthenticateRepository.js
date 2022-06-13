const PersonSchema = require("../models/Person");

class AuthenticateRepository {
	static async acess(payload) {
		return PersonSchema.findOne({ payload }).select("+password");
	}
	
	static async findPeopleByEmail(email) {
		return AuthenticateRepository.acess({ email });
	}
}

module.exports = AuthenticateRepository;