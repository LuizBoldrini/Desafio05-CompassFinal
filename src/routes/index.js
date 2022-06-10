const CarRouter = require("./CarRoutes");
const PersonRoutes = require("./PersonRoutes");
const AuthenticateRoute = require("./AuthenticateRoute");
const RentalRoutes = require("./RentalRoutes");

const routes = (app) => {
	app.use(CarRouter);
	app.use(PersonRoutes);
	app.use(AuthenticateRoute);
	app.use(RentalRoutes);
};

module.exports = routes;