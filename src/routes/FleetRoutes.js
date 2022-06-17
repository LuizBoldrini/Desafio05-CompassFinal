const express = require("express");
const FleetController = require("../app/controllers/FleetController");
const ValidarFleet = require("../app/middleware/ValidarFleet");

const router = express.Router();

router
	.post("/api/v1/rental/:id_rental/fleet", ValidarFleet, FleetController.createReserve)
	.get("/api/v1/rental/:id_rental/fleet", ValidarFleet, FleetController.listReserve)
	.get("/api/v1/rental/:id_rental/fleet/:id", ValidarFleet, FleetController.listById)
	.put("/api/v1/rental/:id_rental/fleet/:id", ValidarFleet, FleetController.updateReserve)
	.delete("/api/v1/rental/:id_rental/fleet/:id", ValidarFleet, FleetController.deleteReserve);

module.exports = router;