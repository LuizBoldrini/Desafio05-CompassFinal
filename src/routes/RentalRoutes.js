const express = require("express");
const RentalController = require("../app/controllers/RentalController");
const ValidarRental = require("../app/middleware/ValidarRental");

const router = express.Router();

router
	.post("/api/v1/rental", ValidarRental,RentalController.criaRental)
	.get("/api/v1/rental", RentalController.listaRental)
	.get("/api/v1/rental/:id", RentalController.listaRentalPorId)
	.put("/api/v1/rental/:id", ValidarRental,RentalController.atualizaRental)
	.delete("/api/v1/rental/:id", RentalController.deletaRental);

module.exports = router;
