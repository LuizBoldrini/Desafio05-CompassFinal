const express = require("express");
const AuthenticateController = require("../app/controllers/AuthenticateController");
const ValidAut = require("../app/middleware/ValidAut");

const router = express.Router();

router
	.post("/api/v1/authenticate",ValidAut ,AuthenticateController.criateAut );


module.exports = router;