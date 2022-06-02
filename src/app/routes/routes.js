const express = require("express");
const CarController = require("../controllers/CarController");

const router = express.Router();

router
	.post("/api/v1/car", CarController.criaCarro)
	.get("/api/v1/car", CarController.listaCarros);


module.exports = router;