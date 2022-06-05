const AuthenticateRepository = require("../repository/AuthenticateRepository");
const NotFound = require("../utils/NotFound");
const bcrypt = require("bcryptjs");

class AuthenticateService {
	static async acessa(email, password, res) {
		const user = await AuthenticateRepository.acessa(email);
		let campos = ["email", "password"];
		try{
			if(!user) {
				throw new NotFound(campos[0]);
			}
			if(!await bcrypt.compare(password, user.password)) {
				new NotFound(campos[1]);
			}
			user.password = undefined;
			return {user};
		} catch(error) {
			res.status(error.status || 400).json(error.message);
		}
		
	}
}

module.exports = AuthenticateService;