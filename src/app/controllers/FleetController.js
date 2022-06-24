const NotFound = require('../erros/NotFound');
const FleetService = require('../services/FleetService');
const BadRequest = require('../erros/BadRequest');

class FleetController {
  async createFleet(req, res) {
    try {
      const { id_rental } = req.params;
      const reqBody = req.body;
      const fleetCreate = await FleetService.create({ ...reqBody, id_rental: String(id_rental) });

      return res.status(201).json(fleetCreate);
    } catch (error) {
      if (error.name === 'CastError') {
        return res
          .status(error.status || 404)
          .json(new BadRequest('"id_rental or id_car" does not follow database standards'));
      }
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async listFleet(req, res) {
    try {
      const { id_rental } = req.params;
      const reqQuery = req.query;
      const fleetList = await FleetService.list({ reqQuery, id_rental: String(id_rental) });
      return res.status(200).json(fleetList);
    } catch (error) {
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async listById(req, res) {
    const { id } = req.params;
    try {
      const listFleetById = await FleetService.listById(id);
      return res.status(200).json(listFleetById);
    } catch (error) {
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async updateFleet(req, res) {
    try {
      const { id } = req.params;
      const reqBody = req.body;
      const newFleet = await FleetService.update(id, { set: reqBody });
      return res.status(200).json(newFleet);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(error.status || 404).json(new NotFound('id_car or id_rental'));
      }
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }

  async deleteFleet(req, res) {
    try {
      const { id } = req.params;
      await FleetService.delete(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(error.status || 400).json({ name: error.name, description: error.description });
    }
  }
}

module.exports = new FleetController();
