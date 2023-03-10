const express = require("express");
const cookieParser = require("cookie-parser");

const AppError = require("./../utils/appError");
const user = require("../routes/userRoutes");
// const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  app.get("/", (req, res) => {
    res.send({ message: "Welcome to Real-estate API" });
  });
  app.use("/api/users", user);

  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });

  // app.use("/api/auth", auth);
  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
};
