const express = require("express");
const PersonController = require("../app/controllers/PersonController");
const ValidarPerson = require("../app/middleware/ValidarPerson");

const router = express.Router();

router
	.post("/api/v1/person", ValidarPerson,PersonController.createPerso)
	.get("/api/v1/person", ValidarPerson, PersonController.listPerson)
	.get("/api/v1/person/:id", ValidarPerson, PersonController.listById)
	.put("/api/v1/person/:id", ValidarPerson, PersonController.updatePerson)
	.delete("/api/v1/person/:id", PersonController.deletePerson);


module.exports = router;