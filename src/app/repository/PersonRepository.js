const PersonSchema = require('../models/Person');

class PersonRepository {
  async create(payload) {
    return PersonSchema.create(payload);
  }

  async list(payload) {
    return PersonSchema.find(payload);
  }

  async listById(payload) {
    return PersonSchema.findById(payload);
  }

  async update(payload, reqBody) {
    return PersonSchema.findByIdAndUpdate(payload, reqBody);
  }

  async delete(payload) {
    return PersonSchema.findByIdAndDelete(payload);
  }

  async acess(payload) {
    return PersonSchema.findOne({ payload }).select('+password');
  }

  async findPeopleByEmail(email) {
    return PersonRepository.acess({ email });
  }
}

module.exports = new PersonRepository();
