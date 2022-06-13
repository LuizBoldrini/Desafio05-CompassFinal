const PersonService = require("../services/PersonService");

class PersonController {
	static async createPerso(req, res) {
		try{
			const reqBody = req.body;
			const personCreate = await PersonService.create({...reqBody});
			res.status(201).json(personCreate);

		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async listPerson(req, res) {
		try{
			const personList = await PersonService.list();
			res.status(200).json(personList);

		} catch(error) {
			res.status(400).json({ description: error.description, name: error.message });
		}
	}

	static async listById(req, res) {
		const id = req.params.id;
		try {
			const listPersonById = await PersonService.listById(id);
			res.status(200).json(listPersonById);
		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}	
	}

	static async updatePerson(req, res) {
		try{
			const id = req.params.id;
			const reqBody = req.body;
			const newPerson = await PersonService.update(id, {$set: reqBody});
			res.status(204).json(newPerson);
		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async deletePerson(req, res) {
		try {
			const DeletePerson = await PersonService.delete(req.params.id);
			return res.status(204).json(DeletePerson);
		} catch (error) {
			return res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}
}

module.exports = PersonController;