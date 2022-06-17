const CarRouter = require("./CarRoutes");
const PersonRoutes = require("./PersonRoutes");
const AuthenticateRoute = require("./AuthenticateRoute");
const RentalRoutes = require("./RentalRoutes");
const ReserveRoutes = require("./ReserveRoutes");

const routes = (app) => {
	app.use(CarRouter);
	app.use(PersonRoutes);
	app.use(AuthenticateRoute);
	app.use(RentalRoutes);
	app.use(ReserveRoutes);
};

module.exports = routes;