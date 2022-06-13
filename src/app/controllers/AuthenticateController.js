const AuthenticateService = require("../services/AuthenticateService");

class AuthController {
	static async criateAut(req, res) {
		try {
			const { email, password } = await req.body;
			const resultado = await AuthenticateService.acess(email, password);

			return res.status(201).json(resultado);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
}

module.exports = AuthController;