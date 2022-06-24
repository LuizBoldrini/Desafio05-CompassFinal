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

  async acess(email) {
    return PersonSchema.findOne({ email }).select('+password');
  }
}

module.exports = new PersonRepository();
