const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const User = require("../../model/user");

const verifyToken = require("../middlewares/verifyToken");
const checkUser = require("../middlewares/checkUser");

app.get(ROUTE.confirmation, verifyToken, checkUser, async (req, res) => {

// where are coming the data from here?
const user = await User.findById({})

// pull the order number created in the database for this specific user and send it to the ejs

res.render(VIEW.confirmation, { user });

});

module.exports = app;