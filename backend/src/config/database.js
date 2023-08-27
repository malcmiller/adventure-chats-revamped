const mongoose = require("mongoose");

const { DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
