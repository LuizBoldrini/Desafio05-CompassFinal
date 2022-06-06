const app = require("./app.js");

const port = process.env.port || 3000;

app.listen(port, () => { console.log(`Servidor na porta: ${port}`);});