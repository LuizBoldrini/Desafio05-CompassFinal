const AuthenticateService = require("../services/AuthenticateService");

class AuthController {
	static async criaAut(req, res) {
		const { email, password } = req.body;
		try {
			const result = await AuthenticateService.acessa(email, password);
			return res.status(204).json(result);
		} catch (error) {
			return res.status(400).json({
				error: error.message
			});
		}
	}
}

module.exports = AuthController;