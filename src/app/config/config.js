require("dotenv").config();

module.exports = {
	database: {
		host: process.env.DB_HOST,
		port: process.env.DB_POST,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		collection: process.env.DB_COLLECTION_TEST
	}
};