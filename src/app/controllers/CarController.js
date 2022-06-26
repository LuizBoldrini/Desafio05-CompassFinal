const CarService = require('../services/CarService');
const NotFound = require('../erros/NotFound');
const BadRequest = require('../erros/BadRequest');

class CarController {
  async createCar(req, res) {
    try {
      const reqBody = req.body;
      const createCar = await CarService.create(reqBody);

      return res.status(201).json(createCar);
    } catch (error) {
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async listCar(req, res) {
    try {
      const reqQuery = req.query;
      const listCar = await CarService.list(reqQuery);
      if (listCar.length === 0) {
        return res.status(204).send();
      }
      return res.status(200).json(listCar);
    } catch (error) {
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async listById(req, res) {
    try {
      const { id } = req.params;
      const listCarById = await CarService.listById(id);
      if (listCarById == null) {
        return res.status(404).json(new NotFound('id'));
      }
      return res.status(200).json(listCarById);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(error.status || 400).json(new BadRequest('"id" does not follow database standards'));
      }
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async updateCar(req, res) {
    try {
      const { id } = req.params;
      const reqBody = req.body;
      const newCar = await CarService.update(id, { set: reqBody });
      if (newCar == null) {
        return res.status(404).json(new NotFound('id'));
      }
      return res.status(200).json(newCar);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(error.status || 400).json(new BadRequest('"id" does not follow database standards'));
      }
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async deleteCar(req, res) {
    try {
      const { id } = req.params;
      const deleteCar = await CarService.delete(id);
      if (deleteCar == null) {
        return res.status(404).json(new NotFound('id'));
      }
      return res.status(204).json();
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(error.status || 400).json(new BadRequest('"id" does not follow database standards'));
      }
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async updateDesc(req, res) {
    try {
      const { idAcess } = req.params;
      const reqBody = req.body;
      const result = await CarService.updateDesc(idAcess, reqBody);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }
}

module.exports = new CarController();
