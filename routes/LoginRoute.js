const express = require("express");
const router = express.router();
const LoginModel = require("../models/LoginModel");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
