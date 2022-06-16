const express = require("express");
const CarController = require("../app/controllers/CarController");
const ValidarCar = require("../app/middleware/ValidarCar");
const Auth = require("../app//middleware/Auth");

const router = express.Router();

router
	.post("/api/v1/car", Auth, ValidarCar ,CarController.createCar)
	.get("/api/v1/car", Auth, ValidarCar, CarController.listCar)
	.get("/api/v1/car/:id", Auth, ValidarCar, CarController.listById)
	.put("/api/v1/car/:id", Auth,ValidarCar ,CarController.updateCar)
	.delete("/api/v1/car/:id", Auth, CarController.deleteCar)
	.patch("/api/v1/car/:id/acessorios/:idAcess", Auth, ValidarCar, CarController.updateDesc);


module.exports = router;