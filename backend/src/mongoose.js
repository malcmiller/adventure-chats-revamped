const mongoose = require("mongoose");

const { DATABASE_URL } = process.env;

mongoose.connection.on("open", (_ref) => {
  console.log("Connected to mongo server!");
});

mongoose.connection.on("error", (error) => {
  console.error(`Could not establish connection to mongo server! ${error}`);
});

function openConnection() {
  try {
    mongoose.connect(DATABASE_URL);
  } catch (error) {
    console.error(error);
  }
}

function closeConnection() {
  try {
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  openConnection,
  closeConnection,
};
