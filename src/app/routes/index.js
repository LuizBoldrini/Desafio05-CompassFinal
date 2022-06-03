const CarRouter = require("./CarRoutes");
const PeopleRoutes = require("./PeopleRoutes");

const routes = (app) => {
	app.use(CarRouter);
	app.use(PeopleRoutes);
};

module.exports = routes;