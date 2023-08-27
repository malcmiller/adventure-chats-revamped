const express = require("express");
const morgan = require("morgan");

const checkAuthorization = require("./middleware/checkAuthorization");

function addMiddleWare(app) {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(checkAuthorization);
}

function addRoutes(app) {
  app.use("/api/images", require("./api/routes/images"));
  app.use("/api/users", require("./api/routes/users"));
  app.use("/api/visits", require("./api/routes/visits"));
  app.use("/api/profiles", require("./api/routes/profiles"));
  app.use("/api/chat", require("./api/routes/chat"));
  app.use("/api/categories", require("./api/routes/categories"));
  app.use("/api/posts", require("./api/routes/posts"));

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
