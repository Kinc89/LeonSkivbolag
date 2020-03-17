const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");
const config = require("../../config/config");

// const Album = require("../../model/album");
const User = require("../../model/user");

const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
const checkUser = require("../middlewares/checkUser");

app.get(ROUTE.removeItem, verifyToken, checkUser, async (req, res) => {

        // work on that tomorrow tuesday
        // const user = await User.findById({ _id: req.validCookie.user._id });
        
        const removedItem = await User.findByIdAndRemove({ _id: req.params.id });
        
        console.log(removedItem);

        res.redirect(ROUTE.cart);

});

module.exports = app;