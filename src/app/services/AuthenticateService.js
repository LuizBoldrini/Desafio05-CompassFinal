const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PersonRepository = require("../repository/PersonRepository");
const NotFound = require("../erros/NotFound");
const PassIncorrect = require("../erros/PassIncorrect");
const formataCpf = require("../utils/FormataCpf");
const authConfig = require("../config/authConfig.json");
require("dotenv").config();

class AuthenticateService {
	static async acess(email, password) {
		const user = await PersonRepository.findPeopleByEmail(email);
		
		if(!user) {
			throw new NotFound("User");
		}
		const { canDrive } = user;

		if(!(await bcrypt.compare(password, user.password))) {
			throw new PassIncorrect("password");
		}	
		user.password = undefined;

		const token = jwt.sign({ id: user.id}, authConfig.secret || process.env.JWT_SECRET, {
			expiresIn: 86400
		});
		
		formataCpf(user);
		return {canDrive, email, token};
	}
}

module.exports = AuthenticateService;