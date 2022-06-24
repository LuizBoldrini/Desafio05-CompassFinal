const AuthenticateService = require("../services/AuthenticateService");

class AuthController {
	async criateAut(req, res) {
		try {
			const { email, password } = await req.body;
			const result = await AuthenticateService.acess(email, password);

			return res.status(200).json(result);
		} catch (error) {
			return res.status(error.status || 400).json({ name: error.name, description: error.description });
		}
	}
}

module.exports = new AuthController;