const express = require("express");
const ReserveController = require("../app/controllers/ReserveController");
const ValidReserve = require("../app/middleware/ValidReserve");

const router = express.Router();

router
	.post("/api/v1/rental/:id_rental/reserve", ValidReserve, ReserveController.createReserve)
	.get("/api/v1/rental/:id_rental/reserve", ValidReserve, ReserveController.listReserve)
	.get("/api/v1/rental/:id_rental/reserve/:id", ValidReserve, ReserveController.listById)
	.put("/api/v1/rental/:id_rental/reserve/:id", ValidReserve, ReserveController.updateReserve)
	.delete("/api/v1/rental/:id_rental/reserve/:id", ReserveController.deleteReserve);

module.exports = router;