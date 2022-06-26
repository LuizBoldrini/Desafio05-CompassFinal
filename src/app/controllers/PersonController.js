const PersonService = require('../services/PersonService');
const BadRequest = require('../erros/BadRequest');

class PersonController {
  async createPerso(req, res) {
    try {
      const reqBody = req.body;
      const personCreate = await PersonService.create(reqBody);
      return res.status(201).json(personCreate);
    } catch (error) {
      if (error.name === 'MongoServerError') {
        return res.status(error.status || 400).json(new BadRequest('"cpf or email" need to be unique'));
      }
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async listPerson(req, res) {
    try {
      const reqQuery = req.query;
      const personList = await PersonService.list(reqQuery);
      if (personList.length === 0) {
        return res.status(204).send();
      }
      return res.status(200).json(personList);
    } catch (error) {
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async listById(req, res) {
    const { id } = req.params;
    try {
      const listPersonById = await PersonService.listById(id);
      return res.status(200).json(listPersonById);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(error.status || 400).json(new BadRequest('"id" does not follow database standards'));
      }
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async updatePerson(req, res) {
    try {
      const { id } = req.params;
      const reqBody = req.body;
      const newPerson = await PersonService.update(id, { set: reqBody });
      return res.status(200).json(newPerson);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(error.status || 400).json(new BadRequest('"id" does not follow database standards'));
      }
      if (error.name === 'MongoServerError') {
        return res.status(error.status || 400).json(new BadRequest('"cpf or email" need to be unique'));
      }
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async deletePerson(req, res) {
    try {
      const { id } = req.params;
      await PersonService.delete(id);
      return res.status(200).json();
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(error.status || 400).json(new BadRequest('"id" does not follow database standards'));
      }
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }
}

module.exports = new PersonController();
