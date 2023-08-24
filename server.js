const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
// Always require and configure near the top
require("dotenv").config();
// Connect to the database
require("./config/database");

const app = express();


app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Middleware to check and verify a JWT and
// assign the user object from the JWT to req.user
app.use(require("./config/checkToken"));

// app.post("/upload", uploadImage.array("file"), async (req, res, next) => {
//   try {
//     req.files.forEach(async (file) => {
//       await Image.create({
//         name: file.originalname,
//         url: file.location,
//       });
//     });

//     res.json({ status: "success" });
//   } catch (error) {
//     // Handle the error here, you can send an error response or log it.
//     console.error("Error occurred:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the request" });
//   }
// });
app.use("/api/images", require("./routes/api/images"));

// API routes should be defined before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use('/api/visits', require('./routes/api/visits'));

app.use("/api/categories", require("./routes/api/categories"));


// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});