const PersonRepository = require("../repository/PersonRepository");
const NotFound = require("../erros/NotFound");
const PassIncorrect = require("../erros/PassIncorrect");
const formataCpf = require("../utils/FormataCpf");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig.json");

class AuthenticateService {
	static async acess(email, password) {
		const user = await PersonRepository.findPeopleByEmail(email);
		
		if(!user) {
			throw new NotFound("User");
		}
		const { canDrive } = user;
		if (user.canDrive !== "yes") {
			throw new Error("Cagada");}

		if(!(await bcrypt.compare(password, user.password))) {
			new PassIncorrect("password");
		}	
		user.password = undefined;

		const token = jwt.sign({ id: user.id}, authConfig.secret, {
			expiresIn: 86400
		});
		
		formataCpf(user);
		return {canDrive, token};
	}
}

module.exports = AuthenticateService;