const express = require("express");
const app = express.Router();
const { ROUTE, VIEW } = require("./variables");

const User = require("../../model/user");

const verifyToken = require("./verifyToken");

app.get(ROUTE.userProfile, verifyToken, async (req, res) => {

    console.log(req.body.user);

    const user = await User.findById({ _id: req.body.user._id });

    console.log(user);

    res.render(VIEW.userProfile, { user });
});

module.exports = app;