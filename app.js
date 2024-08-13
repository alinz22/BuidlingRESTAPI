const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const feedRoutes = require("./routes/feed");

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH,"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization,");
  next();
});

app.use("/feed", feedRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.error(err);
  });
