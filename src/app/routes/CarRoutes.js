const express = require("express");
const CarController = require("../controllers/CarController");
const ValidarCar = require("../middleware/ValidarCar");

const router = express.Router();

router
	.post("/api/v1/car",ValidarCar ,CarController.criaCarro)
	.get("/api/v1/car", CarController.listaCarros)
	.get("/api/v1/car/:id", CarController.listaCarroPorId)
	.put("/api/v1/car/:id", CarController.atualizaCarro)
	.delete("/api/v1/car/:id", CarController.deletaCarro);


module.exports = router;