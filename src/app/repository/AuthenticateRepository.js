const PersonSchema = require("../models/Person");

class AuthenticateRepository {
	static async acessa(payload) {
		return PersonSchema.findOne({ payload }).select("+password");
	}
}

module.exports = AuthenticateRepository;