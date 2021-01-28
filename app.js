/////////////////////////////////////////////////////////////////  Modules

const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//////////////////////////////////////////////////////////////////////  Middlewares
app.use(express.json());
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
});

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//////////////////////////////////////////////////////////////////////////// Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
