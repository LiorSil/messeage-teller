"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//run db config
require("./config/db.js");
const port = 3000;
const app = express();
app.use(bodyParser.json());
//cors
app.use(cors());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
