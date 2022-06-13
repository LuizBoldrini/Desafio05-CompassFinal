const PersonService = require("../services/PersonService");

class PersonController {
	static async createPerso(req, res) {
		try{
			const reqBody = req.body;
			const PersonCriado = await PersonService.create({...reqBody});
			res.status(201).json(PersonCriado);

		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async listPerson(req, res) {
		try{
			const Personlistado = await PersonService.list();
			res.status(200).json(Personlistado);

		} catch(error) {
			res.status(400).json({ description: error.description, name: error.message });
		}
	}

	static async listById(req, res) {
		const id = req.params.id;
		try {
			const PersonlistadoPorId = await PersonService.listById(id);
			res.status(200).json(PersonlistadoPorId);
		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}	
	}

	static async updatePerson(req, res) {
		try{
			const id = req.params.id;
			const reqBody = req.body;
			const novaPerson = await PersonService.update(id, {$set: reqBody});
			res.status(204).json(novaPerson);
		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async deletePerson(req, res) {
		try {
			const PersonParaDeletar = await PersonService.delete(req.params.id);
			return res.status(204).json(PersonParaDeletar);
		} catch (error) {
			return res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}
}

module.exports = PersonController;