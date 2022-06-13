const express = require("express");
const CarController = require("../app/controllers/CarController");
const ValidarCar = require("../app/middleware/ValidarCar");

const router = express.Router();

router
	.post("/api/v1/car",ValidarCar ,CarController.criaCarro)
	.get("/api/v1/car", CarController.listaCarros)
	.get("/api/v1/car/:id", CarController.listaCarroPorId)
	.put("/api/v1/car/:id",ValidarCar ,CarController.atualizaCarro)
	.delete("/api/v1/car/:id", CarController.deletaCarro)
	.patch("/api/v1/car/:id/acessorios/:idAcess", CarController.atualizaDesc);


module.exports = router;