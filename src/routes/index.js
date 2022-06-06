const CarRouter = require("./CarRoutes");
const PersonRoutes = require("./PersonRoutes");
const AuthenticateRoute = require("./AuthenticateRoute");

const routes = (app) => {
	app.use(CarRouter);
	app.use(PersonRoutes);
	app.use(AuthenticateRoute);
};

module.exports = routes;