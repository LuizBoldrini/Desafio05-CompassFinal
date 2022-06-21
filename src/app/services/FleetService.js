/* eslint-disable camelcase */
const FleetRepository = require("../repository/FleetRepository");
const NotFound = require("../erros/NotFound");
const RentalRepository = require("../repository/RentalRepository");
const CarRepository = require("../repository/CarRepository");

class FleetService {
	static async create(payload) {
		const { id_rental } = payload;
		const rental = await RentalRepository.listById(id_rental);
		if (!rental) throw new NotFound("Rental");

		const { id_car} = payload;
		const car = await CarRepository.listById(id_car);
		if (!car) throw new NotFound("Car");

		return FleetRepository.create(payload);
	}

	static async list(payload) {
		const resultado = await FleetRepository.list(payload);
		const { id_rental } = payload;
		const rental = await RentalRepository.listById(id_rental);
		if (!rental) throw new NotFound("Rental");

		return resultado;
	}

	static async listById(payload) {
		const resultado = await FleetRepository.listById(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

	static async update(payload, reqBody) {
		const resultado = await FleetRepository.update(payload, reqBody);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

	static async delete(payload) {
		const resultado = await FleetRepository.delete(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

}

module.exports = FleetService;