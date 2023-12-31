const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const feedRoutes = require("./routes/feed.js");
const authRoutes = require("./routes/auth.js");
const errorHandler = require("./controllers/error.js");
const helmet = require("helmet");
const compression = require("compression");
const appError = require("./controllers/error.js").appError;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(compression());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);

app.all("*", (req, res, next) => {
  return next(
    new appError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(errorHandler);

module.exports = app;
