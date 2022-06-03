const PeopleService = require("../services/PeopleService");
const moment = require("moment");

class PeopleController {
	static async criaPeople(req, res) {
		try{
			const reqBody = req.body;
			const birthDay = moment(reqBody.birthDay, "DD/MM/YYYY").format("YYYY/MM/DD");
			const peopleCriado = await PeopleService.cria({...reqBody, birthDay});
			res.status(200).json(peopleCriado);

		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async listaPeople(req, res) {
		try{
			const peoplelistado = await PeopleService.lista();
			res.status(200).json(peoplelistado);

		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async listaPeoplePorId(req, res) {
		const id = req.params.id;
		try {
			const peoplelistadoPorId = await PeopleService.listaPorId(id);
			res.status(200).json(peoplelistadoPorId);
		} catch(error) {
			res.status(400).json(error);
		}	
	}

	static async atualizaPeople(req, res) {
		try{
			const id = req.params.id;
			const reqBody = req.body;
			const novaPeople = await PeopleService.atualiza(id, {$set: reqBody});
			res.status(200).json(novaPeople);
		} catch(error) {
			res.status(400).json(error);
		}
	}

	static async deletaPeople(req, res) {
		try {
			const peopleParaDeletar = await PeopleService.deleta(req.params.id);
			return res.status(204).json(peopleParaDeletar);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}

module.exports = PeopleController;