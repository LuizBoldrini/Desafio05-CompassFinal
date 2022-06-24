const express = require('express');
const swaggerUi = require('swagger-ui-express');
const database = require('./app/config/dbConnect');
const routes = require('./routes/index');
const swaggerDocument = require('./app/docs/swagger.json');

database.on('error', console.log.bind(console, 'DB não conectado'));
database.once('open', () => {
  console.log('Conexão no BD feita com sucesso');
});

const app = express();
app.use(express.json());

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes(app);

module.exports = app;
