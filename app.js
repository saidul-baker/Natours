/* eslint-disable prettier/prettier */
/////////////////////////////////////////////////////////////////  Modules

const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//////////////////////////////////////////////////////////////////////  Middlewares
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//////////////////////////////////////////////////////////////////////////// Routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//error handling
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.url}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
