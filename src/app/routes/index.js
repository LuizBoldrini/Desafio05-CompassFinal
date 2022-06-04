const CarRouter = require("./CarRoutes");
const PersonRoutes = require("./PersonRoutes");

const routes = (app) => {
	app.use(CarRouter);
	app.use(PersonRoutes);
};

module.exports = routes;