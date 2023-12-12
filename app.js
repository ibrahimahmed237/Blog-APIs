const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed.js");
const errorHandler = require("./controllers/error.js");
const appError = require("./controllers/error.js").appError;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/feed", feedRoutes);




app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(
        `Connected to database and server is running on port ${
          process.env.PORT || 8080
        }.`
      );
    });
  })
  .catch((err) => {
    new appError("Database connection failed!", 500);
  });
