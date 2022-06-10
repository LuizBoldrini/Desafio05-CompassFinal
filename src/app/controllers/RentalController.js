const RentalService = require("../services/RentalService");

class RentalController {
	static async criaRental(req, res) {
		try{
			const reqBody = req.body;
			const rentalCriada = await RentalService.cria({...reqBody});
			res.status(201).json(rentalCriada);
		} catch (error) {
			res.status(400).json({ description: error.description, name: error.message });
		}
	}

	static async listaRental(req, res) {
		try{
			const RentalListado = await RentalService.lista();
			res.status(200).json(RentalListado);

		} catch(error) {
			res.status(400).json({ description: error.description, name: error.message });
		}
	}

	static async listaRentalPorId(req, res) {
		try {
			const id = req.params.id;
			const rentalListadoPorId = await RentalService.listaPorId(id);
			res.status(200).json(rentalListadoPorId);
		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}	
	}

	static async atualizaRental(req, res) {
		try{
			const id = req.params.id;
			const reqBody = req.body;
			const novaPerson = await RentalService.atualiza(id, {$set: reqBody});
			res.status(204).json(novaPerson);
		} catch(error) {
			res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}

	static async deletaRental(req, res) {
		try {
			const id = req.params.id;
			const PersonParaDeletar = await RentalService.deleta(id);
			return res.status(204).json(PersonParaDeletar);
		} catch (error) {
			return res.status(error.status || 400).json({ description: error.description, name: error.message });
		}
	}
}

module.exports = RentalController;