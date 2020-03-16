const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const User = require("../../model/user");

const verifyToken = require("../middlewares/verifyToken");

app.get(ROUTE.checkout, verifyToken, async (req, res) => {

// who's the user, what contains its cart?


// create an order number and save it to database to the specific user

// where are coming the data from here?
// const user = await User.findById({})
const user = "here will be USER data";

res.render(VIEW.checkout, { user });

});

module.exports = app;