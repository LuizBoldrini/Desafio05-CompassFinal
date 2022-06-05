const AuthenticateRepository = require("../repository/AuthenticateRepository");
const NotFound = require("../utils/NotFound");
const formataCpf = require("../utils/FormataCpf");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig.json");

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

			const token = jwt.sign({ id: user.id}, authConfig.secret, {
				expiresIn: 86400
			});
			formataCpf(user);
			return {user, token};
		} catch(error) {
			res.status(error.status || 400).json(error.message);
		}
		
	}
}


module.exports = AuthenticateService;