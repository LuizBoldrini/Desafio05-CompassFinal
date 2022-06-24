const express = require('express');
const RentalController = require('../app/controllers/RentalController');
const PostRental = require('../app/middleware/rental/PostRental');
const PutRental = require('../app/middleware/rental/PutRental');
const GetRental = require('../app/middleware/rental/GetRental');

const router = express.Router();

router
  .post('/api/v1/rental', PostRental, RentalController.createRental)
  .get('/api/v1/rental', GetRental, RentalController.listRental)
  .get('/api/v1/rental/:id', GetRental, RentalController.listById)
  .put('/api/v1/rental/:id', PutRental, RentalController.updateRental)
  .delete('/api/v1/rental/:id', RentalController.delete);

module.exports = router;
