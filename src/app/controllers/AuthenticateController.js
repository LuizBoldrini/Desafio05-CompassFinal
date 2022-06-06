const AuthenticateService = require("../services/AuthenticateService");

class AuthController {
	async criaAut(req, res) {
		try {
			const { email, password } = req.body;
			const result = await AuthenticateService.acessa(email, password);
			return res.status(204).json(result);
		} catch (error) {
			return res.status(400).json({
				error: error.message
			});
		}
	}
}

module.exports = new AuthController();