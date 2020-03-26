const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");
const User = require("../../model/user");
const verifyToken = require("../middlewares/verifyToken");
const checkUser = require("../middlewares/checkUser");
const calcTotalPrice = require("../functions/calcTotalPrice");

app.get(ROUTE.checkout, verifyToken, checkUser, async (req, res) => {
    

// who's the user, what contains its cart?
const  order = req.validCookie.user.cart
// const placeOrder =  //"here will be USER data";
// order.push(placeOrder);


// where are coming the data from here?
const user = await User.findById({ _id: req.validCookie.user._id });

console.log("get on checkout route");

const totalPrice = await calcTotalPrice(user.cart);

res.render(VIEW.checkout, { user, totalPrice });

});

app.post(ROUTE.checkout, verifyToken, checkUser, async (req, res) => {

    // take in all the data from the form in checkout page and create an order number and save it to database to the specific user
    console.log("post on checkout route");
    
    res.redirect(VIEW.confirmation);
    
});

module.exports = app;