const express = require("express");
const AuthenticateController = require("../controllers/AuthenticateController");
const ValidarAut = require("../middleware/ValidarAut");

const router = express.Router();

router
	.post("/api/v1/authenticate",ValidarAut ,AuthenticateController.criaAut );


module.exports = router;