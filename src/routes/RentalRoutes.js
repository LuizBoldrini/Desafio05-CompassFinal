const express = require("express");
const RentalController = require("../app/controllers/RentalController");
const ValidRental = require("../app/middleware/ValidRental");

const router = express.Router();

router
	.post("/api/v1/rental", ValidRental,RentalController.createRental)
	.get("/api/v1/rental", RentalController.listRental)
	.get("/api/v1/rental/:id", RentalController.listById)
	.put("/api/v1/rental/:id", ValidRental,RentalController.updateRental)
	.delete("/api/v1/rental/:id", RentalController.delete);

module.exports = router;
