const app = require("./app.js");
require("dotenv").config();


const port = 3000;

app.listen(process.env.port || port , () => { console.log(`Servidor na porta: ${port}`);});