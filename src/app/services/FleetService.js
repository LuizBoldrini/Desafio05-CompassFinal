const FleetRepository = require("../repository/FleetRepository");
const NotFound = require("../erros/NotFound");
const RentalRepository = require("../repository/RentalRepository");
const CarRepository = require("../repository/CarRepository");

class FleetService {
	async create(payload) {
		const { id_rental } = payload;
		const rental = await RentalRepository.listById(id_rental);
		if (!rental) throw new NotFound("Rental");

		const { id_car} = payload;
		const car = await CarRepository.listById(id_car);
		if (!car) throw new NotFound("Car");

		return FleetRepository.create(payload);
	}

	async list(payload) {
		const result = await FleetRepository.list(payload);
		const { id_rental } = payload;
		const rental = await RentalRepository.listById(id_rental);
		if (!rental) throw new NotFound("Rental");

		return result;
	}

	async listById(payload) {
		const result = await FleetRepository.listById(payload);
		if(!result) {
			throw new NotFound("id");
		}
		return result;
	}

	async update(payload, reqBody) {
		const result = await FleetRepository.update(payload, reqBody);
		if(!result) {
			throw new NotFound("id");
		}
		return result;
	}

	async delete(payload) {
		const result = await FleetRepository.delete(payload);
		if(!result) {
			throw new NotFound("id");
		}
		return result;
	}

}

module.exports = FleetService;