const CarRepository = require('../repository/CarRepository');
const NotFound = require('../erros/NotFound');

class CarService {
  async create(payload) {
    const result = await CarRepository.create(payload);
    return result;
  }

  async list(payload) {
    const result = await CarRepository.list(payload);
    return result;
  }

  async listById(payload) {
    const result = await CarRepository.listById(payload);
    return result;
  }

  async update(payload, reqBody) {
    const result = await CarRepository.update(payload, reqBody);
    return result;
  }

  async delete(payload) {
    const result = await CarRepository.delete(payload);
    return result;
  }

  async updateDesc(idAcess, payload) {
    const result = await CarRepository.updateDesc(idAcess, payload);
    if (!result) {
      throw new NotFound('id');
    }
    return result;
  }
}

module.exports = new CarService();
