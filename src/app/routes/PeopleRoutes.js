const express = require("express");
const PeopleController = require("../controllers/PeopleController");

const router = express.Router();

router
	.post("/api/v1/people", PeopleController.criaPeople)
	.get("/api/v1/people", PeopleController.listaPeople)
	.get("/api/v1/people/:id", PeopleController.listaPeoplePorId)
	.put("/api/v1/people/:id", PeopleController.atualizaPeople)
	.delete("/api/v1/people/:id", PeopleController.deletaPeople);


module.exports = router;