const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

// needed?
const Album = require("../../model/album");
const User = require("../../model/user");

const verifyToken = require("./verifyToken");

app.get(ROUTE.cart, verifyToken, async (req, res) => {

    const user = await User.findById({ _id: req.body.user._id });

    console.log(user);
    console.log(user.cart.length)

    res.render(VIEW.cart, { user });
});

module.exports = app;