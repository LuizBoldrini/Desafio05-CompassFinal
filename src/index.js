const app = require("./app.js");
const dotenv = require("dotenv");

dotenv.config({
	path: process.env.NODE_ENV
});

const port = process.env.port || 3000;

app.listen(port, () => { console.log(`Servidor na porta: ${port}`);});