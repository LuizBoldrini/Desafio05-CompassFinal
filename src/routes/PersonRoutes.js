const express = require('express');
const PersonController = require('../app/controllers/PersonController');
const PostPerson = require('../app/middleware/person/PostPerson');
const PutPerson = require('../app/middleware/person/PutPerson');
const GetPerson = require('../app/middleware/person/GetPerson');

const router = express.Router();

router
  .post('/api/v1/person', PostPerson, PersonController.createPerso)
  .get('/api/v1/person', GetPerson, PersonController.listPerson)
  .get('/api/v1/person/:id', GetPerson, PersonController.listById)
  .put('/api/v1/person/:id', PutPerson, PersonController.updatePerson)
  .delete('/api/v1/person/:id', PersonController.deletePerson);

module.exports = router;
