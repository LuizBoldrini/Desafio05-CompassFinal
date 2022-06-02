const express = require("express");
const database = require("./app/config/dbConnect.js");
const routes = require("./app/routes/index");

database.on("error", console.log.bind(console, "DB não conectado"));
database.once("open", () => {console.log("Conexão no BD feita com sucesso");});

const app = express();
app.use(express.json());

routes(app);

module.exports = app;