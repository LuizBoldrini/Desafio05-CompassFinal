const express = require('express');
const FleetController = require('../app/controllers/FleetController');
const PostFleet = require('../app/middleware/fleet/PostFleet');
const PutFleet = require('../app/middleware/fleet/PutFleet');
const GetFleet = require('../app/middleware/fleet/GetFleet');

const router = express.Router();

router
  .post('/api/v1/rental/:id_rental/fleet', PostFleet, FleetController.createFleet)
  .get('/api/v1/rental/:id_rental/fleet', GetFleet, FleetController.listFleet)
  .get('/api/v1/rental/:id_rental/fleet/:id', GetFleet, FleetController.listById)
  .put('/api/v1/rental/:id_rental/fleet/:id', PutFleet, FleetController.updateFleet)
  .delete('/api/v1/rental/:id_rental/fleet/:id', FleetController.deleteFleet);

module.exports = router;
