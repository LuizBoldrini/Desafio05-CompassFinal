const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Renpass" || "mongodb+srv://admin:admin@cluster0.pq7en.mongodb.net/?retryWrites=true&w=majority");

const db = mongoose.connection;

module.exports = db;