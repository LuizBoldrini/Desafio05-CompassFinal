const express = require("express");
const CarController = require("../app/controllers/CarController");
const PostCar = require("../app/middleware/car/PostCar");
const PutCar = require("../app/middleware/car/PutCar");
const GetCar = require("../app/middleware/car/GetCar");
const PatchCar = require("../app/middleware/car/PatchCar");
const Auth = require("../app/middleware/Auth");

const router = express.Router();

router
	.post("/api/v1/car", Auth, PostCar ,CarController.createCar)
	.get("/api/v1/car", Auth, GetCar, CarController.listCar)
	.get("/api/v1/car/:id", Auth, GetCar, CarController.listById)
	.put("/api/v1/car/:id", Auth, PutCar,CarController.updateCar)
	.delete("/api/v1/car/:id", Auth, CarController.deleteCar)
	.patch("/api/v1/car/:id/acessorios/:idAcess", Auth, PatchCar, CarController.updateDesc);


module.exports = router;