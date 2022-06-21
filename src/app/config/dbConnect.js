const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION || process.env.MONGO_URL);

const db = mongoose.connection;

module.exports = db;