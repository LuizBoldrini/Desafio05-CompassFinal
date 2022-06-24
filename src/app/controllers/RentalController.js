const NotFound = require('../erros/NotFound');
const RentalService = require('../services/RentalService');

class RentalController {
  async createRental(req, res) {
    try {
      const reqBody = req.body;
      const rentalCreate = await RentalService.create(reqBody);
      return res.status(201).json(rentalCreate);
    } catch (error) {
      return res.status(error.status || 400).json({ dname: error.name, description: error.description });
    }
  }

  async listRental(req, res) {
    try {
      const reqQuery = req.query;
      const RentalList = await RentalService.list(reqQuery);
      return res.status(200).json(RentalList);
    } catch (error) {
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async listById(req, res) {
    try {
      const { id } = req.params;
      const rentalListById = await RentalService.listById(id);
      if (rentalListById == null) {
        return res.status(404).json(new NotFound('id'));
      }
      return res.status(200).json(rentalListById);
    } catch (error) {
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async updateRental(req, res) {
    try {
      const { id } = req.params;
      const reqBody = req.body;
      const newRental = await RentalService.update(id, { set: reqBody });
      return res.status(200).json(newRental);
    } catch (error) {
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await RentalService.delete(id);
      return res.status(200).json();
    } catch (error) {
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }
}

module.exports = new RentalController();
