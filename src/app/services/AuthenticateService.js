const AuthenticateRepository = require("../repository/AuthenticateRepository");
const NotFound = require("../utils/NotFound");
const formataCpf = require("../utils/FormataCpf");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig.json");

class AuthenticateService {
	static async acess(email, password) {
		const user = await AuthenticateRepository.findPeopleByEmail(email);
		
		if(!user) {
			throw new NotFound("email");
		}
		const { canDrive } = user;

		if(!(await bcrypt.compare(password, user.password))) {
			new NotFound("password");
		}
			
		user.password = undefined;

		const token = jwt.sign({ id: user.id}, authConfig.secret, {
			expiresIn: 86400
		});
		formataCpf(user);
		return {user, canDrive, token};
	}
}

module.exports = AuthenticateService;