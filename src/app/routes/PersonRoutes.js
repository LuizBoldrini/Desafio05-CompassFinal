const express = require("express");
const PersonController = require("../controllers/PersonController");

const router = express.Router();

router
	.post("/api/v1/person", PersonController.criaPerson)
	.get("/api/v1/person", PersonController.listaPerson)
	.get("/api/v1/person/:id", PersonController.listaPersonPorId)
	.put("/api/v1/person/:id", PersonController.atualizaPerson)
	.delete("/api/v1/person/:id", PersonController.deletaPerson);


module.exports = router;