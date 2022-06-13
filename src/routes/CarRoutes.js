const express = require("express");
const CarController = require("../app/controllers/CarController");
const ValidarCar = require("../app/middleware/ValidarCar");

const router = express.Router();

router
	.post("/api/v1/car",ValidarCar ,CarController.createCar)
	.get("/api/v1/car", CarController.listCar)
	.get("/api/v1/car/:id", CarController.listById)
	.put("/api/v1/car/:id",ValidarCar ,CarController.updateCar)
	.delete("/api/v1/car/:id", CarController.deleteCar)
	.patch("/api/v1/car/:id/acessorios/:idAcess", CarController.updateDesc);


module.exports = router;