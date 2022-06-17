const express = require("express");
const ReserveController = require("../app/controllers/ReserveController");

const router = express.Router();

router
	.post("/api/v1/rental/:id_rental/reserve", ReserveController.createReserve)
	.get("/api/v1/rental/:id_rental/reserve", ReserveController.listReserve)
	.get("/api/v1/rental/:id_rental/reserve/:id", ReserveController.listById)
	.put("/api/v1/rental/:id_rental/reserve/:id", ReserveController.updateReserve)
	.delete("/api/v1/rental/:id_rental/reserve/:id", ReserveController.deleteReserve);

module.exports = router;