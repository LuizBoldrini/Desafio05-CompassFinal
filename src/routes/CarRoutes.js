const express = require("express");
const CarController = require("../app/controllers/CarController");
const ValidCar = require("../app/middleware/ValidCar");
const Auth = require("../app/middleware/Auth");

const router = express.Router();

router
	.post("/api/v1/car", Auth, ValidCar ,CarController.createCar)
	.get("/api/v1/car", Auth, ValidCar, CarController.listCar)
	.get("/api/v1/car/:id", Auth, ValidCar, CarController.listById)
	.put("/api/v1/car/:id", Auth,ValidCar ,CarController.updateCar)
	.delete("/api/v1/car/:id", Auth, CarController.deleteCar)
	.patch("/api/v1/car/:id/acessorios/:idAcess", Auth, ValidCar, CarController.updateDesc);


module.exports = router;