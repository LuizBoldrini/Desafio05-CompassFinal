const express = require("express");
const ReserveController = require("../app/controllers/ReserveController");
const PostReserve = require("../app/middleware/reserve/PostReserve");
const GetReserve = require("../app/middleware/reserve/GetReserve");
const PutReserve = require("../app/middleware/reserve/PutReserve");

const router = express.Router();

router
	.post("/api/v1/rental/:id_rental/reserve", PostReserve, ReserveController.createReserve)
	.get("/api/v1/rental/:id_rental/reserve", GetReserve, ReserveController.listReserve)
	.get("/api/v1/rental/:id_rental/reserve/:id", GetReserve, ReserveController.listById)
	.put("/api/v1/rental/:id_rental/reserve/:id", PutReserve, ReserveController.updateReserve)
	.delete("/api/v1/rental/:id_rental/reserve/:id", ReserveController.deleteReserve);

module.exports = router;