const express = require("express");
const FleetController = require("../app/controllers/FleetController");
const PostFleet = require("../app/middleware/fleet/PostFleet");
const PutFleet = require("../app/middleware/fleet/PutFleet");
const GetFleet = require("../app/middleware/fleet/GetFleet");

const router = express.Router();

router
	.post("/api/v1/rental/:id_rental/fleet", PostFleet, FleetController.createReserve)
	.get("/api/v1/rental/:id_rental/fleet", GetFleet, FleetController.listReserve)
	.get("/api/v1/rental/:id_rental/fleet/:id", GetFleet, FleetController.listById)
	.put("/api/v1/rental/:id_rental/fleet/:id", PutFleet, FleetController.updateReserve)
	.delete("/api/v1/rental/:id_rental/fleet/:id", FleetController.deleteReserve);

module.exports = router;