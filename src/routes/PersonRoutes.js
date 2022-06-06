const express = require("express");
const PersonController = require("../app/controllers/PersonController");
const ValidarPerson = require("../app/middleware/ValidarPerson");

const router = express.Router();

router
	.post("/api/v1/person", ValidarPerson,PersonController.criaPerson)
	.get("/api/v1/person", PersonController.listaPerson)
	.get("/api/v1/person/:id", PersonController.listaPersonPorId)
	.put("/api/v1/person/:id", ValidarPerson, PersonController.atualizaPerson)
	.delete("/api/v1/person/:id", PersonController.deletaPerson);


module.exports = router;