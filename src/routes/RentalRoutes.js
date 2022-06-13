const express = require("express");
const RentalController = require("../app/controllers/RentalController");
const ValidarRental = require("../app/middleware/ValidarRental");

const router = express.Router();

router
	.post("/api/v1/rental", ValidarRental,RentalController.createRental)
	.get("/api/v1/rental", RentalController.listRental)
	.get("/api/v1/rental/:id", RentalController.listById)
	.put("/api/v1/rental/:id", ValidarRental,RentalController.updateRental)
	.delete("/api/v1/rental/:id", RentalController.delete);

module.exports = router;
