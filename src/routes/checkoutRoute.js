const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const User = require("../../model/user");

const verifyToken = require("../middlewares/verifyToken");
const checkUser = require("../middlewares/checkUser");

app.get(ROUTE.checkout, verifyToken, checkUser, async (req, res) => {

// who's the user, what contains its cart?

// where are coming the data from here?
// const user = await User.findById({})

console.log("get on checkout route");
const user = "here will be USER data";

res.render(VIEW.checkout, { user });

});

app.post(ROUTE.checkout, verifyToken, checkUser, async (req, res) => {

    // take in all the data from the form in checkout page and create an order number and save it to database to the specific user
    console.log("post on checkout route");
    
    res.redirect(VIEW.confirmation);
    
});

module.exports = app;