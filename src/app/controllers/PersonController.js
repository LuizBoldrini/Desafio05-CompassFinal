const PersonService = require("../services/PersonService");

class PersonController {
	static async criaPerson(req, res) {
		try{
			const reqBody = req.body;
			const PersonCriado = await PersonService.cria({...reqBody});
			res.status(201).json(PersonCriado);

		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async listaPerson(req, res) {
		try{
			const Personlistado = await PersonService.lista();
			res.status(200).json(Personlistado);

		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async listaPersonPorId(req, res) {
		const id = req.params.id;
		try {
			const PersonlistadoPorId = await PersonService.listaPorId(id);
			res.status(200).json(PersonlistadoPorId);
		} catch(error) {
			res.status(400).json(error);
		}	
	}

	static async atualizaPerson(req, res) {
		try{
			const id = req.params.id;
			const reqBody = req.body;
			const novaPerson = await PersonService.atualiza(id, {$set: reqBody});
			res.status(200).json(novaPerson);
		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async deletaPerson(req, res) {
		try {
			const PersonParaDeletar = await PersonService.deleta(req.params.id);
			return res.status(204).json(PersonParaDeletar);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}

module.exports = PersonController;