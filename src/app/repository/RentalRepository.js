const axios = require('axios').default;
const RentalSchema = require('../models/Rental');

class RentalRepository {
  async create(payload) {
    for (let dado = 0; dado < payload.address.length; dado++) {
      const { logradouro, bairro, localidade, uf } = (
        await axios.get(`https://viacep.com.br/ws/${payload.address[dado].zipCode}/json`)
      ).data;
      payload.address[dado].street = logradouro;
      payload.address[dado].district = bairro;
      payload.address[dado].city = localidade;
      payload.address[dado].state = uf;
    }
    return RentalSchema.create(payload);
  }

  async list(payload) {
    const costumizePaginate = {
      totalDocs: 'total',
      docs: 'rental',
      page: 'offset',
      nextPage: false,
      prevPage: false,
      totalPages: 'offsets',
      pagingCounter: false,
      meta: false,
      hasPrevPage: false,
      hasNextPage: false
    };
    const { limit = 100, offset = 0, ...query } = payload;
    const options = {
      limit: Number(limit),
      offset: Number(offset),
      customLabels: costumizePaginate
    };
    return RentalSchema.paginate(query, options);
  }

  async listById(payload) {
    return RentalSchema.findById(payload);
  }

  async update(payload, reqBody) {
    return RentalSchema.findByIdAndUpdate(payload, reqBody);
  }

  async delete(payload) {
    return RentalSchema.findByIdAndDelete(payload);
  }
}

module.exports = new RentalRepository();
