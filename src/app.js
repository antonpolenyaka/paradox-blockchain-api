"use strict";

require("dotenv").config();
let createError = require('http-errors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
// Do not use cors, because we have post webhooks from verifff: let cors = require('cors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const express = require('express');

// Routes
const router = require('./routes/index.js');

// Express module to use. Configuramos Express
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// Do not use cors, because we have post webhooks from verifff: app.use(cors());

// Middlewares
// Remote
app.use("/api/v1", router);
app.use("/api/v1/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// catch 404 and forward tozerror handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ ok: false, message: 'error' }); // response with error without render and views
});

console.log("process.env.PORT", process.env.PORT);
const port = process.env.PORT || 3000;
let host = (process.env.LOCALHOST && process.env.LOCALHOST === "true") ? "localhost" : process.env.DOMAIN;

app.listen(port, () => {
  console.log(`Server is running!\nAPI documentation: http://${host}:${port}/api/v1/doc`);
});