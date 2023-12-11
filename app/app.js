"use strict";

//모듈
const path = require("path");
const express = require("express");
const app = express();

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use("/", home);

module.exports = app;
