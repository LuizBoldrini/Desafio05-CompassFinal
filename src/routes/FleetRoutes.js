const express = require("express");
const FleetController = require("../app/controllers/FleetController");
const ValidFleet = require("../app/middleware/ValidFleet");

const router = express.Router();

router
	.post("/api/v1/rental/:id_rental/fleet", ValidFleet, FleetController.createReserve)
	.get("/api/v1/rental/:id_rental/fleet", ValidFleet, FleetController.listReserve)
	.get("/api/v1/rental/:id_rental/fleet/:id", ValidFleet, FleetController.listById)
	.put("/api/v1/rental/:id_rental/fleet/:id", ValidFleet, FleetController.updateReserve)
	.delete("/api/v1/rental/:id_rental/fleet/:id", FleetController.deleteReserve);

module.exports = router;