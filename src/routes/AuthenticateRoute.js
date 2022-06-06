const express = require("express");
const AuthenticateController = require("../app/controllers/AuthenticateController");
const ValidarAut = require("../app/middleware/ValidarAut");

const router = express.Router();

router
	.post("/api/v1/authenticate",ValidarAut ,AuthenticateController.criaAut );


module.exports = router;