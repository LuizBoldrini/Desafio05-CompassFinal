const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION || "mongodb+srv://admin:admin@cluster0.pq7en.mongodb.net/?retryWrites=true&w=majority");

const db = mongoose.connection;

module.exports = db;