const AuthenticateService = require("../services/AuthenticateService");

class AuthController {
	static async criateAut(req, res) {
		try {
			const { email, password } = await req.body;
			const result = await AuthenticateService.acess(email, password);

			return res.status(201).json(result);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
}

module.exports = AuthController;