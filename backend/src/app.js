const express = require("express");
const morgan = require("morgan");

const checkAuthorization = require("./middleware/checkAuthorization");

function addMiddleWare(app) {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(checkAuthorization());
}

function addRoutes(app) {
  app.use("/api/images", require("./routes/api/images"));
  app.use("/api/users", require("./routes/api/users"));
  app.use("/api/visits", require("./routes/api/visits"));
  app.use("/api/profiles", require("./routes/api/profiles"));
  app.use("/api/chat", require("./routes/api/chat"));
  app.use("/api/categories", require("./routes/api/categories"));
  app.use("/api/posts", require("./routes/api/posts"));

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

exports.buildApp = buildApp;
