const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");
const config = require("../../config/config");

const Album = require("../../model/album");
const User = require("../../model/user");

const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
const checkUser = require("../middlewares/checkUser");

app.get(ROUTE.removeItem, verifyToken, checkUser, async (req, res) => {


        // work on that tomorrow tuesday
        const user = await User.findById({ _id: req.validCookie.user._id });

        const itemToRemove = await Album.findById({ _id: req.params.id });
        
        const pos = user.cart.indexOf(itemToRemove._id);
        
        user.cart.splice(pos, 1);

        const updatedUser = await user.save();

        console.log(updatedUser);

        res.redirect(ROUTE.cart);

});

module.exports = app;