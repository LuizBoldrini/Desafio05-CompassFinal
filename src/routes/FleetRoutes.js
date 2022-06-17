const express = require("express");
const FleetController = require("../app/controllers/FleetController");

const router = express.Router();

router
	.post("/api/v1/rental/:id_rental/fleet", FleetController.createReserve)
	.get("/api/v1/rental/:id_rental/fleet", FleetController.listReserve)
	.get("/api/v1/rental/:id_rental/fleet/:id", FleetController.listById)
	.put("/api/v1/rental/:id_rental/fleet/:id", FleetController.updateReserve)
	.delete("/api/v1/rental/:id_rental/fleet/:id", FleetController.deleteReserve);

module.exports = router;