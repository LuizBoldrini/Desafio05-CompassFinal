const ReserveRepository = require("../repository/ReserveRepository");
const NotFound = require("../erros/NotFound");
const CalcFinalValue = require("../utils/CalcFinalValue");
const FleetRepository = require("../repository/FleetRepository");
const PersonRepository = require("../repository/PersonRepository");
const CanDrive = require("../erros/CanDrive");

class ReserveService {
	static async create(payload) {
		const { id_user } = payload;
		const user = await PersonRepository.listById(id_user);
		if (user.canDrive !== "yes") {
			throw new CanDrive;}

		const { id_car } = payload;
		const fleet = await FleetRepository.listById(id_car);
		if (!fleet){
			throw new NotFound("Fleet");
		} 
		const { data_start, data_end } = payload;
		const { daily_value } = fleet;
		
		payload.final_value = CalcFinalValue(data_start, data_end, daily_value);

		
		return ReserveRepository.create(payload);
	}

	static async list(payload) {
		const resultado = await ReserveRepository.list(payload);
		return resultado;
	}

	static async listById(payload) {
		const resultado = await ReserveRepository.listById(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

	static async update(payload, reqBody) {
		const resultado = await ReserveRepository.update(payload, reqBody);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

	static async delete(payload) {
		const resultado = await ReserveRepository.delete(payload);
		if(!resultado) {
			throw new NotFound("id");
		}
		return resultado;
	}

}

module.exports = ReserveService;