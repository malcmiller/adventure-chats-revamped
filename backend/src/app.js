const express = require("express");
const morgan = require("morgan");

const routes = require("./api");

function addMiddleWare(app) {
  app.use(morgan("dev"));
  app.use(express.json());
  // app.use(checkAuthorization);
}

function addRoutes(app) {
  app.use("/api", routes);

  app.get("/*", function (_req, res) {
    res.status(404).json({ message: "Invalid path given!" });
  });
}

function buildApp() {
  const app = express();

  addMiddleWare(app);
  addRoutes(app);

  return app;
}

module.exports = buildApp;
