const ReserveRepository = require('../repository/ReserveRepository');
const NotFound = require('../erros/NotFound');
const CalcFinalValue = require('../utils/CalcFinalValue');
const FleetRepository = require('../repository/FleetRepository');
const PersonRepository = require('../repository/PersonRepository');
const RentalRepository = require('../repository/RentalRepository');
const BadRequest = require('../erros/BadRequest');

class ReserveService {
  async create(payload) {
    const { id_rental } = payload;
    const rental = await RentalRepository.listById(id_rental);
    if (!rental) throw new NotFound('Rental');

    const { id_user } = payload;
    const user = await PersonRepository.listById(id_user);
    if (user.canDrive !== 'yes') {
      throw new BadRequest('This user cannot drive, please select an id of a user who can drive');
    }

    const { id_car } = payload;
    const fleet = await FleetRepository.listById(id_car);
    if (!fleet) {
      throw new NotFound('Fleet');
    }

    const { data_start, data_end } = payload;
    const { daily_value } = fleet;
    payload.final_value = CalcFinalValue(data_start, data_end, daily_value);

    return ReserveRepository.create(payload);
  }

  async list(payload) {
    const { id_rental } = payload;
    const rental = await RentalRepository.listById(id_rental);
    if (!rental) throw new NotFound('Rental');

    return ReserveRepository.list(payload);
  }

  async listById(payload) {
    const result = await ReserveRepository.listById(payload);
    if (!result) {
      throw new NotFound('id');
    }
    return result;
  }

  async update(payload, reqBody) {
    const result = await ReserveRepository.update(payload, reqBody);
    if (!result) {
      throw new NotFound('id');
    }
    return result;
  }

  async delete(payload) {
    const result = await ReserveRepository.delete(payload);
    if (!result) {
      throw new NotFound('id');
    }
    return result;
  }
}

module.exports = new ReserveService();
