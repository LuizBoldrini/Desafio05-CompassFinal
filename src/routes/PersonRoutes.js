const express = require("express");
const PersonController = require("../app/controllers/PersonController");
const ValidPerson = require("../app/middleware/ValidPerson");

const router = express.Router();

router
	.post("/api/v1/person", ValidPerson,PersonController.createPerso)
	.get("/api/v1/person", ValidPerson, PersonController.listPerson)
	.get("/api/v1/person/:id", ValidPerson, PersonController.listById)
	.put("/api/v1/person/:id", ValidPerson, PersonController.updatePerson)
	.delete("/api/v1/person/:id", PersonController.deletePerson);


module.exports = router;